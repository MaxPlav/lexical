/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {expect} from '@playwright/test';

// import { fakeBrowser } from '@webext-core/fake-browser';
import {focusEditor, initialize, test} from '../utils/index.mjs';

// const EXTENSION_ID = 'kgljmdocanfjckcgfpcpdoklodllfdpc';

// test.use({
//   devtools: true,
// });

// async function getExtensionPage(brow: Browser, extId: string) {
//   const extensionTarget = await brow.waitForTarget((target) => {
//     return target.type() === 'page' && target.url().startsWith(`chrome-extension://${extId}/devtools.html`);
//   });

//   if (!extensionTarget) {
//     throw new Error('cannot load extension');
//   }

//   const extension = await extensionTarget.page();
//   if (!extension) {
//     throw new Error('cannot get page of extension');
//   }
//   return extension;
// }

test.describe('TreeView', () => {
  test.skip(({browserName}) => browserName !== 'chromium', 'Chromium only!');

  test.beforeEach(async ({isCollab, page, browser}) => {
    initialize({isCollab, page});

    // await page.addInitScript(() => {
    //   browser.devtools = {
    //     inspectedWindow: {
    //       tabId: 1
    //     }
    //   };
    // })
  });

  test('should render tree view', async ({
    page,
    browser,
    browserName,
    extensionId,
    context,
  }) => {
    // console.log('++fakeBrowser', fakeBrowser);
    // const fakeBrowser1 = new fakeBrowser();
    // await fakeBrowser.applyToContext(context);

    await focusEditor(page);
    await page.waitForTimeout(1000);

    // await page.goto(`chrome-extension://${extensionId}/popup.html`);
    // navigate to externsion
    // create a new tab

    // const client = await page.context().newCDPSession(page);
    // // Retrieve the list of open targets
    // const targets = await client.send('Target.getTargets');
    // console.log('+++targets', targets);

    // const devToolsTarget = targets.targetInfos.find(target => target.title.includes('DevTools') && target.type === 'page' && target.url.includes('devtools://'));
    // // const devToolsTarget = targets.targetInfos.find(target => target.title.includes('devtools.html') && target.type === 'iframe' && target.url.includes('devtools.html'));

    // console.log('+++devToolsTarget', devToolsTarget.page);

    // if (devToolsTarget) {
    //   // Attach to the DevTools target
    //   const devToolsSession = await client.send('Target.attachToTarget', {
    //     flatten: true,
    //     targetId: devToolsTarget.targetId,
    //   });

    //   const window = await client.send('Browser.getWindowForTarget');

    //   console.log('----', window);

    //   await page.waitForTimeout(1000);

    //   // const tabExists = await client.send('Runtime.evaluate', {
    //   //   expression: ``,
    //   // });
    //   // console.log('Tab exists:', tabExists);

    //   // Close the DevTools session
    //   await client.send('Target.detachFromTarget', { sessionId: devToolsSession.sessionId });
    // } else {
    //   console.log('DevTools target not found');
    // }

    // const tabs = await context.tabs.query({
    //   active: true,
    //   currentWindow: true
    // });
    // get tab id
    // const tabId = tabs[0].id;
    // console.log('+++tabId', tabs);

    const extensionPage = await context.newPage();

    await extensionPage.goto(
      `chrome-extension://${extensionId}/devtools-panel.html`,
      {
        referer: 'http://localhost:3000/',
        waitUntil: 'domcontentloaded',
      },
    );

    // console.log('====browser.tabs', browser);

    const lexicalPageTitle = await page.title();
    await expect(lexicalPageTitle).toBe('Lexical Playground');
    await expect(extensionPage.locator('body')).toHaveText(
      'Loading Lexical DevTools UI...',
    );

    await extensionPage.waitForTimeout(15000);
    // console.log('====all htnml', extensionPage);

    expect(true).toBe(true);
  });
});

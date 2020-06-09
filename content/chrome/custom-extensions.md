+++ 
title = "Custom Extensions" 
+++

Build your own local Chrome extensions to customize your experience visiting web sites and remove annoyances.

This sample walkthrough builds an extension that manipulates the DOM to hide the top and left panels from pages on Wikipedia to allow focus on the page contents.

Steps:

1. Create a new folder for your extension
1. Create a file called `manifest.json` with the following contents:

   ```json
   {
     "name": "wikipedia-focus-mode",
     "version": "1.0",
     "description": "Content-focused Wikipedia",
     "icons": {},
     "permissions": ["https://wikipedia.org/", "activeTab"],
     "content_scripts": [
       {
         "matches": ["https://*.wikipedia.org/*"],
         "js": ["wikipedia.js"]
       }
     ],
     "manifest_version": 2
   }
   ```

1. Create a file called `wikipedia.js` with the following contents:

   ```javascript
   let els = ["p-personal", "mw-panel"];

   els.forEach((el) => {
     let dom_el = document.getElementById(el);
     if (dom_el) {
       dom_el.style.display = "none";
     }
   });
   ```

1. Open Chrome Extension Settings
1. Toggle on Developer Mode
1. Click `Load Unpacked` and select the directory for your chrome extension
1. Browse to a page on Wikipedia, such as [wikipedia.org/wiki/SpaceX](https://en.wikipedia.org/wiki/SpaceX)

![wikipedia.png](../wikipedia.png)

For more information about building Chrome Extensions [(docs)](https://developer.chrome.com/extensions)

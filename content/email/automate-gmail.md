+++
title = "Automate Gmail With App Scripts"
+++

Automate Gmail with [Google Apps Scripts](https://script.google.com/home), which can be used to help keep your inbox clean, autorespond to emails, and many other use cases.

This particular sample script evaluates all threads in the inbox, applies a label "Decaying" to any messages over 14 days old, and applies a label "Auto-Archived" and archives any threads older than 28 days, removing them from the inbox.

Set a trigger for the script under the app script project settings - recommend scheduling every day at midnight.

```javascript
function inbox_ager() {
  function getLabel(labelName) {
    let label = GmailApp.getUserLabelByName(labelName);

    if (label == null) {
      GmailApp.createLabel(labelName);
      label = GmailApp.getUserLabelByName(labelName);
    }

    return label;
  }

  function daysAgo(days) {
    let date = new Date();
    date.setDate(date.getDate() - days);

    return date;
  }

  let decayLabel = getLabel("Decaying");
  let archiveLabel = getLabel("Auto-Archived");

  let twoWeeks = daysAgo(14);
  let fourWeeks = daysAgo(28);

  GmailApp.getInboxThreads().forEach((t) => {
    if (t.getLastMessageDate() < fourWeeks) {
      t.removeLabel(decayLabel);
      t.addLabel(archiveLabel);
      t.moveToArchive();
    } else if (t.getLastMessageDate() < twoWeeks) {
      t.addLabel(decayLabel);
    }
  });
}
```

Inspired by article at [Nethunt](https://nethunt.com/blog/how-to-automate-your-email-routine-in-gmail)

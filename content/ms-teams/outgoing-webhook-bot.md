+++
title = "MS Teams Outgoing Webhook Bot"
+++

[MS Teams outgoing webhook bots](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-outgoing-webhook) are simple bots that provide a threaded reply when @mentioned.  

[bradyjoslin/msteams-webhook-worker-template](https://github.com/bradyjoslin/msteams-webhook-worker-template) is a [wrangler template](https://github.com/cloudflare/wrangler) that helps kick start [Cloudflare Worker-based](https://workers.cloudflare.com/) bot projects.

### How it works

The @mention triggers a POST request to the worker containing information about the conversation message. The worker verifies the webhook signature using an HMAC token, can then obtain and perform actions based on the message details, and replies with a JSON response that gets rendered as a threaded reply:

```json
{
  "type": "message",
  "text": "This is a reply!"
}
```

### Sample bot

[tldr (“Too Long; Didn't Read”)](https://github.com/bradyjoslin/msteams-tldr/) is a sample bot built using this template - when @mentioned in a post or comment in a message containing a URL the bot provides a threaded reply with a 3-sentence summary of the web page derived by an [Algorithmia](https://algorithmia.com/)-hosted algorithm.  

![tldr conversation](../tldr.png)

The idea for tldr bot came from [this article from the Concur Labs team](https://blog.concurlabs.com/how-to-write-a-tldr-chat-bot-ec02d9e1649c).
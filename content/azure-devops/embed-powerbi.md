+++
title = "Embed PowerBI on Dashboard"
+++

Open a PowerBI report and obtain the [embed URL](https://docs.microsoft.com/en-us/power-bi/service-embed-secure).

Go to Azure DevOps, under Overview select Dashboards. Create a new dashboard and search for the embed widget. Paste your embed URL from PowerBI in the URL field on the form.

If you do not have an active session with [PowerBI online](https://powerbi.microsoft.com/en-us/), the widget containing the PowerBI report will first show a button asking you to login. That button will not work due to the iframe running in a sandbox, so you may have to manually go to PowerBI online and login then return to Azure DevOps 👎. Will update if able to find a workaround.

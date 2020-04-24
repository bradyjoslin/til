+++
title = "Find & Kill Process Running on Port"
+++

Sometimes you'll not properly shut down a web server or other process and need to stop it. To find the process listening on a specific port:

`lsof -i :1111 | grep "LISTEN" | awk '{ print $2 }'`

Note the PID, (i.e. 61425), then:

`kill -15 61425`

The find and kill one-liner:

`kill -15 $(lsof -i :1111 | grep "LISTEN" | awk '{ print $2 }')`

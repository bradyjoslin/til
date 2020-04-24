+++
title = "Find & Kill Process Running on Port"
+++

Sometimes you'll not properly shut down a web server or other process and need to stop it. To find the process listening on a specific port:

`lsof -i :1111 | grep "LISTEN"`

Note the PID, (i.e. 61425), then:

`kill -15 61425`

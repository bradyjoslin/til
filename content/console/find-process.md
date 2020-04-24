+++
title = "Find & Kill Process Running on Port"
+++

Sometimes you'll not properly shut down a web server or other process and need to stop it. To find the process listening on a specific port, in this example 1111:

```bash
> lsof -i :1111 | grep "LISTEN" | awk '{ print \$2 }'
63172
```

Note the PID, (i.e. 63172), then:

```bash
kill -15 63172
```

The find and kill one-liner:

```bash
kill -15 $(lsof -i :1111 | grep "LISTEN" | awk '{ print $2 }')
```

+++
title = "Local Server for Testing WASM"
+++

Testing WASM in the browser requires a web server, as most browsers restrict running WASM from local files. To quickly get a local webserver running to test a WASM file, you can use Python to run a web server to host the static files in a directory and use the correct mime type for the WASM file. Create a file called serve.py containing:

```python
import http.server
import socketserver

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map = {
    '.html': 'text/html',
    '.wasm': 'application/wasm',
    '': 'application/octet-stream',
}

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()
```

Run `python3 serve.py` and open [http://localhost/8000](http://localhost/8000).

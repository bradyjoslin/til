+++
title = "Build Zola Using GitHub Actions"
+++

Zola can be installed on the ubuntu-latest GitHub Action runner using [snap](https://snapcraft.io/). Here's a sample GitHub Action definition that installs Zola, builds the site, then uploads it to a Cloudflare Worker using the Wrangler Action.

```yml
# Build site using Zola and Deploy to Cloudflare Workers

name: CI

on:
  push:
    branches: [master]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - name: Install and Run Zola
        run: |
          sudo snap install --edge zola
          zola build
      - name: Deploy to Cloudflare Workers with Wrangler
        uses: cloudflare/wrangler-action@1.1.0
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          environment: production
```

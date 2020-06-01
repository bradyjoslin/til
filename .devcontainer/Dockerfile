#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See https://go.microsoft.com/fwlink/?linkid=2090316 for license information.
#-------------------------------------------------------------------------------------------------------------

# To fully customize the contents of this image, use the following Dockerfile instead:
# https://github.com/microsoft/vscode-dev-containers/tree/v0.117.1/containers/javascript-node-14/.devcontainer/Dockerfile
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-14

# ** [Optional] Uncomment this section to install additional packages. **
#
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
    && apt-get -y install --no-install-recommends aspell-en \
    #
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Get Rust
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y

ENV PATH="/root/.cargo/bin:${PATH}"

# Install Zola
RUN curl -sSOL https://github.com/getzola/zola/releases/download/v0.11.0/zola-v0.11.0-x86_64-unknown-linux-gnu.tar.gz \
    && mkdir -p /root/workspaces/zola/ \
    && tar -xf zola-v0.11.0-x86_64-unknown-linux-gnu.tar.gz -C /root/workspaces/zola/
ENV PATH="/root/workspaces/zola/:${PATH}"

# Install Wrangler
RUN curl -sSOL https://github.com/cloudflare/wrangler/releases/download/v1.9.2/wrangler-v1.9.2-x86_64-unknown-linux-musl.tar.gz \
    && mkdir -p /root/workspaces/wrangler/ \
    && tar -xf wrangler-v1.9.2-x86_64-unknown-linux-musl.tar.gz -C /root/workspaces/wrangler/
ENV PATH="/root/workspaces/wrangler/dist/:${PATH}"

# RUN cargo install wrangler --version "1.9.0"
ENV DEBIAN_FRONTEND=dialog


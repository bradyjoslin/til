+++
title = "Use Degit to Copy Repos"
+++

Sometimes you just want a local copy of a git repo, not a full clone with git history. This can be useful when wanting to start your project from a template repo or include another repo in your existing git project. [Degit](https://github.com/Rich-Harris/degit) by Rich Harris lets you do this.

You can run degit without installing. For example, to create a copy of the [getzola/book](https://github.com/getzola/book) theme within the themes folder of an existing Zola project:

`npx degit getzola/book book`

Would create a new directory called `book` containing a copy of latest version of the getzola/book repo.

You can also just grab a portion of an existing repo instead of a full copy:

`degit user/repo/subdirectory`

There is also a [degit Rust clone](https://github.com/psnszsn/degit-rs) which has the benefit of not requiring node and can be installed as a single binary.

For Rustaceans:

```bash
cargo install degit
```

Or grab the latest binary from the [Release tab](https://github.com/psnszsn/degit-rs/releases) of the project and add it to your path.

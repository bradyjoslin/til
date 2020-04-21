# Today I Learned Site for Brady Joslin

**Today I Learned** - a collection of memorable snippets noted here for personal reference and shared if by chance it provides value to others. These are inentionally short notes, not complete thoughts or blog posts. Static site is generated using [Zola's](https://getzola.org) [Book theme](https://github.com/getzola/book).

## Get started

Install the dependencies...

```bash
brew install zola
```

Then to run the site for local development:

```bash
zola serve
```

Navigate to [localhost:1111](http://localhost:1111). You should see your app running.

## Update content

Site content lives in the `content` directory, which is rendered as a book. Chapters are based on directories and pages in the book are markdown files within the directories.

## Building and running in production mode

To publish to til.bradyjoslin.com

```bash
zola build
```

```bash
wrangler publish
```

## [TO-DO] Deploy with GitHub Action

Push to the master branch of this repo which will trigger a Github Action to publish using [Wrangler Action](https://github.com/cloudflare/wrangler-action).

Need to work through doing Zola build as part of a GitHub action.

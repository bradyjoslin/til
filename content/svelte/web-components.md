+++
title = "Web Components"
+++

Svelte can output [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components), which is:

> a suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps.

This lets you write something like this in an app to render a component created with Svelte:

```html
...
<head>
  <script defer src="/bundle.js"></script>
</head>
<body>
  <cool-component></cool-component>
</body>
...
```

Instructions can be found in the [Svelte API documentation](https://svelte.dev/docs#Custom_element_API) and a walkthrough is available in this video tutorial:

{{ youtube(id="xIYOyiAE-sY") }}

This is an alternative to what most Svelte users export, which are Svelte components rendered by [specifying the target element](https://svelte.dev/docs#Creating_a_component) when instantiating the component.

```javascript
import Component from "./Component.svelte";

const app = new Component({
  target: document.querySelectorAll("#svelte-component"),
  props: {},
});
```

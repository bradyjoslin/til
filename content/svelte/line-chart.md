+++
title = "Line Chart"
+++

The Shapes module from the Front End Masters course [Introduction to Data Visualization with d3.js v4](https://frontendmasters.com/courses/d3-v4/) by Shirley Wu includes an example of how to make [line charts](https://github.com/d3/d3-shape#lines) using [D3's Shape functions](https://github.com/d3/d3-shape). This example is a very slight modification to the example from the course, using Svelte to generate the Path element for the line chart, while still using D3 to calculate the Path's `d` attribute value.

This example builds from the second sample from the [histogram](../histogram) post, which can be referred to for more details on the overall mechanics of scaling and creating the axis.

Demo:

{{ svelte(name="linechart", cfg="{}") }}

&nbsp;

A variable `path` is defined using D3's line function, where we provide the function for scaling the x and y values along with an additional curve function [curveStep](https://github.com/d3/d3-shape#curveStep) to refine the shape of the line.

```JavaScript
let path = line()
  .x(d => xScale(d.date))
  .y(d => yScale(d[city]))
  .curve(curveStep);
```

And instead of an SVG group containing a Svelte loop generating `rect` elements, include a single `path` element with the `d` attribute equal to the value of the data set sent to the path function defined above. This allows D3 to automatically calculate the path of the line to represent the data.

```html
<g>
  <!-- line -->
  <path d="{path(data)}" fill="none" stroke="blue" />
</g>
```

Full source code ([repl](https://svelte.dev/repl/8262eb73a08f48adba8e0b706c1a939f?version=3.22.1)):

```html
<!--
Svelted version of Exercise 2 of Front End Masters course Introduction to Data Visualization with d3.js v4 by Shirley Wu
https://frontendmasters.com/courses/d3-v4/
-->
<script>
  import { scaleLinear, timeParse, extent, scaleTime } from 'd3';
  import data from './data.js';

  let el;

  let city = "austin"
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  var width = 800;
  var height = 300;
  var margin = { top: 20, bottom: 20, left: 20, right: 20 };

  data.forEach((d) => {
    d.date = timeParse("%Y%m%d")(d.date);
    d.date = new Date(d.date); // x
    d.temp = ++d[city]; // y
  });

  // scales
  let extentX = extent(data, (d) => d.date);
  let xScale = scaleTime()
    .domain(extentX)
    .range([margin.left, width - margin.right]);

  let extentY = extent(data, (d) => d[city]);
  let yScale = scaleLinear()
    .domain(extentY)
    .range([height - margin.bottom, margin.top]);

  let path = line()
    .x(d => xScale(d.date))
    .y(d => yScale(d[city]))
    .curve(curveStep);

  // ticks for x axis - first day of each month found in the data
  let xTicks = [];
  data.forEach(d => {
    if(d.date.getDate() == 1) {
      xTicks.push(d.date);
    }
  })

  // x axis labels string formatting
  let xLabel = (x) =>
    monthNames[x.getMonth()] + ' 20' + x.getYear().toString().substring(x.getYear(), 1)

  // y ticks count to label by 5's
  let yTicks = [];
  for (i = Math.round(extentY[0]); i < Math.round(extentY[1] + 1); i=i+5) {
    yTicks.push(Math.floor(i/5)*5);
  }

  // d's for axis paths
  let xPath = `M${margin.left + .5},6V0H${width - margin.right + 1}V6`
  let yPath = `M-6,${height + .5}H0.5V0.5H-6`

</script>

<style>
  svg {
    width: 100%;
    height: 100%;
  }
  .tick {
    font-size: 11px;
  }
</style>

<svg bind:this={el} transform="translate({margin.left}, {margin.top})">
  <g>
    <!-- line -->
    <path d={path(data)} fill="none" stroke="blue" />
  </g>

  <!-- y axis -->
  <g transform="translate({margin.left}, 0)">
    <path stroke="currentColor" d="{yPath}" fill="none" />

    {#each yTicks as y}
      <g class="tick" opacity="1" transform="translate(0,{yScale(y)})">
        <line stroke="currentColor" x2="-5" />
        <text dy="0.32em" fill="currentColor" x="-{margin.left}">
          {y}
        </text>
      </g>
    {/each}
  </g>

  <!-- x axis -->
  <g transform="translate(0, {height})">
    <path stroke="currentColor" d="{xPath}" fill="none" />

    {#each xTicks as x}
      <g class="tick" opacity="1" transform="translate({xScale(x)},0)">
        <line stroke="currentColor" y2="6" />
        <text fill="currentColor" y="9" dy="0.71em" x="-{margin.left}">
          {xLabel(x)}
        </text>
      </g>
    {/each}
</svg>
```

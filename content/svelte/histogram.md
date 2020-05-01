+++
title = "Histograms with SVG"
+++

Building SVG-based histograms with Svelte is fairly straightforward.

Here's a naive example of a histogram where the bar height is the number of pixels matching the value of each datapoint. Svelte's each loop is used to render a bar per point in the data, with the bar height set the the value of the point.

{{ svelte(name="samplebasichistogram", cfg="{}") }}

Code ([repl](https://svelte.dev/repl/f3aa9a3007f447da97112e7f7c4dfb68?version=3.21.0)):

```html
<script>
  const barWidth = 50;
  const height = 300;

  const points = [100, 125, 250, 100, 225, 275, 150, 275, 250, 150];
</script>

<style>
  svg {
    width: 100%;
    height: 100%;
  }
</style>

<svg>
  {#each points as point, i}
  <rect
    width="{barWidth}"
    height="{point}"
    x="{i * barWidth}"
    y="{height - point}"
    fill="green"
    stroke="#fff"
  />
  {/each}
</svg>
```

In real life scenarios, scaling the data is required to allow the values to fit the desired size of the graph. One way to handle this is by using D3's scaling functions, while still letting Svelte handle the DOM manipulation. This is the way [Rich Harris describes](https://shoptalkshow.com/349/#transcript) using Svelte for his work at NY Times, as it allows leveraging Sevelte's server side rendering functionality.

Additionally, useful graphs include labeled axes. Therefore, here's a more complete example:

{{ svelte(name="samplehistogram", cfg="{}") }}

&nbsp;

Code ([repl](https://svelte.dev/repl/1d11ff5770fb4b9788bf05d0de40b729?version=3.21.0)):

```html
<!--
Svelted version of Exercise 1 of Front End Masters course Introduction to Data Visualization with d3.js v4 by Shirley Wu
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
  <!-- bars -->
  {#each data as d}
    <rect
      x="{xScale(d.date)}"
      y="{yScale(d[city])}"
      width="2"
      height="{height - yScale(d[city])}"
      fill="blue"
      stroke="#fff"
    />
  {/each}

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

In this example D3 provides:

- `extent` gives the min and max values from a data set
- `scaleTime` scales JavaScript date objects
- `linearScale` scales a numeric set of data linearly

D3's [continous scaling functions](https://github.com/d3/d3-scale#continuous-scales) take in an extent (min/max) as the `domain` and desired dimension constraint output as the `range`. Typically the `domain` constraints include accommodation for the desired margins for the graph. A scaling function is defined for each axis, and used to transform the relevant data points to their scaled values. In this case scaling occurs within an `each` loop iterating through the data to determine each bar's position on the x axis and height on the y axis.

Typically axis labels and ticks are indicated for every n'th value from the data set, therefore a new array per axis can be created comprising a subset of the data for every n'th value from the charted data. In this example, the x axis has a bar per day, while the ticks are indicated per month, and the y axis ticks are per every 5 degress instead of per each degree.

The bars and axes are rendered within an SVG group (`g`) element, with the transformation attribute being the primary mechanism determining the location of each tick and label.

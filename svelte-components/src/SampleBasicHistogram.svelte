<script>
  const barWidth = 50;
  const height = 300;

  const points = [100, 125, 250, 100, 225, 275, 150, 275, 250, 150];
</script>

<style>
  svg {
    width: 100%;
    height: 300px;
  }
</style>

<svg>
  {#each points as point, i}
    <rect
      width={barWidth}
      height={point}
      x={i * barWidth}
      y={height - point}
      fill="green"
      stroke="#fff" />
  {/each}
</svg>

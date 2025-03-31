const heatSvg = d3.select("#heatmap");
const heatWidth = +heatSvg.attr("width");
const heatHeight = +heatSvg.attr("height");

const cols = 10, rows = 6;
const heatData = d3.range(rows * cols).map(i => ({
  col: i % cols,
  row: Math.floor(i / cols),
  value: Math.random()
}));

const xHeat = d3.scaleBand().domain(d3.range(cols)).range([60, heatWidth - 20]);
const yHeat = d3.scaleBand().domain(d3.range(rows)).range([20, heatHeight - 40]);
const colorScale = d3.scaleSequential(d3.interpolateViridis).domain([0, 1]);

heatSvg.selectAll("rect")
  .data(heatData)
  .join("rect")
  .attr("x", d => xHeat(d.col))
  .attr("y", d => yHeat(d.row))
  .attr("width", xHeat.bandwidth())
  .attr("height", yHeat.bandwidth())
  .attr("fill", d => colorScale(d.value));

heatSvg.append("g")
  .attr("transform", `translate(0, ${heatHeight - 40})`)
  .call(d3.axisBottom(xHeat).tickFormat(d => `S${d + 1}`));

heatSvg.append("g")
  .attr("transform", `translate(60, 0)`)
  .call(d3.axisLeft(yHeat).tickFormat(d => `Gene ${d + 1}`));

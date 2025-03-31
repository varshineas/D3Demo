const scatterSvg = d3.select("#scatterPlot");
const width = +scatterSvg.attr("width");
const height = +scatterSvg.attr("height");

const scatterData = d3.range(100).map(() => ({
  x: Math.random() * 100,
  y: Math.random() * 100 + Math.random() * 50
}));

const xScale = d3.scaleLinear().domain([0, 100]).range([40, width - 20]);
const yScale = d3.scaleLinear().domain([0, 150]).range([height - 30, 20]);

scatterSvg.selectAll("circle")
  .data(scatterData)
  .join("circle")
  .attr("cx", d => xScale(d.x))
  .attr("cy", d => yScale(d.y))
  .attr("r", 5)
  .attr("fill", "#608BC1")
  .attr("opacity", 0.8)
  .transition().duration(500)
  .attr("r", 6);

scatterSvg.append("g")
  .attr("transform", `translate(0, ${height - 30})`)
  .call(d3.axisBottom(xScale));

scatterSvg.append("g")
  .attr("transform", `translate(40, 0)`)
  .call(d3.axisLeft(yScale));

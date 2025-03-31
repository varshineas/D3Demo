const lineSvg = d3.select("#errorLineChart");
const w = +lineSvg.attr("width");
const h = +lineSvg.attr("height");

const timepoints = d3.range(10);
const mean = timepoints.map(t => ({ x: t, y: 20 + 5 * Math.sin(t / 2) + Math.random() * 5 }));
const error = 3;

const xLine = d3.scaleLinear().domain([0, 9]).range([50, w - 20]);
const yLine = d3.scaleLinear().domain([0, 40]).range([h - 30, 20]);

// Area (error band)
const area = d3.area()
  .x(d => xLine(d.x))
  .y0(d => yLine(d.y - error))
  .y1(d => yLine(d.y + error));

lineSvg.append("path")
  .datum(mean)
  .attr("fill", "#608BC1")
  .attr("opacity", 0.3)
  .attr("d", area);

// Mean line
const line = d3.line()
  .x(d => xLine(d.x))
  .y(d => yLine(d.y));

lineSvg.append("path")
  .datum(mean)
  .attr("fill", "none")
  .attr("stroke", "#133E87")
  .attr("stroke-width", 2)
  .attr("d", line);

lineSvg.append("g")
  .attr("transform", `translate(0, ${h - 30})`)
  .call(d3.axisBottom(xLine).ticks(10));

lineSvg.append("g")
  .attr("transform", `translate(50, 0)`)
  .call(d3.axisLeft(yLine));

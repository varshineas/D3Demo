const boxSvg = d3.select("#boxPlot");
const boxWidth = +boxSvg.attr("width");
const boxHeight = +boxSvg.attr("height");

const groups = ["Control", "Treatment A", "Treatment B"];
const data = groups.map(label => ({
  label,
  values: d3.range(20).map(() => Math.round(Math.random() * 40 + (label === "Control" ? 50 : 70)))
}));

const x = d3.scaleBand()
  .domain(groups)
  .range([60, boxWidth - 20])
  .padding(0.3);

const y = d3.scaleLinear()
  .domain([0, 120])
  .range([boxHeight - 30, 20]);

boxSvg.append("g")
  .attr("transform", `translate(0, ${boxHeight - 30})`)
  .call(d3.axisBottom(x));

boxSvg.append("g")
  .attr("transform", `translate(60, 0)`)
  .call(d3.axisLeft(y));

// Boxplot structure
data.forEach(d => {
  const sorted = d.values.sort(d3.ascending);
  const q1 = d3.quantile(sorted, 0.25);
  const median = d3.quantile(sorted, 0.5);
  const q3 = d3.quantile(sorted, 0.75);
  const iqr = q3 - q1;
  const min = d3.min(sorted);
  const max = d3.max(sorted);

  const center = x(d.label) + x.bandwidth() / 2;

  // Whiskers
  boxSvg.append("line")
    .attr("x1", center)
    .attr("x2", center)
    .attr("y1", y(min))
    .attr("y2", y(max))
    .attr("stroke", "#133E87");

  // Box
  boxSvg.append("rect")
    .attr("x", x(d.label))
    .attr("y", y(q3))
    .attr("height", y(q1) - y(q3))
    .attr("width", x.bandwidth())
    .attr("fill", "#608BC1")
    .attr("stroke", "#133E87");

  // Median line
  boxSvg.append("line")
    .attr("x1", x(d.label))
    .attr("x2", x(d.label) + x.bandwidth())
    .attr("y1", y(median))
    .attr("y2", y(median))
    .attr("stroke", "#133E87")
    .attr("stroke-width", 2);
});

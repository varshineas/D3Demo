
const svgBP = d3.select("#boxPlot");
const widthBP = +svgBP.attr("width");
const heightBP = +svgBP.attr("height");

const groupsBP = ["Control", "Treatment A", "Treatment B"];
const dataBP = groupsBP.map(label => ({
  label,
  values: d3.range(30).map(() => Math.round(Math.random() * 40 + (label === "Control" ? 50 : 70)))
}));

const xBP = d3.scaleBand().domain(groupsBP).range([60, widthBP - 20]).padding(0.3);
const yBP = d3.scaleLinear().domain([0, 120]).range([heightBP - 30, 20]);

svgBP.append("g").attr("transform", `translate(0, ${heightBP - 30})`).call(d3.axisBottom(xBP));
svgBP.append("g").attr("transform", `translate(60, 0)`).call(d3.axisLeft(yBP));

dataBP.forEach(d => {
  const sorted = d.values.sort(d3.ascending);
  const q1 = d3.quantile(sorted, 0.25);
  const median = d3.quantile(sorted, 0.5);
  const q3 = d3.quantile(sorted, 0.75);
  const min = d3.min(sorted);
  const max = d3.max(sorted);
  const center = xBP(d.label) + xBP.bandwidth() / 2;

  svgBP.append("line").attr("x1", center).attr("x2", center)
    .attr("y1", yBP(min)).attr("y2", yBP(max)).attr("stroke", "#555");

  svgBP.append("rect")
    .attr("x", xBP(d.label)).attr("y", yBP(q3))
    .attr("width", xBP.bandwidth()).attr("height", yBP(q1) - yBP(q3))
    .attr("fill", "#608BC1").attr("stroke", "#133E87");

  svgBP.append("line").attr("x1", xBP(d.label)).attr("x2", xBP(d.label) + xBP.bandwidth())
    .attr("y1", yBP(median)).attr("y2", yBP(median))
    .attr("stroke", "#133E87").attr("stroke-width", 2);
});

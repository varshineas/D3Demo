const violSvg = d3.select("#violinPlot");
const violW = +violSvg.attr("width");
const violH = +violSvg.attr("height");

const violGroups = ["WT", "KO"];
const violData = violGroups.map(group => ({
  group,
  values: d3.range(100).map(() =>
    group === "WT" ? d3.randomNormal(50, 10)() : d3.randomNormal(65, 8)())
}));

const xViol = d3.scaleBand().domain(violGroups).range([80, violW - 80]).padding(0.4);
const yViol = d3.scaleLinear().domain([20, 100]).range([violH - 30, 20]);

const kde = (kernel, thresholds, data) => {
  return thresholds.map(t => [t, d3.mean(data, d => kernel(t - d))]);
};

const epanechnikov = bandwidth => v => {
  return Math.abs(v /= bandwidth) <= 1 ? 0.75 * (1 - v * v) / bandwidth : 0;
};

violData.forEach(d => {
  const groupX = xViol(d.group) + xViol.bandwidth() / 2;
  const bins = d3.range(20, 100, 1);
  const density = kde(epanechnikov(7), bins, d.values);

  const scaleWidth = d3.scaleLinear()
    .domain([0, d3.max(density, d => d[1])])
    .range([0, xViol.bandwidth() / 2]);

  const area = d3.area()
    .x0(val => groupX - scaleWidth(val[1]))
    .x1(val => groupX + scaleWidth(val[1]))
    .y(val => yViol(val[0]))
    .curve(d3.curveCatmullRom);

  violSvg.append("path")
    .datum(density)
    .attr("fill", "#608BC1")
    .attr("stroke", "#133E87")
    .attr("stroke-width", 1.2)
    .attr("d", area);
});

violSvg.append("g")
  .attr("transform", `translate(0, ${violH - 30})`)
  .call(d3.axisBottom(xViol));

violSvg.append("g")
  .attr("transform", `translate(80, 0)`)
  .call(d3.axisLeft(yViol));

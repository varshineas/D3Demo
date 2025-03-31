
const svgVP = d3.select("#violinPlot");
const widthVP = +svgVP.attr("width");
const heightVP = +svgVP.attr("height");

const groupsVP = ["WT", "KO"];
const dataVP = groupsVP.map(group => ({
  group,
  values: d3.range(100).map(() =>
    group === "WT" ? d3.randomNormal(50, 10)() : d3.randomNormal(65, 8)())
}));

const xVP = d3.scaleBand().domain(groupsVP).range([80, widthVP - 80]).padding(0.4);
const yVP = d3.scaleLinear().domain([20, 100]).range([heightVP - 30, 20]);

const kdeVP = (kernel, thresholds, data) => {
  return thresholds.map(t => [t, d3.mean(data, d => kernel(t - d))]);
};

const epanechnikovVP = bandwidth => v => {
  v /= bandwidth;
  return Math.abs(v) <= 1 ? 0.75 * (1 - v * v) / bandwidth : 0;
};

dataVP.forEach(d => {
  const groupX = xVP(d.group) + xVP.bandwidth() / 2;
  const bins = d3.range(20, 100, 1);
  const density = kdeVP(epanechnikovVP(7), bins, d.values);

  const widthScale = d3.scaleLinear()
    .domain([0, d3.max(density, d => d[1])])
    .range([0, xVP.bandwidth() / 2]);

  const area = d3.area()
    .x0(val => groupX - widthScale(val[1]))
    .x1(val => groupX + widthScale(val[1]))
    .y(val => yVP(val[0]))
    .curve(d3.curveCatmullRom);

  svgVP.append("path")
    .datum(density)
    .attr("fill", "#608BC1")
    .attr("stroke", "#133E87")
    .attr("stroke-width", 1.5)
    .attr("opacity", 0.8)
    .attr("d", area);
});

svgVP.append("g").attr("transform", `translate(0, ${heightVP - 30})`).call(d3.axisBottom(xVP));
svgVP.append("g").attr("transform", `translate(80, 0)`).call(d3.axisLeft(yVP));

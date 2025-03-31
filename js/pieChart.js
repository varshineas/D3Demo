const pieData = [10, 20, 30, 40];
const svgPie = d3.select("#pieChart");
const radius = +svgPie.attr("width") / 2;
const g = svgPie.append("g")
  .attr("transform", `translate(${radius}, ${radius})`);

const color = d3.scaleOrdinal()
  .domain(pieData)
  .range(d3.schemeTableau10);

const pie = d3.pie();
const arc = d3.arc().innerRadius(0).outerRadius(radius - 10);

g.selectAll("path")
  .data(pie(pieData))
  .join("path")
  .attr("d", arc)
  .attr("fill", d => color(d.index));

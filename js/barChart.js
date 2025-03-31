const barData = [20, 35, 40, 10, 50, 65, 80];
const svgBar = d3.select("#barChart");
const barWidth = +svgBar.attr("width");
const barHeight = +svgBar.attr("height");

const x = d3.scaleBand()
  .domain(barData.map((_, i) => i))
  .range([40, barWidth - 20])
  .padding(0.2);

const y = d3.scaleLinear()
  .domain([0, d3.max(barData)])
  .range([barHeight - 30, 20]);

svgBar.selectAll("rect")
  .data(barData)
  .join("rect")
  .attr("x", (d, i) => x(i))
  .attr("y", d => y(d))
  .attr("width", x.bandwidth())
  .attr("height", d => barHeight - 30 - y(d))
  .attr("fill", "#608BC1");

svgBar.append("g")
  .attr("transform", `translate(0, ${barHeight - 30})`)
  .call(d3.axisBottom(x).tickFormat(i => `Item ${i+1}`));

svgBar.append("g")
  .attr("transform", `translate(40, 0)`)
  .call(d3.axisLeft(y));

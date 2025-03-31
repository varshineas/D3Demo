
const svgHM = d3.select("#heatmap");
const widthHM = +svgHM.attr("width");
const heightHM = +svgHM.attr("height");

const colsHM = 10, rowsHM = 6;
const dataHM = d3.range(rowsHM * colsHM).map(i => ({
  col: i % colsHM,
  row: Math.floor(i / colsHM),
  value: Math.random()
}));

const xHM = d3.scaleBand().domain(d3.range(colsHM)).range([60, widthHM - 20]);
const yHM = d3.scaleBand().domain(d3.range(rowsHM)).range([20, heightHM - 40]);
const colorHM = d3.scaleSequential(d3.interpolatePlasma).domain([0, 1]);

svgHM.selectAll("rect")
  .data(dataHM)
  .join("rect")
  .attr("x", d => xHM(d.col))
  .attr("y", d => yHM(d.row))
  .attr("width", xHM.bandwidth())
  .attr("height", yHM.bandwidth())
  .attr("fill", d => colorHM(d.value))
  .on("mouseover", function (event, d) {
    d3.select(this).attr("stroke", "#133E87").attr("stroke-width", 2);
  })
  .on("mouseout", function () {
    d3.select(this).attr("stroke", null);
  });

svgHM.append("g")
  .attr("transform", `translate(0, ${heightHM - 40})`)
  .call(d3.axisBottom(xHM).tickFormat(d => `S${d + 1}`));

svgHM.append("g")
  .attr("transform", `translate(60, 0)`)
  .call(d3.axisLeft(yHM).tickFormat(d => `Gene ${d + 1}`));

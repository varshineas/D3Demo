
const svgSP = d3.select("#scatterPlot");
const widthSP = +svgSP.attr("width");
const heightSP = +svgSP.attr("height");

const dataSP = d3.range(100).map(() => ({
  x: Math.random() * 100,
  y: Math.random() * 100 + Math.random() * 50
}));

const xSP = d3.scaleLinear().domain([0, 100]).range([40, widthSP - 20]);
const ySP = d3.scaleLinear().domain([0, 150]).range([heightSP - 30, 20]);

const tooltipSP = d3.select("body").append("div")
  .style("position", "absolute")
  .style("background", "#fff")
  .style("border", "1px solid #ccc")
  .style("padding", "5px")
  .style("display", "none");

svgSP.selectAll("circle")
  .data(dataSP)
  .join("circle")
  .attr("cx", d => xSP(d.x))
  .attr("cy", d => ySP(d.y))
  .attr("r", 4)
  .attr("fill", "#133E87")
  .on("mouseover", (event, d) => {
    tooltipSP.style("display", "block")
      .html(`x: ${d.x.toFixed(1)}<br/>y: ${d.y.toFixed(1)}`)
      .style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY - 20) + "px");
    d3.select(event.currentTarget).attr("r", 6);
  })
  .on("mouseout", (event, d) => {
    tooltipSP.style("display", "none");
    d3.select(event.currentTarget).attr("r", 4);
  });

svgSP.append("g")
  .attr("transform", `translate(0, ${heightSP - 30})`)
  .call(d3.axisBottom(xSP));

svgSP.append("g")
  .attr("transform", `translate(40, 0)`)
  .call(d3.axisLeft(ySP));

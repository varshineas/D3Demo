const svgRTC = d3.select("#realTimeChart");
const widthRTC = +svgRTC.attr("width");
const heightRTC = +svgRTC.attr("height");

const dataRTC = d3.range(50).map(() => Math.random() * 100);
const xRTC = d3.scaleLinear().domain([0, 49]).range([40, widthRTC - 20]);
const yRTC = d3.scaleLinear().domain([0, 100]).range([heightRTC - 30, 20]);

const lineRTC = d3.line()
  .x((d, i) => xRTC(i))
  .y(d => yRTC(d))
  .curve(d3.curveBasis);

svgRTC.append("path")
  .datum(dataRTC)
  .attr("fill", "none")
  .attr("stroke", "#133E87")
  .attr("stroke-width", 2)
  .attr("class", "lineRTC");

svgRTC.append("g")
  .attr("transform", `translate(0, ${heightRTC - 30})`)
  .call(d3.axisBottom(xRTC).ticks(10));

svgRTC.append("g")
  .attr("transform", "translate(40,0)")
  .call(d3.axisLeft(yRTC));

setInterval(() => {
  dataRTC.push(Math.random() * 100);
  dataRTC.shift();
  svgRTC.select(".lineRTC")
    .datum(dataRTC)
    .transition()
    .duration(500)
    .attr("d", lineRTC);
}, 1000);
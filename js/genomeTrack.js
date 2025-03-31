const svgGT = d3.select("#genomeTrack");
const widthGT = +svgGT.attr("width");

const trackDataGT = [
  { start: 100, end: 300, type: "exon" },
  { start: 400, end: 700, type: "intron" },
  { start: 800, end: 1000, type: "exon" }
];

const xGT = d3.scaleLinear().domain([0, 1200]).range([50, widthGT - 50]);

svgGT.selectAll("rect")
  .data(trackDataGT)
  .join("rect")
  .attr("x", d => xGT(d.start))
  .attr("y", 40)
  .attr("width", d => xGT(d.end) - xGT(d.start))
  .attr("height", 30)
  .attr("fill", d => d.type === "exon" ? "#133E87" : "#CBDCEB")
  .attr("stroke", "#333");

svgGT.append("g")
  .attr("transform", "translate(0,80)")
  .call(d3.axisBottom(xGT).ticks(10));
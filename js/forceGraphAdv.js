const svgFGA = d3.select("#forceGraphAdv");
const widthFGA = +svgFGA.attr("width");
const heightFGA = +svgFGA.attr("height");

const nodesFGA = d3.range(10).map(i => ({ id: "Node " + i }));
const linksFGA = d3.range(15).map(() => ({
  source: "Node " + Math.floor(Math.random() * 10),
  target: "Node " + Math.floor(Math.random() * 10)
}));

const simulationFGA = d3.forceSimulation(nodesFGA)
  .force("link", d3.forceLink(linksFGA).id(d => d.id).distance(80))
  .force("charge", d3.forceManyBody().strength(-300))
  .force("center", d3.forceCenter(widthFGA / 2, heightFGA / 2));

const linkFGA = svgFGA.append("g")
  .attr("stroke", "#999")
  .attr("stroke-opacity", 0.6)
  .selectAll("line")
  .data(linksFGA)
  .join("line")
  .attr("stroke-width", 1.5);

const nodeFGA = svgFGA.append("g")
  .attr("stroke", "#fff")
  .attr("stroke-width", 1.5)
  .selectAll("circle")
  .data(nodesFGA)
  .join("circle")
  .attr("r", 10)
  .attr("fill", "#608BC1")
  .call(d3.drag()
    .on("start", dragstartedFGA)
    .on("drag", draggedFGA)
    .on("end", dragendedFGA))
  .on("mouseover", function (event, d) {
    tooltipFGA.style("display", "block").html(d.id);
  })
  .on("mousemove", function (event) {
    tooltipFGA.style("left", event.pageX + 10 + "px").style("top", event.pageY - 20 + "px");
  })
  .on("mouseout", function () {
    tooltipFGA.style("display", "none");
  });

const labelFGA = svgFGA.append("g")
  .selectAll("text")
  .data(nodesFGA)
  .join("text")
  .text(d => d.id)
  .attr("font-size", 12)
  .attr("dy", -15)
  .attr("text-anchor", "middle");

simulationFGA.on("tick", () => {
  linkFGA
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);
  nodeFGA
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);
  labelFGA
    .attr("x", d => d.x)
    .attr("y", d => d.y);
});

const tooltipFGA = d3.select("body").append("div")
  .style("position", "absolute")
  .style("background", "white")
  .style("padding", "5px 10px")
  .style("border", "1px solid #333")
  .style("border-radius", "5px")
  .style("display", "none");

function dragstartedFGA(event, d) {
  if (!event.active) simulationFGA.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function draggedFGA(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}

function dragendedFGA(event, d) {
  if (!event.active) simulationFGA.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
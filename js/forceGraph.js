
const svgFG = d3.select("#forceGraph");
const widthFG = +svgFG.attr("width");
const heightFG = +svgFG.attr("height");

const nodesFG = [
  { id: "Alpha" }, { id: "Beta" }, { id: "Gamma" },
  { id: "Delta" }, { id: "Epsilon" }, { id: "Zeta" }, { id: "Eta" }
];

const linksFG = [
  { source: "Alpha", target: "Beta" },
  { source: "Alpha", target: "Gamma" },
  { source: "Gamma", target: "Delta" },
  { source: "Delta", target: "Epsilon" },
  { source: "Beta", target: "Zeta" },
  { source: "Zeta", target: "Eta" }
];

const simulationFG = d3.forceSimulation(nodesFG)
  .force("link", d3.forceLink(linksFG).id(d => d.id).distance(100))
  .force("charge", d3.forceManyBody().strength(-250))
  .force("center", d3.forceCenter(widthFG / 2, heightFG / 2));

const linkFG = svgFG.append("g")
  .attr("stroke", "#999")
  .attr("stroke-opacity", 0.6)
  .selectAll("line")
  .data(linksFG)
  .join("line")
  .attr("stroke-width", 2);

const nodeFG = svgFG.append("g")
  .attr("stroke", "#fff")
  .attr("stroke-width", 1.5)
  .selectAll("circle")
  .data(nodesFG)
  .join("circle")
  .attr("r", 10)
  .attr("fill", "#608BC1")
  .on("mouseover", function () { d3.select(this).attr("fill", "#133E87"); })
  .on("mouseout", function () { d3.select(this).attr("fill", "#608BC1"); })
  .call(d3.drag()
    .on("start", (event, d) => {
      if (!event.active) simulationFG.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    })
    .on("drag", (event, d) => {
      d.fx = event.x;
      d.fy = event.y;
    })
    .on("end", (event, d) => {
      if (!event.active) simulationFG.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }));

const labelFG = svgFG.append("g")
  .selectAll("text")
  .data(nodesFG)
  .join("text")
  .text(d => d.id)
  .attr("font-size", 12)
  .attr("dy", -15)
  .attr("text-anchor", "middle");

simulationFG.on("tick", () => {
  linkFG
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  nodeFG
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);

  labelFG
    .attr("x", d => d.x)
    .attr("y", d => d.y);
});

const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

const nodes = [
  { id: "Alpha" },
  { id: "Beta" },
  { id: "Gamma" },
  { id: "Delta" },
  { id: "Epsilon" },
  { id: "Zeta" },
  { id: "Eta" }
];

const links = [
  { source: "Alpha", target: "Beta" },
  { source: "Alpha", target: "Gamma" },
  { source: "Gamma", target: "Delta" },
  { source: "Delta", target: "Epsilon" },
  { source: "Beta", target: "Zeta" },
  { source: "Zeta", target: "Eta" }
];

const simulation = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links).id(d => d.id).distance(100))
  .force("charge", d3.forceManyBody().strength(-300))
  .force("center", d3.forceCenter(width / 2, height / 2));

const link = svg.append("g")
  .attr("stroke", "#999")
  .attr("stroke-opacity", 0.6)
  .selectAll("line")
  .data(links)
  .join("line")
  .attr("class", "link");

const node = svg.append("g")
  .attr("stroke", "#fff")
  .attr("stroke-width", 1.5)
  .selectAll("circle")
  .data(nodes)
  .join("circle")
  .attr("class", "node")
  .attr("r", 10)
  .call(drag(simulation));

const label = svg.append("g")
  .selectAll("text")
  .data(nodes)
  .join("text")
  .attr("dy", -15)
  .attr("text-anchor", "middle")
  .text(d => d.id)
  .style("font-size", "12px");

simulation.on("tick", () => {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  node
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);

  label
    .attr("x", d => d.x)
    .attr("y", d => d.y);
});

function drag(simulation) {
  return d3.drag()
    .on("start", (event, d) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    })
    .on("drag", (event, d) => {
      d.fx = event.x;
      d.fy = event.y;
    })
    .on("end", (event, d) => {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    });
}

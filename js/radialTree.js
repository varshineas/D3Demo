const svgRT = d3.select("#radialTree");
const widthRT = +svgRT.attr("width");
const heightRT = +svgRT.attr("height");
const radiusRT = widthRT / 2;

const treeRT = d3.cluster().size([2 * Math.PI, radiusRT - 100]);

const stratifyRT = d3.stratify()
  .id(d => d.name)
  .parentId(d => d.name.substring(0, d.name.lastIndexOf(".")));

const dataRT = [
  { name: "root" },
  { name: "root.A" },
  { name: "root.B" },
  { name: "root.A.1" },
  { name: "root.A.2" },
  { name: "root.B.1" },
  { name: "root.B.2" }
];

const rootRT = treeRT(d3.hierarchy(d3.stratify().id(d => d.name)(dataRT)));

const gRT = svgRT.append("g")
  .attr("transform", `translate(${widthRT / 2},${heightRT / 2})`);

const linkRT = gRT.append("g")
  .selectAll("path")
  .data(rootRT.links())
  .join("path")
  .attr("fill", "none")
  .attr("stroke", "#133E87")
  .attr("stroke-width", 1.5)
  .attr("d", d3.linkRadial()
    .angle(d => d.x)
    .radius(d => d.y));

const nodeRT = gRT.append("g")
  .selectAll("circle")
  .data(rootRT.descendants())
  .join("circle")
  .attr("transform", d => `
    rotate(${d.x * 180 / Math.PI - 90})
    translate(${d.y},0)
  `)
  .attr("fill", "#608BC1")
  .attr("r", 5);
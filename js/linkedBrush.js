const svgScatter = d3.select("#scatterBrush");
const svgHist = d3.select("#histBrush");
const widthSB = +svgScatter.attr("width");
const heightSB = +svgScatter.attr("height");
const widthHB = +svgHist.attr("width");
const heightHB = +svgHist.attr("height");

const dataLB = d3.range(100).map(() => ({
  x: Math.random() * 100,
  y: Math.random() * 100
}));

const xSB = d3.scaleLinear().domain([0, 100]).range([40, widthSB - 20]);
const ySB = d3.scaleLinear().domain([0, 100]).range([heightSB - 30, 20]);

const xHB = d3.scaleLinear().domain([0, 100]).range([40, widthHB - 20]);

const bins = d3.bin().domain(xHB.domain()).thresholds(20)(dataLB.map(d => d.x));
const yHB = d3.scaleLinear().domain([0, d3.max(bins, d => d.length)]).range([heightHB - 30, 20]);

svgScatter.selectAll("circle")
  .data(dataLB)
  .join("circle")
  .attr("cx", d => xSB(d.x))
  .attr("cy", d => ySB(d.y))
  .attr("r", 4)
  .attr("fill", "#608BC1")
  .attr("opacity", 0.7)
  .attr("class", "dotLB");

svgScatter.append("g").attr("transform", `translate(0,${heightSB - 30})`).call(d3.axisBottom(xSB));
svgScatter.append("g").attr("transform", `translate(40,0)`).call(d3.axisLeft(ySB));

svgHist.selectAll("rect")
  .data(bins)
  .join("rect")
  .attr("x", d => xHB(d.x0))
  .attr("y", d => yHB(d.length))
  .attr("width", d => xHB(d.x1) - xHB(d.x0) - 1)
  .attr("height", d => heightHB - 30 - yHB(d.length))
  .attr("fill", "#CBDCEB")
  .attr("class", "barLB");

svgHist.append("g").attr("transform", `translate(0,${heightHB - 30})`).call(d3.axisBottom(xHB));

svgScatter.append("g")
  .call(d3.brush()
    .extent([[40, 20], [widthSB - 20, heightSB - 30]])
    .on("brush end", (event) => {
      const selection = event.selection;
      if (!selection) return;
      const [[x0, y0], [x1, y1]] = selection;
      svgScatter.selectAll(".dotLB")
        .attr("fill", d =>
          xSB(d.x) >= x0 && xSB(d.x) <= x1 && ySB(d.y) >= y0 && ySB(d.y) <= y1
            ? "#133E87"
            : "#CBDCEB"
        );
    })
  );

const svgLC = d3.select("#errorLineChart");
const widthLC = +svgLC.attr("width");
const heightLC = +svgLC.attr("height");

const timepointsLC = d3.range(10);
const meanLC = timepointsLC.map(t => ({ x: t, y: 20 + 5 * Math.sin(t / 2) + Math.random() * 5 }));
const errorLC = 3;

const xLC = d3.scaleLinear().domain([0, 9]).range([50, widthLC - 20]);
const yLC = d3.scaleLinear().domain([0, 40]).range([heightLC - 30, 20]);

const areaLC = d3.area()
  .x(d => xLC(d.x))
  .y0(d => yLC(d.y - errorLC))
  .y1(d => yLC(d.y + errorLC))
  .curve(d3.curveMonotoneX);

svgLC.append("path")
  .datum(meanLC)
  .attr("fill", "#608BC1")
  .attr("opacity", 0.3)
  .attr("d", areaLC);

const lineLC = d3.line()
  .x(d => xLC(d.x))
  .y(d => yLC(d.y))
  .curve(d3.curveMonotoneX);

svgLC.append("path")
  .datum(meanLC)
  .attr("fill", "none")
  .attr("stroke", "#133E87")
  .attr("stroke-width", 2)
  .attr("d", lineLC);

svgLC.selectAll("circle")
  .data(meanLC)
  .join("circle")
  .attr("cx", d => xLC(d.x))
  .attr("cy", d => yLC(d.y))
  .attr("r", 5)
  .attr("fill", "#133E87")
  .on("mouseover", function (event, d) {
    d3.select(this).transition().attr("r", 7);
  })
  .on("mouseout", function () {
    d3.select(this).transition().attr("r", 5);
  });

svgLC.append("g").attr("transform", `translate(0, ${heightLC - 30})`).call(d3.axisBottom(xLC));
svgLC.append("g").attr("transform", `translate(50, 0)`).call(d3.axisLeft(yLC));

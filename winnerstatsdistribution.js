d3.csv('data2.csv', function (data) {

    var body = d3.select('body'),
        margin = {top: 15, right: 50, bottom: 50, left: 400},
        width = 1100 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var color = d3.scale.category10();

    var xScale = d3.scale.linear()
        .domain([0, 32])
        .range([0, width]);
    var yScale = d3.scale.linear()
        .domain([0, 130])
        .range([height, 0]);


    var svg = body.append('svg')
        .attr('height', height + margin.top + margin.bottom)
        .attr('width', width + margin.left + margin.right)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


    var circles = svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', function (d) {
            // console.log(xScale(d.asd));
            return xScale(d.asd)
        })
        .attr('cy', function (d) {
            // console.log(yScale(d.aror));
            return yScale(d.aror)
        })
        .attr('r', '10')
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('fill', function (d, i) {
            return color(i)
        })
        .on('mouseout', function () {
            d3.select(this)
                .transition()
                .duration(200)
                .attr('r', 15)
                .attr('stroke-width', 1)
        })
        .on('mouseover', function () {
            d3.select(this)
                .transition()
                .duration(500)
                .attr('r', 30)
                .attr('stroke-width', 5)
        })
        .append('title') // Tooltip
        .text(function (d) {
            return d.variable +
                '\nAvg Points: ' + d.aror +
                '\nStd. Dev.: ' + d.asd
        });

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .tickFormat(d3.format('.2'))
        .ticks(10)
        .orient('bottom');

    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        .append('text') // X-axis Label
        .attr('class', 'label')
        .attr('y', -10)
        .attr('x', width)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Average Standard Deviation');

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .tickFormat(d3.format('.2'))
        .ticks(5)
        .orient('left');


    svg.append('g')
        .attr('class', 'axis')
        .call(yAxis)
        .append('text') // y-axis Label
        .attr('class', 'label')
        .attr('transform', 'rotate(-90)')
        .attr('x', 0)
        .attr('y', 5)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Average Points Won/Lost by winner')});

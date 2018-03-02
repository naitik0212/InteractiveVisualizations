var formatAsPercentage = d3.format("%");

function dsPieChart(){

    var dataset = [
            {category: "Aces", value: 0.2283},
            {category: "Doubles", value: 0.1067},
            {category: "1stServeWon", value: 0.2992},
            {category: "Error", value:0.0857},
            {category: "2ndServeWon", value:0.2798 }
        ]
    ;

    var width = 400;
    var height = 400;
    var biggerRadius = Math.min(width, height) / 2;
    var smallRadius = biggerRadius * .99;
    var color = d3.scale.category10();

    // var color = d3.scale.ordinal() .range(["#3ECC28", "#FFCA2B", "#535154", "#5D2E8C", "#396AB1"]);

//             #396AB1
// #DA7C30
// #3E9651
// #CC2529
// #535154
// #6B4C9A
// #922428
// #948B3D


    var arc = d3.svg.arc()
        .outerRadius(biggerRadius)
        .innerRadius(smallRadius);


    var pieChartViz = d3.select("#pieChartsvg")
        .append("svg:svg")
        .data([dataset])
        .attr("height", height)
        .attr("width", width)
        .append("svg:g")
        .attr("align","center")
        .attr("transform", "translate(" + biggerRadius + "," + biggerRadius + ")")
    ;

    var arcFinal = d3.svg.arc().innerRadius(biggerRadius * .35).outerRadius(biggerRadius);


    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array

    var arcs = pieChartViz.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
        .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
        .attr("class", "slice")    //allow us to style things in the slices (like text)
        .on("mouseover", function hover(){d3.select(this).select("path").transition()
            .attr("d", d3.svg.arc().innerRadius(biggerRadius* .20).outerRadius(biggerRadius))
            .duration(1000)
        ;})
        .on("mouseout", function emptyspace(){d3.select(this).select("path").transition()
            .duration(500)
            .attr("d", d3.svg.arc().innerRadius(biggerRadius * .35).outerRadius(biggerRadius))
        ;})
        .on("click", up)
    ;

    arcs.append("svg:path")
        .attr("d", arc)
        .attr("fill", function(d, i) { return color(i); } )
        .append("svg:title")
        .text(function(d) { return d.data.category + ": " + formatAsPercentage(d.data.value); });

    d3.selectAll("g.slice").selectAll("path").transition()
        .delay(50)
        .duration(800)
        .attr("d", arcFinal )
    ;

    // Add a label to the larger arcs, translated to the arc centroid and rotated.
    // source: http://bl.ocks.org/1305337#index.html
    arcs.filter(function(d) { return d.endAngle - d.startAngle > .2; })
        .append("svg:text")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .attr("transform", function(d) { return "translate(" + arcFinal.centroid(d) + ")rotate(" + angle(d) + ")"; })
        //.text(function(d) { return formatAsPercentage(d.value); })
        .text(function(d) { return d.data.category; })
    ;

    // Computes the label angle of an arc, converting from radians to degrees.
    function angle(d) {
        var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
        return a > 90 ? a - 180 : a;
    }


    // Pie chart title
    pieChartViz.append("svg:text")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text("Points Won/Conceded")
        .attr("class","title")
    ;

    function up(d, i) {
        /* update bar chart when user selects piece of the pie chart */
        //updateBarChart(dataset[i].category);
        updateBarChart(d.data.category, color(i));
        //updateBarChart2(d.data.category, color(i));
        // updateBarChartothers(d.data.category, color(i));
        // updateLineChart(d.data.category, color(i));

    }
}

dsPieChart();

function updateBarChart(group,colorChosen)
{
    // console.log(colorChosen);



    var datasetBarChart = {
        'Aces': [
            {'Year': 2004, 'Winner': 76, 'Loser': 51},
            {'Year': 2005, 'Winner': 74, 'Loser': 53},
            {'Year': 2006, 'Winner': 71, 'Loser': 56},
            {'Year': 2007, 'Winner': 82, 'Loser': 45},
            {'Year': 2008, 'Winner': 79, 'Loser': 48},
            {'Year': 2009, 'Winner': 87, 'Loser': 40},
            {'Year': 2010, 'Winner': 85, 'Loser': 41},
            {'Year': 2011, 'Winner': 86, 'Loser': 41},
            {'Year': 2012, 'Winner': 86, 'Loser': 41},
            {'Year': 2013, 'Winner': 96, 'Loser': 31},
            {'Year': 2014, 'Winner': 83, 'Loser': 42}
        ],
        'Doubles': [
            {'Year': 2004, 'Winner': 32, 'Loser': 95},
            {'Year': 2005, 'Winner': 42, 'Loser': 85},
            {'Year': 2006, 'Winner': 31, 'Loser': 96},
            {'Year': 2007, 'Winner': 37, 'Loser': 90},
            {'Year': 2008, 'Winner': 46, 'Loser': 81},
            {'Year': 2009, 'Winner': 30, 'Loser': 97},
            {'Year': 2010, 'Winner': 33, 'Loser': 93},
            {'Year': 2011, 'Winner': 41, 'Loser': 86},
            {'Year': 2012, 'Winner': 37, 'Loser': 90},
            {'Year': 2013, 'Winner': 44, 'Loser': 83},
            {'Year': 2014, 'Winner': 50, 'Loser': 75}
        ],
        '1stServeWon': [
            {'Year': 2004, 'Winner': 102, 'Loser': 25},
            {'Year': 2005, 'Winner': 113, 'Loser': 14},
            {'Year': 2006, 'Winner': 104, 'Loser': 23},
            {'Year': 2007, 'Winner': 107, 'Loser': 20},
            {'Year': 2008, 'Winner': 104, 'Loser': 23},
            {'Year': 2009, 'Winner': 112, 'Loser': 15},
            {'Year': 2010, 'Winner': 109, 'Loser': 17},
            {'Year': 2011, 'Winner': 113, 'Loser': 14},
            {'Year': 2012, 'Winner': 110, 'Loser': 17},
            {'Year': 2013, 'Winner': 108, 'Loser': 19},
            {'Year': 2014, 'Winner': 104, 'Loser': 21}
        ],
        '2ndServeWon': [
            {'Year': 2004, 'Winner': 106, 'Loser': 21},
            {'Year': 2005, 'Winner': 96, 'Loser': 31},
            {'Year': 2006, 'Winner': 94, 'Loser': 33},
            {'Year': 2007, 'Winner': 107, 'Loser': 20},
            {'Year': 2008, 'Winner': 97, 'Loser': 30},
            {'Year': 2009, 'Winner': 95, 'Loser': 32},
            {'Year': 2010, 'Winner': 100, 'Loser': 26},
            {'Year': 2011, 'Winner': 105, 'Loser': 22},
            {'Year': 2012, 'Winner': 103, 'Loser': 25},
            {'Year': 2013, 'Winner': 104, 'Loser': 23},
            {'Year': 2014, 'Winner': 99, 'Loser': 26}
        ],
        'Error': [
            {'Year': 2004, 'Winner': 39, 'Loser': 88},
            {'Year': 2005, 'Winner': 26, 'Loser': 101},
            {'Year': 2006, 'Winner': 40, 'Loser': 87},
            {'Year': 2007, 'Winner': 35, 'Loser': 92},
            {'Year': 2008, 'Winner': 26, 'Loser': 101},
            {'Year': 2009, 'Winner': 24, 'Loser': 103},
            {'Year': 2010, 'Winner': 26, 'Loser': 101},
            {'Year': 2011, 'Winner': 24, 'Loser': 104},
            {'Year': 2012, 'Winner': 28, 'Loser': 99},
            {'Year': 2013, 'Winner': 27, 'Loser': 100},
            {'Year': 2014, 'Winner': 36, 'Loser': 89}
        ],
    };
    var barChart = d3.select("#barChart")
    barChart.selectAll("*").remove();



    var svg = d3.select("#barChart"),
        margin = {top: 50, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x0 = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.1);

    var x1 = d3.scaleBand()
        .padding(0.05);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var z = d3.scaleOrdinal()
        .range([colorChosen, "#EEDD15" ]);


    d3.csv("data.csv", function (d, i, columns) {
            //     console.log(columns);
            //     for (var i = 1, n = columns.length; i < n; ++i){ d[columns[i]] = +d[columns[i]];
            //     return d;
            // }
        },
        function (error, data) {
            if (error) throw error;
            // console.log(data);

            //aces = 'Aces';
            var name = group;
            data = datasetBarChart[group];

            // for(var i = 0; i < 5; i++){
            //     temp = {};
            //     temp['Year'] = 2009 + i;
            //     temp['Winner'] = datasetBarChart['Aces'].Winner;
            //     temp['Loser'] = datasetBarChart['Aces'].Loser;
            //
            //     data.push(temp);
            // }

            // var nest = d3.nest()
            //     .key(function(d) { return d.Year; })
            //     .key(function(d) { return d.Winner; })
            //     .key(function(d) { return d.Winner; })
            //     .entries(datasetBarChart);

            data.push(['Year', 'Winner', 'Loser']);
            console.log(data);
            var keys = data[data.length - 1].slice(1);


            // var keys = data.columns.slice(1);

            x0.domain(data.map(function (d) {
                return d.Year;
            }));
            x1.domain(keys).rangeRound([0, x0.bandwidth()]);
            y.domain([0, d3.max(data, function (d) {
                return d3.max(keys, function (key) {
                    return d[key];
                });
            })]).nice();


            g.append("g")
                .selectAll("g")
                .data(data)
                .enter().append("g")
                .attr("transform", function (d) {
                    return "translate(" + x0(d.Year) + ",0)";
                })
                .selectAll("rect")
                .data(function (d) {
                    return keys.map(function (key) {
                        return {key: key, value: d[key]};
                    });
                })
                .enter().append("rect")

                .attr("x", function (d) {
                    return x1(d.key);
                })
                .attr("y", function (d) {
                    return y(d.value);
                })
                .attr("width", x1.bandwidth())
                .attr("height", function (d) {
                    return height - y(d.value);
                })
                .attr("fill", function (d) {
                    return z(d.key);
                })
                .append('title') // Tooltip
                .text(function (d) {
                    return 'No of games won by '+d.key + ' is ' + d.value + ' for ' +group
                });


            g.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x0));

            g.append("g")
                .attr("class", "axis")
                .call(d3.axisLeft(y).ticks(null, "s"))
                .append("text")
                .attr("x", 2)
                .attr("y", y(y.ticks().pop()) + 0.5)
                .attr("dy", "0.32em")
                .attr("fill", "#000")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")
                .text("No. of Games");

            var legend = g.append("g")
                .attr("font-family", "sans-serif")
                .attr("font-size", 15)
                .attr("text-anchor", "end")
                .selectAll("g")
                .data(keys.slice().reverse())
                .enter().append("g")
                .attr("transform", function (d, i) {
                    return "translate(0," + i * 20 + ")";
                });

            legend.append("rect")
                .attr("x", width - 19)
                .attr("width", 19)
                .attr("height", 19)
                .attr("fill", z);

            legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9.5)
                .attr("dy", "0.32em")
                .text(function (d) {
                    return d;
                });
            console.log(name);
            svg.append("text")
                .attr("x", (width + margin.left + margin.right)/2)
                .attr("y", 42)
                .attr('font-weight', 'bold')
                .attr("class","title")
                .attr("text-anchor", "middle")
                .text("Comparison of " +name+ " points by winners and losers over the years")
            ;

        });

}

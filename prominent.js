function showDiv() {
    document.getElementById('tips').style.display = "block"
    document.getElementById('a').classList.add('hide');
}

function myFunction() {
    alert("Click on the bars to get detailed view\n Click background to go back \n Yellow Bar Denotes the section is not expandable!");
}

width = 1200 - 300 - 120,
    height = 550 - 50;

var x = d3.scale.linear().range([0, width]).domain([0, 4500])

var barHeight = 25;

var color = d3.scale.ordinal().range(["#3ECC28", "#FFCA2B", "#535154", "#5D2E8C", "#396AB1"]);

var duration = 150,
    delay = 200;

var partition = d3.layout.partition().value(function (d) {
    return d.size;
});

var svg = d3.select("body").append("svg")
    .attr("width", width + 300 + 120)
    .attr("height", height + 50)
    .append("g")
    .attr("transform", "translate(" + 300 + "," + 50 + ")");

//drawing the rect bars
svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "background")
    .on("click", upstep);

//drawing the axis

svg.append("g")
    .attr("class", "x axis");

svg.append("g")
    .attr("class", "y axis")
    .append("line")
    .attr("y1", "75%");

//fetching the data
d3.json("serve.json", function (error, root) {
    if (error)
        throw error;
    partition.nodes(root);
    x.domain([0, root.value]).nice();
    downstep(root, 0);
});


//Transforming bars
function transformedBar(i) {
    var x0 = 0;
    return function (d) {
        var tx = "translate(" + x0 + "," + barHeight * i * 1.2 + ")";
        x0 += x(d.value);
        //console.log(d.value);
        return tx;
    };
}


// Creates a set of bars for the given data node, at the specified index.
function bar(d) {
    var bar = svg.insert("g", ".y.axis")
        .attr("class", "enter")
        .attr("transform", "translate(0,5)")
        .selectAll("g")
        .data(d.children)
        .enter().append("g")
        .style("cursor", function (d) {
            return !d.children ? null : "pointer";
        })
        .on("click", downstep);
        // .append('title') // Tooltip
        // .text(function (d) {
        //     return 'No of games won by '+d.key + ' is ' + d.value + ' for ' +group
        // });


    bar.append("text")
        .attr("y", barHeight / 2)
        .style("text-anchor", "end")
        .attr("dy", ".35em")
        .attr("x", -6)
        .text(function (d) {
            return d.name;
        });

    bar.append("rect")
        .attr("height", barHeight)
        .attr("width", function (d) {
            return x(d.value);
        });

    return bar;
}

function downstep(d, i) {
    if (!d.children || this.__transition__)
        return;
    var end = duration + d.children.length * delay;

    var exit = svg.selectAll(".enter")
        .attr("class", "exit");

    //plot new bars
    var enter = bar(d)
        .attr("transform", transformedBar(i))
        .style("opacity", 0.5);

    exit.selectAll("rect").filter(function (p) {
        return p === d;
    })
        .style("fill-opacity", 0.05);

    enter.select("text").style("fill-opacity", 0.5);
    enter.select("rect").style("fill", color(true));


    var updatedscale = d3.max(d.children, function (d) {
        return d.value;
    })
    x.domain([0, updatedscale]);

    svg.selectAll(".x.axis").transition()
        .duration(duration)
        .call(d3.svg.axis().scale(x).orient("top"));

    var entry = enter.transition()
        .duration(duration)
        .delay(function (d, i) {
            return i * delay;
        })
        .attr("transform", function (d, i) {
            return "translate(0," + barHeight * i * 1.2 + ")";
        });

    entry.select("text").style("fill-opacity", 1);

    entry.select("rect")
        .style("fill", function (d) {
            return color(!!d.children);
        })
        .attr("width", function (d) {
            return x(d.value);
        });

    var exitbartransition = exit.transition()
        .duration(duration)
        .style("opacity", 0.002)
        .remove();

    exitbartransition.selectAll("rect")
        .attr("width", function (d) {
            return x(d.value);
        });

    svg.select(".background")
        .datum(d)
        .transition()
        .duration(end);

    d.index = i;
}

function upstep(d) {
    if (this.__transition__ || !d.parent) return;
    var end = duration + d.children.length * delay;

    // Exit current bars
    var exit = svg.selectAll(".enter").attr("class", "exit");

    // Enter the new bars for the clicked-on data's parent.
    var enter = bar(d.parent)
        .attr("transform", function (d, i) {
            return "translate(0," + barHeight * i * 1.2 + ")";
        })
        .style("opacity", 0.5);

    // coloring the bars
    enter.select("rect")
        .style("fill", function (d) {
            return color(!!d.children);
        })
        .filter(function (p) {
            return p === d;
        })
        .style("fill-opacity", 0.002);

    // Update the axis
    updatatedxScale = d3.max(d.parent.children, function (d) {
        return d.value;
    })
    x.domain([0, updatatedxScale]);
    svg.selectAll(".x.axis").transition()
        .duration(duration)
        .call(d3.svg.axis().scale(x).orient("top"));

    // Fading effect.
    var entry = enter.transition()
        .duration(end)
        .style("opacity", 0.5);

    entry.select("rect")
        .attr("width", function (d) {
            return x(d.value);
        })
        .each("end", function (p) {
            if (p === d) d3.select(this).style("fill-opacity", 0.8);
        });


    //exit transitions
    var exitbar = exit.selectAll("g").transition()
        .duration(duration)
        .delay(function (d, i) {
            return i * delay;
        })
        .attr("transform", transformedBar(d.index));

    exitbar.select("text").style("fill-opacity", 0.5);

    exitbar.select("rect")
        .attr("width", function (d) {
            return x(d.value);
        })
        .style("fill", color(true));

    // Delete extra bars
    exit.transition()
        .duration(end)
        .remove();

    // Rebind the current parent to the background.
    svg.select(".background")
        .datum(d.parent)
        .transition()
        .duration(end);
}

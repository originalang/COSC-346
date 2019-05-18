let numberOfBalls = 10
let numberOfColors = 1

const balls = document.querySelector('#balls');
const colors = document.querySelector('#colors');

const ballsValue = document.querySelector('#balls-value');
const colorsValue = document.querySelector('#colors-value');

ballsValue.innerHTML = balls.value;
colorsValue.innerHTML = colors.value;

document.querySelector('button').addEventListener('click', () => {
    numberOfBalls = balls.value;
    numberOfColors = colors.value;
    
    resetCanvas();
});

balls.addEventListener('mousemove', () => {
    ballsValue.innerHTML = balls.value;
});

colors.addEventListener('mousemove', () => {
    colorsValue.innerHTML = colors.value;
});

var width = 1000,
    height = 600;

resetCanvas();

function resetCanvas() {
    document.querySelector('#canvas').innerHTML = '';
    
    var nodes = d3.range(numberOfBalls).map(function () { return { radius: Math.random() * 20 }; }),
        root = nodes[0],
        color = d3.scale.category10();

    root.radius = 0;
    root.fixed = true;

    var force = d3.layout.force()
        .gravity(0.04)
        .charge(function (d, i) { return i ? 0 : -2000; })
        .nodes(nodes)
        .size([width, height]);

    force.start();

    var svg = d3.select("#canvas").append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.selectAll("circle")
        .data(nodes.slice(1))
        .enter().append("circle")
        .attr("r", function (d) { return d.radius; })
        .style("fill", function (d, i) { return color(i % numberOfColors); });

    force.on("tick", function (e) {
        var q = d3.geom.quadtree(nodes),
            i = 0,
            n = nodes.length;

        while (++i < n) q.visit(collide(nodes[i]));

        svg.selectAll("circle")
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; });
    });

    svg.on("mousemove", function () {
        var p1 = d3.mouse(this);
        root.px = p1[0];
        root.py = p1[1];
        force.resume();
    });

    function collide(node) {
        var r = node.radius + 16,
            nx1 = node.x - r,
            nx2 = node.x + r,
            ny1 = node.y - r,
            ny2 = node.y + r;
        return function (quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== node)) {
                var x = node.x - quad.point.x,
                    y = node.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y),
                    r = node.radius + quad.point.radius;
                if (l < r) {
                    l = (l - r) / l * .5;
                    node.x -= x *= l;
                    node.y -= y *= l;
                    quad.point.x += x;
                    quad.point.y += y;
                }
            }
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        };
    }
}
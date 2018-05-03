import React from "react";
import * as d3 from "d3";

import "./scroll.css";

export default class Scrollytelling extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            containerStart: 0,
            currentIndex: 0
        }

        this.handleScroll = this.handleScroll.bind(this);
        this.active = this.active.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, { passive: true });
        let step0 = function (){
            let t = d3.transition().duration(1000);
            d3.select("svg").remove();
            d3.select("#vis").append("svg").attr("width", 600).attr("height", 600);
            let g = d3.select("svg");
            g.append("svg:image")
            .attr('xlink:href', 'https://secure.i.telegraph.co.uk/multimedia/archive/01123/farc-colombia_1123812c.jpg')
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", "100%")
            .attr("height", "100%")
            .style("opacity", 0)
            .transition(t)
            .style("opacity", 1);
        }

        step0();
        var myData = [80,80,20,20],
            margin = { top: 10, bottom: 20, left: 50, right: 10 },
            width = 300,
            height = 200,
            barHeight = 20;


        var chart = d3.select("#chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var xAxis = chart.append("g")
            .attr("class", "y axis")

        var yScale = d3.scaleLinear()
            .range([height, 0])


        function update(myData) {
            yScale
                .domain([0, d3.max(myData)]);

            var ps = chart.selectAll("rect")
                .data(myData);

            // New items
            ps.enter() // enter
                .append("rect")
                .merge(ps) // enter + update
                .text(function (d) { return d; })
                .style("fill", "darkblue")
                .attr("y", function (d) {
                    return yScale.range()[0] - yScale(d);
                })
                .attr("x", function (d, i) {
                    return (barHeight + 1);
                })
                .attr("width", barHeight)
                .attr("height", function (d) {
                    return yScale(d)
                });

            // Remove items
            ps.exit()
                .remove();


            xAxis.call(d3.axisLeft(yScale));
        }
        update(myData);

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
        // do something like call `this.setState`
        // access window.scrollY etc
        let container = d3.select("body");
        let containerStart = this.state.containerStart;
        let sections = d3.selectAll(".step");
        let pos = window.pageYOffset - 10 - containerStart;
        let sectionPositions = [];
        let startPos;
        sections.each(function (d, i) {
            let top = this.getBoundingClientRect().top;

            if (i === 0) {
                startPos = top;
            }
            sectionPositions.push(top - startPos);

        })
        this.state.containerStart = container.node().getBoundingClientRect().top + window.pageYOffset;

        let sectionIndex = d3.bisect(sectionPositions, pos);

        sectionIndex = Math.min(sections.size() - 1, sectionIndex);

        if (this.state.currentIndex !== sectionIndex) {
            this.state.currentIndex = sectionIndex;
            this.active(sectionIndex);
        }
    }

      active(i){
          let functions = [];
          let step0 = function (){
              let t = d3.transition().duration(2000);
              d3.select("svg").remove();
              d3.select("#vis").append("svg").attr("width", 600).attr("height", 600);
              let g = d3.select("svg");
              g.append("svg:image")
              .attr('xlink:href', 'https://secure.i.telegraph.co.uk/multimedia/archive/01123/farc-colombia_1123812c.jpg')
              .attr("x", 0)
              .attr("y", 0)
              .attr("width", "100%")
              .attr("height", "100%")
              .style("opacity", 0)
              .transition(t)
              .style("opacity", 1);
          }

        functions.push(step0);

          let step1 = function (){
            let t = d3.transition().duration(2000);
            d3.select("svg").remove();
            d3.select("#vis").append("svg").attr("width", 600).attr("height", 600);
            let g = d3.select("svg");
            g.append("svg:image")
            .attr('xlink:href', 'https://static.iris.net.co/arcadia/upload/images/2016/4/8/47994_1.jpg')
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", "100%")
            .attr("height", "100%")
            .style("opacity", 0)
            .transition(t)
            .style("opacity", 1);
        }

        functions.push(step1);

        let step2 = function (){
            let t = d3.transition().duration(2000);
            d3.select("svg").remove();
            d3.select("#vis").append("svg").attr("width", 600).attr("height", 600);
            let g = d3.select("svg");
            g.append("svg:image")
            .attr('xlink:href', 'http://www.nexofin.com/archivos/2016/09/colombia-farc-paz-750x375.jpg')
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", "100%")
            .attr("height", "100%")
            .style("opacity", 0)
            .transition(t)
            .style("opacity", 1);
        }

        functions.push(step2);

        functions[i]();
    }

    render() {
        return (
            <div id="scrollytelling">
                <div id="sections">
                    <section className="step">
                        <h1>Conflicto Armado en Colombia</h1>
                        <br />
                        Ayuuudddaaa
                        <br />
                        Ayuuudddaaa
                        <br />
                        Ayuuudddaaa
                        <br />
                        Ayuuudddaaa
                        <br />
                        Ayuuudddaaa
                        <br />
                        Ayuuudddaaa
                        <br />
                        Ayuuudddaaa
                        <br />
                        Ayuuudddaaa
                        <br />
                        Ayuuudddaaa
                        <br />
                        Ayuuudddaaa
                        <br />
                        Ayuuudddaaa
                        <br />
                        Ayuuudddaaa
                        <br />
                        Ayuuudddaaa
                        <br />
                        Ayuuudddaaa
                        <br />
                        Ayuuudddaaa
                    </section>
                    <section className="step">
                        <h1> Inicio </h1>
                        <br />
                        Pérdidas
                        <br />
                        Pérdidas
                        <br />
                        Pérdidas
                        <br />
                        Pérdidas
                        <br />
                        Pérdidas
                        <br />
                        Pérdidas
                        <br />
                        Pérdidas
                        <br />
                        Pérdidas
                        <br />
                        Pérdidas
                        <br />
                        Pérdidas
                        <br />
                        Pérdidas
                        <br />
                        Pérdidas
                        <br />
                        Pérdidas
                        <br />
                        Pérdidas
                        <br />
                        Pérdidas
                    </section>
                    <section className="step">
                        <h1> Tratado de Paz </h1>
                        <br />
                        FIN
                        <br />
                        FIN
                        <br />
                        FIN
                        <br />
                        FIN
                        <br />
                        FIN
                        <br />
                        FIN
                        <br />
                        FIN
                        <br />
                        FIN
                        <br />
                        FIN
                        <br />
                        FIN
                        <br />
                        FIN
                        <br />
                        FIN
                        <br />
                        FIN
                        <br />
                        FIN
                        <br />
                        FIN
                        <br />
                        FIN
                    </section>
                </div>

                <div id="vis">
                </div>

                <div>
                    <h2>Chart of answers</h2>
                    <svg id="chart"> </svg>
                </div>

            </div>
        );
    }
}
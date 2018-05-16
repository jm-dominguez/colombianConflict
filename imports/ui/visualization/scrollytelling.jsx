import React from "react";
import * as d3 from "d3";
import Tweet from "../components/tweets.jsx";

import "./scroll.css";

export default class Scrollytelling extends React.Component {

    constructor(props) {
        super(props);
        this.containerStart = 0;
        this.currentIndex  = 0;
        this.handleScroll = this.handleScroll.bind(this);
        this.active = this.active.bind(this);
        this.renderTweets = this.renderTweets.bind(this);
        this.state = {

        }
    }

    componentWillMount(){
        Meteor.call("getTweets", "FARC",(err, result)=>{
            if(err){
                throw err;
            }
            console.log(result);

            this.setState({
                farcTweets: result
            });
        })

    }

    renderTweets(){
        if(this.state.farcTweets){
            let tweets = this.state.farcTweets.data.statuses;
            return tweets.map((tweet, i)=>(
                <Tweet key={i} img={tweet.user.profile_image_url_https} name={tweet.user.name} screenName={tweet.user.screen_name} text={tweet.text}/>
            ));
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, { passive: true });
        let step0 = function () {
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
        var myData = [80,20,40],
            margin = { top: 10, bottom: 20, left: 50, right: 10 },
            width = 500,
            height = 300,
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
                    return d;
                })
                .attr("width", barHeight)
                .attr("height", function (d) {
                    return yScale(d)
                });

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
        let containerStart = this.containerStart;
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
        this.containerStart = container.node().getBoundingClientRect().top + window.pageYOffset;

        let sectionIndex = d3.bisect(sectionPositions, pos);

        sectionIndex = Math.min(sections.size() - 1, sectionIndex);

        if (this.currentIndex !== sectionIndex) {
            this.currentIndex = sectionIndex;
            this.active(sectionIndex);
        }
    }

    active(i) {
        let functions = [];
        let step0 = function () {
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

        let step1 = function () {
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

        let step2 = function () {
            let t = d3.transition().duration(2000);
            d3.select("svg").remove();
            d3.select("#vis").append("svg").attr("width", 600).attr("height", 600);
            let g = d3.select("svg");
            g.append("svg:image")
                .attr('xlink:href', 'http://cr00.epimg.net/radio/imagenes/2016/08/24/nacional/1472074857_412046_1472075009_noticia_normal.jpg')
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", "100%")
                .attr("height", "100%")
                .style("opacity", 0)
                .transition(t)
                .style("opacity", 1);
        }

        functions.push(step2);

        let step3 = function () {
            let t = d3.transition().duration(2000);
            d3.select("svg").remove();
            d3.select("#vis").append("svg").attr("width", 600).attr("height", 600);
            let g = d3.select("svg");
            g.append("svg:image")
                .attr('xlink:href', 'https://360radio.com.co/wp-content/uploads/2016/09/Santos-Farc-Castro-Colombia.jpg')
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", "100%")
                .attr("height", "100%")
                .style("opacity", 0)
                .transition(t)
                .style("opacity", 1);
        }

        functions.push(step3);

        

        functions[i]();
    }

    render() {
        return (
            <div id="scrollytelling">
                <div className="row">
                    <div className="col-sm-12">
                        <div id="sections">
                            <section className="step">
                                <h1>Conflicto Armado en Colombia</h1>
                                <p>
                                    El conflicto armado interno en Colombia es una guerra asimétrica de baja intensidad que se desarrolla
                                    en Colombia desde la década de 1960 hasta la actualidad. Los principales actores involucrados han sido
                                    en un comienzo el Estado colombiano y las guerrillas de extrema izquierda, sumándose décadas después los
                                    grupos paramilitares de extrema derecha, los carteles de la droga y las bandas criminales. Ha pasado por
                                    varias etapas de recrudecimiento, en especial desde los años 80´s, cuando algunos de los actores del conflicto
                                    arreciaron en sus ataques afectando sobre todo a la población civil, gracias al financiamiento de las
                                    actividades derivadas del narcotráfico.
                                </p>
                                <br />
                            </section>
                            <section className="step">
                                <h1> Antecedentes </h1>
                                <p>

                                    Desde la independencia de Colombia en 1819 y la desintegración de la república creada por Bolívar en 1830, el país no ha estado
                                    ajeno a la violencia bipartidista, hecho que fue evidente en las numerosas guerras civiles que se desarrollaron durante el siglo XIX
                                    culminando en la Guerra de los Mil Días (1899–1902).
                                </p>
                            </section>
                            <section className="step">
                                <h1> Fundación FARC </h1>
                                <p>
                                    Las Fuerzas Armadas Revolucionarias de Colombia (FARC), fueron fundadas en el año 1964 después un ataque realizado por el gobierno colombiano,
                                    con el fin de reafirmar las políticas establecidas en el frente nacional. Durante sus primeros 10 a 20 años, el crecimiento del grupo fue lento,
                                    no obstante, hacia los años 80, el grupo plantea una estrategia de duplicamiento de frentes con el fin de reclutar un mayor número de integrantes.
                                </p>
                                <h1> Algunos Tweets sobre FARC </h1>
                                <div className="container">
                                    {this.renderTweets()}
                                </div>
                            </section>
                            <section className="step">
                                <h1> Tratado de Paz </h1>

                                <p>
                                    El lunes 26 de Septiembre de 2016, el gobierno de Colombia, comandado por el presidente Juan Manuel Santos,
                                    firma un grupo de acuerdos con las Fuerzas Armadas Revolucionarias Colombianas (FARC), estos son conocidos
                                    como los acuerdos de paz de La Habana. Después de la retificación de los acuerdos en el congreso, inició el proceso
                                    de desarme y posteriormente, la reintegración a la vida civil.
                                </p>
                            </section>
                            
                        </div>

                        <div id="vis">
                        </div>

                        <div>
                            <h2>Chart of answers</h2>

                            <h4></h4>
                            <svg id="river"> </svg>
                            <svg id="chart"> </svg>
                            <p id="SiNo"> Sí No</p>
                        </div>

                    </div>

                </div>

            </div>
        );
    }
}
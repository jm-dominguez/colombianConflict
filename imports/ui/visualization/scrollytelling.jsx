import React from "react";
import * as d3 from "d3";
import Tweet from "../components/tweets.jsx";

import "./scroll.css";

export default class Scrollytelling extends React.Component {

    constructor(props) {
        super(props);
        this.containerStart = 0;
        this.currentIndex = 0;
        this.handleScroll = this.handleScroll.bind(this);
        this.active = this.active.bind(this);
        this.renderTweets = this.renderTweets.bind(this);
        this.state = {

        }
    }

    componentWillMount() {
        Meteor.call("getTweets", "FARC", (err, result) => {
            if (err) {
                throw err;
            }

            this.setState({
                farcTweets: result
            });
        })
        Meteor.call("getTweets", "Uribe", (err, result)=>{
            if(err){
                throw err;
                
            }
            this.setState({
                uribeTweets: result
            });
        });
        Meteor.call("getTweets", "El%20caguan", (err, result)=>{
            if(err){
                throw err;
            }
            this.setState({
                caguanTweets: result
            });
        });
        Meteor.call("getTweets", "palacio%20de%20justicia", (err, result)=>{
            if(err){
                throw err;
            }
            this.setState({
                pJusticiaTweets: result
            })
        });

    }

    renderTweets() {
        if (this.state.farcTweets) {
            let tweets = this.state.farcTweets.data.statuses;
            return tweets.map((tweet, i) => (
                <Tweet key={i} img={tweet.user.profile_image_url_https} name={tweet.user.name} screenName={tweet.user.screen_name} text={tweet.text} />
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
        var myData = [100, 40, 60],
            myData2 = [100, 40, 60],
            myData3 = [100, 49, 51],
            margin = { top: 10, bottom: 20, left: 50, right: 10 },
            width = 500,
            height = 300,
            barHeight = 20;


        var chartQuestion1 = d3.select("#chartQuestion1")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var chartQuestion2 = d3.select("#chartQuestion2")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var chartQuestion3 = d3.select("#chartQuestion3")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var xAxis = chartQuestion1.append("g")
            .attr("class", "y axis")

        var xAxis2 = chartQuestion2.append("g")
            .attr("class", "y axis")

        var xAxis3 = chartQuestion3.append("g")
            .attr("class", "y axis")

        var yScale = d3.scaleLinear()
            .range([height, 0])


        function update(myData, myData2, myData3) {
            yScale
                .domain([0, d3.max(myData3)]);

            var ps = chartQuestion1.selectAll("rect")
                .data(myData);

            // New items
            ps.enter() // enter
                .append("rect")
                .merge(ps) // enter + update
                .text(function (d) { return d; })
                .style("fill", "#3ba1e5")
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

            var ps2 = chartQuestion2.selectAll("rect")
                .data(myData2);

            // New items
            ps2.enter() // enter
                .append("rect")
                .merge(ps) // enter + update
                .text(function (d) { return d; })
                .style("fill", "#3ba1e5")
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

            xAxis2.call(d3.axisLeft(yScale));

            var ps3 = chartQuestion3.selectAll("rect")
                .data(myData3);

            // New items
            ps3.enter() // enter
                .append("rect")
                .merge(ps) // enter + update
                .text(function (d) { return d; })
                .style("fill", "#3ba1e5")
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

            xAxis3.call(d3.axisLeft(yScale));
        }

        update(myData, myData2, myData3);

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
                .attr('xlink:href', 'http://cr00.epimg.net/radio/imagenes/2016/08/24/nacional/1472074857_412046_1472075009_noticia_normal.jpg')
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", "100%")
                .attr("height", "100%")
                .style("opacity", 0)
                .transition(t)
                .style("opacity", 1);
            
        }

        functions.push(step3);

        let step4 = function() {
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

        functions.push(step4);
        
        let step5 = function () {
            let t = d3.transition().duration(2000);
            d3.select("svg").remove();
            d3.select("#vis").append("svg").attr("width", 600).attr("height", 600);
            let g = d3.select("svg");
            g.append("svg:image")
                .attr('xlink:href', '')
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", "100%")
                .attr("height", "100%")
                .style("opacity", 0)
                .transition(t)
                .style("opacity", 1);
        }

        functions.push(step5);
        functions[i]();
    }

    render() {
        return (
            <div className="container-fluid">
                <div id="scrollytelling">
                    <div className="row">
                        <div className="col-sm-12">
                            <div id="sections">
                                <section className="step">
                                    <br />
                                    <h1>Conflicto Armado en Colombia</h1>
                                    <p>
                                    Es un conflicto violento que se desarrolla desde la decada de los sesenta hasta la actualidad.
                                    A lo largo de su historia ha tenido diversos actores, entre los cuales destacan: Las FARC, el ELN,
                                    los grupos paramilitares, el gobierno de Colombia y los carteles de la droga.
                                </p>
                                    <br />
                                </section>
                                <section className="step">
                                    <h1> Antecedentes </h1>
                                    <p>

                                    A lo largo de su historia, Colombia se ha encontrado constatemente en conflictos políticos. El 9 de Abril de 1948
-                                   con el asesinato de Jorge Eiécer Gaitán, daba inicio el periodo conocido como "La Violencia". Dicho conflicto terminaría
-                                   en el año 1956 con la creación del frente nacional. No obstante, dicho acuerdo generó descontento en los partidos políticos
-                                   no tradicionales, lo cual dió lugar a los grupos insurgentes conocidos como bandoleros.
                                </p>
                                </section>
                                <section className="step">
                                    <h1> Fundación FARC </h1>
                                    <p>
                                        Las Fuerzas Armadas Revolucionarias de Colombia (FARC), fueron fundadas en el año 1964 después un ataque realizado por el gobierno colombiano,
                                        con el fin de reafirmar las políticas establecidas en el frente nacional. Durante sus primeros 10 a 20 años, el crecimiento del grupo fue lento,
                                        no obstante, hacia los años 80, el grupo plantea una estrategia de duplicamiento de frentes con el fin de reclutar un mayor número de integrantes.
                                </p>
                                </section>
                                <section className="step">
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
                                <section className="step">
                                </section>
                            </div>

                            <div id="vis">
                            </div>

                            <br/>
                            <h2>Participa en una pequeña encuesta sobre el conflicto armado en Colombia</h2>
                            <br/>
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div className="col-md-5">
                                    
                                    <div className="questions">
                                        <fieldset className="form-group" onChange={this.handleChangePregunta1}>
                                            <legend>¿Estás de acuerdo con la realización del acuerdo de paz con las FARC?</legend>
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios1" value="si" />
                                                    Sí</label>
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios2" value="no" />
                                                    No</label>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div>
                                        <h2>Historio de respuestas:</h2>
                                        <svg id="river"> </svg>
                                        <svg id="chartQuestion1"> </svg>
                                        <p id="SiNo"> Sí No</p>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div className="col-md-5">
                                    <div className="questions">
                                        <fieldset className="form-group" onChange={this.handleChangePregunta2}>
                                            <legend>¿Estás de acuerdo con la participación de las FARC en la politica colombiana?</legend>
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios1" value="si" />
                                                    Sí</label>
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios2" value="no" />
                                                    No</label>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div>
                                        <h2>Historio de respuestas:</h2>
                                        <svg id="chartQuestion2"> </svg>
                                        <p id="SiNo"> Sí No</p>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div className="col-md-5">
                                    <div className="questions">
                                        <fieldset className="form-group" onChange={this.handleChangePregunta3}>
                                            <legend>¿Estás de acuerdo con la realización de un acuerdo de paz con el ELN?</legend>
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios1" value="si" />
                                                    Sí</label>
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios2" value="no" />
                                                    No</label>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div>
                                        <h2>Historio de respuestas:</h2>
                                        <svg id="chartQuestion3"> </svg>
                                        <p id="SiNo"> Sí No</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        );
    }
}
import React from "react";
import * as d3 from "d3";
import Tweet from "../components/tweets.jsx";
import { Comments } from "../../api/Comments.js";
import { withTracker } from "meteor/react-meteor-data";
import { timelines } from "d3-timelines";

import "./scroll.css";

class Scrollytelling extends React.Component {

    constructor(props) {
        super(props);
        this.containerStart = 0;
        this.currentIndex = 0;
        this.handleScroll = this.handleScroll.bind(this);
        this.active = this.active.bind(this);
        this.renderTweets = this.renderTweets.bind(this);

        this.handleSignUpButton = this.handleSignUpButton.bind(this);
        this.handleLoginButton = this.handleLoginButton.bind(this);
        this.renderButtons = this.renderButtons.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleCreateAccount = this.handleCreateAccount.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleChangePregunta1 = this.handleChangePregunta1.bind(this);
        this.handleChangePregunta2 = this.handleChangePregunta2.bind(this);
        this.handleChangePregunta3 = this.handleChangePregunta3.bind(this);
        this.handleAnswerQ1 = this.handleAnswerQ1.bind(this);
        this.handleAnswerQ2 = this.handleAnswerQ2.bind(this);
        this.handleAnswerQ3 = this.handleAnswerQ3.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.state = {
            status: "Login",
            pregunta1: "",
            pregunta2: "",
            pregunta3: "",
            comment: ""
        }
    }

    handleSignUpButton(e) {
        e.preventDefault();
        this.setState({ status: "SignUp" })
        console.log(this.state);
    }

    handleLoginButton(e) {
        e.preventDefault();
        this.setState({ status: "Login" });
        console.log(this.state);
    }

    handleChangePregunta1(e) {
        this.setState({ pregunta1: e.target.value });
    }

    handleChangePregunta2(e) {
        this.setState({ pregunta2: e.target.value });
    }

    handleChangePregunta3(e) {
        this.setState({ pregunta3: e.target.value });
    }

    handleAnswerQ1(e) {
        e.preventDefault();
        if (this.state.pregunta1 === "") {
            alert("Por favor selecciona una respuesta");
        }
        else {
            alert("Voto registrado")
        }
    }

    handleAnswerQ2(e) {
        e.preventDefault();
        if (this.state.pregunta2 === "") {
            alert("Por favor selecciona una respuesta");
        }
        else {
            alert("Voto registrado")
        }
    }

    handleAnswerQ3(e) {
        e.preventDefault();
        if (this.state.pregunta3 === "") {
            alert("Por favor selecciona una respuesta");
        }
        else {
            alert("Voto registrado")
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
        Meteor.call("getTweets", "Uribe", (err, result) => {
            if (err) {
                throw err;

            }
            this.setState({
                uribeTweets: result
            });
        });
        Meteor.call("getTweets", "El%20caguan", (err, result) => {
            if (err) {
                throw err;
            }
            this.setState({
                caguanTweets: result
            });
        });
        Meteor.call("getTweets", "palacio%20de%20justicia", (err, result) => {
            if (err) {
                throw err;
            }
            this.setState({
                pJusticiaTweets: result
            })
        });

    }


    renderTweets(tweets) {
        if (tweets) {
            let tweets = this.state.farcTweets.data.statuses;
            return tweets.map((tweet, i) => (
                <Tweet key={i} img={tweet.user.profile_image_url_https} name={tweet.user.name} screenName={tweet.user.screen_name} text={tweet.text} />
            ));
        }
    }

    componentDidMount() {

        if (Meteor.userId() !== null) {
            this.setState({
                status: "Loged"
            })
        }

        window.addEventListener('scroll', this.handleScroll, { passive: true });
        let step0 = function () {
            d3.selectAll(".step").style("opacity", 0);
            d3.select("#inicio").style("opacity", 1);
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

        Meteor.call("poll.findByQuestion", 1, (err, result) => {
            if (err) {
                throw err;
            }
        });

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
            let t = d3.transition("image").duration(1000);
            let t2 = d3.transition("nexttext").duration(1000);
            let t3 = d3.transition("thistext").duration(1000);
            d3.select("#datos-generales").transition(t2).style("opacity", 0);
            d3.select("#inicio").transition(t3).style("opacity", 1);
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

        let donutStep = function () {
            let muertes = [{
                "estado": "Combatiente",
                "muertos": "40787"
            },
            {
                "estado": "Civil",
                "muertos": "177307"
            }];

            let t = d3.transition("image").duration(1000);
            let t2 = d3.transition("prevStep").duration(1000);
            let t3 = d3.transition("thisStep").duration(1000);
            let t4 = d3.transition("nextStep").duration(1000);

            d3.select("#inicio").transition(t2).style("opacity", 0);
            d3.select("#datos-generales").transition(t3).style("opacity", 1);
            d3.select("#antecedentes").transition(t4).style("opacity", 0);
            d3.select("svg").remove();

            let radius = 200;
            let color = d3.scaleOrdinal().range(["#ff8c00", "#6b486b"]);
            let arc = d3.arc()
                .outerRadius(radius - 10)
                .innerRadius(radius - 70);
            let pie = d3.pie()
                .sort(null)
                .value(function (d) { return d.muertos; });
            var svg = d3.select("#vis").append("svg")
                .attr("width", 600)
                .attr("height", 600)
                .append("g")
                .attr("transform", "translate(" + 600 / 2 + "," + 600 / 2 + ")");

            svg.style("opacity", 0).transition(t).style("opacity", 1);

            muertes.forEach(function (d) {
                d.muertos = +d.muertos;
            });

            var g = svg.selectAll(".arc")
                .data(pie(muertes))
                .enter().append("g")
                .attr("class", "arc")
                .on("mouseover", function (d) {
                    let g = d3.select(this)
                        .style("cursor", "pointer")
                        .style("opacity", 0.7)
                        .append("g")
                        .attr("class", "text-group");

                    g.append("text")
                        .attr("class", "name-text")
                        .text(`${d.data.estado}`)
                        .attr('text-anchor', 'middle')
                        .attr('dy', '-1.2em');

                    g.append("text")
                        .attr("class", "value-text")
                        .text(`${d.data.muertos}`)
                        .attr('text-anchor', 'middle')
                        .attr('dy', '.6em');
                })
                .on("mouseout", function (d) {
                    d3.select(this)
                        .style("cursor", "none")
                        .style("opacity", 1)
                        .select(".text-group").remove();
                });

            let tc = d3.transition("color").duration("1000");

            g.append("path")
                .attr("d", arc)
                .transition(tc)
                .style("fill", function (d) { return color(d.data.estado); });
            g.append("text")
                .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
                .attr("dy", ".35em")
                .text(function (d) { return d.data.estado; });

            function type(d) {
                d.muertos = +d.muertos;
                return d;
            }
        }

        functions.push(donutStep);

        let step1 = function () {
            let t = d3.transition("image").duration(1000);
            let t2 = d3.transition("prevStep").duration(1000);
            let t3 = d3.transition("thisStep").duration(1000);
            let t4 = d3.transition("nextStep").duration(1000);

            d3.select("#datos-generales").transition(t2).style("opacity", 0);
            d3.select("#antecedentes").transition(t3).style("opacity", 1);
            d3.select("#actores").transition(t4).style("opacity", 0);
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

        let actores = function(){
            let t = d3.transition("image").duration(1000);
            let t2 = d3.transition("prevStep").duration(1000);
            let t3 = d3.transition("thisStep").duration(1000);
            let t4 = d3.transition("nextStep").duration(1000);

            d3.select("#antecedentes").transition(t2).style("opacity", 0);
            d3.select("#actores").transition(t3).style("opacity", 1);
            d3.select("#ELN").transition(t4).style("opacity", 0);
            d3.select("svg").remove();
            d3.select("#vis").append("svg").attr("width", 600).attr("height", 600);
            let g = d3.select("svg");
            g.append("svg:image")
                .attr('xlink:href', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colombia.svg/1280px-Flag_of_Colombia.svg.png')
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", "100%")
                .attr("height", "100%")
                .style("opacity", 0)
                .transition(t)
                .style("opacity", 1);
        }

        functions.push(actores);

        let stepELN = function () {
            let t = d3.transition("image").duration(1000);
            let t2 = d3.transition("prevStep").duration(1000);
            let t3 = d3.transition("thisStep").duration(1000);
            let t4 = d3.transition("nextStep").duration(1000);

            d3.select("#actores").transition(t2).style("opacity", 0);
            d3.select("#ELN").transition(t3).style("opacity", 1);
            d3.select("#M19").transition(t4).style("opacity", 0);
            d3.select("svg").remove();
            d3.select("#vis").append("svg").attr("width", 600).attr("height", 600);
            let g = d3.select("svg");
            g.append("svg:image")
                .attr('xlink:href', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Flag_of_ELN.svg/1200px-Flag_of_ELN.svg.png')
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", "100%")
                .attr("height", "100%")
                .style("opacity", 0)
                .transition(t)
                .style("opacity", 1);

        }

        functions.push(stepELN);

        let stepM19 = function () {
            let t = d3.transition("image").duration(1000);
            let t2 = d3.transition("prevStep").duration(1000);
            let t3 = d3.transition("thisStep").duration(1000);
            let t4 = d3.transition("nextStep").duration(1000);

            d3.select("#ELN").transition(t2).style("opacity", 0);
            d3.select("#M19").transition(t3).style("opacity", 1);
            d3.select("#farc").transition(t4).style("opacity", 0);
            d3.select("svg").remove();
            d3.select("#vis").append("svg").attr("width", 600).attr("height", 600);
            let g = d3.select("svg");
            g.append("svg:image")
                .attr('xlink:href', 'https://www.elespectador.com/static_specials/10/procesodepazm19/image5.jpg')
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", "100%")
                .attr("height", "100%")
                .style("opacity", 0)
                .transition(t)
                .style("opacity", 1);
        }

        functions.push(stepM19);

        let step2 = function () {

            let t = d3.transition("image").duration(1000);
            let t2 = d3.transition("prevStep").duration(1000);
            let t3 = d3.transition("thisStep").duration(1000);
            let t4 = d3.transition("nextStep").duration(1000);
            d3.select("#M19").transition(t2).style("opacity", 0);
            d3.select("#farc").transition(t3).style("opacity", 1);
            d3.select("#tweets-farc").transition(t4).style("opacity", 0);
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

            let t = d3.transition("image").duration(0);
            let t2 = d3.transition("prevStep").duration(1000);
            let t3 = d3.transition("thisStep").duration(1000);
            let t4 = d3.transition("nextStep").duration(1000);
            d3.select("#farc").transition(t2).style("opacity", 0);
            d3.select("#tweets-farc").transition(t3).style("opacity", 1);
            d3.select("#auc").transition(t4).style("opacity", 0);
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

        let fantasma1 = function(){
            let t3 = d3.transition("thisStep").duration(1000);
            d3.select("#tweets-farc").transition(t3).style("opacity", 1);
        }

        functions.push(fantasma1);

        let stepAUC = function () {

            let t = d3.transition("image").duration(1000);
            let t2 = d3.transition("prevStep").duration(1000);
            let t3 = d3.transition("thisStep").duration(1000);
            let t4 = d3.transition("nextStep").duration(1000);
            d3.select("#tweets-farc").transition(t3).style("opacity", 0);
            d3.select("#auc").transition(t3).style("opacity", 1);
            d3.select("#participacion").transition(t4).style("opacity", 0);
            d3.select("svg").remove();
            d3.select("#vis").append("svg").attr("width", 600).attr("height", 600);
            let g = d3.select("svg");
            g.append("svg:image")
                .attr('xlink:href', 'http://www.eltiempo.com/contenido///politica/justicia/IMAGEN/IMAGEN-16448296-2.jpg')
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", "100%")
                .attr("height", "100%")
                .style("opacity", 0)
                .transition(t)
                .style("opacity", 1);

        }

        functions.push(stepAUC);

        let stepParticipacion = function () {
            let datos = [{
                actor: "Grupos Paramilitares",
                valor: 0.384
            },
            {
                actor: "Guerrillas",
                valor: 0.169
            },
            {
                actor: "Fuerza Pública",
                valor: 0.104
            }, {
                actor: "Grupo no Identificado",
                valor: 0.277
            }];
            let t = d3.transition("image").duration(1000);
            let t2 = d3.transition("prevStep").duration(1000);
            let t3 = d3.transition("thisStep").duration(1000);
            let t4 = d3.transition("nextStep").duration(1000);
            d3.select("#auc").transition(t2).style("opacity", 0);
            d3.select("#participacion").transition(t3).style("opacity", 1);
            d3.select("#eventos").transition(t4).style("opacity", 0);
            d3.select("svg").remove();
            d3.select("#vis").append("svg").attr("width", 600).attr("height", 600);

            var svg = d3.select("svg"),
                margin = { top: 20, right: 20, bottom: 30, left: 40 },
                width = +svg.attr("width") - margin.left - margin.right,
                height = +svg.attr("height") - margin.top - margin.bottom;

            var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
                y = d3.scaleLinear().rangeRound([height, 0]);

            var g = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            d3.select("svg").style("opacity", 0).transition(t).style("opacity", 1);

            datos.forEach(function (d) {
                d.valor = +d.valor;
            });

            x.domain(datos.map(function (d) { return d.actor; }));
            y.domain([0, d3.max(datos, function (d) { return d.valor; })]);

            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y).ticks(10, "%"))
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Asesinatos");

            let tb = d3.transition("bar").duration(1000);

            let bars = g.selectAll(".bar")
                .data(datos)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) { return x(d.actor); })
                .attr("y", function (d) { return y(d.valor); })
                .style("fill", "#008080")
                .attr("width", x.bandwidth());

            bars
                .transition(tb)
                .attr("height", function (d) { return height - y(d.valor); });
            bars
                .on("mouseover", function (d) {
                    let g = d3.select(this)
                        .style("cursor", "pointer")
                        .style("opacity", 0.7)
                        .append("g")
                        .attr("class", "text-group");
                })
                .on("mouseout", function (d) {
                    d3.select(this)
                        .style("cursor", "none")
                        .style("opacity", 1)
                        .select(".text-group").remove();
                });
        }

        functions.push(stepParticipacion);
        let stepEventos = function(){
            let t = d3.transition("image").duration(1000);
            let t2 = d3.transition("prevStep").duration(1000);
            let t3 = d3.transition("thisStep").duration(1000);
            let t4 = d3.transition("nextStep").duration(1000);

            d3.select("#participacion").transition(t2).style("opacity", 0);
            d3.select("#eventos").transition(t3).style("opacity", 1);
            d3.select("#pal-justicia").transition(t4).style("opacity", 0);
            d3.select("svg").remove();

            let datos = [{
                label: "Toma Palacio de Justicia",
                times:[{
                    "starting_time": 500101200000,
                    "ending_time": 500187600000
                }]
            },{
                label: "Proceso 8000",
                times: [{
                    "starting_time": 805957200000,
                    "ending_time": 836629200000
                }]

            },{
                label: "Toma de Mitú",
                times: [{
                    "starting_time": 909896400000,
                    "ending_time": 910155600000
                }]
            },{
                label:"Negociaciones de El Caguán",
                times: [{
                    "starting_time": 915685200000,
                    "ending_time": 1014267600000
                }]
            }, {
                label: "Gobierno de Uribe",
                times: [{
                    "starting_time": 1028696400000,
                    "ending_time": 1281157200000
                }]
            }, {
                label: "Diálogos de Paz",
                times: [{
                    "starting_time": 1315112400000,
                    "ending_time": 1474866000000
                }]
            }];

            var chart = timelines()
                        .beginning(datos[0].times[0].starting_time)
                        .ending(datos[5].times[0].ending_time)
                        .stack()
                        .tickFormat({
                            format: d3.timeFormat("%Y"),
                            tickTime: d3.timeYear,
                            tickInterval: 10,
                            tickSize: 10,
                            tickValues: null
                        });
 
            var svg = d3.select("#vis").append("svg").attr("width", 600).attr("height", 600).attr("transform", "translate(0, 100)")
                        .datum(datos).call(chart);
            svg.style("opacity", 0).transition(t).style("opacity", 1);
                        
           
        }
        functions.push(stepEventos);
        let palJusticia = function(){
            let t = d3.transition("image").duration(1000);
            let t2 = d3.transition("prevStep").duration(1000);
            let t3 = d3.transition("thisStep").duration(1000);
            let t4 = d3.transition("nextStep").duration(1000);

            d3.select("#eventos").transition(t2).style("opacity", 0);
            d3.select("#pal-justicia").transition(t3).style("opacity", 1);
            d3.select("#tweets-pal").transition(t4).style("opacity", 0);
            d3.select("svg").remove();
            d3.select("#vis").append("svg").attr("width", 600).attr("height", 600);
            let g = d3.select("svg");
            g.append("svg:image")
                .attr('xlink:href', 'https://www.elheraldo.co/sites/default/files/styles/width_860/public/articulo/2015/11/06/d0199733_0.jpg?itok=6im3s9-6')
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", "100%")
                .attr("height", "100%")
                .style("opacity", 0)
                .transition(t)
                .style("opacity", 1);
        }

        functions.push(palJusticia);
        let tweetsPal = function(){
            let t = d3.transition("image").duration(1000);
            let t2 = d3.transition("prevStep").duration(1000);
            let t3 = d3.transition("thisStep").duration(1000);
            let t4 = d3.transition("nextStep").duration(1000);

            d3.select("#pal-justicia").transition(t2).style("opacity", 0);
            d3.select("#tweets-pal").transition(t3).style("opacity", 1);
            d3.select("#caguan").transition(t4).style("opacity", 0);
            d3.select("svg").remove();
            d3.select("#vis").append("svg").attr("width", 600).attr("height", 600);
            let g = d3.select("svg");
            g.append("svg:image")
                .attr('xlink:href', 'https://www.elheraldo.co/sites/default/files/styles/width_860/public/articulo/2015/11/06/d0199733_0.jpg?itok=6im3s9-6')
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", "100%")
                .attr("height", "100%");
        }
        functions.push(tweetsPal);
        let fantasma2 = function(){
            let t3 = d3.transition("thisStep").duration(1000);
            d3.select("#tweets-pal").transition(t3).style("opacity", 1);
        }
        functions.push(fantasma2);
        let caguan = function(){
            let t = d3.transition("image").duration(1000);
            let t2 = d3.transition("prevStep").duration(1000);
            let t3 = d3.transition("thisStep").duration(1000);
            let t4 = d3.transition("nextStep").duration(1000);

            d3.select("#tweets-pal").transition(t2).style("opacity", 0);
            d3.select("#caguan").transition(t3).style("opacity", 1);
            d3.select("#tweets-caguan").transition(t4).style("opacity", 0);
            d3.select("svg").remove();
            d3.select("#vis").append("svg").attr("width", 600).attr("height", 600);
            let g = d3.select("svg");
            g.append("svg:image")
                .attr('xlink:href', 'https://static.iris.net.co/semana/upload/images/2015/10/25/447673_225453_1.jpg')
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", "100%")
                .attr("height", "100%")
                .style("opacity", 0)
                .transition(t)
                .style("opacity", 1);
        }

        functions.push(caguan);
        let tweetsCaguan = function(){
            let t = d3.transition("image").duration(1000);
            let t2 = d3.transition("prevStep").duration(1000);
            let t3 = d3.transition("thisStep").duration(1000);
            let t4 = d3.transition("nextStep").duration(1000);

            d3.select("#caguan").transition(t2).style("opacity", 0);
            d3.select("#tweets-caguan").transition(t3).style("opacity", 1);
            d3.select("#masacres").transition(t4).style("opacity", 0);
            d3.select("svg").remove();
            d3.select("#vis").append("svg").attr("width", 600).attr("height", 600);
            let g = d3.select("svg");
            g.append("svg:image")
                .attr('xlink:href', 'https://static.iris.net.co/semana/upload/images/2015/10/25/447673_225453_1.jpg')
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", "100%")
                .attr("height", "100%");
        }
        functions.push(tweetsCaguan);
        let fantasma3 = function(){
            let t3 = d3.transition("thisStep").duration(1000);
            d3.select("#tweets-caguan").transition(t3).style("opacity", 1);
        }
        functions.push(fantasma3);
        let masacres = function(){
            let t = d3.transition("image").duration(1000);
            let t2 = d3.transition("prevStep").duration(1000);
            let t3 = d3.transition("thisStep").duration(1000);
            let t4 = d3.transition("nextStep").duration(1000);

            d3.select("#tweets-caguan").transition(t2).style("opacity", 0);
            d3.select("#masacres").transition(t3).style("opacity", 1);
            d3.select("#secuestros").transition(t4).style("opacity", 0);
            d3.select("svg").remove();
            var margin = {top: 100, right: 100, bottom: 100, left: 150},
                         width = 600 - margin.left - margin.right,
                         height = 600 - margin.top - margin.bottom;
            
            
            let datos =[{
                actor: "Grupos Paramilitares",
                valor: 0.588
            }, {
                actor: "Guerrillas",
                valor: 0.173
            },{
                actor: "Fuerza Pública",
                valor: 0.08
            }, {
                actor: "Grupo no identificado",
                valor: 0.149
            },{
                actor: "Otros",
                valor: 0.01
            }];

            datos.forEach(function(d) {
                d.valor = +d.valor;
              });
            
            var y = d3.scaleBand()
                        .range([height, 0])
                        .padding(0.1);

            var x = d3.scaleLinear()
                        .range([0, width]);

            var svg = d3.select("#vis").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", 
                  "translate(" + margin.left + "," + margin.top + ")");

            x.domain([0, d3.max(datos, function(d){ return d.valor; })])
            y.domain(datos.map(function(d) { return d.actor; }));

            let tb = d3.transition("bar").duration(1000);

            svg.selectAll(".bar")
               .data(datos)
               .enter().append("rect")
               .attr("class", "bar")
               .transition(tb)
               .attr("width", function(d) {return x(d.valor); } )
               .attr("y", function(d) { return y(d.actor); })
               .attr("height", y.bandwidth())
               .style("fill", "#229934");
            
               svg.append("g")
               .attr("transform", "translate(0," + height + ")")
               .call(d3.axisBottom(x))

               svg.append("g")
                  .call(d3.axisLeft(y));

               svg.style("opacity", 0).transition(t).style("opacity", 1);
        }
        functions.push(masacres);

        let secuestros = function(){
            let datos = [{
                actor: "Grupos Paramilitares",
                valor: 0.094
            },
            {
                actor: "Guerrillas",
                valor: 0.906
            }];
            let t = d3.transition("image").duration(1000);
            let t2 = d3.transition("prevStep").duration(1000);
            let t3 = d3.transition("thisStep").duration(1000);
            let t4 = d3.transition("nextStep").duration(1000);

            d3.select("#masacres").transition(t2).style("opacity", 0);
            d3.select("#secuestros").transition(t3).style("opacity", 1);
            d3.select("#paz").transition(t4).style("opacity", 0);
            d3.select("svg").remove();
            d3.select("#vis").append("svg").attr("width", 600).attr("height", 600);

            var svg = d3.select("svg"),
                margin = { top: 20, right: 20, bottom: 30, left: 40 },
                width = +svg.attr("width") - margin.left - margin.right,
                height = +svg.attr("height") - margin.top - margin.bottom;

            var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
                y = d3.scaleLinear().rangeRound([height, 0]);

            var g = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            d3.select("svg").style("opacity", 0).transition(t).style("opacity", 1);

            datos.forEach(function (d) {
                d.valor = +d.valor;
            });

            x.domain(datos.map(function (d) { return d.actor; }));
            y.domain([0, d3.max(datos, function (d) { return d.valor; })]);

            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y).ticks(10, "%"))
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Secuestros");

            let tb = d3.transition("bar").duration(1000);

            let bars = g.selectAll(".bar")
                .data(datos)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) { return x(d.actor); })
                .attr("y", function (d) { return y(d.valor); })
                .style("fill", "#E8B121")
                .attr("width", x.bandwidth());

            bars
                .transition(tb)
                .attr("height", function (d) { return height - y(d.valor); });
            bars
                .on("mouseover", function (d) {
                    let g = d3.select(this)
                        .style("cursor", "pointer")
                        .style("opacity", 0.7)
                        .append("g")
                        .attr("class", "text-group");
                })
                .on("mouseout", function (d) {
                    d3.select(this)
                        .style("cursor", "none")
                        .style("opacity", 1)
                        .select(".text-group").remove();
                });

        }
        functions.push(secuestros);
        let step4 = function () {
            let t = d3.transition("image").duration(1000);
            let t2 = d3.transition("prevStep").duration(1000);
            let t3 = d3.transition("thisStep").duration(1000);
            let t4 = d3.transition("nextStep").duration(1000);

            d3.select("#secuestros").transition(t2).style("opacity", 0);
            d3.select("#paz").transition(t3).style("opacity", 1);
            d3.select("#referencias").transition(t4).style("opacity", 0);
            d3.select("svg").remove();
            d3.select("#vis").append("svg").attr("width", 600).attr("height", 600);
            let g = d3.select("svg");
            g.append("svg:image")
                .attr('xlink:href', 'https://elpais.com/internacional/imagenes/2015/09/23/actualidad/1443034878_643790_1443076625_noticia_fotograma.jpg')
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", "100%")
                .attr("height", "100%")
                .style("opacity", 0)
                .transition(t)
                .style("opacity", 1);

           
        }

        functions.push(step4);

        let referencias = function(){
            let t = d3.transition("image").duration(1000);
            let t2 = d3.transition("prevStep").duration(1000);
            let t3 = d3.transition("thisStep").duration(1000);
            let t4 = d3.transition("nextStep").duration(1000);
            d3.select("#paz").transition(t2).style("opacity", 0);
            d3.select("#referencias").transition(t3).style("opacity", 1);
            d3.select("#end").transition(t4).style("opacity",0)
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

        functions.push(referencias);

        let step5 = function () {
            let t = d3.transition("image").duration(1000);
            let t2 = d3.transition("prevStep").duration(1000);
            let t3 = d3.transition("thisStep").duration(1000);
            d3.select("#referencias").transition(t2).style("opacity", 0);
            d3.select("#end").transition(t3).style("opacity", 1);
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

    handleName(e) {
        this.setState({ name: e.target.value });
    }

    handleEmail(e) {
        this.setState({ email: e.target.value });
    }

    handlePassword(e) {
        this.setState({ password: e.target.value });
    }

    handleConfirmPassword(e) {
        this.setState({ confirmPassword: e.target.value });
    }

    handleCreateAccount(e) {
        e.preventDefault();
        if (this.state.name === "") {
            alert("Por favor ingresa un nombre válido");
        }
        else if (this.state.email === "") {
            alert("Por favor ingresa un correo válido");
        }
        else if (this.state.password === "") {
            alert("Por favor ingresa la contraseña");
        }
        else if (this.state.password.length < 6) {
            alert("Por favor ingresa una contraseña con 6 caracteres o más");
        }
        else if (this.state.confirmPassword === "") {
            alert("Por favor confirma tu contraseña");
        }
        else if (this.state.password !== this.state.confirmPassword) {
            alert("Las contraseñas no coinciden");
        }
        else {
            try {
                Accounts.createUser({
                    email: this.state.email,
                    password: this.state.password,
                    profile: {
                        name: this.state.name
                    }
                }, (err) => {
                    if (err) {
                        alert(err);
                    }
                    else {
                        alert("Cuenta creada exitosamente");
                        this.setState({ status: "Loged" })
                    }
                });
            }
            catch (e) {
                alert(e);
            }

        }
    }

    handleLogin(e) {
        e.preventDefault();
        if (this.state.email == "") {
            alert("Por favor ingresa un correo válido");
        }
        else if (this.state.password == "") {
            alert("Por favor ingresa la contraseña");
        }
        else {
            Meteor.loginWithPassword(this.state.email, this.state.password, (err) => {
                if (err) {
                    alert(err);
                }
                else {
                    alert("Ingresado correctamente");
                    this.setState({ status: "Loged" })
                }
            });
        }
    }

    handleLogOut(event) {
        event.preventDefault();
        try {

            Meteor.logout((err) => {
                if (err) {
                    throw err;
                }
                else {
                    this.setState({
                        status: "Login"
                    })
                }
            });
        }
        catch (e) {
            alert("Hubo un error cerrando sesión, por favor intente de nuevo");
        }
    }

    handleComment() {
        if (Meteor.user() === null) {
            alert("Necesitar iniciar sesión para poder añadir un comentario ");
        }
        else if (this.state.comment === "") {
            alert("El comentario no puede estar vacio")
        }
        else {
            Meteor.call("comments.add", this.state.comment, Meteor.user().emails[0].address, Meteor.user().profile.name);
            alert("Comment añadido!");

            document.getElementById("commentTextBox").value = ""
            this.state.comment = ""
        }
    }

    handleCommentChange(e) {
        this.setState({ comment: e.target.value });
    }

    renderButtons() {
        if (this.state.status === "Login") {
            return (
                <div>
                    <h2>Ingresa para poder participar en la encuesta</h2>
                    <button id="login" type="button" className="btn btn-primary" onClick={this.handleLoginButton}> Iniciar sesión </button>
                    <button id="signup" type="button" className="btn btn-primary" onClick={this.handleSignUpButton}> Registrate </button>
                    <br />
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Correo:</label>
                            <input type="email" className="form-control" id="email" placeholder="Ingresa tu email" name="email" onChange={this.handleEmail} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Contraseña:</label>
                            <input type="password" className="form-control" id="pwd" placeholder="Ingresa tu contraseña" name="pswd" onChange={this.handlePassword} />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary" onClick={this.handleLogin}>Ingresar</button>
                    </form>
                </div>
            )
        }
        else if (this.state.status === "SignUp") {
            return (
                <div>
                    <h2>Ingresa para poder participar en la encuesta</h2>
                    <button id="login" type="button" className="btn btn-primary" onClick={this.handleLoginButton}> Iniciar sesión </button>
                    <button id="signup" type="button" className="btn btn-primary" onClick={this.handleSignUpButton}> Registrate </button>
                    <br />
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Nombre:</label>
                            <input type="text" className="form-control" id="name" placeholder="Ingresa tu nombre" name="name" onChange={this.handleName} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Correo:</label>
                            <input type="email" className="form-control" id="email" placeholder="Ingresa tu email" name="email" onChange={this.handleEmail} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Contraseña:</label>
                            <input type="password" className="form-control" id="pwd" placeholder="Ingresa tu contraseña" name="pswd" onChange={this.handlePassword} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Confirma tu contraseña:</label>
                            <input type="password" className="form-control" id="confirmPswd" placeholder="Confirma tu contraseña" name="confirmPswd" onChange={this.handleConfirmPassword} />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary" onClick={this.handleCreateAccount}>Crear cuenta</button>

                    </form>
                </div>
            )
        }
        else if (this.state.status === "Loged") {
            if (Meteor.user() !== undefined) {
                return (
                    <div>
                        <h2>Hola <strong> {Meteor.user().profile.name}</strong></h2>
                        <br />
                        <button type="submit" className="btn btn-primary" onClick={this.handleLogOut}>Cerrar sesión</button>
                    </div>
                )
            }
        }
    }

    formatDate(date) {
        var monthNames = [
            "Enero", "Febrero", "Marzo",
            "Abril", "Mayo", "Junio", "Julio",
            "Agosto", "Septiembre", "Octubre",
            "Noviembre", "Diciembre"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return "Realizo un comentario el " + day + " de " + monthNames[monthIndex] + " del " + year
    }
    render() {
        return (
            <div className="container-fluid">
                <div id="scrollytelling">
                    <div className="row">
                        <div className="col-sm-12">
                            <div id="sections">
                                <section className="step" id="inicio">
                                    <br />
                                    <strong>
                                        <h1>Conflicto Armado en Colombia</h1>
                                    </strong>
                                    <p>
                                        Es un conflicto violento que se desarrolla desde la decada de los sesenta hasta la actualidad.
                                        A lo largo de su historia ha tenido diversos actores, entre los cuales destacan: Las FARC, el ELN,
                                        los grupos paramilitares, el gobierno de Colombia y los carteles de la droga.
                                </p>
                                    <br />
                                </section>
                                <section className="step" id="datos-generales">
                                    <h1> Daño Colateral </h1>
                                    <p>
                                        Según estadísticas del Centro Nacional de Memoria Histórica, en Colombia entre los años de 1958 y 2012,
                                        el conflicto armado ha causado la muerte de 218.094 personas. De estos cerca del 19%(40.787 muertos) fueron combatientes.
                                        El 81% restante (177.307 muertos) fueron civiles.
                                    </p>
                                </section>
                                <section className="step" id="antecedentes">
                                    <h1> Antecedentes </h1>
                                    <p>

                                        A lo largo de su historia, Colombia se ha encontrado constatemente en conflictos políticos. El 9 de Abril de 1948
    -                                   con el asesinato de Jorge Eiécer Gaitán, daba inicio el periodo conocido como "La Violencia". Dicho conflicto terminaría
    -                                   en el año 1956 con la creación del frente nacional. No obstante, dicho acuerdo generó descontento en los partidos políticos
    -                                   no tradicionales, lo cual dió lugar a los grupos insurgentes conocidos como bandoleros.
                                    </p>
                                </section>
                                <section className="step" id="actores">
                                    <h1> Actores </h1>
                                    <p>
                                        A lo largo del conflicto, se han visto envueltos diferentes actores con diferentes ideologías políticas,
                                        entre estos se encuentran los grupos guerrilleros de izquierda como el ELN, el EPL, el M-19 o las FARC. Adicionalmente,
                                        hace parte del conflicto los grupos paramilitares o autodefensas, entre las cuales destacan las AUC. Finalmente, el último
                                        gran participante es el estado colombiano. 
                                    </p>
                                </section>
                                <section className="step" id="ELN">
                                    <h1> Fundación ELN </h1>
                                    <p>
                                        En 1964 se da la fundación del ejercito de liberación nacional (ELN). Este fue conformado, en su inicio,
                                        por estudiantes colombianos que viajaron a Cuba becados por el expresidente Fidel Castro. Este grupo, inicia
                                        sus operaciones en Barrancabermeja, Santander. Su primera incursión armada fué en Simacota, en el mismo departamento.
                                    </p>
                                </section>
                                <section className="step" id="M19">
                                    <h1> Movimiento 19 de Abril </h1>
                                    <p>
                                        El día 19 de Abril de 1970, se conforma el grupo guerrillero de izquierda conocido como el movimiento 19 de Abril.
                                        Su principal motivo consiste en disputar el fraude electoral de 1970, donde se nombró como presidente a Misael Pastrana,
                                        en lugar de Gustavo Rojas Pinilla.
                                    </p>
                                </section>
                                <section className="step" id="farc">
                                    <h1> Fundación FARC </h1>
                                    <p>
                                        Las Fuerzas Armadas Revolucionarias de Colombia (FARC), fueron fundadas en el año 1964 después un ataque realizado por el gobierno colombiano,
                                        con el fin de reafirmar las políticas establecidas en el frente nacional. Durante sus primeros 10 a 20 años, el crecimiento del grupo fue lento,
                                        no obstante, hacia los años 80, el grupo plantea una estrategia de duplicamiento de frentes con el fin de reclutar un mayor número de integrantes.
                                </p>
                                </section>
                                <section className="step" id="tweets-farc">
                                    <h1> Algunos Tweets sobre FARC </h1>
                                    <div className="container">
                                        {this.renderTweets(this.state.farcTweets)}
                                    </div>
                                </section>
                                <section className="step" id="fantasma1">
                                    <h1> Some phantom text </h1>
                                </section>
                                <section className="step" id="auc">
                                    <h1> Autodefensas Unidas de Colombia </h1>
                                    <p>
                                        Se conforman en el año 1996, con la unión de diversos grupos de autodefensas que habían sido conformados previamente en las regiones de Córdoba y Urabá.
                                        Estas son patrocinadas por ganaderos de la zona y su principal objetivo consiste en combatir a los grupos guerrilleros de izquierda como lo son las FARC,
                                        el ELN y el EPL.
                                    </p>
                                </section>
                                <section className="step" id="participacion">
                                    <h1> Participación </h1>
                                    <p>
                                        Desde 1895 a 2012 fueron asesinadas cerca de 150.000 personas. De estas 23.161 (10.62) han sido asesinadas selectivamente.
                                        De estos 8.903 (38.4%) asesinatos han sido cometidos por grupos paramilitares, 3.899 (16.9%) por guerrillas,
                                        2.399 (10.4%) por fuerza pública y 6.406(27.7%) por grupos armados no identificados

                                    </p>
                                </section>
                                <section className="step" id="eventos">
                                    <h1> Eventos </h1>
                                    <p>
                                        A lo largo del conflicto han ocurrido diversos sucesos que han marcado la historia del país.
                                        Desde atentados terroristas, hasta negociaciones de paz fallidas, y procesos de desmovilización.
                                        Entre los más destacados se encuentra, la toma del palacio de justicia, las negociaciones de paz de San 
                                        Vicente del Caguán, la Operación Jaque y el tratado de paz recientemente consumado.
                                    </p>
                                </section>
                                <section className="step" id="pal-justicia">
                                    <h1> Toma del Palacio de Justicia </h1>
                                    <p>
                                        En los días 6 y 7 de Noviembre del año 1985, el M-19 perpetra la toma del palacio de justicia de Bogotá. En 
                                        el inicio del suceso, el grupo guerrillero mantuvo 350 rehénes. Sin embargo, con el paso del tiempo la situación 
                                        se violentó y dejó un saldo de 98 muertos. A día de hoy, aún no se cuenta con cifras exactas para evaluar el número de 
                                        víctimas.
                                    </p>
                                </section>
                                <section className="step" id="tweets-pal">
                                    {this.renderTweets(this.state.pJusticiaTweets)}
                                </section>
                                <section className="step">
                                    <h1> Fill in content to allow better transitions </h1>
                                </section>
                                <section className="step" id="caguan">
                                    <h1> Negociaciones en San Vicente del Caguán </h1>
                                    <p>
                                        El 7 de enero de 1999 el gobierno del presidente Andrés Pastrana, establece una zona de distención en el municipio de 
                                        San Vicente del Caguán, con el objetivo de entablar diálogos de paz con las FARC. Dichas negociaciones se extenderían durante 
                                        alrededor de tres años. Estas finalizan el 21 de Febrero de 2002, con el rompimiento del diálogo y tienen como resultado, la 
                                        implementación del Plan Colombia, por parte del estado colombiano.
                                    </p>
                                </section>
                                <section className="step" id="tweets-caguan">
                                    {this.renderTweets(this.state.caguanTweets)}
                                </section>
                                <section className="step">
                                    <h1> Fill in content to allow better transitions </h1>
                                </section>
                                <section className="step" id="masacres">
                                    <h1>Masacres</h1>
                                    <p>
                                    Desde 1985 a 2012 han ocurrido 1982 masacres. 1.166 (58.8%) de estas fueron cometidos por grupos paramilitares, 343 (17.3%) por guerrillas, 
                                    158 (8%) por fuerza pública, 295 (14.9%) por grupos armados no identificados y 20 (1%) por grupos paramilitares y miembros de la fuerza pública 
                                    u otros grupos armados. Entre las más destacadas se encuentran la toma a Mitú y la toma a Miraflores, ambas perpetradas por las FARC.
                                    </p>
                                </section>
                                <section className="step" id="secuestros">
                                    <h1> Secuestros </h1>
                                    <p>
                                    En Colombia, entre los años de 1958 y 2012, han secuestrado a 27.023 personas. 24.482 (90.6%) personas han sido secuestradas por guerrillas y 2.541 (9.4%) 
                                    por grupos paramilitares.
                                    </p>
                                </section>
                                <section className="step" id="paz">
                                    <h1> Tratado de Paz </h1>

                                    <p>
                                        El lunes 26 de Septiembre de 2016, el gobierno de Colombia, comandado por el presidente Juan Manuel Santos,
                                        firma un grupo de acuerdos con las Fuerzas Armadas Revolucionarias Colombianas (FARC), estos son conocidos
                                        como los acuerdos de paz de La Habana. Después de la retificación de los acuerdos en el congreso, inició el proceso
                                        de desarme y posteriormente, la reintegración a la vida civil.
                                </p>
                                </section>
                                <section className="step" id="referencias">
                                    <h1> Referencias </h1>
                                    <p> La información e imágenes contenidas en esta página provienen de: </p>
                                    <ul>
                                        <li> <a href="http://www.eltiempo.com/" target="_blank"> El Tiempo </a> </li>
                                        <li> <a href="http://www.elespectador.com/" target="_blank"> El espectador </a> </li>
                                        <li> <a href="http://www.centrodememoriahistorica.gov.co/micrositios/informeGeneral/estadisticas.html" target="_blank">Centro de Memoria Histórica </a> </li>
                                        <li> <a href = "https://es.wikipedia.org/wiki/Conflicto_armado_interno_en_Colombia" target="_blank"> Wikipedia </a> </li>
                                    </ul>
                                </section>
                                <section className="step" id="end">
                                    <strong>
                                        <h1 id="gracias"> Gracias </h1>
                                        <p>
                                           No puedes separar la paz de la libertad, porque nadie puede estar en paz, a no ser que tenga su libertad.
                                        </p> 
                                        -Malcolm X
                                    </strong>
                                </section>
                            </div>

                            <div id="vis">
                            </div>

                            <br />
                            <div className="row">
                                <div className="col-md-8">
                                    {
                                        this.renderButtons()
                                    }
                                </div>
                            </div>
                            <br />
                            <h2>Participa en una pequeña encuesta sobre el conflicto armado en Colombia</h2>
                            <br />
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div className="col-md-5">

                                    <div className="panel panel-white post panel-shadow questions">
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
                                        <button type="submit" className="btn btn-primary" onClick={this.handleAnswerQ1}>Aceptar</button>
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
                                    <div className="panel panel-white post panel-shadow questions">
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
                                        <button type="submit" className="btn btn-primary" onClick={this.handleAnswerQ2}>Aceptar</button>
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
                                    <div className="panel panel-white post panel-shadow questions">
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
                                        <button type="submit" className="btn btn-primary" onClick={this.handleAnswerQ3}>Aceptar</button>
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
                            {/** Section of comments**/}
                            <div className="newComment">
                                <h2>Expresa tu postura acerca del conflicto armado en Colombia</h2>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="usr">Deja tu postura aquí:</label>
                                        <input type="text" className="form-control panel panel-white post panel-shadow" id="commentTextBox" onChange={this.handleCommentChange} />
                                        <br />
                                        <button type="button" className="btn btn-primary" id="buttonComment" onClick={this.handleComment}>Send comment</button>
                                    </div>
                                </form>

                            </div>
                            <div className="comments">
                                <div className="row">
                                    <h2>Mira la postura de los demás</h2>
                                    <div className="col-sm-8">
                                        {
                                            this.props.comments.map((c, i) => (
                                                <div key={i + "a"} className="panel panel-white post panel-shadow">
                                                    <div key={i + "b"} className="post-heading">
                                                        <div key={i + "c"} className="pull-left image">
                                                            <img key={i + "d"} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNLzZszQbQf6jkknIGI8A3rj-0BoEngyi9156njfrCjPED9_b2vw" className="img-circle avatar" alt="user profile image" />
                                                        </div>
                                                        <div key={i + "e"} className="pull-left meta">
                                                            <div key={i + "f"} className="title h5">
                                                                <a key={i + "g"} href="#"><b>{c.name} </b></a>
                                                            </div>


                                                            <h6 key={i + "h"} className="text-muted time">{
                                                                this.formatDate(c.dateCreated)
                                                            }</h6>
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <br />
                                                    <div key={i + "i"} className="post-description">
                                                        <p key={i + "j"} >{c.comment}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>

                                </div>
                            </div>

                            <br />
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe("comments");
    return {
        comments: Comments.find({}).fetch(),
    }
})(Scrollytelling);
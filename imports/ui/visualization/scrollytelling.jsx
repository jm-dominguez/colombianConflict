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
                .attr('xlink:href', 'https://360radio.com.co/wp-content/uploads/2016/09/Santos-Farc-Castro-Colombia.jpg')
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
                        <p>
                            Es un conflicto violento que se desarrolla desde la decada de los sesenta hasta la actualidad.
                            A lo largo de su historia ha tenido diversos actores, entre los cuales destacan: Las FARC, el ELN,
                            los grupos paramilitares, el gobierno de Colombia y los carteles de la droga.
                        </p>
                    </section>
                    <section className="step">
                        <h1> Antecedentes </h1>
                        <p>

                            Desde la independencia de Colombia en 1819 y la desintegración de la república creada por Bolívar en 1830, el país no ha estado
                            ajeno a la violencia bipartidista, hecho que fue evidente en las numerosas guerras civiles que se desarrollaron durante el siglo XIX
                            culminando en la Guerra de los Mil Días (1899–1902).
                        </p>
                        <br />
                        <p>
                            A lo largo de su historia, Colombia se ha encontrado constatemente en conflictos políticos. El 9 de Abril de 1948
                             con el asesinato de Jorge Eiécer Gaitán, daba inicio el periodo conocido como "La Violencia". Dicho conflicto terminaría
                             en el año 1956 con la creación del frente nacional. No obstante, dicho acuerdo generó descontento en los partidos políticos
                             no tradicionales, lo cual dió lugar a los grupos insurgentes conocidos como bandoleros.
                        </p>
                    </section>
                    <section className="step">
                        <h1> Tratado de Paz </h1>
                        <p>
                            Después de casi cuatro (4) años de negociaciones con altas y bajas, el 23 de junio de 2016 se firmó el último de los seis (6)
                            puntos de la agenda de negociación prevista entre el gobierno y las FARC, declarando el cese bilateral de hostilidades, el desarme,
                            desmovilización y reintegro a la vida civil de los miembros del grupo insurgente, según declaraciones del Jefe del equipo negociador
                            del gobierno, Humberto de La Calle. Todo se efectuará de manera gradual en un lapso de seis (6) meses después de la firma oficial.
                            Pese a que en junio de 2016 se pactó el último punto de la agenda, las conversaciones se extendieron por dos (2) meses más hasta el
                            28 de agosto del mismo año, cuando quedó totalmente discutido y aprobado por ambas partes los Acuerdos de La Habana319​ que se firmaron
                            de manera oficial en Cartagena el 26 de septiembre para terminar la guerra entre el gobierno y las FARC, sometiéndolos a votación del
                            pueblo colombiano por medio de un plebiscito que se desarrolló el 2 de octubre de 2016, siendo finalmente rechazados por estrecho margen.
                        </p>
                        <br />
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
        );
    }
}
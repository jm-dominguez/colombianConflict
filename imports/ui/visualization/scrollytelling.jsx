import React from "react";
import * as d3 from "d3";

import "./scroll.css";

export default class Scrollytelling extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            containerStart: 0,
            currentIndex: 0
        }

        this.handleScroll = this.handleScroll.bind(this);
        this.active = this.active.bind(this);
    }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll, { passive: true });
    }

    componentWillUnmount(){
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
        sections.each(function(d, i){
            let top = this.getBoundingClientRect().top;
            
            if(i === 0){
                startPos = top;
            }
            sectionPositions.push(top - startPos);

        })
        this.state.containerStart = container.node().getBoundingClientRect().top + window.pageYOffset;

        let sectionIndex =  d3.bisect(sectionPositions, pos);
        
        sectionIndex = Math.min(sections.size() - 1, sectionIndex);
        
        if(this.state.currentIndex !== sectionIndex){
            this.state.currentIndex = sectionIndex;
            this.active();
        }
      }

      active(){
          console.log("hola");
      }

    render(){
        return (
            <div id="scrollytelling">
                <div id = "sections">
                    <section className = "step">
                        <h1>Conflicto Armado en Colombia</h1>
                        <br/>
                        Ayuuudddaaa
                        <br/>
                        Ayuuudddaaa
                        <br/>
                        Ayuuudddaaa
                        <br/>
                        Ayuuudddaaa
                        <br/>
                        Ayuuudddaaa
                        <br/>
                        Ayuuudddaaa
                        <br/>
                        Ayuuudddaaa
                        <br/>
                        Ayuuudddaaa
                        <br/>
                        Ayuuudddaaa
                        <br/>
                        Ayuuudddaaa
                        <br/>
                        Ayuuudddaaa
                        <br/>
                        Ayuuudddaaa
                        <br/>
                        Ayuuudddaaa
                        <br/>
                        Ayuuudddaaa
                        <br/>
                        Ayuuudddaaa
                    </section>
                    <section className = "step">
                        <h1> Inicio </h1>
                        <br/>
                        Pérdidas
                        <br/>
                        Pérdidas
                        <br/>
                        Pérdidas
                        <br/>
                        Pérdidas
                        <br/>
                        Pérdidas
                        <br/>
                        Pérdidas
                        <br/>
                        Pérdidas
                        <br/>
                        Pérdidas
                        <br/>
                        Pérdidas
                        <br/>
                        Pérdidas
                        <br/>
                        Pérdidas
                        <br/>
                        Pérdidas
                        <br/>
                        Pérdidas
                        <br/>
                        Pérdidas
                        <br/>
                        Pérdidas
                    </section>
                    <section className = "step">
                        <h1> Tratado de Paz </h1>
                        <br/>
                        FIN
                        <br/>
                        FIN
                        <br/>
                        FIN
                        <br/>
                        FIN
                        <br/>
                        FIN
                        <br/>
                        FIN
                        <br/>
                        FIN
                        <br/>
                        FIN
                        <br/>
                        FIN
                        <br/>
                        FIN
                        <br/>
                        FIN
                        <br/>
                        FIN
                        <br/>
                        FIN
                        <br/>
                        FIN
                        <br/>
                        FIN
                        <br/>
                        FIN
                    </section>
                </div>

                <div id = "vis">
                </div>
                
            </div>
        );
    }
}
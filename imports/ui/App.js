import React from "react";
import Scrollytelling from "./visualization/scrollytelling.jsx";

export default class App extends React.Component{

    render() {
        return (
            <div id="main" className="container">
                <Scrollytelling/>
            </div>
        );
    }
}
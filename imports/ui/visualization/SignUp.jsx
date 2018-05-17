import React from "react";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";

export default class SignUp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            name: ""
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleEmail(e) {
        console.log(e.target.value);
        this.setState({ email: e.target.value });
    }

    handlePassword(e) {
        console.log(e.target.value);
        this.setState({ password: e.target.value });
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
            alert("Logeadito");
        }
    }

    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Correo:</label>
                        <input type="email" className="form-control" id="email" placeholder="Ingresa tu email" name="email" onChange={this.handleEmail} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Contraseña:</label>
                        <input type="password" className="form-control" id="pwd" placeholder="Ingresa tu contraseña" name="pswd" onChange={this.handlePassword} />
                    </div>
                </form>
            </div>
        )
    }
}
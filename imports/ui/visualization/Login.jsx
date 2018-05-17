import React from "react";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            state: "notLoged"
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.renderForm = this.renderForm.bind(this);
    }

    handleEmail(e) {
        this.setState({ email: e.target.value });
    }

    handlePassword(e) {
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
            Meteor.loginWithPassword(this.state.email, this.state.password, (err) => {
                if (err) {
                    alert(err);
                }
                else {
                    alert("Ingresado correctamente");
                    this.setState({ state : "Loged"})
                }
            });
        }
    }

    handleCreateAccount(e) {
        e.preventDefault();

    }

    renderForm() {
        if (this.state.state === "notLoged") {
            return (
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
            )
        }
        else if (this.state.state === "Loged"){
            return (
                <div>
                    <h2>Hola <strong> {Meteor.user().profile.name   }</strong></h2>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {
                    this.renderForm()
                }
            </div>
        )
    }
}
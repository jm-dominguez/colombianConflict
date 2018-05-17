import React from "react";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";

export default class SignUp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            name: "",
            confirmPassword: ""
        }

        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleCreateAccount = this.handleCreateAccount.bind(this);
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
        else if(this.state.password.length < 6 ){
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
                    }
                });
            }
            catch (e) {
                alert(e);
            }

        }
    }

    render() {
        return (
            <div>
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
}
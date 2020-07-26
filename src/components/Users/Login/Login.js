import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from "../../../utils/API";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  send = async () => {

    const { email, password } = this.state;

    if (!email || email.length <= 0) {
      console.log('vide ou invalide')
    }
    if (!password || password.length <= 0) {
      console.log('vide ou invalide')
    }
    try {
      const { data } = await API.login(email, password);
      localStorage.setItem("token", data.token);

      window.location = "/dashboard";

      console.log(data)

    } catch (error) {
      console.error('ID incorret');
    }
  };
  
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  render() {

    const { email, password } = this.state;
    
    return (
      
      <div className="container Login" style={{maxWidth: "500px"}}>

        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            // autoFocus
            type="email"
            value={email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <Button onClick={this.send} type="submit" className="btn btn-sm btn-outline-dark">
          Connexion
        </Button>
      </div>
    );
  }
}
export default Login;
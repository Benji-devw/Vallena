import React from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from "../../../utils/API";

export class Signup extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    cpassword: ""
  };
  send = async () => {
    const { username, email, password, cpassword } = this.state;
    if (!email || email.length === 0) return;
    if (!username || username.length === 0) return;
    if (!password || password.length === 0 || password !== cpassword) return;
    try {
      const { data } = await API.signup({ username, email, password });
      localStorage.setItem("token", data.token);
      window.location = "/dashboard";
    } catch (error) {
      console.error(error);
    }
  };
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  render() {
    const {username, email, password, cpassword } = this.state;
    return (
      <div className="container Login" style={{ maxWidth: "500px" }}>
        <FormGroup controlId="username">
          <FormLabel>Username</FormLabel>
          <FormControl
            // autoFocus
            type="username"
            value={username}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
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
        <FormGroup controlId="cpassword">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            value={cpassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <Button onClick={this.send} type="submit" className="btn btn-sm btn-outline-dark">
          Inscription
        </Button>
      </div>
    );
  }
}
export default Signup;
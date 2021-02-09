import React from "react";
import { signIn } from "../redux/action-creators/auth.action-creators";

import { connect } from "react-redux";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }

  handleEmailChange = (event) => {
    this.setState({email: event.target.value});
  };

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  };
  
  handleSignInClick = () => {
   if(this.state.email && this.state.password){
    this.props.dispatch(signIn({ email: this.state.email, password: this.state.password }));
   }
  };

  render(){
    const currentUser = this.props.currentUser;
    return (
    <div>
        <div>
            <form class="form-inline">
                <div class="form-group mb-2">
                    <label for="staticEmail2" class="sr-only">Email</label>
                    <input type="text" class="form-control" 
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.handleEmailChange}></input>
                          </div>
                          <div class="form-group mx-sm-3 mb-2">
                              <label for="inputPassword2" class="sr-only">Password</label>
                              <input type="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange} class="form-control" ></input>
                </div>
                <button type="button" class="btn btn-primary mb-2" onClick={this.handleSignInClick}>Log in</button>
            </form>
        </div>
     </div>
    );
  }
}


export default connect()(Login);
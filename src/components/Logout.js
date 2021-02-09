import React from "react";
import { connect } from "react-redux";
import { signOut } from "../redux/action-creators/auth.action-creators";

class Logout  extends React.Component {
  handleSignOut = () => {
      this.props.dispatch(signOut());
    };

  render(){
    return (
      <div>
        <form class="form-inline">
            <div class="form-group mb-2">
                <label for="staticEmail2" class="sr-only">Hi user!</label>
                <button type="button" class="btn btn-primary mb-2" onClick={this.handleSignOut} >Log out</button>
            </div>
         </form>
      </div>
    );
  }
}

export default connect()(Logout);
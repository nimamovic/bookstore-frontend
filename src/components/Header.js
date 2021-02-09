import Login from './Login' 
import React from "react";
import { Link } from "react-router-dom";
import Logout from './Logout';
import { connect } from "react-redux";

class Header extends React.Component {
render(){
  const currentUser = this.props.currentUser;
  return (
    <div>
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
            <div class="container">
              <a class="navbar-brand js-scroll-trigger" href="#page-top">
              <Link to={`/`} className="button muted-button">
              Bookstore
                </Link>
               </a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item">
                  <div className="navLinks">
                  <a class="btn btn-outline-primary" href="#" role="button"> <Link to="/books">  Books  </Link></a>                   
                  </div>
                  </li>
                  <li class="nav-item">
                  <div className="navLinks">
                  {currentUser ? ( <a class="btn btn-outline-primary" href="#" role="button"><Link to="/addBook">  ADD BOOK  </Link></a>  ) : (null) }
                 
                  </div>
                  </li>
                  <li class="nav-item">
                  <div className="navLinks">
                  <a class="btn btn-outline-primary" href="#" role="button"> <Link to="/authors">  Authors </Link></a>       
                  </div>  
                  </li>
                  <li class="nav-item">
                  <div className="navLinks">
                  {currentUser ? (  <a class="btn btn-outline-primary" href="#" role="button"> <Link to="/addAuthor">  ADD AUTHOR  </Link></a>  ) : (null) }
                  </div>  
                  </li>
                </ul> 
              </div>
              <div>
              {currentUser ? (<Logout></Logout> ) : (<Login/>) }
              </div>
                  
              
            
            </div>
          </nav>
          <br></br>
          <div class="container text-center" class="bg-primary text-white">
          <div class="container">
          <div  class="row" >

        <div class="col">
              <h2>.</h2>
              <h2> Welcome to BOOKSTORE!</h2>
              <p class="lead"> Here you can see list of books and auhtors, edit or delete them or add new ones.</p>
            </div>
            </div>
          </div>
          </div>
          </div>
  );
  }
}

const mapStateToProps = state => ({
  currentUser: state.authentication.currentUser
});

export default connect(mapStateToProps)(Header);



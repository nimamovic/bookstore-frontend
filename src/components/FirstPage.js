import React from "react";
import { Link } from "react-router-dom";
import firstPageImage from './../firstPageImage.jpg';
import { connect } from "react-redux";

class FirstPage  extends React.Component {
  
    render(){
      return (
        <div>
          <div class="container">
            <div class="row">
            <div class="col-sm">
            <img class="img-fluid" alt="First page image" src={firstPageImage} width="500" height="700"/>          
            </div>
            <div class="col-sm">
            <div class="row">
                <p></p>
            </div>
            <div class="row">
                <h2>Do you want to see all books in the bookstore? </h2>
                <Link to={`/books`} className="button muted-button">
                   SEE ALL BOOKS
                </Link>
            </div>
            <div class="row">
                <h2>Do you want to see all authors in the bookstore? </h2>
                <Link to={`/authors`} className="button muted-button">
                   SEE ALL AUTHORS
                </Link>
            </div>
            </div> 
            </div>
            </div> 
        </div>
      );
    }
}

export default connect()(FirstPage);
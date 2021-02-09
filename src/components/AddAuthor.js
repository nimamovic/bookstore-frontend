import React from "react";
import { addAuthor } from "../redux/action-creators/author.action-creators";
import { getBooks } from "../redux/action-creators/book.action-creators";
import  { Link }  from "react-router-dom"; 
import { connect } from "react-redux";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddAuthor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        first_name: "",
        last_name: "",
        dob: "",
        image: "",
        books: []
    }
  }
  componentDidMount() {
    this.props.dispatch(getBooks());
  }

  handleFirstNameChange = (event) => {
    this.setState({first_name: event.target.value});
  };
  handleLastNameChange = (event) => {
    this.setState({last_name: event.target.value});
  };
  handleDOBChange = (date) => {
    this.setState({dob: date});
  };
  handleImageChange = (event) => {
    this.setState({image: event.target.value});
  };

  handleChangeBooks = (event) => {
    let book = Array.from(event.target.selectedOptions, option => option.value);
    this.setState({books: book});
  };

  handleAddClick = (event) => {
    event.preventDefault();
    if(this.state.first_name && this.state.last_name && this.state.dob && this.state.image){ 
    console.log(this.state);
    this.props.dispatch(addAuthor(this.state, this.props.history));
    }
  };

  render(){
    const { books } = this.props;
    return (
        
      <div>
          <section>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
          <div className="container mt-3">
          <form>
              <div class="form-group">
              <label for="firstNameInput">First name:</label>
                  <input type="text" class="form-control"  placeholder="FIRST NAME"
                                  value={this.state.first_name}
                                  onChange={this.handleFirstNameChange}></input>
              </div>
              <div class="form-group">
                  <label for="lastNameInput">Last name:</label>
                  <input type="text" class="form-control"  placeholder="LAST NAME"
                                  value={this.state.last_name}
                                  onChange={this.handleLastNameChange}></input>
              </div>
              <div class="form-group">
                  <label for="DOBInput">Date of birth: </label>
                  <DatePicker selected={this.state.dob} onChange={date => this.handleDOBChange(date)}  />
                </div>
              <div class="form-group">
                  <label for="imageInput">Image:</label>
                  <input type="text" class="form-control"  placeholder="image"
                                  value={this.state.image}
                                  onChange={this.handleImageChange}></input>
                  <small class="form-text text-muted">Place image url.</small>
                </div>
                <label for="Books">Author's books:</label>
                
                <div className="select-container">
                <div class="row">
                  <div className="col-sm">
                      <select multiple={true} onChange={this.handleChangeBooks} >
                          {books.map((option) => (
                          <option value={option.isbn}>{option.title}</option>
                          ))}
                      </select>
                      <small class="form-text text-muted"> Hold down the Ctrl (windows) or Command (Mac) button to select multiple options.</small> 
                  </div>
                  <div className="col-sm">
                      <Link to={'/addBook'}>
                          Book is not on the list? Add it! 
                      </Link>
                      <small class="form-text text-muted">You can skip this step and add author's books later!</small> 
                  </div>
              </div>
              </div>
              <p></p>
              <button type="button" class="btn btn-primary mb-2"  onClick={this.handleAddClick}>ADD AUTHOR</button>
              </form>
                      </div>
          </div>
        </div>
      </div>
    </section>
          </div>
    );
  }
}
const mapStateToProps = state => ({
    books: state.books.items
  });

export default connect(mapStateToProps)(AddAuthor);
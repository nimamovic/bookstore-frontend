import React from "react";
import { connect } from "react-redux";
import { getAuthor, editAuthor, deleteAuthor, deleteAuthorsBook, addAuthorsBook} from "../redux/action-creators/author.action-creators";
import { getBooks } from "../redux/action-creators/book.action-creators";
import { Link } from "react-router-dom";
import moment from 'moment';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
   
class AuthorDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        id: "",
        first_name: "",
        last_name: "",
        dob: "",
        image: "",
        booksToDelete: [],
        booksToAdd: [],
        wantsToEdit: false
    }
  };
  
  componentDidMount() {
    if(this.props.match){
      this.props.dispatch(getAuthor(this.props.match.params.id));
    }
    this.props.dispatch(getBooks());
  };
  
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

  handleDeleteBooks = (event) => {
    let book = Array.from(event.target.selectedOptions, option => option.value);
    this.setState({booksToDelete: book});
  };

  handleAddBooks = (event) => {
    let book = Array.from(event.target.selectedOptions, option => option.value);
    this.setState({booksToAdd: book});
  };

  handleGoToEditClick = (id) => {
    this.setState({
      id: id,
      wantsToEdit: true
    });
  };

  handleDelete = (id) => {
    this.props.dispatch(deleteAuthor(id,this.props.history));
  };

  handleEdit = (event) => {
    event.preventDefault();
    let forEdit = {};
    if(this.state.first_name !== "") forEdit['first_name'] = this.state.first_name;
    if(this.state.last_name !== "") forEdit['last_name'] = this.state.last_name;
    if(this.state.dob !== "") forEdit['dob'] = this.state.dob;
    if(this.state.image !== "") forEdit['image'] = this.state.image;
    this.state.booksToDelete.forEach(bookId => {
      this.props.dispatch(deleteAuthorsBook(this.state.id,bookId));
    });
    this.state.booksToAdd.forEach(bookId => {
      this.props.dispatch(addAuthorsBook(this.state.id,bookId));
    });
    if(Object.keys(forEdit).length > 0){
      this.props.dispatch(editAuthor(this.state.id,forEdit));
    }
   if(Object.keys(forEdit).length > 0 || this.state.booksToDelete.length > 0 || this.state.booksToAdd > 0){
      this.props.dispatch(getAuthor(this.props.match.params.id));
      this.setState({wantsToEdit: false});
    }

  };
  
  render() {
    const currentUser = this.props.currentUser;
    const { author } = this.props;
    const { allBooks } = this.props;
    let authorsBooks = [];
    let loadded = false;
    if(author[0]){
      loadded = true;
      let momentDate = moment(author[0].dob);
      author[0].dob = momentDate.format("YYYY-MM-DD");
      authorsBooks = author[0].books;
    }
    return (
      <div>
         <div class="container">
            <div class="row">
              <div class="col">
                <div>
                  {loadded ? (
                  <div class="card" width="30%">
                  <div class="card-body">
                    <h5 class="card-title">Author details:</h5>
                      <div>
                          {this.state.wantsToEdit ?  ( 
                              <div>
                                <small class="form-text text-muted">You don't have to edit all fields.</small>
                                <form>
                                  <label for="firstNameInput">First name:</label>
                                      <input type="text" class="form-control"  placeholder={author[0].first_name}
                                                      value={this.state.first_name}
                                                      onChange={this.handleFirstNameChange}></input>
                                  <label for="lastNameInput">Last Name:</label>
                                  <input type="text" class="form-control"  placeholder={author[0].last_name}
                                                      value={this.state.last_name}
                                                      onChange={this.handleLastNameChange}></input>
                                                  
                                <div class="form-group">
                                    <label for="DOBInput">Date of birth:</label>
                                    <DatePicker selected={this.state.dob}  placeholder={author[0].dob}  onChange={date => this.handleDOBChange(date)}  />
                                </div>
                              <div class="form-group">
                                  <label for="imageInput">Image:</label>
                                  <input type="text" class="form-control"  placeholder={author[0].image}
                                                  value={this.state.image}
                                                  onChange={this.handleImageChange}></input>
                                                  </div>
                                  </form>
                                  <div>
                                  <div className="select-container">
                                    <div class="row">
                                        <div className="col-sm">
                                        <p>Chose books you want to remove from author's book list:</p>
                                            <select multiple={true} onChange={this.handleDeleteBooks}>
                                                {authorsBooks.map((option) => (
                                                <option value={option.isbn}>{option.title}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-sm">
                                        <p>Chose books you want to add to author's book list:</p>
                                            <select multiple={true} onChange={this.handleAddBooks} >
                                                    {allBooks.map((option) => (
                                                    <option value={option.isbn}>{option.title}</option>
                                                    ))}
                                                </select>
                                        </div>
                                        <small class="form-text text-muted"> Hold down the Ctrl (windows) or Command (Mac) button to select multiple options.</small> 
                                    </div>
                                    </div>
                              <p></p>
                              <a href="#" className="btn btn-primary" onClick={this.handleEdit}>EDIT AUTHOR</a>
                            </div>
                              </div>
                                  ) : (
                                  <div>
                                    <div>
                                    <p></p>
                                    </div>
                                    <p class="card-text"><div>Author:  {author[0].first_name} {author[0].last_name} </div>
                                          <br></br>
                                          <div>Date of birth: {author[0].dob}</div></p>
                                          <p>Books:</p>
                                          <ul>{authorsBooks.map((book) =>
                                    <li key={book.isbn}>
                                        <Link to={`/book/${book.isbn}`} className="button muted-button" key= {book.id}>
                                          {book.title} 
                                        </Link>
                                          
                                    </li>
                                    )}</ul> 
                                    <img class="img-fluid" alt={author[0].image} src={author[0].image} width="100" height="300"/>
                                </div>
                                )
                              }
                    
                      {currentUser && !this.state.wantsToEdit ?  ( 
                            <div>
                              <p></p>
                                    <div class="row">
                                        <div className="col-sm">
                              <a href="#" className="btn btn-primary" onClick={this.handleGoToEditClick.bind(this, author[0].id)}> EDIT AUTHOR</a>
                              </div>
                              <div className="col-sm">
                              <a href="#" className="btn btn-primary" onClick={this.handleDelete.bind(this, author[0].id)}> DELETE AUTHOR</a>
                            </div>
                            </div>
                            </div>
                            ) : null
                        }
                  </div>
                  </div>
                </div>
                ): null}
                </div>
              </div>
          </div>
        </div>
      </div> 
    );
  }
}


const mapStateToProps = state => ({
   author: state.author.item,
   allBooks: state.books.items,
   currentUser: state.authentication.currentUser
});

export default connect(mapStateToProps)(AuthorDetails);



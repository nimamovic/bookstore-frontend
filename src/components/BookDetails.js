import React from "react";
import { connect } from "react-redux";
import { addBooksAuthor, deleteBook, deleteBooksAuthor, editBook, getBook } from "../redux/action-creators/book.action-creators";
import { getAuthors } from "../redux/action-creators/author.action-creators"
import { Link } from "react-router-dom";

   
class BookDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isbn: "",
        title: "",
        pages: "",
        published: "",
        image: "",
        wantsToEdit: false,
        authorsToDelete: [],
        authorsToAdd: [],
    }
  }
  
  componentDidMount() {
    if(this.props.match){
        this.props.dispatch(getBook(this.props.match.params.id));
    }
    this.props.dispatch(getAuthors());
  };

  handleDelete = (id) => {
    this.props.dispatch(deleteBook(id,this.props.history));
  };
  
  handleTitleChange = (event) => {
   this.setState({title: event.target.value});
  };

  handlePagesChange = (event) => {
    this.setState({pages: event.target.value});
  };

  handlePublishedChange = (event) => {
    this.setState({published: event.target.value});
  };

  handleImageChange = (event) => {
    this.setState({image: event.target.value});
  };

  handleGoToEditClick = (id) => {
    this.setState({
      isbn: id,
      wantsToEdit: true
    });
  };

  handleDeleteAuthors = (event) => {
    let book = Array.from(event.target.selectedOptions, option => option.value);
    this.setState({authorsToDelete: book});
  };

  handleAddAuthors = (event) => {
    let book = Array.from(event.target.selectedOptions, option => option.value);
    this.setState({authorsToAdd: book});
  };

  handleEdit = (event) => {
    event.preventDefault();
    let forEdit = {};
    if(this.state.title != "") forEdit['title'] = this.state.title;
    if(this.state.pages != "") forEdit['pages'] = this.state.pages;
    if(this.state.published != "") forEdit['published'] = this.state.published;
    if(this.state.image != "") forEdit['image'] = this.state.image;
    this.state.authorsToDelete.forEach(author => {
      this.props.dispatch(deleteBooksAuthor(this.state.isbn,author))
    });
    this.state.authorsToAdd.forEach(author => {
      this.props.dispatch(addBooksAuthor(this.state.isbn,author))
    });
    if(Object.keys(forEdit).length > 0){
      this.props.dispatch(editBook(this.state.isbn,forEdit));
    }
    if(Object.keys(forEdit).length > 0 || this.state.authorsToDelete.length != 0 || this.state.authorsToAdd.length != 0){
      this.props.dispatch(getBook(this.props.match.params.id));
      this.setState({wantsToEdit: false});
    } 
  };
  
  render() {
    const { book } = this.props;
    const { allAuthors } = this.props;
    const currentUser = this.props.currentUser;
    let booksAuthors = [];
    booksAuthors = book[0].authors;
    return (
      <div >
        <div class="container">
          <div class="row">
            <div class="col">
              <div>
               <div class="card" width="30%">
                 <div class="card-body">
                  <h5 class="card-title">Book details:</h5>
                    <div>
                      {this.state.wantsToEdit ?  ( 
                              <div>
                                <small class="form-text text-muted">You don't have to edit all fields.</small>
                                <form>
                                  <label for="titleInput">Title:</label>
                                      <input type="text" class="form-control"  placeholder={book[0].title}
                                                      value={this.state.title}
                                                      onChange={this.handleTitleChange}></input>
                                  <label for="pagesInput">Pages:</label>
                                  <input type="number" class="form-control"  placeholder={book[0].pages}
                                                      value={this.state.pages}
                                                      onChange={this.handlePagesChange}></input>
                                                    <div class="form-group">
                                  <label for="publishedInput">Year of publishing:</label>
                                  <input type="number" class="form-control"  placeholder={book[0].published}
                                                  value={this.state.published}
                                                  onChange={this.handlePublishedChange}></input>
                                </div>
                              <div class="form-group">
                                  <label for="imageInput">Image:</label>
                                  <input type="text" class="form-control"  placeholder={book[0].image}
                                                  value={this.state.image}
                                                  onChange={this.handleImageChange}></input>
                                                  </div>
                                  <div className="select-container">
                                    <div class="row">
                                        <div className="col-sm">
                                        <p>Chose books you want to remove from author's book list:</p>
                                            <select multiple={true} onChange={this.handleDeleteAuthors} >
                                                {booksAuthors.map((option) => (
                                                <option value={option.id}>{option.first_name} {option.last_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-sm">
                                        <p>Chose books you want to add to author's book list:</p>
                                            <select multiple={true} onChange={this.handleAddAuthors} >
                                                    {allAuthors.map((option) => (
                                                    <option value={option.id}>{option.first_name} {option.last_name}</option>
                                                    ))}
                                                </select>
                                        </div>
                                        <small class="form-text text-muted"> Hold down the Ctrl (windows) or Command (Mac) button to select multiple options.</small> 
                                    </div>
                                    </div>
                                  </form>
                                  <div>
                              <p></p>
                              <a href="#" className="btn btn-primary" onClick={this.handleEdit}>EDIT BOOK</a>
                            </div>
                              </div>
                                  ) : (
                                  <div>
                                    <div></div>
                                    <p class="card-text"><div>Title of the book: {book[0].title}</div>
                                          <div>Year of publishing: {book[0].published}</div>
                                          <div>Pages: {book[0].pages}</div></p>
                                          <p>Authors:</p>
                                          <ul>{booksAuthors.map((author) =>
                                            <li key={author.id}>
                                                <Link to={`/author/${author.id}`} className="button muted-button" key= {author.id}>
                                                    {author.first_name} {author.last_name}
                                                </Link>
                                                    
                                            </li>
                                            )}</ul> 
                                    <img class="img-fluid" alt={book[0].image} src={book[0].image} width="100" height="300"/>
                                </div>
                                )
                              }
                      {currentUser && !this.state.wantsToEdit ?  ( 
                            <div>
                              <p></p>
                                <div class="row">
                                  <div className="col-sm">
                                    <a href="#" className="btn btn-primary" onClick={this.handleGoToEditClick.bind(this, book[0].isbn)}  >EDIT BOOK</a>
                                  </div>
                                  <div className="col-sm">
                                    <a href="#" className="btn btn-primary" onClick={this.handleDelete.bind(this, book[0].isbn)}> DELETE BOOK</a>
                                   </div>
                              </div>
                            </div>
                            ) : null
                        }
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
        </div>
     </div> 
    );
  }
}


const mapStateToProps = state => ({
   book: state.book.item,
   allAuthors: state.authors.items,
   currentUser: state.authentication.currentUser
});

export default connect(mapStateToProps)(BookDetails);



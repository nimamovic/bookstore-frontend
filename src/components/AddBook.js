import React from "react";
import { addBook } from "../redux/action-creators/book.action-creators";
import { getAuthors } from "../redux/action-creators/author.action-creators";
import  { Link }  from "react-router-dom"; 
import { connect } from "react-redux";

class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isbn: "",
        title: "",
        pages: "",
        published: "",
        image: "",
        authors: []
    }
  }
  componentDidMount() {
    this.props.dispatch(getAuthors());
  };

  handleISBNChange = (event) => {
    this.setState({isbn: event.target.value});
  };

  handleTitleChange = (event) => {
    this.setState({title: event.target.value});
  };

  handlePagesChange = (event) => {
    this.setState({pages: Number(event.target.value)});
  };

  handlePublishedChange = (event) => {
    this.setState({published: Number(event.target.value)});
  };

  handleImageChange = (event) => {
    this.setState({image: event.target.value});
  };

  handleChangeAuthors = (event) => {
    let author = Array.from(event.target.selectedOptions, option => option.value);
    this.setState({authors: author});
  };

  handleAddClick = (event) => {
    event.preventDefault();
    if(this.state.isbn && this.state.title && this.state.pages && this.state.published && this.state.image){ 
      this.props.dispatch(addBook(this.state, this.props.history));
    }
    this.setState({alert : true});
  }
    
  render(){
    const { authors } = this.props;
    return (
        
      <div>
          <section>
              <div class="container">
                <div class="row">
                  <div class="col-lg-8 mx-auto">
                  <div className="container mt-3">
                  <form>
              <div class="form-group">
                  <label for="isbnInput">ISBN</label>
                  <input type="text" class="form-control"  placeholder="isbn"
                                  value={this.state.isbn}
                                  onChange={this.handleISBNChange}></input>
                  <small class="form-text text-muted">The International Standard Book Number is a numeric commercial book identifier which is intended to be unique.</small>
              </div>
              <div class="form-group">
              <label for="titleInput">Title:</label>
                  <input type="text" class="form-control"  placeholder="title"
                                  value={this.state.title}
                                  onChange={this.handleTitleChange}></input>
              </div>
              <div class="form-group">
                  <label for="pagesInput">Pages:</label>
                  <input type="number" class="form-control"  placeholder="0"
                                  value={this.state.pages}
                                  onChange={this.handlePagesChange}></input>
              </div>
              <div class="form-group">
                  <label for="publishedInput">Year of publishing:</label>
                  <input type="number" class="form-control"  placeholder="0000"
                                  value={this.state.published}
                                  onChange={this.handlePublishedChange}></input>
                </div>
              <div class="form-group">
                  <label for="imageInput">Image:</label>
                  <input type="text" class="form-control"  placeholder="image"
                                  value={this.state.image}
                                  onChange={this.handleImageChange}></input>
                  <small class="form-text text-muted">Place image url.</small>
                </div>
                <label for="Authors">Book's authors:</label>
                <div className="select-container">
                <div class="row">
                  <div className="col-sm">
                      <select multiple={true} onChange={this.handleChangeAuthors} >
                          {authors.map((option) => (
                          <option value={option.id}>{option.first_name} {option.last_name}</option>
                          ))}
                      </select>
                      <small class="form-text text-muted"> Hold down the Ctrl (windows) or Command (Mac) button to select multiple options.</small> 
                      </div>
                      <div className="col-sm">
                      <Link to={'/addAuthors'}>
                          Author is not on the list? Add it! 
                      </Link>
                      <small class="form-text text-muted">You can skip this step and add book's authors later!</small> 
                      </div> 
                      </div>
                  </div>
                  <p></p>
              <button type="button" class="btn btn-primary mb-2"  onClick={this.handleAddClick}>ADD BOOK</button>
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
  authors: state.authors.items
});

export default connect(mapStateToProps)(AddBook);
import React from "react";
import { connect } from "react-redux";
import { deleteBook, getBooks } from "../redux/action-creators/book.action-creators";

import BootstrapTable from 'react-bootstrap-table-next';

class BooksList extends React.Component {
  componentDidMount() {
    this.props.dispatch(getBooks());
  };
  constructor(props) {
    super(props);
    this.state = {
        columns:  [
            {
                title: 'isbn',
                dataField: 'isbn',
                text: 'ISBN',
                width: '20%'
            },
            {
                title: 'title',
                dataField: 'title',
                text: 'TITLE',
                width: '20%'
            },
            {
                title: 'image',
                text: 'IMAGES',
                dataField: 'image',
                formatter: imageFormater
            }
        ]
    }
  };

  handleDelete = record => {
    this.props.dispatch(deleteBook(record));
  };

  render() {
    const {  books } = this.props;
    const columns = this.state.columns;
    const history = this.props.history;
    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        history.push(`/book/${row.isbn}`);
        return (
          <div></div>
       )
      }
    };
    return (
      <div>
        <div class="container">
          <div class="row">
            <div class="col-sm">
            <BootstrapTable keyField='isbn' data={ books } columns={ columns } rowEvents={ rowEvents } hover/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function imageFormater(image) {
  return (
    <span>
    <img  class="img-responsive" alt={image} src={image} width="60" height="80"/>
    </span>
  );
}


const mapStateToProps = state => ({
  books: state.books.items
});

export default connect(mapStateToProps)(BooksList);
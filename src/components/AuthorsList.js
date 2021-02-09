import React from "react";
import { connect } from "react-redux";
import { getAuthors } from "../redux/action-creators/author.action-creators";

import { Link } from "react-router-dom";


import BootstrapTable from 'react-bootstrap-table-next';
class AuthorsList extends React.Component {
  componentDidMount() {
    this.props.dispatch(getAuthors());
  }
  constructor(props) {
    super(props);
    this.state = {
        columns:  [
            {
                title: 'first_name',
                dataField: 'first_name',
                text: 'First name',
                width: '20%'
            },
            {
                title: 'last_name',
                dataField: 'last_name',
                text: 'Last name',
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

  render() {
    const {  authors } = this.props;
    const columns = this.state.columns;
    const history = this.props.history;
    const rowEvents = {
    onClick: (e, row, rowIndex) => {
       history.push(`/author/${row.id}`);
        return (
           <Link to={`/author/${row.id}`} className="button muted-button" key= {row.id}>
        </Link>
       )
      }
    };
    return (
      <div>
        <div class="container">
         <div class="row">
          <div class="col">
          <BootstrapTable keyField='id' data={ authors } columns={ columns } rowEvents={rowEvents}  hover />
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
  authors: state.authors.items
});

export default connect(mapStateToProps)(AuthorsList);
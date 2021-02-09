import Header from './Header'  
import React from 'react'
import BooksList from './BooksList'
import AddBook from './AddBook'
import BookDetails from './BookDetails'
import AuthorsList from './AuthorsList'
import AddAuthor from './AddAuthor'
import AuthorDetails from './AuthorDetails'
import FirstPage from './FirstPage'

import { BrowserRouter as Router, Route,Switch,Redirect } from "react-router-dom";

class Layout extends React.Component {
 
  render() {
  return (
    <div class="d-flex flex-column min-vh-100">  
        <Router> 
          <Header></Header> 
          <Switch>
            <Route exact path="/" render={() => (
              <React.Fragment>
                <FirstPage></FirstPage>
               </React.Fragment>
            )}/>
            <Route exact path='/addBook' component={AddBook} /> 
            <Route exact path='/addAuthor' component={AddAuthor} /> 
            <Route exact path='/authors' component={AuthorsList}/>
            <Route exact path='/books' component={BooksList}/>
            <Route exact path="/author/:id" component={AuthorDetails} />
            <Route exact path="/book/:id" component={BookDetails} />
            <Redirect to="/" />
          </Switch> 
       </Router>
    </div>
  );
  }
}
export default Layout;
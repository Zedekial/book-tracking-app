import React, { Component } from 'react'
import SearchPage from './SearchPage.js'
import BookShelf from './BookShelf.js'
import * as BooksAPI from './BooksAPI.js'
import {
  BrowserRouter,
  Route,
} from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      /**
      * TODO: Instead of using this state variable to keep track of which page
      * we're on, use the URL in the browser's address bar. This will ensure that
      * users can use the browser's back and forward buttons to navigate between
      * pages, as well as provide a good URL they can bookmark and share.
      */
      books: [],
    }
  }

  GetBooks() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState({
        books,
      })
    })
  }

  componentWillMount() {
    this.GetBooks()
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact strict path='/search' component={SearchPage} />
          <Route exact strict path='/' component={BookShelf} />
          {JSON.stringify(this.state.books)}
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp

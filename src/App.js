import React, { Component } from 'react'
import SearchPage from './SearchPage.js'
import BookShelf from './BookShelf.js'
import * as BooksAPI from './BooksAPI.js'
import {
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
      searchInput: '',
      searchResults: [],
    }

    this.SearchBooks = this.SearchBooks.bind(this)
  }

  GetBooks () {
    BooksAPI.getAll()
    .then((books) => {
      this.setState({
        books,
      })
    })
  }

  SearchBooks (event) {
    if(event.target.value === '') {
      console.log('Empty search')
    }else if(event.keyCode === 13) {
      this.setState({
        searchInput: event.target.value
      })
      setTimeout(() => {
        BooksAPI.search(this.state.searchInput)
        .then((searchResults) => {
          this.setState({
            searchResults,
          })
          console.log(searchResults)
        })
      },50)
    }
  }

  testBooksAPI () {
    BooksAPI.update('tsRhkvo80iUC', 'read')
    .then((result) => console.log(result))
    BooksAPI.get('tsRhkvo80iUC')
    .then((result) => {
      this.setState(prevState => ({
        books: [...prevState.books, result]
      }))
    })
    .then(() => console.log(this.state.books))
  }

  componentWillMount () {
    this.GetBooks()
    this.testBooksAPI()
  }

  render() {
    return (
        <div className="app">
          <Route path='/search' render={() => (
            <SearchPage
              searchResults={this.state.searchResults}
              searchBooks={this.SearchBooks}
            />
          )}/>
          <Route exact path='/' render={() => (
            <BookShelf
              books={this.state.books}
            />
          )}/>
        </div>
    )
  }
}

export default BooksApp

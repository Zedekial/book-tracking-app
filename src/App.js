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
      loading: true,
    }

    this.SearchBooks = this.SearchBooks.bind(this)
    this.MoveShelf = this.MoveShelf.bind(this)
    this.RefreshSearch = this.RefreshSearch.bind(this)
  }

  GetBooks () {
    BooksAPI.getAll()
    .then((books) => {
      this.setState({
        books,
        loading: false,
      })
    })
  }

  MoveShelf (event, props) {
    let bookId = props.id
    let newShelf = event

    BooksAPI.update(bookId, newShelf)
    .then((result) => {
      for(var key in result) {
        result[key].map((bookOnShelf) => {
          if(bookOnShelf === bookId) {
            BooksAPI.get(bookId)
            .then((result) => {
              result.shelf = newShelf
              this.setState(prevState => ({
                books: [...prevState.books.filter((currentBook) => currentBook.id !== bookId), result]
              }))
            })
          }else (
            BooksAPI.get(bookId)
            .then((result) => {
              result.shelf = newShelf
              this.setState(prevState => ({
                books: [...prevState.books.filter((currentBook) => currentBook.id !== bookId), result]
              }))
            })
          )
        })
      }
    })

    // console.log('Current shelf '  + props.shelf)
    // console.log('Moving to shelf ' + newShelf)
    // console.log('Book ID is ' + props.id)
    // BooksAPI.update(bookId, newShelf)
    //
    // .then(this.state.books.map((book) => {
    //   if(book.id === bookId && book.shelf !== newShelf) {
    //     book.shelf = newShelf
    //     this.setState(prevState => ({
    //       books: [...prevState.books.filter((currentBook) => currentBook.id !== bookId), book]
    //     }))
    //     }
    //   }
    // ))
  }

  SearchBooks (event) {
    if(event.target.value === '') {
      this.setState({
        searchResults: [],
        searchInput: ''
      })
    }else {
      this.setState({
        searchInput: event.target.value
      })
      setTimeout(() => {
        BooksAPI.search(this.state.searchInput)
        .then((searchResults) => {
          this.setState({
            searchResults,
          })
        })
      },50)
    }
  }

  RefreshSearch () {
    this.setState({
      searchInput: '',
      searchResults: [],
    })
  }

  componentWillMount () {
    this.GetBooks()
    // this.testBooksAPI()
  }

  render() {
    return (
        <div className="app">
          <Route path='/search' render={() => (
            <SearchPage
              searchResults={this.state.searchResults}
              currentBooks={this.state.books}
              loading={this.state.loading}
              searchInput={this.state.searchInput}
              refreshSearch={this.RefreshSearch}
              searchBooks={this.SearchBooks}
              moveShelf={this.MoveShelf}
            />
          )}/>
          <Route exact path='/' render={() => (
            <BookShelf
              books={this.state.books}
              loading={this.state.loading}
              moveShelf={this.MoveShelf}
            />
          )}/>
        </div>
    )
  }
}

export default BooksApp

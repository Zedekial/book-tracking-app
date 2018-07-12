import React, { Component } from 'react'
import SearchPage from './SearchPage.js'
import BookShelf from './BookShelf.js'
import * as BooksAPI from './BooksAPI.js'
import {
  Route,
} from 'react-router-dom'
import './App.css'

/* The main BooksApp component, this handles the primary functions and state */
class BooksApp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      /**
      The state has two arrays books and search results, a search input string and a loading boolean
      books will be populated with the current set of books while search results will be populated by books received when searching certain terms
      The loading indicator is simply to display a 'loading...' text while the books are being fetched.
      */
      books: [],
      searchInput: '',
      searchResults: [],
      loading: true,
    }
    /* Some functions must be bound when using 'this' */
    this.SearchBooks = this.SearchBooks.bind(this)
    this.MoveShelf = this.MoveShelf.bind(this)
    this.RefreshSearch = this.RefreshSearch.bind(this)
  }

  /* This function gets the original array of books from the BooksAPI. However if books already exist in the localstorage those books are retrieved */
  GetBooks () {
    /* Call the getall function from the booksAPI, this returns an array of objects which contains 7 initial books*/
    BooksAPI.getAll()
    .then((books) => {
      /* Check the local storage for an item with key 'booksArray' if nothing exists it will return null */
      if(localStorage.getItem('booksArray') === null) {
        /* If nothing was in the stoarge then store an item with the key 'booksArray' for later use. This prevents the books from being reset to the initial 7 on page refresh */
        localStorage.setItem(
          'booksArray',
          JSON.stringify(books)
          )
          /* Populate the state 'books' with the returned array and set loading to false, this removes the 'loading...' text */
        this.setState({
          books,
          loading: false,
        })
        /* If 'booksArray' was not null it means books had previously been stored there. This function will get the local books and parse them for use */
      }else if(localStorage.getItem('booksArray')) {
        let storedBooks = JSON.parse(localStorage.getItem('booksArray'))
        /* Set the state of books using the stored books from the local storage */
        this.setState({
          books: storedBooks,
          loading: false,
        })
      }
    })
  }

  /* This method is accessible from each book created, it takes an event which is passed through from the book as the shelf chosen*/
  MoveShelf (event, props) {
    /* the current bookId and new shelf properties are set for later use */
    let bookId = props.id
    let newShelf = event
    /* After calling the update function in BooksAPI an object is returned, this object contains the three shelves each containing the id's of books on those shelves */
    BooksAPI.update(bookId, newShelf)
    .then((result) => {
      /* The key in results is the shelf. this will go through each shelf and map the book on that shelf */
      for(var key in result) {
        result[key].map((bookOnShelf) => {
          /* The book will then be added to the array containing all current books. However to prevent copies the previous state will be
          filtered by the books ID */
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
              /* At this point we clear the local storage and replace it with the new books array containing
              the updated books and shelves */
              localStorage.clear()
              localStorage.setItem(
                'booksArray',
                JSON.stringify(this.state.books)
                )
            })
          )
        })
      }
    })
  }

  /* This method is called from the search field and is passed the search term as an event */
  SearchBooks (event) {
    /* If the search is empty then the results array and input state are set to blank */
    if(event.target.value === '') {
      this.setState({
        searchResults: [],
        searchInput: ''
      })
      /* Else we set the state of search input to match the search value and use that state to search for books using the API */
    }else {
      this.setState({
        searchInput: event.target.value
      })
      setTimeout(() => {
        BooksAPI.search(this.state.searchInput)
        .then((searchResults) => {
          /* The search results array will be set and used for displaying the books */
          this.setState({
            searchResults,
          })
        })
      },50)
    }
  }

  /* This is used when using the back button and exiting the search page. It prevents the search results and input from persisting */
  RefreshSearch () {
    this.setState({
      searchInput: '',
      searchResults: [],
    })
  }

  /* Once the app has mounted we will get books and update the books array, this method is on line 33 above */
  componentWillMount () {
    this.GetBooks()
  }

 /* Render the search page component and the bookshelf component. Each will only display with the correct route.
 We will also pass in the state and methods as props for use  */
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
              bookInfo={this.BookInfo}
            />
          )}/>
        </div>
    )
  }
}

export default BooksApp

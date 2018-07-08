import React from 'react'
import {
  Link,
} from 'react-router-dom'
import * as BookShelf from './BookShelf.js'

function SearchBar (props) {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input id="text-input" type="text" onKeyUp={props.searchBooks} placeholder="Search by title or author"/>
            </div>
          </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    )
}

function SearchTerms () {
  return (
    <div>
      <h1>Invalid Search Term, please use one of the following:</h1>
      <p>'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
      </p>
    </div>
  )
}

function ReturnedBooks (props) {
    if(props.searchResults === undefined) {
      return(
        <h1>Uh-oh, looks like 'Search Results' is undefined</h1>
      )
    }else if(props.searchResults.length === 0) {
      return (
        <h1>No results to display</h1>
      )
    }else if(props.searchResults.hasOwnProperty('error')) {
      return (
        <SearchTerms />
      )
    }else {
      console.log(props.searchResults)
      return (
        props.searchResults.map((book) =>
        BookShelf.createBook(book)
      )
    )
  }
}

function SearchDisplay (props) {
  return (
    <div className="list-books-content">
      <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">Search results</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            <ReturnedBooks
              searchResults={props.searchResults}
            />
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

function SearchPage (props) {
  return (
    <div>
      <SearchBar
        searchBooks={props.searchBooks}
      />
      <SearchDisplay
        searchResults={props.searchResults}
      />
    </div>
  )
}

export default SearchPage

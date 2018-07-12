import React from 'react'
import {
  Link,
} from 'react-router-dom'
// import * as BookShelf from './BookShelf.js'
import BookShelf from './BookShelf.js'

/* The searchbar calls and updates the searchbooks method in the main app as the input is updated. It also contains a back button to the mainpage. */
function SearchBar (props) {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to='/' onClick={props.refreshSearch}>Close</Link>
          <div className="search-books-input-wrapper">
            <input id="text-input" type="text" onKeyUp={props.searchBooks} placeholder="Search by title or author"/>
            </div>
          </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    )
}

/* This piece is displayed if the search results returns an error. This means that an incorrect term was searched for. */
function SearchTerms () {
  return (
    <div>
      <h1>Invalid Search Term, please use one of the following:</h1>
      <p>'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
      </p>
    </div>
  )
}

/* This will generate the books returned from the search. It uses the searchResults array in the mainapp state which is passed down as props. */
function ReturnedBooks (props) {
  if(props.loading === true){
    return(
      <div>
        <h3 class='empty-shelf'>Loading...</h3>
      </div>
    )
  }

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
    /* We map over each book in the searchResults array, then within this we map the currentBooks (both passed as props). If the id's match at any point we set the
    shelf of the book to match the current book on our shelf, this is for display purposes in the search results shelf */
    props.searchResults.map((book) => {
      props.currentBooks.map((currBook) => {
        if(book.id === currBook.id) {
          book.shelf = currBook.shelf
        }
      })
      /* If the id's don't match this means the book has no shelf property, we introduce this property and set it to none for display purposes */
      if(book.shelf === undefined) {
        book.shelf = 'none'
      }
    })
    return (
      <BookShelf
        moveShelf={props.moveShelf}
        books={props.searchResults}
      />
    )
  }
}

function SearchDisplay (props) {
  /* Once we have books in the searchedBooks array then we generate a bookshelf of returned books */
  return (
    <div className="list-books-content">
      <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">Search results for: {props.searchInput}</h2>
        <div className="bookshelf-books">
          <ReturnedBooks
            searchResults={props.searchResults}
            loading={props.loading}
            currentBooks={props.currentBooks}
            moveShelf={props.moveShelf}
          />
          </div>
        </div>
      </div>
    </div>
  )
}

/* The searchpage contains the search bar and search display each passed the neccessary props. */
function SearchPage (props) {
  return (
    <div>
      <SearchBar
        searchBooks={props.searchBooks}
        refreshSearch={props.refreshSearch}
      />
      <SearchDisplay
        searchResults={props.searchResults}
        currentBooks={props.currentBooks}
        loading={props.loading}
        searchInput={props.searchInput}
        moveShelf={props.moveShelf}
      />
    </div>
  )
}

export default SearchPage

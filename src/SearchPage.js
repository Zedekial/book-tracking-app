import React from 'react'
import {
  Link,
} from 'react-router-dom'


function SearchBar () {
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
              <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>

        </div>
      )
}

function SearchResults () {
  return (
    <div className="list-books-content">
      <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">Search results</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            <li>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")' }}></div>
                  <div className="book-shelf-changer">
                    <select>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                  <div className="book-title">The Hobbit</div>
                  <div className="book-authors">J.R.R. Tolkien</div>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

function SearchPage () {
  return (
    <div>
      <SearchBar />
      <SearchResults />
    </div>
  )
}

export default SearchPage

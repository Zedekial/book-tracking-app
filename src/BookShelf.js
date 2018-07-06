import React from 'react'
import {
  BrowserRouter,
  Link,
} from 'react-router-dom'

function Book (props) {
  const url = props.imageLinks.smallThumbnail

  return (
    <li key={props.title}>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url' + `(${url})` }}></div>
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
        <div className="book-title">{props.title}</div>
        <div className="book-authors">{props.authors}</div>
      </div>
    </li>
  )
}

function Reading (props) {
  return (
    props.books.map((book) =>
      Book(book)
    )
  )
}

function WantToRead (props) {
    return (
      props.books.map((book) =>
        Book(book)
      )
    )
}

function Read (props) {
    return (
      props.books.map((book) =>
        Book(book)
      )
    )
}

function BookShelfWrap (props) {
  return (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
              <Reading
                books={props.books.filter((book) => book.shelf === 'currentlyReading')}
              />
            </ol>
          </div>
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Want To Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              <WantToRead
                books={props.books.filter((book) => book.shelf === 'wantToRead')}
              />
            </ol>
          </div>
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              <Read
                books={props.books.filter((book) => book.shelf === 'read')}
              />
            </ol>
          </div>
        </div>
          <BrowserRouter>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </BrowserRouter>
      </div>
    </div>
  </div>
  )
}


function BookShelf (props) {
  return (
      <div>
        <BookShelfWrap
          books={props.books}
        />
      </div>
      )
}

export default BookShelf

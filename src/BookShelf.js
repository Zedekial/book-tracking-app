import React from 'react'
import {
  Route,
  Link,
} from 'react-router-dom'

export function createBook (props, moveShelf) {
  if(props.imageLinks)  {
    const url = props.imageLinks.smallThumbnail

    return (
      <li key={props.title}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url' + `(${url})` }}></div>
            <div className="book-shelf-changer">
              <select defaultValue={props.shelf} onChange={(event) => moveShelf(event.target.value, props)}>
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
  }else {
    const url = 'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg'

    return (
      <li key={props.title}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url' + `(${url})` }}></div>
            <div className="book-shelf-changer">
              <select defaultValue={props.shelf} onChange={(event) => moveShelf(event.target.value, props)}>
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

}

function Reading (props) {
  if(props.books.length === 0 && props.loading === true) {
    return(
      <div>
        <h3 class='empty-shelf'>Loading...</h3>
      </div>
    )
  }else if (props.books.length === 0 && props.loading === false){
    return(
      <div>
        <h3 className='empty-shelf'>This shelf is empty!....</h3>
      </div>
    )
  }else {
    return (
      props.books.map((book) =>
      createBook(book, props.moveShelf)
      )
    )
  }
}

function WantToRead (props) {
  if(props.books.length === 0 && props.loading === true) {
    return(
      <div>
        <h3 class='empty-shelf'>Loading...</h3>
      </div>
    )
  }else if (props.books.length === 0 && props.loading === false){
    return(
      <div>
        <h3 className='empty-shelf'>This shelf is empty!....</h3>
      </div>
    )
  }else {
    return (
      props.books.map((book) =>
      createBook(book, props.moveShelf)
      )
    )
  }
}

function Read (props) {
  if(props.books.length === 0 && props.loading === true) {
    return(
      <div>
        <h3 className='empty-shelf'>Loading...</h3>
      </div>
    )
  }else if (props.books.length === 0 && props.loading === false){
    return(
      <div>
        <h3 class='empty-shelf'>This shelf is empty!....</h3>
      </div>
    )
  }else {
    return (
      props.books.map((book) =>
      createBook(book, props.moveShelf)
      )
    )
  }
}

function NotOnShelf (props) {
  return (
    props.books.map((book) =>
      createBook(book,props.moveShelf)
    )
  )
}

function BookShelfWrap (props) {
  return (
    <div className="list-books">
      <Route exact path='/' render={() => (
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
      )}/>
      <div className="list-books-content">
      <Route path='/search' render={() => (
        <div className="bookshelf">
          <h2 className="bookshelf-title">Not Currently On Shelf</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              <NotOnShelf
                books={props.books.filter((book) => book.shelf === 'none')}
                loading={props.loading}
                moveShelf={props.moveShelf}
              />
            </ol>
          </div>
        </div>
      )}/>
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
              <Reading
                books={props.books.filter((book) => book.shelf === 'currentlyReading')}
                loading={props.loading}
                moveShelf={props.moveShelf}
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
                loading={props.loading}
                moveShelf={props.moveShelf}
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
                loading={props.loading}
                moveShelf={props.moveShelf}
              />
            </ol>
          </div>
        </div>
          <div className="open-search">
            <Link to='/search'>Add a book</Link>
          </div>
      </div>
    </div>
  </div>
  )
}


export function BookShelf (props) {
    return (
      <div>
        <BookShelfWrap
          books={props.books}
          loading={props.loading}
          moveShelf={props.moveShelf}
        />
      </div>
    )
}

export default BookShelf

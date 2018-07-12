import React from 'react'
import {
  Route,
  Link,
} from 'react-router-dom'


/* This createBooks function is used to create each book object which is used by the shelf. It is passed in the moveshelf method from the main app and a book from the array */
export function createBook (props, moveShelf, bookInfo) {
  if(props.imageLinks)  {
    /* If the book (passed as a prop) contains an imageLinks property this will be true and the url variable is set using that link */
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
    /* If an imageLinks property hasn't been found a no cover image will be used from the web */
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

/* Each shelf is created separately and will first check to see if the loading property, passed down as state, is true.
Next we check to see if the length of the passed prop array, if 0 and loading is false then it will display that the shelf is empty. Lastly
if the array length is not 0 then it contains books and the array will be mapped over and a book created for each object */
function Reading (props) {
  if(props.books.length === 0 && props.loading === true) {
    return(
      <div>
        <h3 className='empty-shelf'>Loading...</h3>
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
      createBook(book, props.moveShelf, props.bookInfo)
      )
    )
  }
}

function WantToRead (props) {
  if(props.books.length === 0 && props.loading === true) {
    return(
      <div>
        <h3 className='empty-shelf'>Loading...</h3>
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
      createBook(book, props.moveShelf, props.bookInfo)
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
        <h3 className='empty-shelf'>This shelf is empty!....</h3>
      </div>
    )
  }else {
    return (
      props.books.map((book) =>
      createBook(book, props.moveShelf, props.bookInfo)
      )
    )
  }
}

function NotOnShelf (props) {
  return (
    props.books.map((book) =>
      createBook(book,props.moveShelf, props.bookInfo)
    )
  )
}

/* The bookshelfwrap component is used to wrap each shelf and the complete shelf display neatly. It also uses routing to only render not on shelf if we are on the search page */
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
                bookInfo={props.bookInfo}
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
                bookInfo={props.bookInfo}
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
                bookInfo={props.bookInfo}
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
                bookInfo={props.bookInfo}
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

/* The overall bookshelf component which is created in the main app. This will pass down relevant props to the bookshelfwrap  */
export function BookShelf (props) {
    return (
      <div>
        <BookShelfWrap
          books={props.books}
          loading={props.loading}
          moveShelf={props.moveShelf}
          bookInfo={props.bookInfo}
        />
      </div>
    )
}

export default BookShelf

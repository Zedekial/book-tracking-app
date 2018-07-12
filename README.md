# MyReads Project

This is the final assessment project for Udacity's React Fundamentals course. This project began as a basic display of JSX using React. The goal was to
build this out into a fully functional app with a Main Page which contained a bookshelf showing read, want to read and reading. It should also have a search page which
display results based on a number of search terms and these results should be displayed based on whether or not they were on your shelf.

Each book should be able to have its shelf changed from either the main page or the search page and these changes should show up on either page. Additionally
the state of the books/shelves etc should persist between page refreshes.

![book](http://books.google.com/books/content?id=evuwdDLfAyYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api)

## Reference

This app was my first fully fledge app using React. Google was used extensively as well as the slack community and various videos. A big thanks to the Tyler McGinnis free react bootcamp -
https://tylermcginnis.com/free-react-bootcamp/ - which was immensely helpful in understand the fundamentals of React.

## Disclaimer

While code may have been referenced during the building of this app, no code was directly copied for use.

## Installation

To get started:

* clone the project to your pc
* install all project dependencies with `npm install`
* start the development server with `npm start`


## Backend Server

The provided file [`BooksAPI.js`](src/BooksAPI.js) is related to the books app project and interacts with a Udacity books server:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (book, newShelf) => {
    const { books } = this.state;
    let newlist = books.filter((b) => b.id !== book.id)
    book.shelf = newShelf
    if (newShelf !== 'none') newlist.push(book)
    this.setState((state) => ({ newlist }))
    BooksAPI.update(book, newShelf)
  }

  render() {

    const { books } = this.state;
    let currentlyReadingList = books.filter((book) => book.shelf === "currentlyReading")
    let wantToReadList = books.filter((book) => book.shelf === "wantToRead")
    let readList = books.filter((book) => book.shelf === "read")

    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            myreads={books}
            onChangeShelf={this.changeShelf} />
        )} />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  shelf="Currently Reading"
                  books={currentlyReadingList}
                  onChangeShelf={this.changeShelf}
                />
                <BookShelf
                  shelf="Want to Read"
                  books={wantToReadList}
                  onChangeShelf={this.changeShelf}
                />
                <BookShelf
                  shelf="Read"
                  books={readList}
                  onChangeShelf={this.changeShelf}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp

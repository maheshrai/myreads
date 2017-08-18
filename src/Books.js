import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class Books extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  render() {

    const { books, onChangeShelf } = this.props
    let currentlyReadingList = books.filter((book) => book.shelf === "currentlyReading")
    let wantToReadList = books.filter((book) => book.shelf === "wantToRead")
    let readList = books.filter((book) => book.shelf === "read")

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              shelf="Currently Reading"
              books={currentlyReadingList}
              onChangeShelf={onChangeShelf}
            />
            <BookShelf
              shelf="Want to Read"
              books={wantToReadList}
              onChangeShelf={onChangeShelf}
            />
            <BookShelf
              shelf="Read"
              books={readList}
              onChangeShelf={onChangeShelf}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Books

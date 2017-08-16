import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
    state = {
        books: []
    }

    static propTypes = {
        myreads: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    searchBooks = (query) => {
        if (query.trim() === '') {
            let books = []
            this.setState({ books })
            return
        }
        const { myreads, onChangeShelf } = this.props
        BooksAPI.search(query, 20).then((books) => {
            this.setState({ books })
        })
    }

    render() {

        const { books } = this.state
        const { myreads, onChangeShelf } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={(event) => this.searchBooks(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + book.imageLinks.thumbnail + '")' }}></div>
                                        <div className="book-shelf-changer">
                                            <select value={book.shelf ? book.shelf : 'none'} onChange={(e) => onChangeShelf(book, e.target.value)}>
                                                <option value="none" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors}</div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks

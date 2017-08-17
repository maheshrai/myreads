import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid'

class SearchBooks extends Component {
    state = {
        books: []
    }

    static propTypes = {
        myreads: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    searchBooks = (query) => {
        query = query.trim()
        if (query === '') {
            let books = []
            this.setState({ books })
            return
        }
        const { myreads } = this.props
        BooksAPI.search(query, 20).then((results) => {
            // if the books in serach results exist in my reads, update it's shelf
            let books = results.map((book) => {
                let bookInMyReads = myreads.find((myr) => (myr.id === book.id))
                if (bookInMyReads) book.shelf = bookInMyReads.shelf
                return book
            })
            this.setState({ books })
        })
    }

    render() {

        const { books } = this.state
        const { onChangeShelf } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" autoFocus placeholder="Search by title or author" onChange={(event) => this.searchBooks(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <BooksGrid
                        books={books}
                        onChangeShelf={onChangeShelf} />
                </div>
            </div>
        )
    }
}

export default SearchBooks

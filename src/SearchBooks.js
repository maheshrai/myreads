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
        if (query.trim() === '') {
            let books = []
            this.setState({ books })
            return
        }
        const { myreads } = this.props
        BooksAPI.search(query, 20).then((books) => {
            books.map((book) => {
                let x = myreads.find((r) => (r.id === book.id))
                if (x) book.shelf = x.shelf
                else book.shelf = 'none'
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
                        <input type="text" placeholder="Search by title or author" onChange={(event) => this.searchBooks(event.target.value)} />
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

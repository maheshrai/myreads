import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BooksGrid from './BooksGrid'

class BookShelf extends Component {
    static propTypes = {
        shelf: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    render() {
        const { shelf, books, onChangeShelf } = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf}</h2>
                <div className="bookshelf-books">
                    <BooksGrid
                        books={books}
                        onChangeShelf={onChangeShelf} />
                </div>
            </div>
        )
    }
}

export default BookShelf

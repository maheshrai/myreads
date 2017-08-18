import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Books from './Books'
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
    this.setState((state) => ({ books: newlist }))
    BooksAPI.update(book, newShelf)
  }

  render() {

    const { books } = this.state

    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            myreads={books}
            onChangeShelf={this.changeShelf} />
        )} />
        <Route exact path='/' render={() => (
          <Books
            books={books}
            onChangeShelf={this.changeShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp

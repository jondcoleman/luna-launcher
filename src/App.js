import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Autocomplete from './components/Autocomplete'
// import Autocomplete from './components/Autocomplete-old'
// const fs = window.require('fs')
// const text = fs.readFileSync(
//   'C:\\bin\\Restore Database Utility\\readme.md',
//   'utf-8'
// )
class App extends Component {
  render() {
    return (
      <div className="App">
        <Autocomplete />
      </div>
    )
  }
}

export default App

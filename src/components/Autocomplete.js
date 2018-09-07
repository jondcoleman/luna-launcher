// how do I get the icon for an app?

import React, { Component } from 'react'
const childProcess = window.require('child_process')

function filterSuggestions(value, suggestions) {
  const regex = new RegExp(value, 'i')
  return suggestions.filter(suggestion => regex.test(suggestion.shortName))
}

class Autocomplete extends Component {
  constructor() {
    super()

    this.state = {
      inputValue: '',
      suggestions: require('../data/itemIndex.json'),
      selectedIndex: 0
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  handleChange(e) {
    this.setState({ inputValue: e.target.value })
  }

  renderSuggestions() {
    if (this.state.inputValue.length >= 2) {
      return (
        <ul className="suggestion-container">
          {filterSuggestions(this.state.inputValue, this.state.suggestions).map(
            (suggestion, index) => (
              <li key={suggestion} className="suggestion-item">{`${
                suggestion.shortName
              }${index === this.state.selectedIndex ? ' (selected)' : ''}`}</li>
            )
          )}
        </ul>
      )
    }
    return null
  }

  adjustIndex(val) {
    this.setState(
      Object.assign(this.state, {
        selectedIndex: this.state.selectedIndex + val
      })
    )
  }

  canMoveDown() {
    return this.state.suggestions.length - 1 > this.state.selectedIndex
  }

  canMoveUp() {
    return this.state.selectedIndex > 0
  }

  handleKeyUp(e) {
    e.preventDefault() // {TODO} this isn't working to prevent the cursor from moving in the input. Need to figure out why
    if (e.key === 'ArrowDown' && this.canMoveDown()) {
      this.adjustIndex(1)
      return
    }
    if (e.key === 'ArrowUp' && this.canMoveUp()) {
      this.adjustIndex(-1)
      return
    }
    if (e.key === 'Enter') {
      const selected = this.state.suggestions[this.state.selectedIndex]
      childProcess.exec(selected.path)
    }
    if (e.key === 'Escape') {
      this.setState(Object.assign(this.state, { inputValue: '' }))
    }
  }

  render() {
    return (
      <div onKeyUp={this.handleKeyUp} className="autocomplete-container">
        <input value={this.state.inputValue} onChange={this.handleChange} />
        {this.renderSuggestions()}
      </div>
    )
  }
}

export default Autocomplete

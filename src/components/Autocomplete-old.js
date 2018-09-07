import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
const fs = window.require('fs')
const childProcess = window.require('child_process')

function getSuggestions(value) {
  // check for math expression and evaluate if it is a valid math expression
  const items = JSON.parse(fs.readFileSync('./src/data/itemIndex.json'))
  const regex = new RegExp(value, 'i')
  console.log(items)
  return items.filter(item => regex.test(item.shortName))
}

function getSuggestionValue(suggestion) {
  console.log(suggestion)
  return suggestion.shortName
}

function renderSuggestion(suggestion) {
  return <span>{suggestion.shortName}</span>
}

function handleSuggestionSelected(
  event,
  { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
) {
  if (method === 'enter') childProcess.exec(suggestion.path)
}

class Autocomplete extends React.Component {
  constructor() {
    super()

    this.state = {
      value: '',
      suggestions: getSuggestions('Ev')
    }
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  render() {
    const { value, suggestions } = this.state
    const inputProps = {
      placeholder: "Type 'c'",
      value,
      onChange: this.onChange
    }

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        alwaysRenderSuggestions={true}
        onSuggestionSelected={handleSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    )
  }
}

export default Autocomplete

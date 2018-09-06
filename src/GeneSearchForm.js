import React from 'react'
import PropTypes from 'prop-types'
import URI from 'urijs'

import Autocomplete from './Autocomplete'
import SpeciesSelect from './SpeciesSelect'
import SpeciesAutocomplete from './SpeciesAutocomplete'

class GeneSearchForm extends React.Component {
  constructor(props) {
    super(props)

    const defaultValue = props.defaultValue.term && props.defaultValue.term.trim() ?
      {
        term: props.defaultValue.term.trim(),
        category: props.defaultValue.category && props.defaultValue.category.trim() ?
          props.defaultValue.category : `q`
      } :
      {}

    this.state = {
      // A JSON-formatted query object with two fields, term and category
      query: ``,
      selectedSpecies: props.defaultSpecies,
      enableSubmitButton: props.enableSubmitButton
    }

    this.speciesSelectOnChange = this._speciesSelectOnChange.bind(this)
    this.autocompleteOnChange = this._autocompleteOnChange.bind(this)
  }

  _autocompleteOnChange(selectedItem) {
    this.setState({
      query: selectedItem ?
        JSON.parse(selectedItem.value) :
        {}
    })

    if(this.state.enableSubmitButton === false) {
      this.props.onChange(JSON.parse(selectedItem.value));  
    }  
  }

  _speciesSelectOnChange(selectedItem) {
    this.setState({ selectedSpecies: selectedItem });

    if(this.state.enableSubmitButton === false) {
      this.props.speciesSelectOnChange(selectedItem);
    }
  }

  render() {
    const {wrapperClassName, actionEndpoint} = this.props

    const {enableSubmitButton} = this.props

    const {autocompleteClassName, atlasUrl, suggesterEndpoint, defaultValue, currentValue, currentSpecies} = this.props

    const {enableSpeciesSelect, speciesSelectClassName, speciesSelectStatusMessage} = this.props
    const {allSpecies, topSpecies} = this.props

    return (
      <div>
        <form action={URI(actionEndpoint, atlasUrl).toString()} method={`post`}>
          <div className={wrapperClassName}>
            <div className={autocompleteClassName}>
              <Autocomplete atlasUrl={atlasUrl}
                            suggesterEndpoint={suggesterEndpoint}
                            onChange={this.autocompleteOnChange}
                            selectedSpecies={this.state.selectedSpecies}
                            allSpecies={allSpecies}
                            defaultValue={defaultValue}
                            currentValue={currentValue}/>
            </div>
            { enableSpeciesSelect &&
              <div className={speciesSelectClassName}>
                <SpeciesAutocomplete allSpecies={allSpecies}
                               topSpecies={topSpecies}
                               statusMessage={speciesSelectStatusMessage}
                               defaultValue={currentSpecies}
                               currentValue={currentSpecies}
                               onChange={this.speciesSelectOnChange}
                               />
              </div>
            }
            </div>
            { enableSubmitButton &&  
              <div className={wrapperClassName}>
                <div className={`small-12 columns`}>
                  <button type={`Submit`}
                          className={`button`}
                          disabled={!this.state.query.term || this.state.query.term.trim() === ``}
                          >
                          Search
                  </button>
                </div>
              </div>
            }
      </form>
    </div>
    )
  }
}

GeneSearchForm.propTypes = {
  atlasUrl: PropTypes.string.isRequired,
  actionEndpoint: PropTypes.string.isRequired,
  wrapperClassName: PropTypes.string,
  enableSubmitButton: PropTypes.bool.isRequired,

  autocompleteClassName: PropTypes.string,
  suggesterEndpoint: PropTypes.string.isRequired,
  defaultValue: PropTypes.shape({
    term: PropTypes.string,
    category: PropTypes.string
  }),

  enableSpeciesSelect: PropTypes.bool,
  speciesSelectClassName: PropTypes.string,
  allSpecies: PropTypes.arrayOf(PropTypes.string),
  topSpecies: PropTypes.arrayOf(PropTypes.string),
  defaultSpecies: PropTypes.string,

  speciesSelectStatusMessage: PropTypes.string
}

GeneSearchForm.defaultProps = {
  wrapperClassName: ``,
  autocompleteClassName: ``,
  defaultValue: {},
  enableSpeciesSelect: false,
  speciesSelectClassName: ``,
  allSpecies: [],
  topSpecies: [],
  defaultSpecies: ``,
  speciesSelectStatusMessage: ``
}

export default GeneSearchForm

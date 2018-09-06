import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import _ from 'lodash'

const _option = (label) => {
  return {value: label, label:label}
}


class SpeciesAutocomplete extends React.Component {
   constructor(props) {
    super(props)

    this.state = {
      selectedOption: _.isEmpty(this.props.currentValue)? {value: ``, label:`Any`} : {value:this.props.currentValue,label:this.props.currentValue},
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(selectedOption){
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
    this.props.onChange(selectedOption.value);
  }

  render() {
    const {statusMessage, topSpecies, allSpecies, separator, onChange, defaultValue,currentValue} = this.props;
    const { selectedOption } = this.state;

    return (
      [
      <label htmlFor={`species`} key={`label`}>Species</label>,
      statusMessage ?       
        <select disabled={`true`}
              name={`species`}
              value = {currentValue}
              key={`select`}>{_option(statusMessage)}</select> :
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={allSpecies.map(_option).concat([{value: ``, label:`Any`}])}
          defaultValue={{value:currentValue,label:currentValue}}
        />
      ]
    )
  }
}

  
SpeciesAutocomplete.propTypes = {
  topSpecies: PropTypes.arrayOf(PropTypes.string),
  allSpecies: PropTypes.arrayOf(PropTypes.string),
  statusMessage: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  currentValue: PropTypes.string
}

SpeciesAutocomplete.defaultProps = {
  topSpecies: [],
  allSpecies: [],
  selectedValue: ``
}

export default SpeciesAutocomplete

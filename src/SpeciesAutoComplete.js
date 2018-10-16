import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import _ from 'lodash'

const _option = (label) => {
  return {value: label, label: label}
}


class SpeciesAutoComplete extends React.Component {
   constructor(props) {
    super(props)

    this.state = {
      selectedOption: _.isEmpty(this.props.currentValue) ? 
        {value: ``, label: `Any`} : 
        {value: this.props.currentValue, label: this.props.currentValue},
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(selectedOption){
    this.setState({selectedOption})
    this.props.onChange(selectedOption.value)
  }

  render() {
    const {statusMessage, allSpecies, onChange, defaultValue} = this.props
    const {selectedOption} = this.state

    return (
      [
      <label htmlFor={`species`} key={`label`}>Species</label>,
       statusMessage ?       
         <Select disabled={`true`}
              name={`species`}
              value={statusMessage}
              key={`select`}
          /> :
          <Select
            key={`select`}
            name={`species`}
            value={selectedOption}
            onChange={this.handleChange}
            options={allSpecies.map(_option).concat([{value: ``, label: `Any`}])}
            defaultValue={{value: defaultValue, label: defaultValue}}
          />
      ]
    )
  }
}

  
SpeciesAutoComplete.propTypes = {
  topSpecies: PropTypes.arrayOf(PropTypes.string),
  allSpecies: PropTypes.arrayOf(PropTypes.string),
  statusMessage: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  currentValue: PropTypes.string
}

SpeciesAutoComplete.defaultProps = {
  topSpecies: [],
  allSpecies: [],
  selectedValue: ``
}

export default SpeciesAutoComplete

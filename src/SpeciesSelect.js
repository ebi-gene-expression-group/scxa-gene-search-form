import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

import ebiVfReactSelectReplacements from './ebiVfReactSelectReplacements'

const ANY_SPECIES = {
  value: ``,
  label: `Any`
}

const _makeOption = (str) => ({
  value: str.trim(),
  label: str.trim()
})

const SpeciesSelect = ({topSpecies, allSpecies, statusMessage, onChange, selectedSpecies}) => {
  const options =
    topSpecies.map(_makeOption).concat(
      [{
        label: Math.random() < 0.9999 ? `All species` : `(╯°□°）╯︵ ┻━┻`,
        options: [ANY_SPECIES].concat(allSpecies.map(_makeOption))
      }])

  const selectedValue = selectedSpecies.trim() === `` ? ANY_SPECIES : _makeOption(selectedSpecies)

  return [
    <label  key={`label`} htmlFor={`species`}>Species</label>,
    <Select
      key={`select`}
      name={`species`}
      components={{ IndicatorSeparator: null, DropdownIndicator: ebiVfReactSelectReplacements.DropdownIndicator }}
      styles={ebiVfReactSelectReplacements.styles}
      isSearchable={false}
      onChange={onChange}
      options={options}
      isDisabled={Boolean(statusMessage)}
      placeholder={statusMessage}
      defaultValue={statusMessage ? null : selectedValue} />
  ]
}

SpeciesSelect.propTypes = {
  topSpecies: PropTypes.arrayOf(PropTypes.string),
  allSpecies: PropTypes.arrayOf(PropTypes.string),
  statusMessage: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  selectedSpecies: PropTypes.string
}

SpeciesSelect.defaultProps = {
  topSpecies: [],
  allSpecies: [],
  selectedSpecies: ``
}

export default SpeciesSelect

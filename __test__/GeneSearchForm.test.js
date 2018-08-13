import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import GeneSearchForm from '../src/GeneSearchForm.js'
// import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable'

Enzyme.configure({ adapter: new Adapter() })

const defaultValue = {
  label: `foo`,
  category: `q`
}

const props = {
  atlasUrl: `foo/`,
  actionEndpoint: `bar`,
  suggesterEndpoint: `suggest`,
  enableSpeciesSelect: true,
  enableSubmitButton: true,
  onChange: () => {},
  currentValue: defaultValue.label,
  defaultSpecies:`all`
}

const species = [
  `Meeseek`,
  `Gromflomite`,
  `Cromulon`,
  `Zigerion`,
  `Moopian`,
  `Bliznarvian`,
  `Greebybobe`
]

describe(`GeneSearchForm`, () => {
  test(`search button is initially disabled`, () => {
     const wrapper = mount(<GeneSearchForm {...props}/>)
     expect(wrapper.find(`button`).at(0).props()).toHaveProperty(`disabled`, true)
  })

  test(`search button with invalid default value is disabled`, () => {
     const wrapper = mount(<GeneSearchForm {...props} defaultValue={{term: `   `, category: `q`}}/>)
     expect(wrapper.find(`button`).at(0).props()).toHaveProperty(`disabled`, true)
  })

  test(`search button with valid default value is enabled`, () => {
     const wrapper = mount(<GeneSearchForm {...props} defaultValue={defaultValue} />)
     wrapper.setState({ query: { term: "ASPA", category: "symbol" } });
     wrapper.update();
     expect(wrapper.find(`button`).at(0).props()).toHaveProperty(`disabled`, false);
  })

})

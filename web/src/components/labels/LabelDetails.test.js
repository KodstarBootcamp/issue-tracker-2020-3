import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'
import { LabelDetails } from './LabelDetails'


describe('<Label test', () => {
  const LabelTest = {
    id: '5a422a851b54a676234d17f7',
    title: 'Tomas adventure',
    color: 'Jahnsen',
  }
  test('renders content', () => {

    const component = renderer.create( <LabelDetails label={LabelTest} /> )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })//end of the issue view test describe
})//end of the begining describe
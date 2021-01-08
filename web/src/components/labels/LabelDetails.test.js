import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { LabelDetails } from './LabelDetails'


describe('<Label test', () => {
  const LabelTest = {
    id: '5a422a851b54a676234d17f7',
    title: 'Tomas adventure',
    color: 'Jahnsen',
  }
  test('renders content', () => {

    const component = render( <LabelDetails label={LabelTest} /> )

    const element1 = component.getByText('Jahnsen')

    expect(element1).toBeDefined()
  })//end of the issue view test describe
})//end of the begining describe
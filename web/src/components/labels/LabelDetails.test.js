import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { LabelDetails } from './LabelDetails'

/*
// method 1
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  // method 2
  const element = component.getByText(
    'Component testing is done with react-testing-library'
  )
  expect(element).toBeDefined()

  // method 3
  const div = component.container.querySelector('.note')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'

*/

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
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import { IssueDetails } from './IssueDetails'

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

describe('<Issue test', () => {
  const issueTest = {
    id: '5a422a851b54a676234d17f7',
    title: 'Tomas adventure',
    description: 'Jahnsen',
    labels: [{ text:'labels',color:'red' }],
  }
  test('renders content', () => {
    const component = render( <IssueDetails issue={issueTest} /> )


    const element1 = component.getByText('Tomas adventure')
    const element4 = component.getByTestId('view')
    fireEvent.click(element4)
    const element2 = component.getByText('Jahnsen')
    const element3 = component.getByText('labels')

    expect(element1).toBeDefined()
    expect(element2).toBeDefined()
    expect(element3).toBeDefined()
  })//end of the issue view test describe
})//end of the begining describe
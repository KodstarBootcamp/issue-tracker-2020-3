import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import IssueCreateForm from './IssueCreateForm'
import IssueDetails from './IssueDetails'

describe('<Issue test', () => {
  describe('<<CreateIssueForm /> test', () => {
    test('<CreateIssueForm />create issue form', () => {
      const createIssue = jest.fn()
      const component = render(<IssueCreateForm createIssue={ createIssue }/>)
      const inputTitle = component.container.querySelector('input[name="title"]')
      const inputDescription = component.container.querySelector('input[name="description"]')
      const inputLabels = component.container.querySelector('input[name="labels"]')
      const form = component.container.querySelector('form')
      fireEvent.change(inputTitle, {
        target: { value: 'testing of forms could be easier' }
      })
      fireEvent.change(inputDescription, {
        target: { value: 'testing of forms could be easier2' }
      })
      fireEvent.change(inputLabels, {
        target: { value: 'testing of forms could be easier3' }
      })
      fireEvent.submit(form)
      expect(createIssue.mock.calls).toHaveLength(1)
      expect(createIssue.mock.calls[0][0].title).toBe('testing of forms could be easier')
      expect(createIssue.mock.calls[0][0].description).toBe('testing of forms could be easier2')
      expect(createIssue.mock.calls[0][0].labels).toBe('testing of forms could be easier3')
    })//end of the test createform
  })//end of the decribe
  describe('<Issue view test', () => {
    const issueTest = {
      id: '5a422a851b54a676234d17f7',
      title: 'Tomas adventure',
      decription: 'Jahnsen',
      labels: 'labels',
    }
    test('renders content', () => {
      const component = render(
        <IssueDetails issue={issueTest} />
      )
      expect(component.container).toHaveTextContent(issueTest.title)
    })//end of the renders content test
  })//end of the issue view test describe
})//end of the begining describe
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { IssueCreateForm } from './IssueCreateForm.js'

describe('<Issue test', () => {

  test('<IssueCreateForm />create issue form', () => {
    const createIssue = jest.fn()
    const component = render(<IssueCreateForm createIssue={ createIssue }/>)
    const inputTitle = component.container.querySelector('input[name="title"]')
    const inputDescription = component.container.querySelector('input[name="description"]')
    const form = component.container.querySelector('form')
    fireEvent.change(inputTitle, {
      target: { value: 'testing of forms could be easier' }
    })
    fireEvent.change(inputDescription, {
      target: { value: 'testing of forms could be easier2' }
    })
    fireEvent.submit(form)
    expect(createIssue.mock.calls).toHaveLength(1)
    expect(createIssue.mock.calls[0][0].title).toBe('testing of forms could be easier')
    expect(createIssue.mock.calls[0][0].description).toBe('testing of forms could be easier2')
  })//end of the test createform
})//end of the begining describe
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { LabelCreateForm } from './LabelCreateForm.js'

describe('<Label test', () => {

  test('<LabelCreateForm />create label form', () => {
    const addLabel = jest.fn()
    const setSmShow = () => false
    const component = render(<LabelCreateForm addLabel={ addLabel } setSmShow={setSmShow} />)
    const inputTitle = component.container.querySelector('input[name="title"]')
    const form = component.container.querySelector('form')
    fireEvent.change(inputTitle, {
      target: { value: 'testing of forms could be easier' }
    })
    fireEvent.submit(form)
    expect(addLabel.mock.calls).toHaveLength(1)
    console.log(addLabel.mock.calls[0][0])
    expect(addLabel.mock.calls[0][0].text).toBe('testing of forms could be easier')
  })//end of the test createform
})//end of the begining describe
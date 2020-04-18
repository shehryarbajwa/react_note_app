import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Note from './Note.js'
import Togglable from './Togglable.js'

describe('<Togglable />', () => {
    let component
  
    beforeEach(() => {
      component = render(
        <Togglable buttonLabel="show...">
          <div className="testDiv" />
        </Togglable>
      )
    })
  
    test('renders its children', () => {
      expect(
        component.container.querySelector('.testDiv')
      ).toBeDefined()
    })
  
    test('at start the children are not displayed', () => {
      const div = component.container.querySelector('.togglableContent')
  
      expect(div).toHaveStyle('display: none')
    })
  
    test('after clicking the button, children are displayed', () => {
      const button = component.getByText('show...')
      fireEvent.click(button)
  
      const div = component.container.querySelector('.togglableContent')
      expect(div).not.toHaveStyle('display: none')
    })
    test('toggled content can be closed', () => {
        const button = component.getByText('show...')
        fireEvent.click(button)

        component.debug()
      
        const closeButton = component.getByText('Cancel')
        fireEvent.click(closeButton)
      
        const div = component.container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
      })
  
  })

test('renders content', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    const component = render(<Note note={note} />)
    const li = component.container.querySelector('li')
    console.log(prettyDOM(li))

    component.debug()

    expect(component.container).toHaveTextContent('Component testing is done with react-testing-library')

    const element = component.getByText('Component testing is done with react-testing-library')

    expect(element).toBeDefined()

    const div = component.container.querySelector('.note')
    expect(div).toHaveTextContent('Component testing is done with react-testing-library')

})

test('clicking the button calls event handler once', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }
    //create a mock function
    const mockhandler = jest.fn()

    const component = render(<Note note={note} toggleImportance={mockhandler} />)
    //Component has a button that contains the text make not important
    const button = component.getByText('make not important')
    //fireEvent clicks the button and returns the reuslt
    fireEvent.click(button)

    //We can confirm how many times the button was clicked.
    expect(mockhandler.mock.calls).toHaveLength(1)
})


import { fireEvent, getByTestId, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import XMLForm from '../components/XMLForm'

test('Confirm form has required fields', () => {
  render(<XMLForm />)
expect(getByTestId(document.documentElement, 'required-firstName')).toBeRequired()  
expect(getByTestId(document.documentElement, 'required-lastName')).toBeRequired()  
expect(getByTestId(document.documentElement, 'required-email')).toBeRequired()  
expect(getByTestId(document.documentElement, 'required-password')).toBeRequired()  
})

test('Empty form : invalid', () => {
  render(<XMLForm />)
  expect(getByTestId(document.documentElement, 'xml-form')).toBeInvalid()
})

test('Incomplete form : invalid', () => {
  render(<XMLForm />)
  userEvent.type(screen.getByTestId('required-firstName'), 'Lorem')
  expect(getByTestId(document.documentElement, 'xml-form')).toBeInvalid()
})

test('Complete form : valid', () => {
  render(<XMLForm />)
  userEvent.type(screen.getByTestId('required-firstName'), 'Lorem')
  userEvent.type(screen.getByTestId('required-lastName'), 'Ipsum')
  userEvent.type(screen.getByTestId('required-email'), 'LoremIpsum@gmail.com')
  userEvent.type(screen.getByTestId('required-password'), 'password')
  expect(getByTestId(document.documentElement, 'xml-form')).toBeValid()
})

test('Form with invalid email : invalid', () => {
  render(<XMLForm />)
  userEvent.type(screen.getByTestId('required-firstName'), 'Lorem')
  userEvent.type(screen.getByTestId('required-lastName'), 'Ipsum')
  userEvent.type(screen.getByTestId('required-email'), 'LoremIpsum')
  userEvent.type(screen.getByTestId('required-password'), 'password')
  expect(getByTestId(document.documentElement, 'xml-form')).toBeInvalid()
})

test('Form with invalid password : invalid', () => {
  render(<XMLForm />)
  userEvent.type(screen.getByTestId('required-firstName'), 'Lorem')
  userEvent.type(screen.getByTestId('required-lastName'), 'Ipsum')
  userEvent.type(screen.getByTestId('required-email'), 'LoremIpsum@gmail.com')
  userEvent.type(screen.getByTestId('required-password'), 'passwo')
  expect(getByTestId(document.documentElement, 'xml-form')).toBeInvalid()
})

test('Form with missing first name : invalid', () => {
  render(<XMLForm />)
  userEvent.type(screen.getByTestId('required-lastName'), 'Ipsum')
  userEvent.type(screen.getByTestId('required-email'), 'LoremIpsum@gmail.com')
  userEvent.type(screen.getByTestId('required-password'), 'password')
  expect(getByTestId(document.documentElement, 'xml-form')).toBeInvalid()
})

test('Form with missing last name : invalid', () => {
  render(<XMLForm />)
  userEvent.type(screen.getByTestId('required-firstName'), 'Lorem')
  userEvent.type(screen.getByTestId('required-email'), 'LoremIpsum@gmail.com')
  userEvent.type(screen.getByTestId('required-password'), 'password')
  expect(getByTestId(document.documentElement, 'xml-form')).toBeInvalid()
})

test('Assume valid form, mock onSubmit and submit', () => {
  render(<XMLForm />);
  const handleSubmit = jest.fn()
  getByTestId(document.documentElement, 'xml-form').onsubmit = handleSubmit
  fireEvent.submit(getByTestId(document.documentElement, 'xml-form'))
  expect(handleSubmit).toHaveBeenCalled()
})
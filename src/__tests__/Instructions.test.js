import {
  render,
  screen,
  waitFor,
  getByTestId,
  fireEvent,
} from '@testing-library/react'
import Instructions from '../Instructions'
import { Collapsible } from '../Home'
const testUser = {
  given_name: 'Daniel',
  name: 'Daniel Turpin',
}
describe('Instructions', () => {
  test('Should render Instructions without login account', () => {
    render(<Instructions />)
    const todoElement = screen.getByTestId('instructions-1')
    expect(todoElement).toBeInTheDocument()
  })
  test('Should render Instructions without login account', () => {
    render(<Instructions />)
    const todoElement = screen.getByTestId('instructions-2')
    expect(todoElement).toBeInTheDocument()
  })
  test('No user signed in, login is prompted', () => {
    render(<Instructions isLoggedin={false} />)
    waitFor(() => expect(getByText('Login to get started')).toBeInTheDocument())
  })
  test('User is signed in, login is prompted', () => {
    waitFor(() => expect(getByTestId('WelcomeUser')).toBeVisible())
  })
  test('User is signed in, login text is showing properly', () => {
    const { getByText } = render(<Instructions isLoggedin={true} />)
    waitFor(() => expect(getByText('welcome')).not.toBeVisible())
  })
  test('User is signed in, hunnid logo is showing properly', () => {
    render(<Instructions isLoggedin={true} />)
    const todoElement = screen.queryByTestId('hunnidlogo')
    waitFor(() => expect(todoElement).toBeInTheDocument())
  })
  test('User is signed in, hunnid logo is showing properly', () => {
    render(<Instructions isLoggedin={true} />)
    const todoElement = screen.queryByTestId('hunnidlogo')
    waitFor(() => expect(todoElement).toBeInTheDocument())
  })
  test('User is not signed in, alternative hunnid logo is showing properly', () => {
    render(<Instructions isLoggedin={false} />)
    const todoElement = screen.queryByTestId('hunnidlogodefault')
    waitFor(() => expect(todoElement).toBeInTheDocument())
  })
  test('User is signed in, cannot see single resource instruction', () => {
    render(<Instructions isLoggedin={false} />)
    waitFor(() => expect(getByText('Single Question').not.toBeVisible()))
  })
  test('User is not signed in, cannot see pdf uploading instructions', () => {
    render(<Instructions isLoggedin={false} />)
    waitFor(() => expect(getByText('Uploading a File').not.toBeVisible()))
  })
  test('User is signed in, able to see single resource instruction', () => {
    render(<Instructions isLoggedin={true} />)
    waitFor(() => expect(getByText('Single Question').toBeVisible()))
  })
  test('User is not signed in, cannot see pdf uploading instructions', () => {
    render(<Instructions isLoggedin={true} />)
    waitFor(() => expect(getByText('Uploading a File').toBeVisible()))
  })
  test('User is not signed in, cannot see top header', () => {
    render(<Instructions isLoggedin={false} />)
    waitFor(() => expect(getByText('Hunnid supports the').not.toBeVisible()))
  })
  test('User is signed in, can see top header', () => {
    render(<Instructions isLoggedin={true} />)
    waitFor(() => expect(getByText('Hunnid supports the').toBeVisible()))
  })
  test('User is not signed in, cannot see pdf uploading instructions', () => {
    render(<Instructions isLoggedin={false} />)
    waitFor(() => expect(getByText('Uploading a File').not.toBeVisible()))
  })
})

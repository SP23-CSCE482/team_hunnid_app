import {
  render,
  screen,
  cleanup,
  waitFor,
  getByTestId,
} from '@testing-library/react'
import { shallow } from 'enzyme'
import Home from '../Home'
import userEvent from '@testing-library/user-event'
import FileUpload from '../components/upload'

const testUser = {
  given_name: 'Daniel',
  name: 'Daniel Turpin',
}
describe('Home', () => {
  test('Should render homescreen without login account', () => {
    render(<Home />)
    const todoElement = screen.getByTestId('home-1')
    expect(todoElement).toBeInTheDocument()
  })

  test('Should render homescreen header div', () => {
    render(<Home />)
    const todoElement = screen.getByTestId('home-2')
    expect(todoElement).toBeInTheDocument()
  })

  test('No user signed in, login is prompted', () => {
    const { getByText } = render(<Home isLoggedin={false} />)
    waitFor(() => expect(getByText('please login')).toBeInTheDocument())
  })

  test('User is signed in, login is prompted', () => {
    const { getByText } = render(<Home isLoggedin={true} />)
    waitFor(() => expect(getByText('WelcomeUser')).toBeVisible())
    waitFor(() => expect(getByText('welcome')).not.toBeVisible())
  })

  test('User is signed in, file uploading is visible', () => {
    const { getByTestId } = render(<Home isLoggedin={true} />)
    waitFor(() => expect(getByTestId('FileUpload')).toBeVisible())
  })

  test('No user signed in, file uploading is not visible', () => {
    const { getByTestId } = render(<Home isLoggedin={false} />)
    waitFor(() => expect(getByTestId('WelcomeUser')).not.toBeVisible())
    waitFor(() => expect(getByText('welcome')).toBeVisible())
  })

  test('User is signed in, name is displayed properly', () => {
    const { getByText } = render(<Home isLoggedin={true} user={testUser} />)
    waitFor(() => expect(getByText('Daniel')).toBeVisible())
  })

  test('User is not signed in, name is not displayed', () => {
    const { getByText } = render(<Home isLoggedin={false} />)
    waitFor(() => expect(getByText('Daniel')).not.toBeVisible())
  })
})
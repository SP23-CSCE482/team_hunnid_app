import { render, screen, waitFor, getByTestId } from '@testing-library/react'
import Home from '../Home'

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
    waitFor(() => expect(getByText('Login to get started')).toBeInTheDocument())
  })

  test('User is signed in, login is prompted', () => {
    const { getByText } = render(<Home isLoggedin={true} />)
    waitFor(() => expect(getByTestId('WelcomeUser')).toBeVisible())
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

  test('User is signed in, instructions are included', () => {
    const { getByText } = render(<Home isLoggedin={true} user={testUser} />)
    waitFor(() =>
      expect(
        getByText('ll recommend you study materials that best suit your needs'),
      ).toBeVisible(),
    )
    waitFor(() =>
      expect(
        getByText(
          'Below are some topics we think you should focus on.',
        ).not.toBeVisible(),
      ),
    )
  })
})

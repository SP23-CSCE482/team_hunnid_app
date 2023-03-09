import {
  render,
  screen,
  cleanup,
  waitFor,
  getByTestId,
} from '@testing-library/react'
import App from '../App'
const testUser = {
  given_name: 'Daniel',
  name: 'Daniel Turpin',
}

// describe('App', () => {
//   test('Should render signInDiv without an account', () => {
//     render(<App />)
//     const todoElement = screen.getByTestId('signInDiv')
//     expect(todoElement).toBeInTheDocument()
//   })
//   test('Should render signInDiv without an account', () => {
//     render(<App />)
//     const todoElement = screen.getByTestId('signInDiv')
//     expect(todoElement).toBeInTheDocument()
//   })
// })

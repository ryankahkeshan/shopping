import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe("welcome section", () => {
  
  beforeEach(() => {
    render(
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    )
  })

  it('renders title', () => {
    const title = screen.getByRole('heading', {name: 'Welcome to My SHOP'})
    expect(title).toBeInTheDocument()
  })

  it('renders the best', () => {
    const heading = screen.getByRole('heading', {name: 'The best store out there'})
    expect(heading).toBeInTheDocument()
  })

  it('renders buttons', () => {
    const shopNow = screen.getAllByRole('button', {name: 'SHOP NOW'})
    expect(shopNow[0]).toHaveClass('shop-now-btn')

    const seeCol = screen.getByRole('button', {name: 'SEE COLLECTIONS'})
    expect(seeCol).toBeInTheDocument()
  })

  it('shop now button link works', async () => {
    const shopNow = screen.getAllByRole('button', {name: 'SHOP NOW'})[0]
    const user = userEvent.setup()

    await user.click(shopNow)
    expect(window.location.pathname).toBe('/all-products')
  })

  it('see collections link wokrs', async () => {
    const seeCol = screen.getByRole('button', {name: 'SEE COLLECTIONS'})
    const user = userEvent.setup()

    await user.click(seeCol)
    expect(window.location.pathname).toBe('/collections')
  })
})

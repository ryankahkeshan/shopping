import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe("welcome section", () => {
  
  beforeEach(() => {
    render(
      <BrowserRouter>
        <App collections={[
            {name: 'Mens', item: {image: 'url1'}, link: '/mens'},
            {name: 'Womens', item: {image: 'url2'}, link:'/womens'},
            {name: 'Jewelry', item: {image: 'url3'}, link: '/jewelry'}
          ]}
        />
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

describe('front page collections', () => {
  it('renders the three collections', async () => {
    render(
      <BrowserRouter>
        <App collections={[
            {name: 'Mens', item: {image: 'url1'}, link: '/mens'},
            {name: 'Womens', item: {image: 'url2'}, link:'/womens'},
            {name: 'Jewelry', item: {image: 'url3'}, link: '/jewelry'}
          ]}
        />
      </BrowserRouter>
    )
    const mens = screen.getByRole('heading', {name: 'Mens'})
    expect(mens).toBeInTheDocument()
    const mensImage = screen.getByAltText(/image for the mens's collection/i)
    expect(mensImage).toBeInTheDocument()
    expect(mensImage).toHaveAttribute('src', 'url1')

    const womens = screen.getByRole('heading', {name: /womens/i})
    expect(womens).toBeInTheDocument()

    const jewelry = screen.getByRole('heading', {name: /jewelry/i})
    expect(jewelry).toBeInTheDocument()
    
    const user = userEvent.setup()
    await user.click(jewelry)

    expect(window.location.pathname).toBe('/jewelry')
  })
})

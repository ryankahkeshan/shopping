import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import ProductCard from './ProductCard';
import { BrowserRouter } from 'react-router-dom';
import { CartContext } from '../Router';

describe('product-card', () => {
    it('renders properly', () => {
        render(
            <BrowserRouter>
                <ProductCard 
                    url='custom-url'
                    title='custom title'
                    price={100}
                    rating={{rate: 3.8, count: 283}}
                />
            </BrowserRouter>
        )
        const image = screen.getByAltText('custom title')
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('src', 'custom-url')

        const stars = image.parentElement.parentElement.childNodes[1].childNodes[0]
        console.log(stars.childNodes)
        expect(stars.childNodes.length).toEqual(5)
        for (let i = 0; i < 4; i++) {
            expect(stars.childNodes[i]).not.toHaveClass('empty-star')
        }
        expect(stars.childNodes[4]).toHaveClass('empty-star')

        const title = screen.getByRole('heading', {name: 'custom title'})
        expect(title).toBeInTheDocument()

        const price = screen.getByText('$100')
        expect(price).toBeInTheDocument()

        const addButton = screen.getByRole('button', {name: 'Add To Cart'})
        expect(addButton).toBeInTheDocument()
        
        const viewButton = screen.getByRole('button', {name: 'View Product'})
        expect(viewButton).toBeInTheDocument()
    })

    it('4.5 stars', () => {
        render(
            <BrowserRouter>
                <ProductCard 
                    url='custom-url'
                    title='custom title'
                    price={100}
                    rating={{rate: 4.5, count: 283}}
                />
            </BrowserRouter>
        )
        
        const title = screen.getByRole('heading', {name: 'custom title'})
        const stars = title.parentElement.parentElement.childNodes[0]
        expect(stars.childNodes.length).toEqual(5)
        for (let i = 0; i < 5; i++) {
            expect(stars.childNodes[i]).not.toHaveClass('empty-star')
        }
    })

    it('4.4 stars', () => {
        render(
        <BrowserRouter>
            <ProductCard 
                url='custom-url'
                title='custom title'
                price={100}
                rating={{rate: 4.4, count: 283}}
            />
        </BrowserRouter>
        )
        const title = screen.getByRole('heading', {name: 'custom title'})
        const stars = title.parentElement.parentElement.childNodes[0]
        expect(stars.childNodes.length).toEqual(5)
        for (let i = 0; i < 4; i++) {
            expect(stars.childNodes[i]).not.toHaveClass('empty-star')
        }
        expect(stars.childNodes[4]).toHaveClass('empty-star')
    })

    it('0.4 stars', () => {
        render(
            <BrowserRouter>
                <ProductCard 
                    url='custom-url'
                    title='custom title'
                    price={100}
                    rating={{rate: 0.4, count: 283}}
                />
            </BrowserRouter>
        )
        const title = screen.getByRole('heading', {name: 'custom title'})
        const stars = title.parentElement.parentElement.childNodes[0]
        expect(stars.childNodes.length).toEqual(5)
        for (let i = 0; i < 5; i++) {
            expect(stars.childNodes[i]).toHaveClass('empty-star')
        }
    })

    it('add to cart works', async () => {
        const addToCart = vi.fn()
        render(
            <BrowserRouter>
                <CartContext.Provider value={{ addToCart }}>
                    <ProductCard 
                        url='custom-url'
                        title='custom title'
                        price={100}
                        rating={{rate: 0.4, count: 283}}
                    />
                </CartContext.Provider>
            </BrowserRouter>
        )
        expect(addToCart).not.toHaveBeenCalled()
        const button = screen.getByRole('button', {name: /add to cart/i})
        const user = userEvent.setup()
        await user.click(button)
        expect(addToCart).toHaveBeenCalled()
    })
})

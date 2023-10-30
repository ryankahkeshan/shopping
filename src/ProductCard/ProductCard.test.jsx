import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import Router from '../Router';
import { userEvent } from '@testing-library/user-event';
import ProductCard from './ProductCard';

describe('product-card', () => {

    it('renders properly', () => {
        render(<ProductCard 
            url='custom-url'
            title='custom title'
            price={100}
            rating={{rate: 3.8, count: 283}}
        />)
        const image = screen.getByAltText('custom title')
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('src', 'custom-url')

        const stars = image.parentElement.parentElement.childNodes[1].childNodes[0]
        expect(stars.childNodes.length).toEqual(4)

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
        render(<ProductCard 
            url='custom-url'
            title='custom title'
            price={100}
            rating={{rate: 4.5, count: 283}}
        />)
        const title = screen.getByRole('heading', {name: 'custom title'})
        const stars = title.parentElement.parentElement.childNodes[0]
        expect(stars.childNodes.length).toEqual(5)
    })

    it('4.4 stars', () => {
        render(<ProductCard 
            url='custom-url'
            title='custom title'
            price={100}
            rating={{rate: 4.4, count: 283}}
        />)
        const title = screen.getByRole('heading', {name: 'custom title'})
        const stars = title.parentElement.parentElement.childNodes[0]
        expect(stars.childNodes.length).toEqual(4)
    })

    it('0.4 stars', () => {
        render(<ProductCard 
            url='custom-url'
            title='custom title'
            price={100}
            rating={{rate: 0.4, count: 283}}
        />)
        const title = screen.getByRole('heading', {name: 'custom title'})
        const stars = title.parentElement.parentElement.childNodes[0]
        expect(stars.childNodes.length).toEqual(0)
    })
})

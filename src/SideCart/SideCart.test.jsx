import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { CartContext } from '../Router';
import SideCart from './SideCart';
import Navbar from '../Navbar/Navbar';

describe("side-cart", () => {
    it('renders properly', () => {
        render(
            <BrowserRouter>
                <SideCart/>
            </BrowserRouter>
        )
        const yourCart = screen.getByText('Your Cart')
        expect(yourCart).toBeInTheDocument()

        const cartIcon = screen.getByTestId('side-cart-icon')
        expect(cartIcon).toBeInTheDocument()

        const close = screen.getByTestId('close-side-cart')
        expect(close).toBeInTheDocument()

        const subtotal = screen.getByText('SUB-TOTAL')
        expect(subtotal).toBeInTheDocument()

        const zero = screen.getByText('$ 0')
        expect(zero).toBeInTheDocument()

        const checkout = screen.getByRole('button', {name: 'CHECKOUT'})
        expect(checkout).toBeInTheDocument()
    })

    it('close button calls fn', async () => {
        const closeCart = vi.fn()

        render(
            <BrowserRouter>
                <SideCart closeCart={closeCart} />
            </BrowserRouter>
        )
        const close = screen.getByTestId('close-side-cart')
        const user = userEvent.setup()

        await user.click(close)
        expect(closeCart).toHaveBeenCalledOnce()
        expect(closeCart).not.toHaveBeenCalledTimes(2)
    })

    it('close button closes', async () => {
        render(
            <BrowserRouter>
                <Navbar/>
            </BrowserRouter>
        )
        const cart = screen.getByTestId('cart-icon')
        const user = userEvent.setup()

        await user.click(cart)
        const yourCart = screen.getByText('Your Cart')
        expect(yourCart).toBeInTheDocument()

        const close = screen.getByTestId('close-side-cart')
        await user.click(close)
        expect(yourCart).not.toBeInTheDocument()
    })

    it('checkout button brings to checkout', async () => {
        render(
            <BrowserRouter>
                <SideCart/>
            </BrowserRouter>
        )
        expect(window.location.pathname).not.toBe('/checkout')
        const checkoutBtn = screen.getByRole('button', {name: 'CHECKOUT'})
        const user = userEvent.setup()

        await user.click(checkoutBtn)

        expect(window.location.pathname).toBe('/checkout')
    })
})

describe('subtotal', () => {
    it('blank cart', () => {
        const cartItems = []
        render(
            <BrowserRouter>
                <CartContext.Provider value={{ cartItems }}>
                    <SideCart/>
                </CartContext.Provider>
            </BrowserRouter>
        )
        const subtotal = screen.getByText('SUB-TOTAL').parentElement.childNodes[1]
        expect(subtotal.textContent).toBe('$ 0')
    })
    
    it('one item, quantity 1', () => {
        const cartItems = [{url: 'url1', alt: 'alt1', title: 'name', price: 100, quantity: 1}]
        render(
            <BrowserRouter>
                <CartContext.Provider value={{ cartItems }}>
                    <SideCart/>
                </CartContext.Provider>
            </BrowserRouter>
        )
        const subtotal = screen.getByText('SUB-TOTAL').parentElement.childNodes[1]
        expect(subtotal.textContent).toBe('$ 100')
        expect(subtotal.textContent).not.toBe('$ 0')
    })

    it('one item, quantity 2', () => {
        const cartItems = [{url: 'url1', alt: 'alt1', title: 'name', price: 100, quantity: 2}]
        render(
            <BrowserRouter>
                <CartContext.Provider value={{ cartItems }}>
                    <SideCart/>
                </CartContext.Provider>
            </BrowserRouter>
        )
        const subtotal = screen.getByText('SUB-TOTAL').parentElement.childNodes[1]
        expect(subtotal.textContent).toBe('$ 200')
    })

    it('two items, quantity 1', () => {
        const cartItems = [
            {url: 'url1', alt: 'alt1', title: 'name', price: 100, quantity: 1},
            {url: 'url2', alt: 'alt2', title: 'name2', price: 250, quantity: 1}
        ]
        render(
            <BrowserRouter>
                <CartContext.Provider value={{ cartItems }}>
                    <SideCart/>
                </CartContext.Provider>
            </BrowserRouter>
        )
        const subtotal = screen.getByText('SUB-TOTAL').parentElement.childNodes[1]
        expect(subtotal.textContent).toBe('$ 350')
        expect(subtotal.textContent).not.toBe('$ 200')
    })

    it('three items, quantity 2 - 1 - 3 ', () => {
        const cartItems = [
            {url: 'url1', alt: 'alt1', title: 'name', price: 100, quantity: 2},
            {url: 'url2', alt: 'alt2', title: 'name2', price: 250, quantity: 1},
            {url: 'url3', alt: 'alt3', title: 'name3', price: 50.99, quantity: 3}
        ]
        render(
            <BrowserRouter>
                <CartContext.Provider value={{ cartItems }}>
                    <SideCart/>
                </CartContext.Provider>
            </BrowserRouter>
        )
        const subtotal = screen.getByText('SUB-TOTAL').parentElement.childNodes[1]
        expect(subtotal.textContent).toBe('$ 602.97')
        expect(subtotal.textContent).not.toBe('$ 200')
    })

    it('round to 2 digits', () => {
        const cartItems = [
            {url: 'url1', alt: 'alt1', title: 'name', price: 99.99, quantity: 2},
            {url: 'url2', alt: 'alt2', title: 'name2', price: 250.64, quantity: 1},
            {url: 'url3', alt: 'alt3', title: 'name3', price: 50.99999, quantity: 3}
        ]
        render(
            <BrowserRouter>
                <CartContext.Provider value={{ cartItems }}>
                    <SideCart/>
                </CartContext.Provider>
            </BrowserRouter>
        )
        const subtotal = screen.getByText('SUB-TOTAL').parentElement.childNodes[1]
        expect(subtotal.textContent).toBe('$ 603.62')
        expect(subtotal.textContent).not.toBe('$ 200')
    })
})

describe('item card', () => {
    it('renders one item properly', async () => {
        const cartItems = [{url: 'url1', alt: 'alt1', title: 'name', price: 100, quantity: 1}]
        const addToCart = vi.fn()
        const removeFromCart = vi.fn()
        render(
            <BrowserRouter>
                <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
                    <SideCart/>
                </CartContext.Provider>
            </BrowserRouter>
        )
        const container = screen.getByText('SUB-TOTAL').parentElement.parentElement.parentElement.childNodes[1]
        expect(container.childNodes.length).toBe(1)
        expect(container.childNodes.length).not.toBe(0)

        const user = userEvent.setup()

        const name = screen.getByText('name')
        expect(name).toBeInTheDocument()

        const image = screen.getByAltText('alt1')
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('src', 'url1')

        const add = screen.getByRole('button', {name: '+'})
        expect(add).toBeInTheDocument()
        expect(addToCart).not.toHaveBeenCalled()
        await user.click(add)
        expect(addToCart).toHaveBeenCalledOnce()

        const quantity = screen.getByText('1')
        expect(quantity).toBeInTheDocument()

        const minus = screen.getByRole('button', {name: '-'})
        expect(minus).toBeInTheDocument()
        expect(removeFromCart).not.toHaveBeenCalled()
        await user.click(minus)
        expect(removeFromCart).toHaveBeenCalledOnce()

        const remove = screen.getByRole('button', {name: /remove/i})
        expect(remove).toBeInTheDocument()
        expect(removeFromCart).toHaveBeenCalledOnce()
        await user.click(remove)
        expect(removeFromCart).toHaveBeenCalledTimes(2)

        const price = container.childNodes[0].childNodes[1].childNodes[0].childNodes[1]
        expect(price.textContent).toBe('$ 100')
    })

    it('renders quantity and price properly', async () => {
        const cartItems = [{url: 'url1', alt: 'alt1', title: 'name', price: 99.273, quantity: 5}]
        render(
            <BrowserRouter>
                <CartContext.Provider value={{ cartItems }}>
                    <SideCart/>
                </CartContext.Provider>
            </BrowserRouter>
        )
        const container = screen.getByText('SUB-TOTAL').parentElement.parentElement.parentElement.childNodes[1]
        expect(container.childNodes.length).toBe(1)
        expect(container.childNodes.length).not.toBe(0)

        const quantity = screen.getByText('5')
        expect(quantity).toBeInTheDocument()

        const price = container.childNodes[0].childNodes[1].childNodes[0].childNodes[1]
        expect(price.textContent).toBe('$ 496.37')
    })

    it('renders multiple items', () => {
        const cartItems = [
            {url: 'url1', alt: 'alt1', title: 'name1', price: 99.99, quantity: 2},
            {url: 'url2', alt: 'alt2', title: 'name2', price: 10, quantity: 3},
            {url: 'url3', alt: 'alt3', title: 'name3', price: 50, quantity: 1},
        ]
        render(
            <BrowserRouter>
                <CartContext.Provider value={{ cartItems }}>
                    <SideCart/>
                </CartContext.Provider>
            </BrowserRouter>
        )
        const container = screen.getByText('SUB-TOTAL').parentElement.parentElement.parentElement.childNodes[1]
        expect(container.childNodes.length).toBe(3)
        expect(container.childNodes.length).not.toBe(0)

        const name1 = screen.getByText('name1')
        expect(name1).toBeInTheDocument()

        const name2 = screen.getByText('name2')
        expect(name2).toBeInTheDocument()

        const name3 = screen.queryByText('name3')
        expect(name3).toBeInTheDocument()

        const name4 = screen.queryByText('name4')
        expect(name4).not.toBeInTheDocument()

        const image2 = screen.getByAltText('alt2')
        expect(image2).toBeInTheDocument()
        expect(image2).toHaveAttribute('src', 'url2')

        const image3 = screen.getByAltText('alt3')
        expect(image3).toBeInTheDocument()
        expect(image3).toHaveAttribute('src', 'url3')
    })

})

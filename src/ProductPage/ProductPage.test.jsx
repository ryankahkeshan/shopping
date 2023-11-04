import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import ProductPage from './ProductPage';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { CartContext } from '../Router';
import { act } from 'react-dom/test-utils';

const data = [
    {
        "id": 2,
        "title": "Mens Casual Premium Slim Fit T-Shirts ",
        "price": 22.3,
        "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "rating": {
            "rate": 4.1,
            "count": 259
        }
    },
    {
        "id": 3,
        "title": "Mens Cotton Jacket",
        "price": 55.99,
        "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        "rating": {
            "rate": 4.7,
            "count": 500
        }
    },
    {
        "id": 4,
        "title": "Mens Casual Slim Fit",
        "price": 15.99,
        "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
        "rating": {
            "rate": 2.1,
            "count": 430
        }
    },
    {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
            "rate": 3.9,
            "count": 120
        }
    }
]

describe('product page', () => {
    it('renders properly', () => {
        const id = 2
        render(
            <MemoryRouter initialEntries={[`/mens/${id}`]}>
                <CartContext.Provider value={{ addToCart: vi.fn() }}>
                    <Routes>
                        <Route path='/mens/:id' element={<ProductPage data={data} testing={true}/>}></Route>
                    </Routes>
                </CartContext.Provider>
            </MemoryRouter>
        )
        const title = screen.getByRole('heading', { name: "Mens Casual Premium Slim Fit T-Shirts" });
        expect(title).toBeInTheDocument();
        const fakeTitle = screen.queryByRole('heading', {name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops" })
        expect(fakeTitle).not.toBeInTheDocument()

        const price = screen.getByRole('heading', {name: "$ 22.3"})
        expect(price.textContent).toBe('$ 22.3')

        const stars = price.parentElement.childNodes[2]
        expect(stars.childNodes.length).toEqual(5)
        expect(stars.childNodes.length).not.toEqual(4)
        for (let i = 0; i < 4; i++) {
            expect(stars.childNodes[i]).toHaveClass('star')
            expect(stars.childNodes[i]).not.toHaveClass('empty-star')
        }
        expect(stars.childNodes[4]).toHaveClass('empty-star')

        const desc = screen.getByText("Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.")
        expect(desc).toBeInTheDocument()

        const quantityTitle = screen.getByText('Quantity')
        expect(quantityTitle).toBeInTheDocument()

        const plusButton = screen.getByRole('button', {name: '+'})
        expect(plusButton).toBeInTheDocument()
        const minusButton = screen.getByRole('button', {name: '-'})
        expect(minusButton).toBeInTheDocument()

        const currQuantity = plusButton.parentElement.childNodes[1]
        expect(currQuantity.textContent).toBe('1')

        const addButton = screen.getByRole('button', {name: 'ADD TO CART'})
        expect(addButton).toBeInTheDocument()
        const checkoutButton = screen.getByRole('button', {name: 'CHECKOUT'})
        expect(checkoutButton).toBeInTheDocument()

        const img = title.parentElement.parentElement.childNodes[0].childNodes[0]
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg")
        expect(img).not.toHaveAttribute('src', "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg")
        expect(img).toHaveAttribute('alt', 'Picture of Mens Casual Premium Slim Fit T-Shirts ')
    })
    
    it('quantity buttons work', async () => {
        const id = 2
        render(
            <MemoryRouter initialEntries={[`/mens/${id}`]}>
                <Routes>
                    <Route path='/mens/:id' element={<ProductPage data={data} testing={true}/>}></Route>
                </Routes>
            </MemoryRouter>
        )
        const plusButton = screen.getByRole('button', {name: '+'})
        const minusButton = screen.getByRole('button', {name: '-'})
        const currQuantity = plusButton.parentElement.childNodes[1]
        const user = userEvent.setup()

        expect(currQuantity.textContent).toBe('1')
        await act( async () => await user.click(minusButton))
        expect(currQuantity.textContent).toBe('1')
        await act( async () => await user.click(plusButton))
        expect(currQuantity.textContent).toBe('2')
        await act( async () => await user.click(plusButton))
        expect(currQuantity.textContent).toBe('3')
        await act( async () => await user.click(minusButton))
        expect(currQuantity.textContent).toBe('2')
        await act( async () => await user.click(minusButton))
        expect(currQuantity.textContent).toBe('1')
        await act( async () => await user.click(minusButton))
        expect(currQuantity.textContent).toBe('1')
    })

    it('add to cart button works', async () => {
        const id = 2
        const addToCartMock = vi.fn()
        render(
            <MemoryRouter initialEntries={[`/mens/${id}`]}>
                <CartContext.Provider value={{ addToCart: addToCartMock }}>
                    <Routes>
                        <Route path='/mens/:id' element={<ProductPage data={data} testing={true}/>}></Route>
                    </Routes>
                </CartContext.Provider>
            </MemoryRouter>
        )
        const addButton = screen.getByRole('button', {name: 'ADD TO CART'})
        const user = userEvent.setup()

        expect(addToCartMock).not.toHaveBeenCalled()
        await user.click(addButton)
        expect(addToCartMock).toHaveBeenCalledOnce()
        await user.click(addButton)
        expect(addToCartMock).toHaveBeenCalledTimes(2)
    })

    it('checkout buttons brings to checkout', () => {
        const id = 2
        render(
            <MemoryRouter initialEntries={[`/mens/${id}`]}>
                <CartContext.Provider value={{ addToCart: vi.fn() }}>
                    <Routes>
                        <Route path='/mens/:id' element={<ProductPage data={data} testing={true}/>}></Route>
                    </Routes>
                </CartContext.Provider>
            </MemoryRouter>
        )
        const checkoutButton = screen.getByRole('button', {name: 'CHECKOUT'})
        const link = screen.getByRole('link', {href: 'checkout'})
        expect(link).toBeInTheDocument()
        expect(link).toContainElement(checkoutButton)
    })
})


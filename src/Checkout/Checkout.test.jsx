import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { CartContext } from '../Router';
import Checkout from './Checkout';

describe('shipping inputs', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Checkout testing={true} />
            </BrowserRouter>
        )
    })
    it('steps', () => {
        const firstStep = screen.getByTestId('first-step')
        const secondStep = screen.getByTestId('second-step')
        const thirdStep = screen.getByTestId('third-step')
        expect(firstStep.textContent).toContain('Shipping')
        expect(firstStep.classList.contains('line')).toBe(false)
        expect(secondStep.textContent).toContain('Payment')
        expect(secondStep.classList.contains('line-two-start')).toBe(false)
        expect(secondStep.classList.contains('line-two-finish')).toBe(false)
        expect(thirdStep.textContent).toContain('Confirm')
        expect(thirdStep.classList.contains('start')).toBe(false)
    })

    it('renders fields', () => {
        const shippingTitle = screen.getByText('Shipping Details')
        expect(shippingTitle).toBeInTheDocument()
        const first = screen.getByPlaceholderText('First Name')
        expect(first).toBeInTheDocument()
        expect(first.value).toBe('')
        const last = screen.getByPlaceholderText('Last Name')
        expect(last).toBeInTheDocument()
        expect(last.value).toBe('')
        const address = screen.getByPlaceholderText('Address')
        expect(address).toBeInTheDocument()
        expect(address.value).toBe('')
        const apartment = screen.getByPlaceholderText('Apartment, suite, etc... (optional)')
        expect(apartment).toBeInTheDocument()
        expect(apartment.value).toBe('')
        const city = screen.getByPlaceholderText('City')
        expect(city).toBeInTheDocument()
        expect(city.value).toBe('')
        const country = screen.getByPlaceholderText('Country')
        expect(country).toBeInTheDocument()
        expect(country.value).toBe('')
        const state = screen.getByPlaceholderText('State/Province')
        expect(state).toBeInTheDocument()
        expect(state.value).toBe('')
        const zip = screen.getByPlaceholderText('ZIP Code')
        expect(zip).toBeInTheDocument()
        expect(zip.value).toBe('')
        const email = screen.getByPlaceholderText('Email')
        expect(email).toBeInTheDocument()
        expect(email.value).toBe('')
        const newsletter = screen.getByLabelText('I want to receive offers and updates')
        expect(newsletter).toBeInTheDocument()
        expect(newsletter.value).toBe('false')
    })

    it('inputs work', async () => {
        const user = userEvent.setup()

        const first = screen.getByPlaceholderText('First Name')
        expect(first.value).toBe('')
        await user.click(first)
        await user.keyboard('John')
        expect(first.value).toBe('John')

        const last = screen.getByPlaceholderText('Last Name')
        expect(last.value).toBe('')
        await user.click(last)
        await user.keyboard('Doe')
        expect(last.value).toBe('Doe')

        const address = screen.getByPlaceholderText('Address')
        expect(address.value).toBe('')
        await user.click(address)
        await user.keyboard('123 King St.')
        expect(address.value).toBe('123 King St.')

        const apartment = screen.getByPlaceholderText('Apartment, suite, etc... (optional)')
        expect(apartment.value).toBe('')
        await user.click(apartment)
        await user.keyboard('Unit 3')
        expect(apartment.value).toBe('Unit 3')

        const city = screen.getByPlaceholderText('City')
        expect(city.value).toBe('')
        await user.click(city)
        await user.keyboard('Waterloo')
        expect(city.value).toBe('Waterloo')

        const country = screen.getByPlaceholderText('Country')
        expect(country.value).toBe('')
        await user.click(country)
        await user.keyboard('Canada')
        expect(country.value).toBe('Canada')

        const state = screen.getByPlaceholderText('State/Province')
        expect(state.value).toBe('')
        await user.click(state)
        await user.keyboard('Ontario')
        expect(state.value).toBe('Ontario')

        const zip = screen.getByPlaceholderText('ZIP Code')
        expect(zip.value).toBe('')
        await user.click(zip)
        await user.keyboard('123456')
        expect(zip.value).toBe('123456')

        const email = screen.getByPlaceholderText('Email')
        expect(email.value).toBe('')
        await user.click(email)
        await user.keyboard('john@abc.com')
        expect(email.value).toBe('john@abc.com')

        const newsletter = screen.getByLabelText('I want to receive offers and updates')
        expect(newsletter.value).toBe('false')
        await user.click(newsletter)
        expect(newsletter.value).toBe('true')
    })

    it('need to fill in fields', async () => {
        const user = userEvent.setup()
        const next = screen.getByText('Continue to Payment')

        let popUp = screen.queryByText('Please fill in the required fields')
        expect(popUp).not.toBeInTheDocument()
        await user.click(next)
        popUp = screen.queryByText('Please fill in the required fields')
        expect(popUp).toBeInTheDocument()

        const first = screen.getByPlaceholderText('First Name')
        await user.click(first)
        await user.keyboard('John')
        popUp = screen.queryByText('Please fill in the required fields')
        expect(popUp).not.toBeInTheDocument()

        const last = screen.getByPlaceholderText('Last Name')
        await user.click(last)
        await user.keyboard('Doe')

        await user.click(next)
        popUp = screen.queryByText('Please fill in the required fields')
        expect(popUp).toBeInTheDocument()

        const address = screen.getByPlaceholderText('Address')
        await user.click(address)
        await user.keyboard('123 King St.')
        const city = screen.getByPlaceholderText('City')
        await user.click(city)
        await user.keyboard('Waterloo')
        const country = screen.getByPlaceholderText('Country')
        await user.click(country)
        await user.keyboard('Canada')
        const state = screen.getByPlaceholderText('State/Province')
        await user.click(state)
        await user.keyboard('Ontario')

        await user.click(next)
        popUp = screen.queryByText('Please fill in the required fields')
        expect(popUp).toBeInTheDocument()

        const zip = screen.getByPlaceholderText('ZIP Code')
        await user.click(zip)
        await user.keyboard('123456')

        await user.click(next)
        popUp = screen.queryByText('Please fill in the required fields')
        expect(popUp).toBeInTheDocument()

        const email = screen.getByPlaceholderText('Email')
        await user.click(email)
        await user.keyboard('john@abc.com')

        await user.click(next)
        popUp = screen.queryByText('Please fill in the required fields')
        expect(popUp).not.toBeInTheDocument()
    })

    it('payment renders', async () => {
        // Get to payment
        const user = userEvent.setup()

        const first = screen.getByPlaceholderText('First Name')
        await user.click(first)
        await user.keyboard('John')
        const last = screen.getByPlaceholderText('Last Name')
        await user.click(last)
        await user.keyboard('Doe')
        const address = screen.getByPlaceholderText('Address')
        await user.click(address)
        await user.keyboard('123 King St.')
        const city = screen.getByPlaceholderText('City')
        await user.click(city)
        await user.keyboard('Waterloo')
        const country = screen.getByPlaceholderText('Country')
        await user.click(country)
        await user.keyboard('Canada')
        const state = screen.getByPlaceholderText('State/Province')
        await user.click(state)
        await user.keyboard('Ontario')
        const zip = screen.getByPlaceholderText('ZIP Code')
        await user.click(zip)
        await user.keyboard('123456')
        const email = screen.getByPlaceholderText('Email')
        await user.click(email)
        await user.keyboard('john@abc.com')

        const next = screen.getByText('Continue to Payment')
        await user.click(next)

        // Check the update of steps
        const firstStep = screen.getByTestId('first-step')
        const secondStep = screen.getByTestId('second-step')
        const thirdStep = screen.getByTestId('third-step')
        expect(firstStep.textContent).toContain('Shipping')
        expect(firstStep.classList.contains('line')).toBe(false)
        expect(secondStep.textContent).toContain('Payment')
        expect(secondStep.classList.contains('line-two-start')).toBe(true)
        expect(secondStep.classList.contains('line-two-finish')).toBe(false)
        expect(thirdStep.textContent).toContain('Confirm')
        expect(thirdStep.classList.contains('start')).toBe(false)

        // Renders fields
        const title = screen.getByRole('heading', {name: 'Payment Details'})
        expect(title).toBeInTheDocument()

        const number = screen.getByPlaceholderText('Card Number')
        expect(number).toBeInTheDocument()
        const name = screen.getByPlaceholderText("Card Holder's Name")
        expect(name).toBeInTheDocument()
        const same = screen.getByLabelText('Same as Shipping Details')
        expect(same).toBeInTheDocument()
        const expiration = screen.getByPlaceholderText('MM/YY')
        expect(expiration).toBeInTheDocument()
        const cvc = screen.getByPlaceholderText('CVC')
        expect(cvc).toBeInTheDocument()
        const backBtn = screen.getByText('Back')
        expect(backBtn).toBeInTheDocument()
        const continueBtn = screen.getByText('Continue to Confirmation')
        expect(continueBtn).toBeInTheDocument()
    })

    it('payment inputs work', async () => {
        // Get to payment
        const user = userEvent.setup()

        const first = screen.getByPlaceholderText('First Name')
        await user.click(first)
        await user.keyboard('John')
        const last = screen.getByPlaceholderText('Last Name')
        await user.click(last)
        await user.keyboard('Doe')
        const address = screen.getByPlaceholderText('Address')
        await user.click(address)
        await user.keyboard('123 King St.')
        const city = screen.getByPlaceholderText('City')
        await user.click(city)
        await user.keyboard('Waterloo')
        const country = screen.getByPlaceholderText('Country')
        await user.click(country)
        await user.keyboard('Canada')
        const state = screen.getByPlaceholderText('State/Province')
        await user.click(state)
        await user.keyboard('Ontario')
        const zip = screen.getByPlaceholderText('ZIP Code')
        await user.click(zip)
        await user.keyboard('123456')
        const email = screen.getByPlaceholderText('Email')
        await user.click(email)
        await user.keyboard('john@abc.com')

        const next = screen.getByText('Continue to Payment')
        await user.click(next)

        // Check fields & invalid
        const toConfirm = screen.getByText('Continue to Confirmation')
        let popUp = screen.queryByText('Please fill in the required fields')
        expect(popUp).not.toBeInTheDocument()
        await user.click(toConfirm)
        popUp = screen.queryByText('Please fill in the required fields')
        expect(popUp).toBeInTheDocument()

        const number = screen.getByPlaceholderText('Card Number')
        expect(number.value).toBe('')
        await user.click(number)
        await user.keyboard('1234567891234567')
        expect(number.value).toBe('1234 5678 9123 4567')
        await user.click(toConfirm)
        popUp = screen.queryByText('Please fill in the required fields')
        expect(popUp).toBeInTheDocument()

        const name = screen.getByPlaceholderText("Card Holder's Name")
        expect(name.value).toBe('')
        await user.click(name)
        await user.keyboard('James')
        expect(name.value).toBe('James')
        await user.click(toConfirm)
        popUp = screen.queryByText('Please fill in the required fields')
        expect(popUp).toBeInTheDocument()

        const same = screen.getByLabelText('Same as Shipping Details')
        expect(same.value).toBe('false')
        expect(name.value).toBe('James')
        await user.click(same)
        expect(same.value).toBe('true')
        expect(name.value).toBe('John Doe')
        await user.click(same)
        expect(same.value).toBe('false')
        expect(name.value).toBe('James')

        const expiration = screen.getByPlaceholderText('MM/YY')
        expect(expiration.value).toBe('')
        await user.click(expiration)
        await user.keyboard('0828')
        expect(expiration.value).toBe('08/28')
        await user.click(toConfirm)
        popUp = screen.queryByText('Please fill in the required fields')
        expect(popUp).toBeInTheDocument()

        const cvc = screen.getByPlaceholderText('CVC')
        expect(cvc.value).toBe('')
        await user.click(cvc)
        await user.keyboard('123')
        expect(cvc.value).toBe('123')

        const backBtn = screen.getByText('Back')
        await user.click(backBtn)
        const shippingTitle = screen.getByRole('heading', {name: 'Shipping Details'})
        expect(shippingTitle).toBeInTheDocument()
        const paymentTitle = screen.queryByRole('heading', {name: 'Payment Details'})
        expect(paymentTitle).not.toBeInTheDocument()

        // Check the update of steps
        const firstStep = screen.getByTestId('first-step')
        const secondStep = screen.getByTestId('second-step')
        const thirdStep = screen.getByTestId('third-step')
        expect(firstStep.textContent).toContain('Shipping')
        expect(firstStep.classList.contains('line')).toBe(false)
        expect(secondStep.textContent).toContain('Payment')
        expect(secondStep.classList.contains('line-two-start')).toBe(false)
        expect(secondStep.classList.contains('line-two-finish')).toBe(false)
        expect(thirdStep.textContent).toContain('Confirm')
        expect(thirdStep.classList.contains('start')).toBe(false)

        const toPayment = screen.getByText('Continue to Payment')
        await user.click(toPayment)
        const toConfirm2 = screen.getByText('Continue to Confirmation')
        await user.click(toConfirm2)
        popUp = screen.queryByText('Please fill in the required fields')
        expect(popUp).not.toBeInTheDocument()
    })

    it('confirm page & place order', async () => {
        // Get to confirm page
        const user = userEvent.setup()

        const first = screen.getByPlaceholderText('First Name')
        await user.click(first)
        await user.keyboard('John')
        const last = screen.getByPlaceholderText('Last Name')
        await user.click(last)
        await user.keyboard('Doe')
        const address = screen.getByPlaceholderText('Address')
        await user.click(address)
        await user.keyboard('123 King St.')
        const city = screen.getByPlaceholderText('City')
        await user.click(city)
        await user.keyboard('Waterloo')
        const country = screen.getByPlaceholderText('Country')
        await user.click(country)
        await user.keyboard('Canada')
        const state = screen.getByPlaceholderText('State/Province')
        await user.click(state)
        await user.keyboard('Ontario')
        const zip = screen.getByPlaceholderText('ZIP Code')
        await user.click(zip)
        await user.keyboard('123456')
        const email = screen.getByPlaceholderText('Email')
        await user.click(email)
        await user.keyboard('john@abc.com')
        const next = screen.getByText('Continue to Payment')
        await user.click(next)
        const number = screen.getByPlaceholderText('Card Number')
        await user.click(number)
        await user.keyboard('1234567891234567')
        const name = screen.getByPlaceholderText("Card Holder's Name")
        await user.click(name)
        await user.keyboard('James')
        const expiration = screen.getByPlaceholderText('MM/YY')
        await user.click(expiration)
        await user.keyboard('0828')
        const cvc = screen.getByPlaceholderText('CVC')
        await user.click(cvc)
        await user.keyboard('123')

        const nextBtn = screen.getByText('Continue to Confirmation')
        await user.click(nextBtn)

        // Check the update of steps
        const firstStep = screen.getByTestId('first-step')
        const secondStep = screen.getByTestId('second-step')
        const thirdStep = screen.getByTestId('third-step')
        expect(firstStep.textContent).toContain('Shipping')
        expect(firstStep.classList.contains('line')).toBe(false)
        expect(secondStep.textContent).toContain('Payment')
        expect(secondStep.classList.contains('line-two-start')).toBe(true)
        expect(secondStep.classList.contains('line-two-finish')).toBe(true)
        expect(thirdStep.textContent).toContain('Confirm')
        expect(thirdStep.classList.contains('start')).toBe(true)

        // Make sure everything rendered properly
        const bigTitle = screen.getByRole('heading', {name: 'Confirm Order'})
        expect(bigTitle).toBeInTheDocument()

        const yourInfo = screen.getByRole('heading', {name: 'Your Information'})
        expect(yourInfo).toBeInTheDocument()
        const yourName = screen.getByText('James')
        expect(yourName).toBeInTheDocument()
        const yourEmail = screen.getByText('john@abc.com')
        expect(yourEmail).toBeInTheDocument()

        const orderShipping = screen.getByRole('heading', {name: 'Shipping Details'})
        expect(orderShipping).toBeInTheDocument()
        const orderAddress = screen.getByText('123 King St., 123456')
        expect(orderAddress).toBeInTheDocument()
        const orderLocation = screen.getByText('Waterloo, Ontario, Canada')
        expect(orderLocation).toBeInTheDocument()

        const orderNum = screen.getByText('Card Ending In 4567')
        expect(orderNum).toBeInTheDocument()
        const cardDetails = screen.getByText('08/28, 123')
        expect(cardDetails).toBeInTheDocument()

        const orderDetails = screen.getByRole('heading', {name: 'Order Details'})
        expect(orderDetails).toBeInTheDocument()
        const price1 = screen.getAllByText('$ 0')[0]
        expect(price1).toBeInTheDocument()
        const price2 = screen.getAllByText('$ 0')[1]
        expect(price2).toBeInTheDocument()
        const freeShipping = screen.getAllByText('Free')[0]
        expect(freeShipping).toBeInTheDocument()

        const placeOrder = screen.getByRole('button', {name: 'Place Order'})
        await user.click(placeOrder)

        const thankYouMsg = screen.getByRole('heading', {name: 'THANK YOU!'})
        expect(thankYouMsg).toBeInTheDocument()
    })
})

describe('checkout basket', () => {
    it('renders basket', () => {
        const cartItems = [
            {url:'url1', alt:'alt1', title:'title1', price:10.99, quantity:2},
            {url:'url2', alt:'alt2', title:'title2', price:79.9829, quantity:1}
        ]
        const addToCart = vi.fn()
        const removeFromCart = vi.fn()
        render(
            <BrowserRouter>
                <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }} >
                    <Checkout testing={true} />
                </CartContext.Provider>
            </BrowserRouter>
        )
        const basketTitle = screen.getByRole('heading', {name: 'Your Order'})
        expect(basketTitle).toBeInTheDocument()
        const subt = screen.getByRole('heading', {name: 'Sub-total'})
        expect(subt).toBeInTheDocument()
        const subtPrice = subt.parentElement.childNodes[1]
        expect(subtPrice.textContent).toBe('$ 101.96')
        const shipping = subt.parentElement.parentElement.childNodes[5].childNodes[0]
        expect(shipping.textContent).toBe('Shipping')
        const shippingPrice = shipping.parentElement.childNodes[1]
        expect(shippingPrice.textContent).toBe('...')
        const total = screen.getByRole('heading', {name: 'Total'})
        expect(total).toBeInTheDocument()
        const totalPrice = total.parentElement.childNodes[1]
        expect(totalPrice.textContent).toBe('$ 101.96')
        // Items
        const items = basketTitle.parentElement.childNodes[2]
        expect(items.childNodes.length).toBe(2)
        const item1 = items.childNodes[0]
        const img1 = item1.childNodes[0].childNodes[0]
        expect(img1).toHaveAttribute('src', 'url1')
        expect(img1).toHaveAttribute('alt', 'alt1')
        expect(item1.textContent).toContain('title1')
        expect(item1.textContent).toContain('$ 21.98')
        const item2 = items.childNodes[1]
        const img2 = item2.childNodes[0].childNodes[0]
        expect(img2).toHaveAttribute('src', 'url2')
        expect(img2).toHaveAttribute('alt', 'alt2')
        expect(item2.textContent).toContain('title2')
        expect(item2.textContent).toContain('$ 79.98')
    })

    it('add and minus buttons work', async () => {
        const cartItems = [
            {url:'url1', alt:'alt1', title:'title1', price:10.99, quantity:2},
            {url:'url2', alt:'alt2', title:'title2', price:79.9829, quantity:1}
        ]
        const addToCart = vi.fn()
        const removeFromCart = vi.fn()
        render(
            <BrowserRouter>
                <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }} >
                    <Checkout testing={true} />
                </CartContext.Provider>
            </BrowserRouter>
        )
        const addBtn1 = screen.getAllByRole('button', {name: '+'})[0]
        const minBtn2 =  screen.getAllByRole('button', {name: '-'})[1]
        const remove1 = screen.getAllByRole('button', {name: 'Remove'})[0]
        const user = userEvent.setup()

        expect(addToCart).not.toHaveBeenCalled()
        await user.click(addBtn1)
        expect(addToCart).toHaveBeenCalledOnce()

        expect(removeFromCart).not.toHaveBeenCalled()
        await user.click(minBtn2)
        expect(removeFromCart).toHaveBeenCalledOnce()

        await user.click(remove1)
        expect(removeFromCart).toHaveBeenCalledTimes(2)
    })
})
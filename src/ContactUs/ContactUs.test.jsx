import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import ContactUs from './ContactUs';
import { act } from 'react-dom/test-utils';

describe('contact-us', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <ContactUs />
            </BrowserRouter>
        )
    })
    
    it('renders properly', () => {
        const title = screen.getByRole('heading', {name: 'Contact Us'})
        expect(title).toBeInTheDocument()
        const phone = screen.getByText('Phone: +1 (234) 567-8910')
        expect(phone).toBeInTheDocument()
        const email = screen.getByText('Email: abc@example.com')
        expect(email).toBeInTheDocument()
        const first = screen.getByPlaceholderText('First Name *')
        expect(first).toBeInTheDocument()
        const last = screen.getByPlaceholderText('Last Name *')
        expect(last).toBeInTheDocument()
        const emailInput = screen.getByPlaceholderText('Email *')
        expect(emailInput).toBeInTheDocument
        const msg = screen.getByPlaceholderText('Enter Your Message *')
        expect(msg).toBeInTheDocument()
        const btn = screen.getByRole('button', {name: 'Send Message'})
        expect(btn).toBeInTheDocument()
    })

    it('inputs work', async () => {
        const first = screen.getByPlaceholderText('First Name *')
        const last = screen.getByPlaceholderText('Last Name *')
        const email = screen.getByPlaceholderText('Email *')
        const msg = screen.getByPlaceholderText('Enter Your Message *')
        const user = userEvent.setup()

        expect(first.value).toBe('')
        await user.click(first)
        await act(async () => await user.keyboard('John'))
        expect(first.value).toBe('John')

        expect(last.value).toBe('')
        await user.click(last)
        await act(async () => await user.keyboard('Doe'))
        expect(last.value).toBe('Doe')

        expect(email.value).toBe('')
        await user.click(email)
        await act(async () => await user.keyboard('abc@example.com'))
        expect(email.value).toBe('abc@example.com')

        expect(msg.value).toBe('')
        await user.click(msg)
        await act(async () => await user.keyboard('I have a problem with...'))
        expect(msg.value).toBe('I have a problem with...')
    })

    it('empty inputs & pop up message appears', async () => {
        const first = screen.getByPlaceholderText('First Name *')
        const last = screen.getByPlaceholderText('Last Name *')
        const email = screen.getByPlaceholderText('Email *')
        const msg = screen.getByPlaceholderText('Enter Your Message *')
        const btn = screen.getByRole('button', {name: 'Send Message'})
        const user = userEvent.setup()

        let popUp = screen.queryByText('Please fill in the required fields')
        expect(popUp).not.toBeInTheDocument()

        await act(async () => await user.click(btn))
        popUp = screen.queryByText('Please fill in the required fields')
        expect(popUp).toBeInTheDocument()

        await user.click(first)
        await act(async () => await user.keyboard('John'))
        popUp = screen.queryByText('Please fill in the required fields')
        expect(popUp).not.toBeInTheDocument()

        await act(async () => await user.click(btn))
        popUp = screen.queryByText('Please fill in the required fields')
        expect(popUp).toBeInTheDocument()

        await user.click(last)
        await act(async () => await user.keyboard('Doe'))

        await act(async () => await user.click(btn))
        popUp = screen.queryByText('Please fill in the required fields')
        expect(popUp).toBeInTheDocument()

        await user.click(email)
        await act(async () => await user.keyboard('abc@example.com'))

        await act(async () => await user.click(btn))
        popUp = screen.queryByText('Please fill in the required fields')
        expect(popUp).toBeInTheDocument()

        await user.click(msg)
        await act(async () => await user.keyboard('I have a problem with...'))

        await act(async () => await user.click(btn))
        popUp = screen.queryByText('Please fill in the required fields')
        expect(popUp).not.toBeInTheDocument()

        const validTitle = screen.getByRole('heading', {name: 'Thank You For Your Inquiry'})
        expect(validTitle).toBeInTheDocument()
        const validText = screen.getByText('Our team is working hard on the issue, and we will get back to you as soon as possible')
        expect(validText).toBeInTheDocument()
        const validBtn = screen.getByRole('button', {name: 'Close'})
        expect(validBtn).toBeInTheDocument()

        await act(async () => await user.click(validBtn))

        const closedValidTitle = screen.queryByRole('heading', {name: 'Thank You For Your Inquiry'})
        expect(closedValidTitle).not.toBeInTheDocument()
    })
})
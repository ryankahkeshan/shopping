import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Router from '../Router';
import { userEvent } from '@testing-library/user-event';
import DescriptionCard from './DescriptionCard';
import { MemoryRouter } from 'react-router-dom';

describe('description card', () => {
    
    it('renders fields', () => {
        render(
            <MemoryRouter>
                <DescriptionCard
                url={'custom url'}
                alt={'custom alt'} 
                title={'Custome Title'} 
                text={
                [
                    "some text 1",
                    "some text 2"
                ]
                }
                link={'all-products'}
                buttonText={'SHOP NOW'} />
            </MemoryRouter>)

        const cardImg = screen.getByAltText('custom alt')
        expect(cardImg).toBeInTheDocument()
        expect(cardImg).toHaveAttribute('src', 'custom url')

        const title = screen.getByRole('heading', 'Custom Title')
        expect(title).toBeInTheDocument()

        const list = screen.getByRole('list')   
        expect(list.childNodes[0].textContent).toMatch(/some text 1/i)
        expect(list.childNodes[1].textContent).toMatch(/some text 2/i)

        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('href', '/all-products')

        const button = screen.getByRole('button', {name: 'SHOP NOW'})
        expect(button).toBeInTheDocument()
    })

    it('link works', async () => {
        render(<Router />)
        const button = screen.getAllByRole('button', {name: 'SHOP NOW'})[1]
        expect(button).toHaveClass('description-card-btn')
        const user = userEvent.setup()

        await user.click(button)
        expect(window.location.pathname).toBe('/all-products')
    })
})
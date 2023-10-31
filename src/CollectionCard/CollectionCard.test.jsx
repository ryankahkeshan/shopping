import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CollectionCard from './CollectionCard';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

describe('collection card', () => {
    it('renders properly', async () => {
        render(
            <BrowserRouter>
                <CollectionCard
                    url='custom-url'
                    name='custom-name'
                    link='/mens'
                />
            </BrowserRouter> 
        )
        const image = screen.getByAltText('Image for the custom-name\'s collection')
        expect(image).toBeInTheDocument()

        const name = screen.getByText('custom-name')
        expect(name).toBeInTheDocument()

        const user = userEvent.setup()
        await user.click(name)
        expect(window.location.pathname).toBe('/mens')
    }) 
})
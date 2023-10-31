import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Collections from './Collections';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

describe('collections', () => {
    it('renders properly', async () => {
        render(
            <BrowserRouter>
                <Collections data={[
                    {name: 'name1', item: {image: 'url1'}, link: '/mens'},
                    {name: 'name2', item: {image: 'url2'}, link: '/random-link'},
                ]}
                testing={true}
                />
            </BrowserRouter>
        )
        const title = screen.getByRole('heading', {name: 'Our Collections'})
        expect(title).toBeInTheDocument()

        const section = title.parentElement.childNodes[2].childNodes[0]
        expect(section.childNodes.length).not.toEqual(0)

        const image = screen.getByAltText('Image for the name1\'s collection')
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('src', 'url1')

        const nameOne = screen.getByText('name1')
        expect(nameOne).toBeInTheDocument()

        const image2 = screen.getByAltText('Image for the name2\'s collection')
        expect(image2).toBeInTheDocument()
        expect(image2).toHaveAttribute('src', 'url2')

        const nameTwo = screen.getByText('name2')
        expect(nameTwo).toBeInTheDocument()

        const user = userEvent.setup()
        await user.click(image)
        expect(window.location.pathname).toBe('/mens')
    })

    it('renders nothing', () => {
        render(
            <BrowserRouter>
                <Collections data={[]} testing={true} />
            </BrowserRouter>
        )
        const title = screen.getByRole('heading', {name: 'Our Collections'})
        expect(title).toBeInTheDocument()

        const section = title.parentElement.childNodes[2].childNodes[0]
        expect(section.childNodes.length).toEqual(0)
    })
})

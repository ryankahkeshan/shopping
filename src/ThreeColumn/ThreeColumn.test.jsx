import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ThreeColumn from './ThreeColumn';

describe('multicolumn', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <ThreeColumn title={'HEADING'} data={
                    [
                        {
                        url: 'url1',
                        alt: 'Icon 1',
                        title: 'Title 1',
                        text: 'Text 1',
                        },
                        {
                        url: 'url2',
                        alt: 'Icon 2',
                        title: 'Title 2',
                        text: 'Text 2',
                        },
                        {
                        url: 'url3',
                        alt: 'Icon 3',
                        title: 'Title 3',
                        text: 'Text 3',
                        },
                    ]
                }/>
            </MemoryRouter>
        )
    })

    it('renders fields', () => {
        const title = screen.getByRole('heading', {name: 'HEADING'})
        expect(title).toBeInTheDocument()

        const titleOne = screen.getByRole('heading', {name: 'Title 1'})
        expect(titleOne).toBeInTheDocument()
        const imageOne = screen.getByAltText('Icon 1')
        expect(imageOne).toBeInTheDocument()
        expect(imageOne).toHaveAttribute('src', 'url1')
        const parentOne = titleOne.parentElement
        expect(parentOne.childNodes[2].textContent).toMatch(/text 1/i)

        const titleTwo = screen.getByRole('heading', {name: 'Title 2'})
        expect(titleTwo).toBeInTheDocument()
        const imageTwo = screen.getByAltText('Icon 2')
        expect(imageTwo).toBeInTheDocument()
        expect(imageTwo).toHaveAttribute('src', 'url2')
        const parentTwo = titleTwo.parentElement
        expect(parentTwo.childNodes[2].textContent).toMatch(/text 2/i)

        const titleThree = screen.getByRole('heading', {name: 'Title 3'})
        expect(titleOne).toBeInTheDocument()
        const imageThree = screen.getByAltText('Icon 3')
        expect(imageThree).toBeInTheDocument()
        expect(imageThree).toHaveAttribute('src', 'url3')
        const parentThree = titleThree.parentElement
        expect(parentThree.childNodes[2].textContent).toMatch(/text 3/i)
    })
})
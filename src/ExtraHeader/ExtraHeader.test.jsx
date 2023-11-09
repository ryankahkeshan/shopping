import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ExtraHeader from './ExtraHeader';
import pic1 from './../App/slides/one.png'

describe('extra header', () => {
    it('renders properly', () => {
        render(
            <BrowserRouter>
                <ExtraHeader url={pic1} title={'Custom Title'} />
            </BrowserRouter>
        )
        const title = screen.getByRole('heading', {name:'Custom Title'})
        expect(title).toBeInTheDocument()

        const img = screen.getByAltText('Picture of MySHOP employees smiling')
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', '/src/App/slides/one.png')
    })
})
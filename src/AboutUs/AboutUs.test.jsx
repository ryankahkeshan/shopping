import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import AboutUs from './AboutUs';

describe('about-us', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <AboutUs />
            </BrowserRouter>
        )
    })

    it('renders properly', () => {
        const title = screen.getByRole('heading', {name:'About Us'})
        expect(title).toBeInTheDocument()

        const img = screen.getByAltText('Picture of MySHOP employees smiling')
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', '/src/App/slides/one.png')

        const paragraphs = title.parentElement.parentElement.childNodes[1]
        expect(paragraphs.childNodes.length).toBe(4)
        const p1 = paragraphs.childNodes[0]
        expect(p1.textContent).toBe('Welcome to MySHOP, where fashion meets comfort and style blends seamlessly with affordability. Our journey began with a simple vision - to redefine the way people experience fashion. At MySHOP, we believe that clothing should not only reflect personal style but should also embody quality and comfort.')
        const p2 = paragraphs.childNodes[1]
        expect(p2.textContent).toBe('Founded on the principles of passion and a keen eye for trends, MySHOP has evolved into the destination for fashion enthusiasts seeking chic and trendy apparel. From casual wear to statement pieces that leave a lasting impression, our diverse range of clothing is designed to cater to every style and occasion.')
        const p3 = paragraphs.childNodes[2]
        expect(p3.textContent).toBe('What sets us apart is our commitment to providing not just clothing, but an experience. We are dedicated to staying ahead of the curve, ensuring that our pieces meet our high standards of quality and style. Whether you\'re a trendsetter or someone who prefers timeless classics, we have something for everyone.')
        const p4 = paragraphs.childNodes[3]
        expect(p4.textContent).toBe('Explore our collection and discover the perfect ensemble that not only complements your individuality but also celebrates the joy of dressing well. Join us on this exciting journey of self-expression through fashion, and let MySHOP be your trusted companion in style.')
    })
})
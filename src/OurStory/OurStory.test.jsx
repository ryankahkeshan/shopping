import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import OurStory from './OurStory';

describe('our-story', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <OurStory />
            </BrowserRouter>
        )
    })

    it('renders properly', () => {
        // Header tested seperately
        const title = screen.getByRole('heading', {name: 'Our Story'})
        const paragraphs = title.parentElement.parentElement.childNodes[1]
        expect(paragraphs.childNodes.length).toBe(4)
        const p1 = paragraphs.childNodes[0]
        expect(p1.textContent).toBe('Embark on a journey through the chapters of MySHOP\'s story, where passion for fashion and a commitment to excellence converge. It all began with a dream - a dream to create a clothing store that goes beyond the ordinary, where fashion becomes a statement and style is a reflection of individuality.')
        const p2 = paragraphs.childNodes[1]
        expect(p2.textContent).toBe('Our story is woven with threads of dedication and a relentless pursuit of bringing the latest trends to your wardrobe. From our humble beginnings to becoming a sought-after destination for fashion enthusiasts, each milestone in our journey is a testament to the love and support we\'ve received from our valued customers.')
        const p3 = paragraphs.childNodes[2]
        expect(p3.textContent).toBe('At MySHOP, we believe that fashion is not just about clothing; it\'s an art form that allows individuals to express their unique personalities. Every piece in our collection is carefully curated, with an emphasis on quality, comfort, and staying ahead of the fashion curve.')
        const p4 = paragraphs.childNodes[3]
        expect(p4.textContent).toBe('As we continue to grow, our commitment to providing an unparalleled shopping experience remains unwavering. Join us in celebrating the evolution of MySHOP, and let our story become a part of your style narrative. Thank you for being a cherished part of our journey - here\'s to many more chapters of style, elegance, and fashion-forward moments together.')
    })
})

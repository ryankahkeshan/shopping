import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CollectionPage from './CollectionPage';

describe('collection pages', () => {
    it('renders properly', () => {
        render(
        <CollectionPage
            data={[
                {
                    id: 1,
                    title: 'title1',
                    category: 'cat1',
                    description: 'desc1',
                    price: 11,
                    rating: {rate: 1.1, count: 111}
                },
                {
                    id: 2,
                    title: 'title2',
                    category: 'cat2',
                    description: 'desc2',
                    price: 22,
                    rating: {rate: 2.2, count: 222}
                }
            ]}
            title={'Custom Collection Title'}
            testing={true}
        />)

        const colTitle = screen.getByRole('heading', {name: 'Custom Collection Title'})
        expect(colTitle).toBeInTheDocument()

        const products = colTitle.parentElement.childNodes[2].childNodes[0]
        expect(products.childNodes.length).toEqual(2)
    })

    it('0 renders', () => {
        render(
            <CollectionPage
                data={[]}
                title={'abc'}
                testing={true}
            />
        )
        const colTitle = screen.getByRole('heading', {name: 'abc'})
        expect(colTitle).toBeInTheDocument()
        const products = colTitle.parentElement.childNodes[2].childNodes[0]
        expect(products.childNodes.length).toEqual(0)
    })
})
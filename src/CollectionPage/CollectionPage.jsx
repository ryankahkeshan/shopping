import './CollectionPage.css'
import PropTypes, { any, objectOf } from 'prop-types'
import ProductCard from '../ProductCard/ProductCard'
import { useEffect } from 'react';

const CollectionPage = ({ data, title, testing = false }) => {

    useEffect(() => {
        if (!testing) {
            const element = document.getElementById('collection-page-title')
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
    })

    return (
        <>
            <h1 id='collection-page-title' 
                style={{padding:'3rem', paddingBottom:'1rem', fontSize:'2.5rem'}}>
                {title}
            </h1>
            <div style={{border:'1px solid rgb(0,0,0, 0.5)', margin:'0 3rem'}}></div>
            <section style={{display:'flex', justifyContent:'center', boxSizing:'border-box', padding:'3rem'}}>
                <div style={{display:'grid', gridTemplateColumns:`repeat(3, 1fr)`, gap:'3rem', overflow:'hidden'}}>
                    {data.map(el => {
                        return (
                            <ProductCard 
                                key={el.id} 
                                url={el.image}
                                title={el.title}
                                price={el.price}
                                rating={el.rating}
                            />
                        )
                    })}
                </div>
            </section>
        </>
    )
}

CollectionPage.propTypes = {
    data: PropTypes.arrayOf(objectOf(any)),
    title: PropTypes.string,
    testing: PropTypes.bool
}

export default CollectionPage
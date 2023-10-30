import './ProductCard.css'
import PropTypes, { number, string } from 'prop-types'
import { Star } from 'lucide-react';
import { v4 as uuid } from 'uuid';

const ProductCard = ({ url, alt = '', title, price, rating  }) => {

    if (alt === '') alt = title

    const stars = []
    const roundedRating = Math.round(rating.rate)
    for (let i = 0; i < roundedRating; i++) {
        stars.push(<Star key={uuid()} className='star'/>)
    }
    for(let i = roundedRating; i < 5; i++) {
        stars.push(<Star key={uuid()} className='star' style={{fill:'transparent'}}/>)
    }

    function findSubstring(text, maxLength = 40) {
        const words = text.split(' ');
        let currentLength = 0;
        const resultWords = [];
    
        for (const word of words) {
            if (currentLength + word.length + resultWords.length > maxLength) {
                break;
            }
            resultWords.push(word);
            currentLength += word.length;
        }
    
        return resultWords.join(' ');
    }

    return (
        <section className='product-card'>
            <div className="top">
                <img src={url} alt={alt} />
            </div>
            <div className="bottom">
                <div style={{display:'flex', justifyContent:'center', gap:'8px', padding:'1rem'}}>
                    {stars}
                </div>
                <div style={{display:'flex', justifyContent:'space-between', 
                    alignContent:'center', padding:'0 2rem', gap:'0.5rem'}}>
                    <h1>{findSubstring(title)}</h1>
                    <p>{`$${price}`}</p>
                </div>
                <div className="card-btns">
                    <button className='card-colored-btn'>Add To Cart</button>
                    <button>View Product</button>
                </div>
            </div>
        </section>
    )
}

ProductCard.propTypes = {
    url: PropTypes.string,
    alt: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.objectOf(number)
}

export default ProductCard
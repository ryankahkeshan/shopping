import { Link, useParams } from 'react-router-dom'
import './ProductPage.css'
import PropTypes, { any, objectOf } from 'prop-types'
import { useContext, useEffect, useState } from 'react'
import { StarsComponent } from '../ProductCard/ProductCard'
import { CartContext } from '../Router'

const ProductPage = ({ data, testing = false }) => {

    const { id } = useParams()

    const { addToCart } = useContext(CartContext)

    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        if (!testing) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }, [id])

    const item = data.find(item =>item.id == id)

    const renderProductContent = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <section className="product-page">
                    <div className="product-page-image-container">
                        <img
                            src={item.image}
                            alt={`Picture of ${item.title}`}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>
                    <div className="side-product-details">
                        <h1 style={{ fontSize: '2.5rem' }}>{item.title}</h1>
                        <h3>$ {item.price}</h3>
                        <div style={{ display: 'flex', gap: '2px' }}>
                            <StarsComponent rating={item.rating.rate} />
                        </div>
                        <p style={{ color: 'rgb(0.1,0.1,0.1,0.7)', lineHeight: '21px' }}>
                            {item.description[0].toUpperCase() + item.description.slice(1)}
                        </p>
                        <p>Quantity</p>
                        <div className="product-page-quantity-selector">
                            <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
                            {quantity}
                            <button onClick={() => setQuantity((prev) => prev === 1 ? 1 : prev - 1)}>-</button>
                        </div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <button className='product-page-add-to-cart'
                                onClick={() => addToCart(item.image, `Picture of ${item.title}`,
                                    item.title, item.price, quantity)}>
                                ADD TO CART
                            </button>
                            <Link to="/checkout">
                                <button className='product-page-checkout'>CHECKOUT</button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
    // Conditionally render the component content based on data availability
    return data.length > 0 ? renderProductContent() : <div>Loading...</div>
}

ProductPage.propTypes = {
    data: PropTypes.arrayOf(objectOf(any)),
    testing: PropTypes.bool,
}

export default ProductPage

import { useContext, useEffect, useMemo, useState } from 'react'
import './Checkout.css'
import { CartContext } from '../Router'
import { CartItem } from '../SideCart/SideCart'
import PropTypes, { any, bool, number, string } from 'prop-types'
import InvalidPopUp from '../InvalidPopUp/InvalidPopUp'
import { Check } from 'lucide-react'

const Checkout = ({ testing }) => {

    const { cartItems, removeFromCart } = useContext(CartContext)
    const [response, setResponse] = useState(
        {
            first: '',
            last: '',
            address: '',
            apartment: '',
            city: '',
            country: '',
            state: '',
            zip: '',
            email: '',
            newsletter: false,
            number: '',
            cardName: '',
            expiration: '',
            cvc: ''
        })
    const [invalidResponse, setInvalidResponse] = useState(false)
    const [invalidMsg, setInvalidMsg] = useState('Please fill in the required fields')
    const [shipping, setShipping] = useState(false)
    const [payment, setPayment] = useState(false)
    const [sectionIdx, setSectionIdx] = useState(0)

    const subtotal = useMemo(() => {
        return cartItems.reduce((total, item) => {
            return total + item.price * item.quantity
        }, 0)
    }, [cartItems])

    useEffect(() => {
        if(!testing) {
            window.scrollTo({
                top: 100,
                behavior: 'smooth'
            })
        }

        if (sectionIdx === 0) {
            const firstLine = document.querySelector('#first-step')
            const secondLine = document.querySelector('#second-step')
            const thirdStep = document.querySelector('#third-step')
            firstLine.classList.remove('line-one')
            secondLine.classList.remove('line-two-start')
            secondLine.classList.remove('line-two-finish')
            thirdStep.classList.remove('start')
        } else if (sectionIdx === 1) {
            const firstLine = document.querySelector('#first-step')
            const secondLine = document.querySelector('#second-step')
            const thirdStep = document.querySelector('#third-step')
            firstLine.classList.add('line-one')
            secondLine.classList.add('line-two-start')
            secondLine.classList.remove('line-two-finish')
            thirdStep.classList.remove('start')
        } else if (sectionIdx === 2) {
            const firstLine = document.querySelector('#first-step')
            const secondLine = document.querySelector('#second-step')
            const thirdStep = document.querySelector('#third-step')
            firstLine.classList.add('line-one')
            secondLine.classList.add('line-two-finish')
            thirdStep.classList.add('start')
        }
    }, [sectionIdx])

    const simpleAddInput = (field, value) => {
        setResponse(prev => {
            const obj = {...prev}
            obj[field] = value
            return obj
        })
    }

    const addInput = (field, value) => {
        setInvalidResponse(false)
        // Check if required field is empty
        if (value === '' && field !== 'number' && field !== 'expiration' &&
            field !== 'cvc' && field !== 'apartment' && field !== 'newsletter') {
            setShipping(false)
            setPayment(false)
        } else if (value === '' && field !== 'apartment' && field !== 'newsletter') {
            setPayment(false)
        }
        if (value === '') {
            simpleAddInput(field, value)
            return
        }
        // Format fields
        if (field === 'cvc') {
            let num = parseInt(value.replace(/D/g, ''), 10)
            if (isNaN(num)) return
            simpleAddInput(field, num)
        } else if (field === 'number') {
            let num = value.replace(/\D/g, '')
            if (isNaN(parseInt(num))) return
            num = num.replace(/(\d{4})(?=\d)/g, '$1 ')
            simpleAddInput(field, num)
        } else if (field === 'expiration') {
            let num = value.replace('/', '')
            if (num.length > 2) {
               simpleAddInput(field, num.replace(/^(\d{2})(\d{0,2})/, '$1/$2')) 
            } else {
                simpleAddInput(field, num)
            }
        } else {
            setResponse(prev => {
                const obj = {...prev}
                obj[field] = value
                return obj
            })
        }
    }

    return ( sectionIdx === 3 ? <ThankYouPage response={response} /> : (
        <div style={{display:'flex', justifyContent:'center', boxSizing:'border-box'}}>
            {invalidResponse && <InvalidPopUp closePopUp={setInvalidResponse} text={invalidMsg} />}
            <section className='checkout-page'>
                <form action="" className='checkout-form'>
                    <div className="steps">
                        <div className="step" id='first-step' data-testid='first-step'>
                            <p onClick={() => setSectionIdx(prev => 0)}
                                style={{cursor:'pointer'}}>
                                {sectionIdx > 0 ? <Check className='checked-step'/> : 1}
                            </p>
                            <h3>Shipping</h3>
                        </div>
                        <div className="step" id='second-step' data-testid='second-step'>
                            <p onClick={() => shipping && setSectionIdx(prev => 1)}
                                style={shipping ? {cursor:'pointer'} : null}>
                                {sectionIdx > 1 ? <Check className='checked-step'/> : 2}
                            </p>
                            <h3>Payment</h3>
                        </div>
                        <div className="step" id='third-step' data-testid='third-step'>
                            <p onClick={() => shipping && payment && setSectionIdx(2)}
                                style={(shipping && payment) ? {cursor:'pointer'} : null}>
                                {sectionIdx > 2 ? <Check className='checked-step'/> : 3}
                            </p>
                            <h3>Confirm</h3>
                        </div>
                    </div>
                    {sectionIdx === 0
                        ? <Shipping setSection={setSectionIdx} shipping={setShipping} setResponse={addInput}
                             response={response} setInvalid={setInvalidResponse} /> 
                        : sectionIdx === 1 ? <Payment setSection={setSectionIdx} payment={setPayment}
                             response={response} setInvalid={setInvalidResponse} setResponse={addInput}/>
                        : <ConfirmOrder response={response} setSection={setSectionIdx} total={subtotal} remove={removeFromCart} />}
                </form>
                <section className="basket">
                    <h4>Your Order</h4>
                    <div className="checkout-divider"></div>
                    <div className='checkout-cards'>
                    {cartItems.map(({ url, alt, title, price, quantity }, idx) => {
                        return <CartItem key={idx} url={url} alt={alt} title={title} price={price}
                            quantity={quantity} setInvalid={setInvalidResponse} msg={setInvalidMsg} />
                    })}
                    </div>
                    <div className="checkout-divider"></div>
                    <div className="basket-totals" style={{marginBottom:'0.5rem'}}>
                        <h4>Sub-total</h4>
                        <p>$ {Math.round(subtotal * 100) / 100}</p>
                    </div>
                    <div className="basket-totals">
                        <h4>Shipping</h4>
                        <p>{shipping ? 'Free' : '...'}</p>
                    </div>
                    <div className="checkout-divider"></div>
                    <div className="basket-totals" style={{color:'black'}}>
                        <h3>Total</h3>
                        <p>$ {Math.round(subtotal * 100) / 100}</p>
                    </div>
                </section>
            </section>
        </div>
    ))
}

Checkout.propTypes = {
    testing: PropTypes.bool
}

export default Checkout

const Shipping = ({ setSection, shipping, setResponse, response, setInvalid }) => {
    return (
        <div className='input-container'>
            <h2 style={{padding:'0 0 0.5rem'}}>Shipping Details</h2>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem'}}>
                <input type="text" id='first-name' name='first-name' value={response.first} 
                    placeholder='First Name' onChange={(e) => setResponse('first', e.target.value)} />
                <input type="text" id='last-name' name='last-name' value={response.last}
                    placeholder='Last Name' onChange={(e) => setResponse('last', e.target.value)} />
            </div>
            <div style={{display:'flex', flexDirection:'column'}}>
                <input type="text" id='address' name='address' value={response.address}
                    placeholder='Address' onChange={(e) => setResponse('address', e.target.value)} />
                <input type="text" id='apartment' placeholder='Apartment, suite, etc... (optional)' value={response.apartment} 
                    name='apartment' onChange={(e) => setResponse('apartment', e.target.value)} />
                <input type="text" id='city' name='city' value={response.city}
                    placeholder='City' onChange={(e) => setResponse('city', e.target.value)} />
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'0.75rem'}}>
                <input type="text" id='country' name='country' value={response.country}
                    placeholder='Country' onChange={(e) => setResponse('country', e.target.value)} />
                <input type="text" id='state' name='state' value={response.state}
                    placeholder='State/Province' onChange={(e) => setResponse('state', e.target.value)}/>
                <input type="text" id='zip' name='zip' value={response.zip}
                    placeholder='ZIP Code' onChange={(e) => setResponse('zip', e.target.value)} />
            </div>
            <div style={{display:'flex', flexDirection:'column'}}>
                <input type="email" id='email' name='email' value={response.email}
                    placeholder='Email' onChange={(e) => setResponse('email', e.target.value)} />
            </div>
            <div style={{display:'flex', alignItems:'center', gap:'8px', fontSize:'0.9rem'}}>
                <input type="checkbox" id='email-sub' style={{cursor:'pointer'}} value={response.newsletter}
                    onChange={(e) => setResponse('newsletter', e.target.checked)} />
                <label htmlFor="email-sub">I want to receive offers and updates</label>
            </div>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
                <div className='continue-btn' onClick={() => {
                    if (response.first === '' || response.last === '' || response.address === '' ||
                        response.city === '' || response.country === '' || response.state === '' ||
                        response.zip === '' || response.email === '') {
                        setInvalid(true)
                        shipping(false)
                    } else {
                        setSection(prev => prev + 1)
                        shipping(true)
                    }
                }}>
                    Continue to Payment
                </div>
            </div>
        </div>
    )
}

Shipping.propTypes = {
    setSection: PropTypes.func,
    shipping: PropTypes.func,
    setResponse: PropTypes.func,
    response: PropTypes.objectOf(any),
    setInvalid: PropTypes.func
}

const Payment = ({ setSection, payment, response, setInvalid, setResponse }) => {
    const [same, setSame] = useState(false)
    return (
        <div>
            <div className='input-container'>
                <h2 style={{padding:'0 0 0.75rem'}}>Payment Details</h2>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <input type="text" id='card' name='card' placeholder='Card Number' maxLength={19}
                        value={response.number} onChange={(e) => setResponse('number', e.target.value)} />
                    <div style={{display:'flex', width:'100%', gap:'8px'}}>
                        <input type="text" id='card-name' name='card-name' placeholder="Card Holder's Name" 
                            value={same ? response.first + ' ' + response.last : response.cardName} readOnly={same ? true : false}
                            onChange={(e) => setResponse('cardName', e.target.value)} style={same ? {cursor:'not-allowed', flexGrow:'1', outline:'none'} : {flexGrow:'1'}}/>
                        <div style={{display:'flex', alignItems:'center', gap:'8px', fontSize:'0.9rem'}}>
                            <input type='checkbox' id='same-name' onChange={(e) => setSame(e.target.checked)} value={same} />
                            <label htmlFor="same-name">Same as Shipping Details</label>
                        </div>
                    </div>
                </div>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem'}}>
                        <input type="text" id='expiration' name='expiration' placeholder='MM/YY' maxLength={5}
                            value={response.expiration} onChange={(e) => {
                                const num = e.target.value
                                const lastCode = num.charCodeAt(num.length - 1)
                                lastCode >= 47 && lastCode <= 57 || isNaN(lastCode) ? setResponse('expiration', e.target.value) : null
                            }}/>
                        <input type="text" id='cvc' name='cvc' placeholder='CVC' maxLength={3}
                            value={response.cvc} onChange={(e) => setResponse('cvc', e.target.value)}/>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', marginTop:'1rem'}}>
                <div className='back-btn' onClick={() => setSection(prev => prev - 1)}>
                    Back
                </div>
                    <div className='continue-btn' onClick={() => {
                        if (response.number === '' || response.expiration === '' || response.cvc === '') {
                            setInvalid(true)
                            payment(false)
                        } else {
                            setSection(prev => prev + 1)
                            payment(true)
                        }
                    }}>
                        Continue to Confirmation
                    </div>
                </div>
            </div>
        </div>
    )
}

Payment.propTypes = {
    setSection: PropTypes.func,
    payment: PropTypes.func,
    response: PropTypes.objectOf(any),
    setInvalid: PropTypes.func,
    setResponse: PropTypes.func
}

const ConfirmOrder = ({ response, setSection, total, remove }) => {
    const { cartItems } = useContext(CartContext)
    return (
        <div className="input-container">
            <h2 style={{padding:'0 0 0.75rem'}}>Confirm Order</h2>
            <div className='confirm-section'>
                <h4>Your Information</h4>
                <div className="confirm-divider"></div>
                <p>{response.first + ' ' + response.last}</p>
                <p>{response.email}</p>
            </div>
            <div className='confirm-section'>
                <h4>Shipping Details</h4>
                <div className="confirm-divider"></div>
                <p>{response.address}, {response.zip}</p>
                <p>{response.apartment}</p>
                <p>{response.city}, {response.state}, {response.country}</p>
            </div>
            <div className='confirm-section'>
                <h4>Payment Details</h4>
                <div className="confirm-divider"></div>
                <p>Card Ending In {response.number.substring(response.number.length - 4)}</p>
                <p>{response.cardName}</p>
                <p>{response.expiration}, {response.cvc}</p>
            </div>
            <div className='confirm-section'>
                <h4>Order Details</h4>
                <div className="confirm-divider"></div>
                {cartItems.map(item => {
                    return <div style={{display:'flex', justifyContent:'space-between'}}>
                        <h5>{item.quantity} * {item.title}</h5>
                        <p>$ {Math.round(item.quantity * item.price * 100) / 100}</p>
                    </div>
                })}
                <div style={{display:'flex', justifyContent:'space-between'}}>
                        <h5>Shipping</h5>
                        <p>Free</p>
                    </div>
                <div style={{display:'flex', justifyContent:'space-between', marginTop:'0.5rem'}}>
                    <h4>Total</h4>
                    <p>$ {Math.round(total * 100) / 100}</p>
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', marginTop:'-0.25rem'}}>
                <div className='back-btn' onClick={() => setSection(prev => prev - 1)}>
                    Back
                </div>
                <button className='confirm-btn' onClick={(e) => {
                    e.preventDefault()
                    cartItems.forEach(({url, alt, title, price}) => remove(url, alt, title, price, Infinity))
                    setSection(3)
                }}>
                    Place Order
                </button>
            </div>
        </div>
    )
}

ConfirmOrder.propTypes = {
    response: PropTypes.objectOf(any),
    setSection: PropTypes.func,
    total: PropTypes.number,
    remove: PropTypes.func
}

const ThankYouPage = ({ response }) => {
    return (
        <section className="thank-you-page">
            <Check className='thank-you-check' />
            <h1 style={{fontSize:'3rem', wordSpacing:'0.5rem'}}>THANK YOU!</h1>
            <p style={{width:'65ch', textAlign:'center'}}>We have begun processing your order with great care and attention to detail.
                Our team is working diligently to ensure that everything goes smoothly. 
                You can expect to receive an email confirmation of your order shortly at {response.email}. 
                Thank you for choosing us for your purchase, and we look forward to serving you again in the future.
            </p>
        </section>
    )
}

ThankYouPage.propTypes = {
    response: PropTypes.objectOf(any)
}

import { Link } from 'react-router-dom';
import './Footer.css'
import Icon from '@mdi/react';
import { mdiArrowRightThick } from '@mdi/js';
import { SocialIcon } from 'react-social-icons'
import { useState } from 'react';

const Footer = () => {

    const [email, setEmail] = useState("");

    const btnClick = event => {
        const maybeBtn = event.target.parentElement
        const input = maybeBtn.classList.contains("newsletter") ?
            maybeBtn.childNodes[2] :
            maybeBtn.parentElement.classList.contains("newsletter") ?
            maybeBtn.parentElement.childNodes[2] :
            maybeBtn.parentElement.parentElement.childNodes[2]

        if (email === "") {
            input.placeholder = "Email missing"
            input.classList.add("newsletter-error")
            return
        }
        const hasAt = input.value.indexOf("@");
        const hasDot = input.value.indexOf(".");
        if (hasAt === -1 || hasDot === -1) {
            input.placeholder = "Invalid email"
            input.classList.add("newsletter-error")
            setEmail("");
        } else {
            input.classList.remove("newsletter-error")
            setEmail("")
            input.placeholder = "Thank you for subscribing"
        }
    }

    return (
        <footer>
            <section className='footer-columns'>
                <section className='footer-section-links'>
                    <h3>Shop Now</h3>
                    <Link to='/all-products' className='footer-links'>All Products</Link>
                    <Link to='/collections' className='footer-links'>Collections</Link>
                    <Link to='/mens' className='footer-links'>Mens</Link>
                    <Link to='/womens' className='footer-links'>Womens</Link>
                    <Link to='/jewelry' className='footer-links'>Jewelry</Link>
                </section>
                <section className='footer-section-links'>
                    <h3>Useful Links</h3>
                    <Link to='about-us' className='footer-links'>About Us</Link>
                    <Link to='our-story' className='footer-links'>Our Story</Link>
                    <Link to='contact-us' className='footer-links'>Contact Us</Link>
                </section>
                <section className='newsletter'>
                    <h3>Be in the know</h3>
                    <label htmlFor="newsletter">Subscribe to our newsletter for exclusive discounts & offers</label>
                    <input type="email" id="newsletter" name="newsletter" 
                    onChange={ e => setEmail(e.target.value) } value={email} />
                    <button className='send-email' data-testid='newsletter-btn' onClick={btnClick} >
                        <Icon path={mdiArrowRightThick} size={0.85} />
                    </button>
                </section>
            </section>
            
            <section className='footer-extras'>
                <section className='footer-socials'>
                    <SocialIcon url='https://www.instagram.com' className='social-icon'></SocialIcon>
                    <SocialIcon url="https://www.facebook.com" className='social-icon'></SocialIcon>
                    <SocialIcon url="https://www.pinterest.com" className='social-icon'></SocialIcon>
                    <SocialIcon url="https://www.tiktok.com" className='social-icon'></SocialIcon>
                </section>
                <div className='footer-break'></div>
                <section className='copyright'>© 2023, My<em>SHOP</em></section>
            </section>
        </footer>
    )
}

export default Footer;
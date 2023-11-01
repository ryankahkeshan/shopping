import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'
import Icon from '@mdi/react';
import { mdiCartOutline } from '@mdi/js';
import { mdiCircle } from '@mdi/js';
import { useContext, useMemo, useState } from 'react';
import SideCart from '../SideCart/SideCart';
import { CartContext } from '../Router';



const Navbar = () => {

    const { cartItems } = useContext(CartContext) 

    const totalProducts = useMemo(() => {
        return cartItems.reduce((total, item) => {
            return total + item.quantity
        }, 0)
    }, [cartItems])

    const tooBig = totalProducts > 9 ? true : false

    const [openCart, setOpenCart] = useState(false)

    const showDropdown = () => {
        const seperator = document.querySelector('.seperator')
        seperator.classList.add('seperator-shown')
        const dropdown = document.querySelector('.nav-dropdown-content-hidden')
        dropdown.classList.add('nav-dropdown-content-shown')
    }

    const hideDropdown = () => {
        const seperator = document.querySelector('.seperator')
        seperator.classList.remove('seperator-shown')
        const dropdown = document.querySelector('.nav-dropdown-content-hidden')
        dropdown.classList.remove('nav-dropdown-content-shown')
    }

    const clickDropdown = () => {
        const seperator = document.querySelector('.seperator')
        seperator.classList.toggle('seperator-shown')
        const dropdown = document.querySelector('.nav-dropdown-content-hidden')
        dropdown.classList.toggle('nav-dropdown-content-shown')
    }

    return (
        <header>
            <Link to='/' className='logo-link'>
                <h1 className='logo' data-testid='logo'>My<em>SHOP</em></h1>
            </Link>
            <nav>
                <NavLink to='/' className='nav-link'>Home</NavLink>
                <NavLink to='collections' className='nav-link'>Collections</NavLink>
                <NavLink to='mens' className='nav-link'>Mens</NavLink>
                <NavLink to='womens' className='nav-link'>Womens</NavLink>
                <NavLink to='jewelry' className='nav-link'>Jewelry</NavLink>
                <div className="nav-dropdown" onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
                    <a href="#" className="nav-link" onClick={clickDropdown}
                        style={{display:'flex', alignItems:'center', gap:'8px'}}>
                        More <p style={{fontSize:'0.6rem'}}>▼</p></a>
                    <div className="seperator">
                        <div className="nav-dropdown-content-hidden">
                            <NavLink to='about-us' className='nav-link'>About Us</NavLink>
                            <NavLink to='our-story' className='nav-link'>Our Story</NavLink>
                            <NavLink to='contact-us' className='nav-link'>Contact Us</NavLink>
                        </div>
                    </div>
                </div>
            </nav>
            <div className='cart-div' onClick={() => setOpenCart(true)}>
                <Icon path={mdiCartOutline} size={1.3} className='cart-icon' data-testid="cart-icon" />
                <Icon path={mdiCircle} size={0.85} className='cart-circle' data-testid="cart-circle" />
                <p className={tooBig ? 'cart-num-big' : 'cart-num'} data-testid="cart-num">
                    {tooBig ? '9+' : totalProducts}
                </p>
            </div>
            {openCart && <SideCart closeCart={setOpenCart} />}
        </header> 
    )
}

export default Navbar;

import { NavLink } from 'react-router-dom';
import './Navbar.css'
import Icon from '@mdi/react';
import { mdiCartOutline } from '@mdi/js';
import { mdiCircle } from '@mdi/js';



const Navbar = () => {

    return (
        <header>
            <div className='logo'>My<em>SHOP</em></div>
            <nav>
                <NavLink to='/' className='nav-link'>Home</NavLink>
                <NavLink to='collections' className='nav-link'>Collections</NavLink>
                <NavLink to='tops' className='nav-link'>Tops</NavLink>
                <NavLink to='pants' className='nav-link'>Pants</NavLink>
                <NavLink to='shoes' className='nav-link'>Shoes</NavLink>
            </nav>
            <div className='cart-div'>
                <Icon path={mdiCartOutline} size={1.3} className='cart-icon' data-testid="cart-icon" />
                <Icon path={mdiCircle} size={0.85} className='cart-circle' data-testid="cart-circle" />
                <p className='cart-num' data-testid="cart-num">0</p>
            </div>
        </header> 
    )
}

export default Navbar;

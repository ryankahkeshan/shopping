import { AlertCircle, X } from 'lucide-react'
import './InvalidPopUp.css'
import PropTypes from 'prop-types'

const InvalidPopUp = ({ closePopUp, text }) => {
    return (
        <div className='invalid-popup'>
            <AlertCircle style={{fill:'white', stroke:'red', strokeWidth:'2.25px', size:'20px'}} />
            {text}
            <X size={16} strokeWidth={2.5} className='pop-up-x' onClick={() => closePopUp(false)} />
            <div className="red-line"></div>
        </div>
    )
}

InvalidPopUp.propTypes = {
    closePopUp: PropTypes.func,
    text: PropTypes.string
}

export default InvalidPopUp
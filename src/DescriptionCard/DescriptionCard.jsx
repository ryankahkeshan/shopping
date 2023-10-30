import './DescriptionCard.css'
import PropTypes, { string } from 'prop-types'
import { Link } from 'react-router-dom';

const DescriptionCard = ({ url, alt, title, text, link, buttonText }) => {
    return (
        <section className='description-card'>
            <div style={{ height: '100%', width: '100%', position:'relative'}}>
                <img src={url} alt={alt} /> 
            </div>
            <div className='description-card-right'>
                <h1>{title}</h1>
                <ul>
                    {text.map((arg, idx) => {
                        return <li key={idx}>{arg}</li>
                    })}
                </ul>
                <div style={{ display:'flex', justifyContent:'center' }}>
                    <Link to={link}>
                        <button className='description-card-btn'>{buttonText}</button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

DescriptionCard.propTypes = {
    url: PropTypes.string,
    alt: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.arrayOf(string),
    link: PropTypes.string,
    buttonText: PropTypes.string
}

export default DescriptionCard
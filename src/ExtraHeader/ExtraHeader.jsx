import { useEffect } from 'react'
import './ExtraHeader.css'
import PropTypes from 'prop-types'

const ExtraHeader = ({ url, title }) => {
    useEffect(() => {
        window.scrollTo({
            top: 100,
            behavior: 'smooth'
        })
    }, [])

    return (
        <section className='extra-header'>
            <h1 className='extra-title'>{title}</h1>
            <img style={{height:'100%', width:'75%', objectFit:'contain'}} src={url}
                alt="Picture of MySHOP employees smiling" />
        </section>
    )
}

ExtraHeader.propTypes = {
    url: PropTypes.string,
    title: PropTypes.string
}

export default ExtraHeader
import './Slideshow.css'
import { useEffect, useState } from 'react'
import Icon from '@mdi/react';
import { mdiArrowLeftBold } from '@mdi/js';
import { mdiArrowRightBold } from '@mdi/js';
import PropTypes, { objectOf, string } from 'prop-types';

const Slideshow = ({ timer = 5000, slides }) => {

    const SLIDES = slides

    const [imageIdx, setImageIdx] = useState(0)

    const showPrevious = () => {
        setImageIdx(prev => (prev - 1 + SLIDES.length) % SLIDES.length)
    }

    const showNext = () => {
        setImageIdx(prev => (prev + 1) % SLIDES.length)
    }

    useEffect(() => {
        const interval = setInterval(() => {
        setImageIdx(prev => (prev + 1) % SLIDES.length);
        }, timer);

        return () => {
        clearInterval(interval)
        }
    }, [SLIDES, timer])

    return (
        <section aria-label='Image Slideshow' style={{ width: '100%', height: '100%', position: 'relative' }}>
            <a href='#skip-slideshow' className='skip-link'>Skip slideshow</a>
            <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex'}}>
                {SLIDES.map(( { url, alt }, index) => {
                    return <img
                             key={url} src={url} alt={alt}
                             className='image-slideshow' aria-hidden={index !== imageIdx}
                             style={{ translate: `${-100 * imageIdx}%`}} />
                })}
            </div>
            {/* <img src={SLIDES[imageIdx]} className='image-slideshow' /> */}
            <button className='image-slideshow-btn' onClick={showPrevious}
            style={{ left: '0', paddingRight: '1.5rem' }} aria-label='View Previous Image'>
                <Icon path={mdiArrowLeftBold} size={1.5} />
            </button>
            <button className='image-slideshow-btn' onClick={showNext}
                style={{ right: '0', paddingLeft: '1.5rem' }} aria-label='View Next Image'>
                <Icon path={mdiArrowRightBold} size={1.5} />
            </button>
            <div style={{ position: 'absolute', bottom: '0.5rem', left: '50%', 
            translate: '-50%', display: 'flex', gap: '0.7rem', paddingBottom: '6px' }}>
                {SLIDES.map((slide, index) => {
                    return <button key={index} className='dot-btn'
                         onClick={() => setImageIdx(index)} aria-label={`View Image ${index + 1}`}>
                        <div className={index === imageIdx ? 'div-dot-btn-selected' : 'div-dot-btn'}></div>
                    </button>
                })}
            </div>
            <div id='skip-slideshow'> </div>
        </section>
    )
}

Slideshow.propTypes = {
    timer: PropTypes.number,
    slides: PropTypes.arrayOf(objectOf(string))
}

export default Slideshow
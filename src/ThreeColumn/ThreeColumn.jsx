import './ThreeColumn.css'
import PropTypes, { arrayOf, objectOf, string } from 'prop-types'

const ThreeColumn = ({ title, data }) => {
    return (
        <section style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem', width:'100%', padding:'1rem 0'}}>
            <h1 style={{ fontSize:'3rem' }}>
                {title}
            </h1>
            <div className="three-column">
                {data.map(({ url, alt, title, text }, idx) => {
                    return (
                        <div key={idx} className='section-column'>
                            <img src={url} alt={alt} />
                            <h2>{title}</h2>
                            <p>{text}</p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

ThreeColumn.propTypes = {
    title: PropTypes.string,
    data: PropTypes.arrayOf(objectOf(string)),
}

export default ThreeColumn
import { useEffect } from "react"
import "./Collections.css"
import PropTypes, { any, arrayOf, objectOf, string } from 'prop-types'
import CollectionCard from "../CollectionCard/CollectionCard"
import { v4 } from "uuid"

const Collections = ({ data, testing = false }) => {

    useEffect(() => {
        if (!testing) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    })

    return (
        <>
            <h1 style={{padding:'3rem', paddingBottom:'1rem', fontSize:'2.5rem'}}>
                Our Collections
            </h1>
            <div style={{border:'1px solid rgb(0,0,0, 0.5)', margin:'0 3rem'}}></div>
            <section style={{display:'flex', justifyContent:'center', boxSizing:'border-box', padding:'3rem'}}>
                <div style={{display:'grid', gridTemplateColumns:`repeat(3, 1fr)`, gap:'3rem', overflow:'hidden'}}>
                    {data.map(el => {
                        return (
                            <CollectionCard
                                key={v4()}
                                url={el.item.image}
                                name={el.name}
                                link={el.link}
                            />
                        )
                    })}
                </div>
            </section>
        </>
    )
}

Collections.propTypes = {
    data: PropTypes.arrayOf(objectOf(any)),
    testing: PropTypes.bool
}

export default Collections;


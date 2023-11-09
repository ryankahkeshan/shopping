import './OurStory.css'
import ExtraHeader from '../ExtraHeader/ExtraHeader'
import pic2 from './../App/slides/two.jpg'

const OurStory = () => {
    return (
        <section>
            <ExtraHeader url={pic2} title={'Our Story'} />
            <div className='our-story-description'>
                <p>
                    Embark on a journey through the chapters of My<em>SHOP</em>'s story,
                    where passion for fashion and a commitment to excellence converge. It
                    all began with a dream - a dream to create a clothing store that goes
                    beyond the ordinary, where fashion becomes a statement and style is a
                    reflection of individuality.
                </p>
                <p>
                    Our story is woven with threads of dedication and a relentless pursuit of
                    bringing the latest trends to your wardrobe. From our humble beginnings to
                    becoming a sought-after destination for fashion enthusiasts, each milestone
                    in our journey is a testament to the love and support we've received from
                    our valued customers.
                </p>
                <p>
                    At My<em>SHOP</em>, we believe that fashion is not just about clothing; it's
                    an art form that allows individuals to express their unique personalities.
                    Every piece in our collection is carefully curated, with an emphasis on quality,
                    comfort, and staying ahead of the fashion curve.
                </p>
                <p>
                    As we continue to grow, our commitment to providing an unparalleled shopping
                    experience remains unwavering. Join us in celebrating the evolution of My<em>SHOP</em>,
                    and let our story become a part of your style narrative. Thank you for being a cherished
                    part of our journey - here's to many more chapters of style, elegance, and fashion-forward
                    moments together.
                </p>
            </div>
        </section>
    )
}

export default OurStory;
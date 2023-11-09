import './AboutUs.css'
import pic1 from './../App/slides/one.png'
import ExtraHeader from '../ExtraHeader/ExtraHeader'

const AboutUs = () => {
    return (
        <section style={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%'}}>
            <ExtraHeader url={pic1} title={'About Us'} />
            <div className="about-us-description">
                <p>
                    Welcome to My<em>SHOP</em>, where fashion meets comfort and style blends seamlessly with
                    affordability. Our journey began with a simple vision - to redefine the way people
                    experience fashion. At My<em>SHOP</em>, we believe that clothing should not only reflect
                    personal style but should also embody quality and comfort.
                </p>
                <p>
                    Founded on the principles of passion and a keen eye for trends, My<em>SHOP</em> has evolved
                    into the destination for fashion enthusiasts seeking chic and trendy apparel. From casual
                    wear to statement pieces that leave a lasting impression, our diverse range of clothing is
                    designed to cater to every style and occasion.
                </p>
                <p>
                    What sets us apart is our commitment to providing not just clothing, but an experience. We are 
                    dedicated to staying ahead of the curve, ensuring that our pieces meet our high standards of quality and style. 
                    Whether you're a trendsetter or someone who prefers timeless classics, we have something for everyone.
                </p>
                <p>
                    Explore our collection and discover the perfect ensemble that not only complements your
                    individuality but also celebrates the joy of dressing well. Join us on this exciting journey
                    of self-expression through fashion, and let My<em>SHOP</em> be your trusted companion in style.
                </p>
            </div>
        </section>
    )
}

export default AboutUs
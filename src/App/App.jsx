import './App.css'
import Slideshow from '../Slideshow/Slideshow'
import { Link } from 'react-router-dom'
import DescriptionCard from '../DescriptionCard/DescriptionCard'
import firstCard from './images/first-card.jpg'
import ThreeColumn from '../ThreeColumn/ThreeColumn'
import quality from './images/quality.png'
import delivery from './images/delivery.png'
import customer from './images/customer-service.png'
import pic1 from './slides/one.png'
import pic2 from './slides/two.jpg'
import pic3 from './slides/three.png'
import pic4 from './slides/four.jpg'
import pic5 from './slides/five.jpg'

export const SLIDES = [
  {url: pic1, alt: 'Slide 1: 3 friends having fun'},
  {url: pic2, alt: 'Slide 2: 2 friends smiling at the camera'},
  {url: pic3, alt: 'Slide 3: 4 friends having fun at a party'},
  {url: pic4, alt: 'Slide 4: 5 friends smiling while camping at night'},
  {url: pic5, alt: 'Slide 5: 4 girls smiling while sitting down together'}
]

const App = () => {

  return (
    <>
      <div style={{width: '100%', height: '600px'}}>
            <Slideshow slides={SLIDES} />
      </div>
      <WelcomeTitle />
      <div className='app-card'>
        <DescriptionCard
          url={firstCard}
          alt={'Friends having fun while the sun sets in the distance'} 
          title={'Clothing & More'} 
          text={
            [
              "Dive into a world of endless possibilities as you explore our \
              carefully curated collection of clothing and jewelry",
              "Discover the perfect pieces that will make you stand out and feel confident."
            ]
          }
          link={'all-products'}
          buttonText={'SHOP NOW'}
        />
      </div>
      <div className='app-card'>
        <ThreeColumn title={'Why Us?'} data={
          [
            {
              url: quality,
              alt: 'Great Quality Guaranteed Icon',
              title: 'Great Quality Guaranteed',
              text: 'Our clothing and jewelry embody unparalleled quality,\
                exuding sophistication and excellence. Choose us for a touch of\
                luxury that defines your uniqueness',
            },
            {
              url: delivery,
              alt: 'Fast Shipping Icon',
              title: 'Fast Shipping',
              text: 'Our fast shipping promise: Less than 3 days within America\
                and under a week worldwide. Choose us for swift delivery, ensuring\
                your satisfaction knows no bounds',
            },
            {
              url: customer,
              alt: '24h Customer Service Icon',
              title: '24h Customer Service',
              text: 'Our 24-hour customer service commitment ensures your needs\
                are met day and night. Choose us for swift assistance, putting\
                your satisfaction at the heart of our service',
            },
          ]
        } />
      </div>
    </>
  )
};

export default App

const WelcomeTitle = () => {
  return (
    <section className='welcome-front-page'>
      <h1>Welcome to My<em>SHOP</em></h1>
      <h3>The best store out there</h3>
      <div className='welcome-btns'>
        <Link to='all-products'>
          <button className='shop-now-btn'>SHOP NOW</button>
        </Link>
        <Link to='collections'>
          <button className='see-collections-btn'>SEE COLLECTIONS</button>
        </Link>
      </div>
    </section>
  )
}

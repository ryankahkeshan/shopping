import { useEffect, useState } from 'react';
import './App.css'
import Slideshow from '../Slideshow/Slideshow';

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
              setItems(data);
            })
  }, [])


  return (
    <>
      <div style={{width: '100%', height: '600px'}}>
            <Slideshow />
      </div>
      {/* {items.map(item => {
        return <img key={item.id} src={item.image}></img>
      })} */}
    </>
  )
};

export default App;
import './ContactUs.css'
import { Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import InvalidPopUp from '../InvalidPopUp/InvalidPopUp';

const ContactUs = () => {

    const [submitted, setSubmitted] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const [form, setForm] = useState({
        first: '',
        last: '',
        email: '',
        msg: '',
    })

    const changeForm = (field, value) => {
        setPopUp(false)
        setForm(prev => {
            const obj = {...prev}
            obj[field] = value
            return obj
        })
    }

    const cleanUp = () => {
        setForm({first:'', last:'', email:'', msg:''})
    }

    return (
        <section className='contact-us-page'>
            <h1 style={{fontSize:'3rem'}}>Contact Us</h1>
            <div className='contact-us-icon'>
                <Phone />
                <p>Phone: +1 (234) 567-8910</p>
            </div>
            <div className='contact-us-icon'>
                <Mail />
                <p>Email: abc@example.com</p>
            </div>
            <form style={{display:'flex', gap:'4rem', justifyContent:'center'}}>
                <div className='left-contacts'>
                    <input type="text" placeholder='First Name *' value={form.first}
                        onChange={(e) => changeForm('first', e.target.value)} />
                    <input type="text" placeholder='Last Name *' value={form.last}
                        onChange={(e) => changeForm('last', e.target.value)} />
                    <input type="text" placeholder='Email *' value={form.email}
                        onChange={(e) => changeForm('email', e.target.value)} />
                </div>
                <textarea className='contact-us-msg' placeholder='Enter Your Message *'
                    value={form.msg} onChange={(e) => changeForm('msg', e.target.value)}>
                </textarea>
            </form>
            <button className='contact-us-button' onClick={(e) => {
                e.preventDefault()
                if (form.first === '' || form.last === '' || form.email === '' || form.msg === '') {
                    setPopUp(true)
                } else {
                    cleanUp()
                    setSubmitted(true)
                }
            }}>
                Send Message
            </button>
            {submitted &&
                <div className='contact-us-pop-up'>
                    <div className="contact-us-pop-up-container">
                        <h2>Thank You For Your Inquiry</h2>
                        <p>Our team is working hard on the issue, and we will get back to you as soon as possible</p>
                        <button className='contact-us-form-button' onClick={() => setSubmitted(false)}>Close</button>
                    </div>
                </div>
            }
            {popUp && <InvalidPopUp closePopUp={setPopUp} text={'Please fill in the required fields'} />}
        </section>
    )
}

export default ContactUs;
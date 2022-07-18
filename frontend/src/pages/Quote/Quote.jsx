import React, { useState } from 'react';
import { MDBTypography } from 'mdb-react-ui-kit';
import ReCAPTCHA from "react-google-recaptcha";

import { DividerLine, ImageSlider } from '../../components';
import './Quote.scss';

function Quote() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [loading, setLoading] = useState(false);

  const recaptchaRef = React.createRef();

  const captchaUpdate = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    setCaptcha(recaptchaValue);
  }

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
      //setSent(true);
   
    let formData = {
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      message: message,
      captcha: captcha
    }

    console.log(formData)
  }

  return (
    <div>
      <ImageSlider />
      <div className='app__quote app__container'>
        <h1>Richiesta Preventivo</h1>
        <DividerLine />
        <div className='app__quote-description'>
          <MDBTypography className='lead mb-0'>
            Per richiedere un preventivo online si prega di compilare il form qui di seguito
          </MDBTypography>
        </div>
        <form className='app__quote-form'>
          <div>
            <input className='p-text' type='text' placeholder='Nome' name='name' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <input className='p-text' type='text' placeholder='Cognome' name='surname' value={surname} onChange={(e) => setSurname(e.target.value)} />
          </div>
          <div>
            <input className='p-text' type='text' placeholder='Email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <input className='p-text' type='text' placeholder='Telefono' name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <textarea className='p-text' type='text' placeholder='La tua Richiesta' name='message' value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <div className='app__quote-recaptcha'>
            Completa il ReCAPTCHA per continuare:
            <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.REACT_APP_CAPTCHA_KEY} onChange={captchaUpdate} />
          </div>
          <button type='button' className='p-text' onClick={handleSubmit}>
            {loading ? 'Sending' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Quote
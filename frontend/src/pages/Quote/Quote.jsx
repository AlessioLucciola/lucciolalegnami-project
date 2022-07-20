import React, { useState } from 'react';
import { useStateWithCallback } from '../../utils';
import { MDBTypography } from 'mdb-react-ui-kit';
import ReCAPTCHA from "react-google-recaptcha";

import { DividerLine, ImageSlider } from '../../components';
import './Quote.scss';

function Quote() {
  const [name, setName] = useStateWithCallback('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [captcha, setCaptcha] = useState('');

  const [nameValid, setNameValid] = useState('def');
  const [surnameValid, setSurnameValid] = useState('def');
  const [emailValid, setEmailValid] = useState('def');
  const [phoneValid, setPhoneValid] = useState('def');
  const [messageValid, setMessageValid] = useState('def');
  const [captchaValid, setCaptchaValid] = useState('def');

  const [loading, setLoading] = useState('');

  const recaptchaRef = React.createRef();

  const captchaUpdate = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    setCaptcha(recaptchaValue);
  }

  const formValidator = () => {
    //Name Validator
    if (name.length===0) setNameValid(false)
    else setNameValid(true);
    //Surname Validator
    if (name.length===0) setSurnameValid(false)
    else setSurnameValid(true);
    //Email Validator
    if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email)) setEmailValid(false)
    else setEmailValid(true);
    //Phone Validator
    if (!/^(?:[+]?)(?:[0-9] ?){6,14}[0-9]$/.test(phone)) setPhoneValid(false)
    else setPhoneValid(true);
    //Request Validator
    if (message.length<10 || message.length>700) setMessageValid(false)
    else setMessageValid(true);
    //Captcha Validator
    if (captcha.length===0) setCaptchaValid(false)
    else setCaptchaValid(true);

    return nameValid && surnameValid && emailValid && phoneValid && messageValid && captchaValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValidator()) {
      setLoading(true);

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
          <h5>Richiedi un preventivo online</h5>
          <div>
            <input className='p-text' type='text' placeholder='Nome*' name='name' value={name} onChange={(e) => setName(e.target.value)} />
            {!nameValid ? (
              <p>Inserire un nome valido</p>
            ) : ('')}
          </div>
          <div>
            <input className='p-text' type='text' placeholder='Cognome*' name='surname' value={surname} onChange={(e) => setSurname(e.target.value)} />
            {!surnameValid ? (
              <p>Inserire un cognome valido</p>
            ) : ('')}
          </div>
          <div>
            <input className='p-text' type='text' placeholder='Email*' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            {!emailValid ? (
              <p>Inserire una email valida</p>
            ) : ('')}
          </div>
          <div>
            <input className='p-text' type='text' placeholder='Telefono*' name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
            {!phoneValid ? (
              <p>Inserire un numero valido</p>
            ) : ('')}
          </div>
          <div>
            <textarea className='p-text' type='text' placeholder='La tua Richiesta*' name='message' value={message} onChange={(e) => setMessage(e.target.value)} />
            {!messageValid ? (
              <p>La richiesta deve contenere tra i 10 e i 700 caratteri</p>
            ) : ('')}
          </div>
          <div className='app__quote-recaptcha'>
            Completa il ReCAPTCHA per continuare:
            <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.REACT_APP_CAPTCHA_KEY} onChange={captchaUpdate} />
            {!captchaValid ? (
              <p>Selezionare la casella per continuare</p>
            ) : ('')}
          </div>
          <button type='button' className='p-text' onClick={handleSubmit}>
            {loading ? 'Invio in corso' : 'Invia Richiesta'}
          </button>
          <hr />
          *Campi obbligatori <br/>
          Inviando il presente modulo autorizzo il trattamento dei dati personali ai sensi del D.Lgs 196/2003
        </form>
      </div>
    </div>
  )
}

export default Quote
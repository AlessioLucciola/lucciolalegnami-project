import React, { useState } from 'react';
import { MDBTypography } from 'mdb-react-ui-kit';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';

import { DividerLine, ImageSlider, Popup } from '../../components';
import './Quote.scss';

function Quote() {
  const [formValues, setFormValues] = useState({ name: '', surname: '', email: '', phone: '', request: '', captcha: '' });
  const [focused, setFocused] = useState({ name: false, surname: false, email: false, phone: false, request: false, captcha: false });
  const [popup, setPopup] = useState({trigger: false, title: '', description: ''});
  const [loading, setLoading] = useState(0);

  const inputs = [
    {
      id: 'i1',
      name: 'name',
      type: 'text',
      placeholder: 'Nome*',
      label: 'name',
      errormessage: 'Il campo nome non può essere vuoto!',
      required: true,
      focused: false
    },
    {
      id: 'i2',
      name: 'surname',
      type: 'text',
      placeholder: 'Cognome*',
      label: 'surname',
      errormessage: 'Il campo cognome non può essere vuoto!',
      required: true
    },
    {
      id: 'i3',
      name: 'email',
      type: 'text',
      placeholder: 'Email*',
      label: 'email',
      errormessage: 'Inserire un indirizzo email valido!',
      pattern: '^[a-zA-Z0-9]+@(?:[a-zA-Z0-9.])+[.]+[?:A-Za-z]+$',
      required: true
    },
    {
      id: 'i4',
      name: 'phone',
      type: 'text',
      placeholder: 'Telefono*',
      label: 'phone',
      errormessage: 'Inserire un numero di telefono valido!',
      pattern: '^(?:[+]?)(?:[0-9] ?){6,14}[0-9]$',
      required: true
    },
  ]

  const textareas = [
    {
      id: 't1',
      name: 'request',
      type: 'text',
      placeholder: 'La tua richiesta*',
      label: 'request',
      errormessage: 'Il campo richiesta non può essere vuoto!',
      required: true
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    let formData = {
      name: formValues['name'],
      surname: formValues['surname'],
      email: formValues['email'],
      phone: formValues['phone'],
      request: formValues['request'],
      captcha: formValues['captcha']
    }

    if (formValues.captcha === '') {
      setPopup({'trigger': true, 'title': 'Si è verificato un errore!', 'description': 'Per continuare devi completare il ReCaptcha'});
    } else {
      axios.post('api/sendMail.php', formData)
      .then(function (response) {
          if (response.status === 200)
          {
            setPopup({'trigger': true, 'title': 'Richiesta Inviata!', 'description': 'Riceverai una risposta entro 48 ore lavorative.'});
            setLoading(false);
          } else if (response.status === 500) {
            setPopup({'trigger': true, 'title': 'Si è verificato un errore!', 'description': 'Si è verificato un errore interno al server. Contattaci telefonicamente per risolvere il problema.'});
            setLoading(false);
          } else if (response.status === 401) {
            setPopup({'trigger': true, 'title': 'Si è verificato un errore!', 'description': 'Autenticazione non andata a buon fine. Se non sei un robot, ricarica la pagina e riprova.'});
            setLoading(false);
          } else {
            setPopup({'trigger': true, 'title': 'Si è verificato un errore!', 'description': 'Contattaci telefonicamente per risolvere il problema.'});
            setLoading(false);
          }
      })
      .catch(function (error) {
          setPopup({'trigger': true, 'title': 'Si è verificato un errore!', 'description': 'Si è verificato un errore interno al server. Contattaci telefonicamente per risolvere il problema.'});
          setLoading(false);
      });
    }
  }

  const onChange = (e) => {
    setFormValues({...formValues, [e.target.name]: e.target.value})
  };

  const recaptchaRef = React.createRef();
  const captchaUpdate = (e) => {
    const recaptchaValue = recaptchaRef.current.getValue();
    setFormValues({...formValues, 'captcha': recaptchaValue});
  }

  const handleFocus = (e) => {
    setFocused({...focused, [e.target.name]: true});
  }

  const closePopup = () => {
    setPopup({...popup, 'trigger': false});
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
        <form className='app__quote-form' onSubmit={handleSubmit}>
          <h5>Richiedi un preventivo online</h5>
          {inputs.map(input => (
              <div key={input.id}>
                <input className='p-text' {...input} value={formValues[input.name]} onChange={onChange} onBlur={(e) => handleFocus(e)} focused={focused[input.name].toString()} required />
                <span>{input.errormessage}</span>
              </div>
          ))}
          {textareas.map(textarea => (
              <div key={textarea.id}>
                <textarea className='p-text' {...textarea} value={formValues[textarea.name]} onChange={onChange} onBlur={handleFocus} focused={focused[textarea.name].toString()} required />
                <span>{textarea.errormessage}</span>
              </div>
          ))}
          <div className='app__quote-recaptcha'>
            Completa il ReCAPTCHA per continuare:
            <ReCAPTCHA name='captcha' ref={recaptchaRef} sitekey={process.env.REACT_APP_CAPTCHA_KEY} onChange={captchaUpdate} required />
          </div>
          <button type='submit' className='p-text'>
            {loading ? 'Invio in corso' : 'Invia Richiesta'}
          </button>
          <hr />
          *Campi obbligatori <br/>
          Inviando il presente modulo autorizzo il trattamento dei dati personali ai sensi del D.Lgs 196/2003
        </form>
      </div>

      <Popup trigger={popup['trigger']} title={popup['title']} description={popup['description']} onClick={closePopup} />
    </div>
  )
}

export default Quote
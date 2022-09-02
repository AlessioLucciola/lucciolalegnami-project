import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MDBTypography } from 'mdb-react-ui-kit';

import { Popup, DividerLine } from '../../components';
import './AdministrationLogin.scss';

function AdministrationLogin() {
    const [formValues, setFormValues] = useState({ username: '', password: '' });
    const [focused, setFocused] = useState({ username: false, password: false });
    const [popup, setPopup] = useState({trigger: false, title: '', description: ''});
    const [loading, setLoading] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      if (loggedIn) {
        return navigate('/admin');
      }
    }, [loggedIn])

    const inputs = [
        {
          id: 'i1',
          name: 'username',
          type: 'text',
          placeholder: 'Username',
          label: 'username',
          errormessage: 'Il campo username non può essere vuoto!',
          required: true,
          focused: false
        },
        {
          id: 'i2',
          name: 'password',
          type: 'password',
          placeholder: 'Password',
          label: 'password',
          errormessage: 'Il campo password non può essere vuoto!',
          required: true
        }
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        let formData = {
          username: formValues['username'],
          password: formValues['password'],
        }
    
        axios.post('api/adminLogin.php', formData)
        .then(function (response) {
            if (response.status === 200)
            {
              setLoggedIn(true);
            } else {
              setPopup({'trigger': true, 'title': 'Si è verificato un errore!', 'description': response.data.message});
              setLoading(false);
            }
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            setPopup({'trigger': true, 'title': 'Si è verificato un errore!', 'description': error.response.data.message});
            setLoading(false);
            clearFormFields();
          } else {
            setPopup({'trigger': true, 'title': 'Si è verificato un errore!', 'description': error.response.data.message});
            setLoading(false);
          }
        });
      }

      const clearFormFields = () => {
        setFormValues({'username': '', 'password': ''});
        setFocused({'username': false, 'password': false});
      }

      const onChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
      };

      const handleFocus = (e) => {
        setFocused({...focused, [e.target.name]: true});
      }
    
      const closePopup = () => {
        setPopup({...popup, 'trigger': false});
      }

  return (
    <div>
      <div className='app__adminlogin app__container'>
        <h1>Login Amministrazione</h1>
        <DividerLine />
        <div className='app__adminlogin-description'>
          <MDBTypography className='lead mb-0'>
            Effettua il login per accedere al pannello amministazione
          </MDBTypography>
        </div>
        <form className='app__adminlogin-form' onSubmit={handleSubmit}>
          {inputs.map(input => (
              <div key={input.id}>
                <input className='p-text' {...input} value={formValues[input.name]} onChange={onChange} onBlur={(e) => handleFocus(e)} focused={focused[input.name].toString()} required />
                <span>{input.errormessage}</span>
              </div>
          ))}
          <button type='submit' className='p-text'>
            {loading ? 'Accesso in corso' : 'Accedi'}
          </button>
        </form>
      </div>

      <Popup trigger={popup['trigger']} title={popup['title']} description={popup['description']} onClick={closePopup} />
    </div>
  )
}

export default AdministrationLogin
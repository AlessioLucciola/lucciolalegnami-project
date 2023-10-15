import React, { useRef } from 'react';
import { MDBTypography } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

import { DividerLine } from '../../components';
import { images } from '../../constants';
import './Contacts.scss';

function Contacts() {
    const targetDivRef = useRef()
    const scrollToDiv = () => {
        targetDivRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div>
            <div className='app__contacts-map' id="map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2165.0086414911484!2d12.19169805518443!3d42.25244769794957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1328d57d2a356ed1%3A0xdb6ccd8c4d5708aa!2sLucciola%20Legnami%20-%20Pali%20di%20castagno%20e%20Cancelli%20rustici%20stile%20maremmano!5e0!3m2!1sit!2sit!4v1625329236843!5m2!1sit!2sit" width="100%" style={{border:0}} frameBorder="0" aria-hidden="false" tabIndex="0" title='maps-iframe' referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div ref={targetDivRef} className='app__contacts app__container'>
                <h1>Contatti</h1>
                <DividerLine />
                <div className='app__contacts-position'>
                    <h2>Dove Trovarci</h2>
                    <div className='app__contacts-position-main'>
                        <div className='app__contacts-position-text'>
                            <MDBTypography className='lead mb-0'>
                                Ci trovi a Capranica in provincia di Viterbo. Sulla strada statale Cassia km 53.200 nel tratto tra Sutri e Capranica (Lato sinistro per chi proviene da Sutri).<br/><br/>
                                <strong>Venendo da Roma</strong>, dal raccordo immettersi sulla strada Cassia Veientana (SR2 bis) direzione Viterbo. Proseguire per 50 km superando la città di Monterosi e quella di Sutri. Superata quest'ultima: il primo deposito di legname sul lato sinistro al km 53.200.<br/>
                                <strong>Venendo da Viterbo</strong>, immettersi sulla strada Cassia SR2 direzione Roma. Proseguire per 25 km superando la città di Vetralla e quella di Capranica. Superata quest'ultima, dopo circa 2 km, sul lato destro al km 52.200.
                            </MDBTypography>
                        </div>
                        <div className='app__contacts-position-map'>
                            <section id="street-view">
                                <iframe src="https://www.google.com/maps/embed?pb=!4v1628867508586!6m8!1m7!1sPVN2KXXJrV6a7ZyJYybAyQ!2m2!1d42.25265053334476!2d12.19180871359133!3f282.8599377479352!4f-9.992769760000698!5f0.7820865974627469" width="100%" height="450" style={{border:0}} title='streetview-frame'></iframe>
                            </section>
                        </div>
                    </div>
                </div>
                <div className='app__contacts-details'>
                    <h2>Come Contattarci</h2>
                    <div className='app__contacts-details-main'>
                        <div className='app__contacts-details-text'>
                            <MDBTypography className='lead mb-0'>
                                Puoi chiamare il numero <strong>(+39) {process.env.REACT_APP_PHONE_NUMBER}</strong>, contattarci su WhatsApp o tramite email per avere informazioni generali o per richiedere un preventivo
                            </MDBTypography>
                        </div>
                        <div className='app__contacts-details-links'>
                            <a href={`tel:${process.env.REACT_APP_PHONE_NUMBER}`}><img src={images.phone} alt='phone_number' /><br/>Contattaci Telefonicamente</a>
                            <Link onClick={scrollToDiv} to='/preventivo'><img src={images.mail} alt='mail' /><br/>Richiedi un Preventivo Online</Link>
                            <a href={`https://wa.me/39${process.env.REACT_APP_PHONE_NUMBER}`}><img src={images.wa} alt='whatsapp' /><br/>Contattaci su WhatsApp</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contacts
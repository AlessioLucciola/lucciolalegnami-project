import React from 'react';
import { Link } from 'react-router-dom';
import { MDBTypography } from 'mdb-react-ui-kit';

import { ImageSlider, DividerLine, ButtonProducts, ButtonQuote } from '../../components';
import { images } from '../../constants';
import './Homepage.scss';

function Homepage() {
  return (
    <div>
      <ImageSlider />
      <div className='app__homepage app__container'>
        <h1>LucciolaLEGNAMI</h1>
        <h3>Lavorazione Legnami di Castagno</h3>
        <DividerLine />
        <span>
          <MDBTypography className='lead mb-0'>
            LucciolaLEGNAMI, l’impresa artigianale specializzata nella lavorazione dei pali di castagno. Nel sito potrete trovare un elenco dettagliato con alcuni dei nostri prodotti e tutte le informazioni per contattarci e richiedere un preventivo.
          </MDBTypography>
        </span>

        <ButtonProducts />
        
        <div className='app__homepage-sections'>
          <h4>Chi siamo</h4>
          <DividerLine />
          <div className='app__homepage-section'>
            <div className='app__homepage-section-text'>
              <MDBTypography className='lead mb-0'>
                LucciolaLEGNAMI è un'impresa artigianale che si occupa della lavorazione del legno, un materiale eterno che oggi come non mai viene rivalutato per la sua bellezza, resistenza e costi contenuti. Il castagno, in particolare, è un legno molto resistente e diffuso nelle nostre zone. Il legname da noi utilizzato viene prelevato dai boschi del centro Italia nel pieno rispetto della natura. La lavorazione dei tronchi di castagno viene effettuata in sede dopo il trasporto direttamente dal bosco e comprende diversi tempi tra i quali: selezione, taglio misurato, eventuale scortecciatura e appuntitura.
              </MDBTypography>
            </div>
            <div className='app__homepage-section-photo'>
              <img src={images.hmp1} alt='Il legno che utilizziamo per la produzione del nostro materiale proviene da boschi di castagno selvatico della Tuscia Viterbese' />
            </div>
          </div>
          <div className='app__homepage-section'>
            <div className='app__homepage-section-photo'>
              <img src={images.hmp2} alt='Il legno che utilizziamo per la produzione del nostro materiale proviene da boschi di castagno selvatico della Tuscia Viterbese' />
            </div>
            <div className='app__homepage-section-text'>
              <MDBTypography className='lead mb-0'>
                Il deposito accoglie il legname sezionato che viene poi esposto ai clienti, dopo la lavorazione, che principalmente avviene dentro al capannone anch’esso costruito con travi di castagno.
                La paleria è il principale lavorato ed è proprio con i pali che vengono costruiti i cancelli rustici montati e scortecciati a mano con misure scelte dal cliente.
                Siamo a completa disposizione per informazioni e consigli su come utilizzare al meglio il nostro legname.
              </MDBTypography>
              <button><Link to='/legnoutilizzato'>Scopri di più sul legno utilizzato</Link></button>
            </div>
          </div>

          <ButtonQuote />
        </div>
      </div>
    </div>
  )
}

export default Homepage
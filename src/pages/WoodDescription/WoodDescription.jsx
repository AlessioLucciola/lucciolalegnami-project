import React from 'react';
import { MDBTypography } from 'mdb-react-ui-kit';

import { ImageSlider, DividerLine, ButtonProducts, ButtonQuote } from '../../components';
import { images } from '../../constants';
import './WoodDescription.scss';

function WoodDescription() {
  return (
    <div>
      <ImageSlider />
      <div className='app__wood-description app__container'>
        <h1>Il Legno Utilizzato</h1>
        <DividerLine />

        <ButtonProducts />

        <div className='app__wood-description-sections'>
          <h4>Il legno di castagno</h4>
          <DividerLine />
          <div className='app__wood-description-section'>
            <div className='app__wood-description-section-text'>
              <strong>Proprietà</strong>
              <MDBTypography className='lead mb-0'>
                Il castagno è tra le piante più diffuse dell’Europa Meridionale ed è considerata una delle specie arboree con maggiore versatilità d’uso. Questo grazie alle qualità del suo legno, che presenta una elevata quantità di “Tannino”, che ne permette una resistenza ed una versatilità uniche: devono passare diversi anni prima che si deteriori e più è stagionato maggiore sarà la sua resistenza. Il castagno è inoltre un legno semi-duro, poco sensibile alle variazioni di umidità e di temperatura, con un colore, sotto la corteccia, che varia dal giallo al nocciola.
              </MDBTypography>
            </div>
            <div className='app__wood-description-section-photo'>
              <img src={images.wood2} alt='Il legno che utilizziamo per la produzione del nostro materiale proviene da boschi di castagno selvatico della Tuscia Viterbese' />
            </div>
          </div>
          <div className='app__wood-description-section'>
            <div className='app__wood-description-section-photo'>
              <img src={images.wood3} alt='Pali di castagno' />
            </div>
            <div className='app__wood-description-section-text'>
              <strong>L'utilizzo del legno di castagno</strong>
              <MDBTypography className='lead mb-0'>
                Il castagno è utilizzato principalmente per la costruzione di mobili, travi, tavolame e soprattutto per la paleria. I pali di castagno trovano largo impiego in diversi settori: nell’agricoltura (basti pensare ai tradizionali vigneti o anche ai pergolati da frutto), nell’ambito vivaistico (per sostenere giovani alberelli appena piantati o nella costruzione di staccionate nei parchi). In particolar modo i pali di castagno vengono impiegati nella costruzione di recinzioni e recinti (Maneggi per cavalli, terreni da pascoli, delimitazione confini ecc.). Grazie alla versatilità del castagno sono scelti maggiormente rispetto a pali in cemento che risultano fragili agli urti o a pali in ferro che risultano deteriorabili e poco elastici, soprattutto dove si utilizzano macchinari agricoli.
              </MDBTypography>
            </div>
          </div>
          <div className='app__wood-description-section'>
            <div className='app__wood-description-section-text'>
              <strong>Il castagno come legna da ardere</strong>
              <MDBTypography className='lead mb-0'>
              Fino a pochi anni fa il legno di castagno aveva poco valore come legna da ardere, questo perché, nonostante un forte calore, la combustione e la successiva carbonizzazione di questo legno avviene in maniera relativamente veloce; inoltre col fuoco vengono prodotti piccoli zampilli che possono schizzare dal legno incendiato. Nonostante questo negli ultimi anni, il castagno è stato molto rivalutato come combustibile in quanto, con l’introduzione di termo-stufe e di tempo-camini, è possibile ovviare allo scoppiettio e soprattutto sfruttare l’ampio ed immediato potere calorico che offre questo legno.
              </MDBTypography>
            </div>
            <div className='app__wood-description-section-photo'>
              <img src={images.wood1} alt='Legna da ardere di castagno' />
            </div>
          </div>

          <h4>Altro legno utilizzato</h4>
          <DividerLine />
          <div className='app__wood-description-section'>
              <MDBTypography className='lead mb-0'>
              In alcuni periodi dell’anno, per la legna da ardere utilizziamo oltre al castagno, anche tipologie di legno con maggiore durezza come quercia, frassino, faggio, ciliegio, betulla, rovere, carpino, acero. Tutte queste tipologie di legno possiedono un alto potere calorifico, facilità di combustione, e producono poco fumo. I legni duri sono generalmente più densi per questo bruciano più lentamente e producono un calore più durevole.
              </MDBTypography>
          </div>

          <ButtonQuote />
        </div>
      </div>
    </div>
  )
}

export default WoodDescription
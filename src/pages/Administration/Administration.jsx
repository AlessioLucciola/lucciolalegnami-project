import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { HiMenuAlt4, HiX, HiUserCircle } from 'react-icons/hi';
import { AiOutlinePlus, AiFillCaretDown, AiOutlineHome, AiOutlineEuro, AiOutlinePoweroff, AiOutlineMail, AiOutlineClockCircle, AiFillDelete } from 'react-icons/ai';
import { BsTelephoneForward, BsFilterLeft, BsSearch, BsNewspaper } from 'react-icons/bs';
import { BiMessageCheck, BiMessageAltX, BiMailSend, BiShow } from 'react-icons/bi';
import { MdDone, MdRemoveDone, MdQuestionAnswer } from 'react-icons/md';
import { Popup } from '../../components';
import { images } from '../../constants';
import './Administration.scss';

function Administration() {
  const [popup, setPopup] = useState({trigger: false, title: '', description: ''});
  const [loginInfo, setLoginInfo] = useState({'uuid': '', 'username': '', 'role': ''});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('Home');
  const viewList = [{name: 'Home', icon: <AiOutlineHome />}, {name: 'Pagamenti', icon: <AiOutlineEuro />}, {name: 'Preventivi', icon: <AiOutlineMail />}, {name: 'News', icon: <BsNewspaper />}];
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) {
      checkLogin();
    }
  }, [isUserLoggedIn])

  const checkLogin = () => {
    axios.get('api/checkLogin.php')
    .then(function(response) {
      if (response.status === 200) {
        if (response.data.logged === true && response.data.role === 'admin') {
          setLoginInfo({'uuid': response.data.uuid, 'username': response.data.username, 'role': response.data.role});
          setIsUserLoggedIn(true);
        } else {
          navigate('/admin/login');
        }
      }
    })
    .catch(function(error) {
      setPopup({'trigger': true, 'title': 'Si è verificato un errore!', 'description': 'Si è verificato un errore generico.'});
    })
  }

  const closePopup = () => {
    setPopup({...popup, 'trigger': false});
  }

  const AdminPanel = () => {
    return (
      <>
        <div className='app__administration-layout'>
          <div className='app__administration-layout-header'>
            <AdminHeader />
          </div>
          <div className='app__administration-layout-body'>
            <div className='app__administration-layout-navbar'>
              <InternalNavbar />
            </div>
            <div className='app__administration-layout-content'>
              {renderView(currentView)}
            </div>
          </div>
        </div>
      </>
    )
  }

  const renderView = (view) => {
    switch(view) {
      case 'Home':
        return HomeView();
      case 'Pagamenti':
        return PaymentsView();
      case 'Preventivi':
        return QuotesView();
        case 'News':
          return NewsView();
      default:
        return HomeView();
    }
  }

  const AdminHeader = () => {
    return (
      <div className='app__administration-header'>
        <div className='app__administration-header-logo'>
          <img src={images.logo} alt='logo' />
        </div>
        <div className='app__administration-header-profile'>
          <HiUserCircle /> {loginInfo.username}
        </div>
      </div>
    )
  }

  const InternalNavbar = () => {
    const [toggle, setToggle] = useState(false);

    const handleMenuOnClick = (e) => {
      e.stopPropagation();
      setToggle((prevState) => !prevState);
    }

    const changeView = (e, item) => {
      setCurrentView(item);
    };

    const logout = () => {
      axios.get('api/logout.php')
      .then(function(response) {
        setLoginInfo({'uuid': '', 'username': '', 'role': ''});
        setIsUserLoggedIn(false);
      })
      .catch(function(error) {
        setPopup({'trigger': true, 'title': 'Si è verificato un errore!', 'description': 'Si è verificato un errore con il server. Ti preghiamo di riprovare più tardi.'});
      })
    }

    return (
      <>
        <nav className='app__administration-navbar'>
          <ul className='app__administration-navbar-links'>
            {viewList.map((item, index) => (
              <li className={`${currentView === item ? 'link-active' : ''}`} key={item.name} onClick={(e) => changeView(e, item.name)}>
                {item.icon}{item.name}
              </li>
            ))}
            <li onClick={() => logout()}>
              <AiOutlinePoweroff />Logout
            </li>
          </ul>

          <div className='app__administration-navbar-menu'>
            <HiMenuAlt4 onClick={(e) => handleMenuOnClick(e)}/>

            {toggle && (
              <motion.div initial={{ width: 0 }} animate={{ width: 250}} transition={{ duration: 0.2, ease: 'easeOut' }}>
                <motion.span initial={{ width: 0 }} animate={{ width: 80 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
                  <HiX onClick={(e) => handleMenuOnClick(e)} />
                </motion.span>
                <ul className='app__administration-navbar-links'>
                  {viewList.map((item, index) => (
                    <li className={`${currentView === item ? 'link-active' : ''}`} key={item.name} onClick={(e) => changeView(e, item.name)}>
                      {item.icon}{item.name}
                    </li>
                  ))}
                  <li onClick={() => logout()}>
                  <AiOutlinePoweroff />Logout
                  </li>
                </ul>
              </motion.div>
            )}
          </div>
        </nav>
      </>
    )
  }

  const HomeView = () => {
    return (
      <>
        <h1>Benvenuto nel pannello amministrazione.</h1>
        Utilizza il menu laterale per navigare tra le pagine.
      </>
    )
  }

  const PaymentsView = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
      getPaymentsList();
    }, []);
  
    const getPaymentsList = () => {
      axios.get('api/payments.php')
      .then(function(response) {
        if (response.status === 200) {
          const allPaymentsList = response.data.payments;
          setPayments(allPaymentsList);
        } else {
          setPopup({'trigger': true, 'title': 'Si è verificato un errore!', 'description': response.data.message});
        }
      })
      .catch(function(error) {
        setPopup({'trigger': true, 'title': 'Si è verificato un errore!', 'description': 'Si è verificato un errore con il server. Ti preghiamo di riprovare più tardi.'});
      })
    }

    const shareText = (title, text) => {

      if (navigator.share) {
        navigator.share({
          title: title,
          text: text
        }).catch(err => {
          //HandleError
        });
      }
    }

    return (
      <>
        <div className='app__administation-payment'>
          <h1>Metodi di Pagamento</h1>
          Qui di seguito i metodi di pagamento:
          {payments ? (payments.map((item, index) => (
            <div className='app__administration-payment-item' key={`payment${index}`}>
              <div id={`payment${index}`}>
                <h3>{item.title}</h3>
                {item.name !== '' ? (
                  <>
                    <span><strong>Nome:</strong> {item.name}</span>
                  </>
                ) : '' }
                {item.iban !== '' ? (
                  <>
                    <span><strong>Iban:</strong> {item.iban}</span>
                  </>
                ) : '' }
                {item.cardcode !== '' ? (
                  <>
                    <span><strong>Codice Carta:</strong> {item.cardcode}</span>
                  </>
                ) : '' }
                {item.cf !== '' ? (
                  <>
                    <span><strong>Codice Fiscale:</strong> {item.cf}</span>
                  </>
                ) : '' }
              </div>
              <button onClick={(e) => shareText(item.name, document.getElementById('payment'+index).innerText)}>Condividi</button>
            </div>
          ))) : 'Nessun metodo di pagamento da visualizzare'}
        </div>
      </>
    )
  }

  const NewsView = () => {
    const [news, setNews] = useState([]);
    const [newsUpdate, setNewsUpdate] = useState({trigger: false, id: '', title: '', text: '', expiry: ''});

    useEffect(() => {
      getNewsList();
    }, []);
  
    const getNewsList = () => {
      axios.get('api/companyNews.php')
      .then(function(response) {
        if (response.status === 200) {
          const allNewsList = (response.data.news).sort((a, b) => (b.id - a.id));
          setNews(allNewsList);
        } else {
          setPopup({'trigger': true, 'title': 'Si è verificato un errore!', 'description': response.data.message});
        }
      })
      .catch(function(error) {
        setPopup({'trigger': true, 'title': 'Si è verificato un errore!', 'description': 'Si è verificato un errore con il server. Ti preghiamo di riprovare più tardi.'});
      })
    }

    const handleNewsRemove = (e, item) => {
      let data = {
        newsId: item.id,
      }
      const params = new URLSearchParams(data);

      axios.delete('api/companyNews.php', { params })
      .then(function(response) {
        if (response.status === 200) {
          getNewsList();
        } else {
          setPopup({'trigger': true, 'title': 'Si è verificato un errore!', 'description': response.data.message});
        }
      })
      .catch(function(error) {
        setPopup({'trigger': true, 'title': 'Si è verificato un errore!', 'description': 'Si è verificato un errore con il server. Ti preghiamo di riprovare più tardi.'});
      })
    }

    const closeNewsUpdate = () => {
      setNewsUpdate({...newsUpdate, 'trigger': false});
    }

    return (
      <>
        <div className='app__administration-news'>
          <h1>News</h1>
          Qui di seguito le news mostrate alla clientela:
          <div className='app__administration-news-addbutton'>
            <button onClick={() => setNewsUpdate({'trigger': true, 'id': '', 'title': '', 'text': '', 'expiry': ''})}><AiOutlinePlus /> Aggiungi</button>
          </div>
          <div className='app__administration-news-list'>
            {news.length ? (news.map((item, index) => (
                <div key={`news${index}`} className='app__administration-news-list-item'>
                  <h3>{item.title}</h3>
                  <p>
                    <AiOutlineClockCircle />{item.expiry}
                  </p>
                  {item.text}
                  <p>
                    <button onClick={(e) => handleNewsRemove(e, item)}><AiFillDelete /> Elimina</button>
                  </p>
                </div>
            ))) : 'Nessuna news attiva nel database. Clicca sul bottone aggiungi per crearne una nuova.'}
          </div>
        </div>
        <NewsUpdate trigger={newsUpdate['trigger']} onClickDelete={closeNewsUpdate} id={newsUpdate['id']} title={newsUpdate['title']} text={newsUpdate['text']} expiry={newsUpdate['expiry']}/>
      </>
    )
  }

  const NewsUpdate = (props) => {
    const [formValues, setFormValues] = useState({ id: props.id, title: props.title, text: props.text, expiry: props.expiry });
    const [currentDate, setCurrentDate] = useState('0000-00-00');

    useEffect(() => {
      getCurrentDate();
    }, []);

    const onChange = (e) => {
      setFormValues({...formValues, [e.target.name]: e.target.value});
    };

    const handleSubmit = () => {
      let params = {
        newsId: formValues['id'],
        newsTitle: formValues['title'],
        newsText: formValues['text'],
        newsExpiry: formValues['expiry']
      }

      axios.put('api/companyNews.php', params )
      .then(function(response) {
        if (response.status === 200) {
          setPopup({'trigger': true, 'title': 'News Aggiunta!', 'description': 'La news è stata correttamente aggiunta.'});
        } else {
          setPopup({'trigger': true, 'title': 'Si è verificato un errore!', 'description': response.data.message});
        }
      })
      .catch(function(error) {
        setPopup({'trigger': true, 'title': 'Si è verificato un errore!', 'description': 'Si è verificato un errore con il server. Ti preghiamo di riprovare più tardi.'});
      })
    }

    const getCurrentDate = () => {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      today = yyyy + '-' + mm + '-' + dd;
      setCurrentDate(today);
    }

    return (props.trigger) ? (
      <div className='app__administration-news-update'>
        <div className='app__administration-news-update-shade'>
          <div className='app__administration-news-update-inner'>
            <h3>Stai creando una nuova news:</h3>
            <form onSubmit={handleSubmit}>
              <input name='title' type='text' value={formValues['title']} placeholder='Titolo' onChange={onChange} required />
              <textarea name='text' value={formValues['text']} placeholder='Testo' onChange={onChange} />
              <input name='expiry' type='date' min={currentDate} value={formValues['expiry']} placeholder='Scadenza' onChange={onChange} required />
              <p>
                <button onClick={props.onClickDelete}><AiFillDelete /> Annulla</button>
                <button type='submit'><AiOutlinePlus /> Aggiungi</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    ) : '';
  }

  const QuotesView = () => {
    const [quotes, setQuotes] = useState([]);
    const [activeFilter, setActiveFilter] = useState('Tutte');
    const [filterQuotes, setFilterQuotes] = useState([]);
    const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
    const [quoteResponse, setQuoteResponse] = useState({trigger: false, id: '', name: '', surname: '', phone: '', email: '', request: ''});
    const [openMenu, setOpenMenu] = useState('');
    const [openFilterMenu, setOpenFilterMenu] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [viewedQuotesNumber, setViewedQuotesNumber] = useState(7);

    useEffect(() => {
      getQuotesList();
    }, []);
  
    const getQuotesList = () => {
      axios.get('api/getQuoteList.php')
      .then(function(response) {
        if (response.status === 200) {
          const allQuotesList = (response.data.quotes).sort((a, b) => (b.id - a.id));
          setQuotes(allQuotesList);
          setFilterQuotes(allQuotesList);
        } else {
          setPopup({'trigger': true, 'title': 'Si è verificato un errore!', 'description': response.data.message});
        }
      })
      .catch(function(error) {
        setPopup({'trigger': true, 'title': 'Si è verificato un errore!', 'description': 'Si è verificato un errore con il server. Ti preghiamo di riprovare più tardi.'});
      })
    }

    const handleQuotesFilter = (item) => {
      if (activeFilter !== item) {
        setActiveFilter(item);
        setAnimateCard([{y:100, opacity: 0}])
  
        setTimeout(() => {
          setAnimateCard([{y:0, opacity: 1}])
  
          if(item === 'Tutte') {
            setFilterQuotes(quotes);
          } else if (item === 'Con Risposta') {
            setFilterQuotes(quotes.filter((quotes) => quotes.state === '1'))
          } else {
            setFilterQuotes(quotes.filter((quotes) => quotes.state === '0'))
          }
          setViewedQuotesNumber(7);
        }, 500);
      }
    }

    const closeQuoteResponse = () => {
      setQuoteResponse({...popup, 'trigger': false});
    }

    const handleOtherOptionsButton = (e, itemId) => {
      if (itemId === openMenu) {
        setOpenMenu('');
      } else {
        setOpenMenu(itemId);
      }
    }

    const handleChangeQuoteState = (e, item) => {
      let quoteState = 0;
      if (item.state === '0') quoteState = 1;
      let formData = {
        quoteId: item.id,
        quoteState: quoteState
      }

      axios.post('api/updateQuoteState.php', formData)
      .then(function(response) {
        if (response.status === 200) {
          getQuotesList();
        }  
      })
      .catch(function (error) {
          setPopup({'trigger': true, 'title': 'Si è verificato un errore!', 'description': 'Si è verificato un problema.'});
      });
    }

    const readQuoteResponse = (e, item) => {
      let finalResponse = '';
      const response = JSON.parse(item.response);
      console.log(response)
      if (response.type === 'simpleResponse') {
        finalResponse = finalResponse.concat('Risposta:<br/>', response.response);
      } else {
        finalResponse = finalResponse.concat('Prodotti:<br/>');
        for (let i = 0; i < response.products.length; i++) {
          finalResponse = finalResponse.concat(i+1, '.', response.products[i].product, '<br/>');
          finalResponse = finalResponse.concat('Quantità: ', response.products[i].quantity, '<br/>');
          finalResponse = finalResponse.concat('Prezzo Unitario: €', response.products[i].price, '<br/>');
          finalResponse = finalResponse.concat('Subtotale: €', response.products[i].quantity*response.products[i].price, '<br/>.<br/>');
        }
        finalResponse = finalResponse.concat('Totale: €', response.totalprice, '<br/>___<br/>');
        if (response.transport !== '') finalResponse = finalResponse.concat('Note Transporto:<br/>', response.transport, '<br/>');
        if (response.response !== '') finalResponse = finalResponse.concat('Note Addizionali:<br/>', response.response, '<br/>');
      }
      setPopup({'trigger': true, 'title': 'Risposta al preventivo ' + item.id, 'description': finalResponse});
    }

    return (
      <div className='app__administration-quotes'>
        <h1>Richieste di preventivo</h1>
        Qui di seguito le richieste di preventivo:
        <div className='app__administration-quotes-filter-options'>
          <div className='app__administration-quotes-filter-search'>
            <BsSearch/><input onChange={(e) => setSearchText(e.target.value)} type='text' placeholder='Cerca' />
          </div>
          <div className='app__administration-quotes-filter'>
            <button onClick={() => setOpenFilterMenu((prevState) => !prevState)}><BsFilterLeft />Filtra</button>
            {openFilterMenu ? (
              <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} transition={{ duration: 0.1, ease: 'easeOut' }} className='app__administration-quotes-filter-menu'>
                {['Tutte', 'Senza Risposta', 'Con Risposta'].map((item, index) => (
                  <ul key={`filter${index}`} onClick={() => handleQuotesFilter(item)} className={`app__administration-quotes-filter-item ${activeFilter === item ? 'item-active' : ''}`}>
                    {item}
                  </ul>
                ))}
              </motion.div>
            ) : ''}
          </div>
        </div>
        <motion.div animate={animateCard} transition={{ duration: 0.5, delayChildren: 0.5 }}>
          {filterQuotes ? (filterQuotes.slice(0, viewedQuotesNumber).filter((item) => {return (item.name.toLowerCase().includes(searchText.toLowerCase()) || item.surname.toLowerCase().includes(searchText.toLowerCase()) || item.id.includes(searchText) || item.phone.includes(searchText))}).map((item, index) => (
            <div className='app__administration-quotes-item' key={`quote${index}`}>
              <div className='app__administration-quotes-item-content'>
                <div>
                  <span><h4>Email n.{item.id} {item.state === '1' ? (<BiMessageCheck style={{color: "green"}}/>) : (<BiMessageAltX style={{color: "red"}}/>)}</h4></span>
                  <span><p><AiOutlineClockCircle /> {item.timestamp}</p></span>
                </div>
                <div>
                  <span><h5>Cliente</h5>{item.name} {item.surname}</span>
                  <span>
                    <h5>Recapiti</h5>
                    <strong>Telefono: </strong>{item.phone}
                    <strong>Email: </strong>{item.email}
                  </span>
                </div>
                <div>
                  <span><h5>Richiesta</h5>{item.request}</span>
                </div>
              </div>
              <div className='app__administration-quotes-item-buttons'>
                <ul>
                  {item.state === '1' ? (<button><a href={`mailto:${item.email}?subject=Replica%20Preventivo%20Numero%20${item.id}%20-%20Lucciola%20Legnami`}><AiOutlineMail /> Replica</a></button>) : (<button onClick={() => setQuoteResponse({'trigger': true, 'id': item.id, 'name': item.name, 'surname': item.surname, 'phone': item.phone, 'email': item.email, 'request': item.request})}><AiOutlineMail /> Rispondi</button>)}
                  <button onClick={(e) => handleOtherOptionsButton(e, item.id)}>Altro <AiFillCaretDown /></button>
                </ul>
                {openMenu === item.id && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} transition={{ duration: 0.1, ease: 'easeOut' }}>
                    <div className="app__administration-quotes-item-buttons-popup">
                      <motion.ul initial={{ height: 100, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
                          <button><BsTelephoneForward /> <a href={`tel:${item.phone}`}>Chiama ora</a></button>
                          <button onClick={(e) => handleChangeQuoteState(e, item)}>{item.state === '1' ? (<><MdRemoveDone />Segna come da rispondere</>) : (<><MdDone /> Segna come risposto</>)}</button>
                          {(item.state === '1' & item.response !== '') ? (<button onClick={(e) => readQuoteResponse(e, item)}><MdQuestionAnswer />Visualizza Risposta</button>) : ''}
                      </motion.ul>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          ))) : 'Nessun preventivo da visualizzare'}
        </motion.div>
        <div className='app__administration-quotes-viewmore'>
          {(filterQuotes.length > viewedQuotesNumber) ? (
            <button onClick={() => setViewedQuotesNumber(viewedQuotesNumber+7)}><BiShow /> Carica Altre</button>
          ) : ''}
        </div>
        <QuoteResponseCreation trigger={quoteResponse['trigger']} onClickDelete={closeQuoteResponse} quoteId={quoteResponse['id']} quoteName={quoteResponse['name']} quoteSurname={quoteResponse['surname']} quotePhone={quoteResponse['phone']} quoteEmail={quoteResponse['email']} quoteRequest={quoteResponse['request']} />
      </div>
    )
  }

  const QuoteResponseCreation = (props) => {
    const [formValues, setFormValues] = useState({ simpleResponse: '', transport: '' });
    const [productList, setProductList] = useState([{ product: '', price: '', quantity: '' }]);
    const [responseType, setResponseType] = useState('simpleResponse');
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState('');
    const [transportVisibility, setTransportVisibility] = useState(false);
    const [additionalNotes, setAdditionalNotes] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      if (props.quoteId === '' || props.quoteName === '' || props.quoteSurname === '' || props.quotePhone === '' || props.quoteEmail === '') {
        setPopup({'trigger': true, 'title': 'Si è verificato un errore!', 'description': 'La richiesta non sembra essere valida. Controllare che tutti i campi siano validi.'});
      } else {
        let formData = {
          quoteId: props.quoteId,
          quoteName: props.quoteName,
          quoteSurname: props.quoteSurname,
          quotePhone: props.quotePhone,
          quoteEmail: props.quoteEmail,
          quoteRequest: props.quoteRequest,
          quoteResponse: formValues['simpleResponse'],
          quoteTransport: formValues['transport'],
          quoteProductList: productList,
          quoteTotalPrice: totalPrice,
          quoteResponseType: responseType
        }

        axios.post('api/sendQuoteResponse.php', formData)
        .then(function (response) {
            if (response.status === 200)
            {
              setPopup({'trigger': true, 'title': 'Risposta Inviata!', 'description': response.data.message});
              setLoading(false);
              return props.closeclickDelete;
            } else {
              setPopup({'trigger': true, 'title': 'Si è verificato un errore!', 'description': response.data.message});
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

    const handleProductChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...productList];
      list[index][name] = value;
      setProductList(list);
      computeTotalPrice();
    };

    const handleProductAdd = () => {
      setProductList([...productList, { product: '', price: '', quantity: '' }]);
    };

    const handleProductRemove = (index) => {
      const list = [...productList];
      list.splice(index, 1);
      setProductList(list);
    };

    const computeTotalPrice = () => {
      let price = 0;
      for (let i = 0; i < productList.length; i++) {
        price = price + (productList[i]['price']*productList[i]['quantity']);
      };
      setTotalPrice(price);
    }

    return (props.trigger) ? (
      <div className='app__administration-quotes-creation'>
        <div className='app__administration-quotes-creation-shade'>
          <div className='app__administration-quotes-creation-inner'>
            <div className='app__administration-quotes-creation-title'>
              <h3>Stai rispondendo al preventivo {props.quoteId}</h3>
              <strong>Richiesta:</strong> {props.quoteRequest}
              <p>
                Selezionare tipologia di risposta: <br/>
                <select name='responseType' id='responseType' onClick={() => setResponseType(document.getElementById('responseType').value)}>
                  <option value='simpleResponse'>Semplice</option>
                  <option value='structuredResponse'>Strutturata</option>
                </select>
              </p>
              <form onSubmit={handleSubmit}>
                {responseType === 'simpleResponse' ? (
                  <>
                    Inserire il testo del preventivo:<br/>
                    <textarea placeholder='Preventivo' name='simpleResponse' value={formValues['simpleResponse']} onChange={onChange} required />
                  </>
                ) : (
                  <>
                    Inserisci i prodotti:
                    {productList.map((item, index) => (
                      <div key={index} className='app__administration-quotes-creation-inner-structure-product'>
                        <div className='app__administration-quotes-creation-inner-structure-product-item'>
                          <input name="product" type="text" id="productname" value={item.product} placeholder='Descrizione' onChange={(e) => handleProductChange(e, index)} required />
                          <div>
                          <input name="quantity" type="text" id="productquantity" value={item.quantity} placeholder='Quantita' pattern="[0-9]+" onChange={(e) => handleProductChange(e, index)} required />
                            <input name="price" type="text" id="productprice" value={item.price} placeholder='Prezzo' pattern="\b[0-9]{1,8}\.[0-9]{1,2}\b|\b(?<!\.)[0-9]{1,8}(?!\.)\b" onChange={(e) => handleProductChange(e, index)} required />
                          </div>
                          {productList.length !== 1 && (
                            <button type="button" onClick={handleProductRemove}>
                              <span><AiFillDelete /></span>
                            </button>
                          )}
                        </div>
                        <div className='app__administration-quotes-creation-inner-structure-product-item-button'>
                          {productList.length - 1 === index && productList.length < 4 && (
                            <button type="button" onClick={handleProductAdd}>
                              <span><AiOutlinePlus />Aggiungi un prodotto</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    Totale: €{totalPrice}<br/>
                    <div className='app__administration-quotes-creation-inner-structure-product-item-button'>
                    {transportVisibility ? (
                      <>
                        Note Trasporto:
                        <textarea placeholder='Note Trasporto' name='transport' value={formValues['transport']} onChange={onChange} />
                      </>
                    ) : (
                      <button type="button" onClick={() => setTransportVisibility(true)}>
                        <span><AiOutlinePlus />Aggiungi Note Trasporto</span>
                      </button>
                    )}
                    {additionalNotes ? (
                      <>
                        Note Addizionali:
                        <textarea placeholder='Note Addizionali' name='simpleResponse' value={formValues['simpleResponse']} onChange={onChange} />
                      </>
                    ) : (
                      <button type="button" onClick={() => setAdditionalNotes(true)}>
                        <span><AiOutlinePlus />Aggiungi Note Addizionali</span>
                      </button>
                    )}
                    </div>
                  </>
                )}
                <div className='app__administration-quotes-creation-button'>
                  <button type='submit'><BiMailSend />
                    {loading ? ' Invio in corso' : ' Invia'}
                  </button>
                  <button type='button' onClick={props.onClickDelete}><AiFillDelete /> Annulla</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    ) : '';
  }

  return (
    <>
      {isUserLoggedIn && (
        <AdminPanel />
      )}
      <Popup trigger={popup['trigger']} title={popup['title']} description={popup['description']} onClick={closePopup} />
    </>
  )
}

export default Administration
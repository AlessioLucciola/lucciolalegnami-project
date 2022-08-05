import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Carousel from 'react-bootstrap/Carousel';
import { IconContext } from 'react-icons';
import { BsInfoLg } from 'react-icons/bs';
import './News.scss';

function News() {
    const [allNews, setAllNews] = useState([]);
    const [visibleNews, setVisibleNews] = useState([]);
    const [cookieAdded, setCookieAdded] = useState(false);
    const [popupActive, setPopupActive] = useState(false);
    const [buttonActive, setButtonActive] = useState(false);

    useEffect(() => {
        getNews();
    }, []);

    const getNews = () => {
        axios.get('api/companyNews.php')
        .then(function(response) {
            if (response.status === 200) {
                const newNews = response.data.news;
                setAllNews(newNews);
                setVisibleNews(newNews);
                const newUnreadNews = getUnreadNews(newNews);
                if (newNews.length !== 0) {
                    setButtonActive(true);
                    if (newUnreadNews.length !== 0) {
                        setVisibleNews(newUnreadNews);
                        setPopupActive(true);
                        if (cookieAdded === false) {
                            for (let i = 0; i < newUnreadNews.length; i++) {
                                let params = {
                                    cookieName: 'news'+newUnreadNews[i].id,
                                    cookieValue: '1',
                                    cookieDuration: '86400'
                                }
                    
                                axios.put('api/setCookie.php', params)
                                .catch(function(error) {
                                    console.log(error)
                                })
                            }
                            setCookieAdded(true);
                        }
                    }
                }
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    const getUnreadNews = (newNews) => {
        const unread = [];
        for (let i = 0; i < newNews.length; i++) {
            if (newNews[i].read === '0') {
                unread.push(newNews[i])
            }
        }
        return unread;
    }

    const closeNews = () => {
        setVisibleNews(allNews);
        setPopupActive(false);
    }

    const openNews = () => {
        setPopupActive(true);
    }

    function newsPopup() {
        return (popupActive && visibleNews.length !== 0) ? (
            <div className='app__news-shade'>
                <div className='app__news-inner'>
                    {visibleNews.length > 1 ? (
                        <Carousel variant="dark" className='text-center p-4'>
                            {visibleNews.map((item, index) => (
                                <Carousel.Item key={index+1}>
                                    <div className='app__news-title'>
                                        {item.title}
                                    </div>
                                    <div className='app__news-text'>
                                        {item.text}
                                    </div>
                                    <div className='app__news-button'>
                                        <button type='button' className='p-text' onClick={() => closeNews()}>Chiudi</button>
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    ) : (visibleNews.length === 1 ? (
                            <>
                                <div className='app__news-title'>
                                    {visibleNews[0].title}
                                </div>
                                <div className='app__news-text'>
                                    {visibleNews[0].text}
                                </div>
                                <div className='app__news-button singlenews'>
                                    <button type='button' className='p-text' onClick={() => closeNews()}>Chiudi</button>
                                </div>
                            </>
                    ) : '')}
                </div>
            </div>
            ) : '' }

    function newsButton() {
        return (buttonActive) ? (
            <div className='app__news-openbutton'>
                <button onClick={openNews}>
                <IconContext.Provider  value={{ size: '25px' }}>
                    <BsInfoLg />
                </IconContext.Provider>
                </button>
            </div>
        ) : '';
    }

    return (
        <>
            {newsPopup()}
            {newsButton()}
        </>
    )
}

export default News
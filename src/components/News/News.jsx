import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Carousel from 'react-bootstrap/Carousel';
import './News.scss';

function News() {
    const [news, setNews] = useState([]);
    const [active, setActive] = useState(false);

    useEffect(() => {
        getNews();
    }, []);

    const getNews = () => {
        axios.get('http://localhost:80/api/companyNews.php')
        .then(function(response) {
            if (response.status === 200) {
                const newNews = response.data.news;
                setNews(newNews);
                if (newNews.length !== 0) {
                    setActive(true);
                }
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    return (active) ? (
        <div className='app__news-shade'>
          <div className='app__news-inner'>
            {news.length > 1 ? (
                <Carousel variant="dark" className='text-center p-4'>
                    {news.map((item, index) => (
                        <Carousel.Item key={index+1}>
                            <div className='app__news-title'>
                                {item.title}
                            </div>
                            <div className='app__news-text'>
                                {item.text}
                            </div>
                            <div className='app__news-button'>
                                <button type='button' className='p-text' onClick={() => setActive(false)}>Chiudi</button>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <>
                    <div className='app__news-title'>
                        {news[0].title}
                    </div>
                    <div className='app__news-text'>
                        {news[0].text}
                    </div>
                    <div className='app__news-button singlenews'>
                        <button type='button' className='p-text' onClick={() => setActive(false)}>Chiudi</button>
                    </div>
                </>
            )}
            
          </div>
        </div>
      ) : '';
}

export default News
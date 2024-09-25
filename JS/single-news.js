const webApp = document.getElementById('web-app');
const temporaryApp = document.getElementById('temporary-app');
import { news } from "../Array/news.js";
import { showActiveLinkFunction, inputAndBodyFunction } from "./template.js";

const template = async () => {
  try {
    const res = await fetch('/HTML/template.html');
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    } else {
      const html = await res.text();
      webApp.innerHTML = html;
      const contentTap = document.getElementById('content-tap');
      contentTap.innerHTML = temporaryApp.innerHTML;
      temporaryApp.innerHTML = '';
      showActiveLinkFunction();
      inputAndBodyFunction();

      const singleNews = document.querySelector('.single-news-wrapper');
      const singleNewsFunction = () => {
        let displayNews = news.map((newsItem) => {
        if (newsItem.id === parseInt(window.location.search.split('=')[1])) {
          return `
          <div class="single-news-image">
          <img src="${newsItem.image}" alt="${newsItem.title}">
          </div>
          <div class="singl-news-title">
          <h1>${newsItem.title}</h1>
          </div>
          <div class="single-news-contante">
          <p>${newsItem.paragraph}</p>
          </div>
          <div class="single-news-paragraph-1">
          <p>${newsItem.paragraph}</p>
          </div>
          <div class="single-news-image-2">
          <img src="${newsItem.fullNewsImg}" alt="${newsItem.title}">
          </div>
          <div class="single-news-paragraph-2">
          <p>${newsItem.paragraph}</p>
          </div>
          <div class="single-news-paragraph-3">
          <p>${newsItem.paragraph}</p>
          </div>
          <div class="single-news-date-and-icon">
          <span>${newsItem.date}</span>
          <span class="material-symbols-outlined">
          ${newsItem.span}
          </span>
          </div>
          `;
        }
      }).join("");
      singleNews.innerHTML = displayNews;
    };
    singleNewsFunction();
    

    
      //// displaying related news 
      const newsWrapper = document.querySelector('.news-wraper');
      const displayNews = () => {
        let displayNewNews = news.map((newsItem) => {
          if(newsItem.id !== parseInt(window.location.search.split('=')[1])) {
            return `
            <div class="news-item">
            <div class="item-img">
            <a href="/HTML/single-news.html?id=${newsItem.id}">
            <img src="${newsItem.image}" alt="${newsItem.title}">
            </a>
            </div>
            <div class="item-text">
            <div class="item-titel">
            <h3>${newsItem.title}</h3>
            </div>
            <div class="item-content">
            <p>${newsItem.content}</p>
            </div>
            <div class="read-more-container">
            <a href="/HTML/single-news.html?id=${newsItem.id}" class="read-more-btn">read more</a>
            </div>
            <div class="date-and-icon">
            ${newsItem.date}
            <span class="material-symbols-outlined">${newsItem.span}</span>
            </div>
            </div>
            </div>
            `;
          }
          }).join("");
          
          newsWrapper.innerHTML = displayNewNews;
        }
      displayNews();


    }
  } catch (error) {
    console.error('Error:', error);
    webApp.innerHTML = `Error: ${error.message}`;
  }
};

template();

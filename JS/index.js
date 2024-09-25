const webApp = document.getElementById('web-app');
const temporaryApp = document.getElementById('temporary-app');
import { news } from "../Array/news.js";
import { tips } from "../Array/tips.js";

//// importing the function from temeplate  for input and body 
import { showActiveLinkFunction, inputAndBodyFunction } from "./template.js";

const template = async () => {
try {
  const res = await fetch('/HTML/template.html');
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    } else {
      const html = await res.text();
      webApp.innerHTML = html;
      const contentTab = document.getElementById('content-tap');
      contentTab.innerHTML = temporaryApp.innerHTML;
      temporaryApp.innerHTML = '';
      showActiveLinkFunction();
      inputAndBodyFunction();
      
      //// displaying news 
      const newsWrapper = document.querySelector('.news-wraper');
      const displayNews = () => {
        let displayNewNews = news.map((newsItem) => {
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
        }).join("");
        
        newsWrapper.innerHTML = displayNewNews;
      }
      displayNews();
      

      //// displaying the univers tips 
      const tipsWraper = document.querySelector('.tips-wraper')
      const displayTips = () => {
        let displayNewTips = tips.map((tipsItem) => {
          return `
            <div class="tips-item">
          <h3>${tipsItem.title}</h3>
          <div class="item-image">
            <a href="/HTML/single-tips.html?id=${tipsItem.id}">
              <img src="${tipsItem.img}" alt="${tipsItem.title}">
            </a>
          </div>
          <div class="item-content">
            <p>
            ${tipsItem.fristContent}
            </p>
          </div>
          <div class="tools">
            <a href="/HTML/single-tips.html?=id${tipsItem.id}">required tools</a>
          </div>
        </div>
          `
        }).join("");
        
        tipsWraper.innerHTML = displayNewTips;
      }
      displayTips();


      //// sliding the carts 
        const icons = document.querySelectorAll('.material-symbols-outlined');
        const container = document.querySelector('.tips-wraper')
        
        const slideCards = () => {
          icons.forEach((icon) => {
            icon.addEventListener('click', () => {
              const direction = icon.id === 'prev' ? -1 : 1;
              const scroll = container.clientWidth * direction;
              tipsWraper.scrollBy({left: scroll, behavior: 'smooth'})
              
              if(container.scrollLeft === 0) {
                document.getElementById('prev').style.display = 'none';
              } else {
                document.getElementById('prev').style.display = 'block';
              }
              
              if(container.scrollLeft + container.clientWidth >= container.scrollWidth) {
                document.getElementById('next').style.display = 'none';
              } else {
                document.getElementById('next').style.display = 'block';
              }
            })
          })
        }
        slideCards();


}
    
  } catch (error) {
    console.error('Error:', error);
    webApp.innerHTML = `Error: ${error.message}`;
  }
};

template();

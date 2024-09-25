const webApp = document.getElementById('web-app');
const temporaryApp = document.getElementById('temporary-app');
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
      

      /// displaying the  tips  deatails 
      const tipsContainer = document.querySelector('.item-wraper');
      const displayTipsFunction = () => {
       let displayTipsDetails = tips.map((tipsItem) => {
       if(tipsItem.id === parseInt(window.location.search.split('=')[1])) {
        return `
        <div class="item-images">
        <div class="big-image">
        <img id="screen" src="${tipsItem.img}" alt="${tipsItem.title}">
        </div>
        <div class="small-images">
        <div class="small-image">
        <img class="small-img"  src="${tipsItem.images1}" alt="${tipsItem.imgContext1}">
        <div class="image-desc">
        <p>${tipsItem.imgContext1}</p>
        </div>
        </div>
        <div class="small-image">
        <img class="small-img"  src="${tipsItem.images2}" alt="${tipsItem.imgContext2}">
        <div class="image-desc">
        <p>${tipsItem.imgContext2}</p>
        </div>
        </div>
        <div class="small-image">
        <img class="small-img"  src="${tipsItem.images3}" alt="${tipsItem.imgContext3}">
        <div class="image-desc">
         <p>${tipsItem.imgContext3}</p>
         </div>
         </div>
         </div>
         </div>
         <div class="image-content">
         <h2>${tipsItem.title}</h2>
         <p>${tipsItem.content}</p>
         </div>
         `
        }
       }).join("");
       tipsContainer.innerHTML = displayTipsDetails;
      }
      displayTipsFunction();
    

      //// display small picture in bigger screen 
      const smallImages = document.querySelectorAll('.small-img');
      const screen = document.getElementById('screen');
      const showImages = () => {
       smallImages.forEach((img) => {
        img.addEventListener('click', () => {
         screen.src = img.src;
        })
       })
      }
      showImages();


        //// displaying the univers similar  tips 
        const tipsWraper = document.querySelector('.tips-wraper')
        const displayTips = () => {
          let displayNewTips = tips.map((tipsItem) => {
           if( tipsItem.id !== parseInt(window.location.search.split('=')[1])) {

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
             }
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

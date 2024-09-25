//// show active links 
export const showActiveLinkFunction = () => {
 const links = document.querySelectorAll('.link');
 const body = document.body;

 links.forEach((link) => {
   link.addEventListener('click', (e) => {
     e.stopPropagation();
     links.forEach((link) => link.classList.remove('active'));
     link.classList.add('active');
   });
 });

 body.addEventListener('click', (e) => {
   if (!e.target.matches('.link')) {
     links.forEach((link) => {
       if (link.classList.contains('active')) {
         link.classList.remove('active');
       }
     });
   }
 });
};




 ///// search-engin und body function 
export const inputAndBodyFunction = () => {
 const searchInputIcon = document.getElementById('inputBtn');
 const searchInput = document.getElementById('search');
 const body = document.body;

 searchInputIcon.addEventListener('click', () => {
  searchInput.classList.toggle('active');
 });
 
 body.addEventListener('click', (e) => {
  if(!e.target.matches('#inputBtn') && 
  !e.target.matches('#search') && 
  searchInput.classList.contains('active')) {
   searchInput.classList.remove('active');
  }
 })
}


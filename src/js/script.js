{
  'use strict';
    
  const select = {
    templateOf: {
      bookProduct: '#template-book', 
    },
    containerOf:{
      bookList: '.books-list',
    },
    filters: '.filters',
  };
  
  const templates = {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.bookProduct).innerHTML),
  };
  
  const bookImg = {
    bookImage: 'favorite'
  };
  
  const makeView = function(){    
    for(let book of dataSource.books) {      
      const thisBook = this;      
      const generatedHTML = templates.menuProduct(book);     
      thisBook.bookParams = utils.createDOMFromHTML(generatedHTML);
      const bookContainer = document.querySelector(select.containerOf.bookList);
      bookContainer.appendChild(thisBook.bookParams);  
    }   
  };
  
  const favoriteBooks = [];
  const filters = [];
  
  const initActions = function () {
    const thisBook = this;
  
    thisBook.container = document.querySelector(select.containerOf.bookList);
    thisBook.bookImages = thisBook.container.querySelectorAll('.book a');
    thisBook.filter = document.querySelector(select.filters);

    thisBook.container.addEventListener('dblclick', function(event){
      event.preventDefault();
      const eventParent=event.target.offsetParent;

      if(eventParent.classList.contains('book__image')){
        eventParent.classList.toggle(bookImg.bookImage);
        const bookImageId = eventParent.getAttribute('data-id');

        if(favoriteBooks.includes(bookImageId)){
          const list = favoriteBooks;
          const idIndex = list.indexOf(bookImageId);
          list.splice(idIndex, 1);
        }
        else {
          favoriteBooks.push(bookImageId);
        }
        console.log(favoriteBooks);
      }
    });

    thisBook.filter.addEventListener('click', function(event){ 
      const bookFilter = event.target;    

      if(bookFilter.tagName == 'INPUT' && bookFilter.type == 'checkbox' && bookFilter.name == 'filter'){
        if(bookFilter.checked == true){
          filters.push(bookFilter.value);
        } else if(filters.includes(bookFilter.value)) {
          const idIndex = filters.indexOf(bookFilter.value);
          filters.splice(idIndex, 1);
        }
        console.log(filters);            
      } 
    });
  };

  makeView();
  initActions();
}

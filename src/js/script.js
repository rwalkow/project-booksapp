{
  'use strict';
    
  const select = {
    templateOf: {
      bookProduct: '#template-book', 
    },
    containerOf:{
      bookList: '.books-list',
    },
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
  
  const initActions = function () {
    const thisBook = this;
  
    thisBook.container = document.querySelector(select.containerOf.bookList);
    thisBook.bookImages = thisBook.container.querySelectorAll('.book a');
  
    for(let bookImage of thisBook.bookImages){
      bookImage.addEventListener('dblclick', function(event){
        event.preventDefault();
        bookImage.classList.toggle(bookImg.bookImage);
        const bookImageId = bookImage.getAttribute('data-id');
        if(favoriteBooks.includes(bookImageId)){
          const listFav = favoriteBooks;
          const idIndex = listFav.indexOf(bookImageId);
          listFav.splice(idIndex, 1);
        }
        else {
          favoriteBooks.push(bookImageId);
        }
        console.log(favoriteBooks);
      });
    }
  };

  makeView();
  initActions();
}

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
  
  const makeView = function(){    
  
    for(let book of dataSource.books) {      
      const thisBook = this;      
      const generatedHTML = templates.menuProduct(book);     
      thisBook.bookParams = utils.createDOMFromHTML(generatedHTML);
      const bookContainer = document.querySelector(select.containerOf.bookList);
      bookContainer.appendChild(thisBook.bookParams);  
    }   
  };
   
  makeView();
}

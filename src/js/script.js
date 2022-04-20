{
  'use strict';
  
  const select = {
    templateOf: {
      bookProduct: '#template-book', 
    },
    containerOf:{
      bookList: '.books-list',
    },
    element: {
      bookImage: 'book_image',
    },
    filters: '.filters',
  };
  
  const templates = {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.bookProduct).innerHTML),
  };
  
  const bookImg = {
    bookImage: 'favorite',
    hidden: 'hidden',
  };


  const filters = [];
  const favoriteBooks = [];

  class BooksList {
    constructor(id){

      const thisBook = this;
      thisBook.id = id;    

      thisBook.initData();
      thisBook.getElements();          
      thisBook.initActions();  
      thisBook.filterBooks();    
      thisBook.setRatingBackground();
    }

  
    initData(){
      const thisBook = this;
      thisBook.data = dataSource.books;
  
      for(let book of this.data) {
        const thisBook = this;

        book.ratingBackground = this.setRatingBackground(book.rating);
        book.ratingWidth = book.rating * 10;

        const generatedHTML = templates.menuProduct(book);
        thisBook.bookParams = utils.createDOMFromHTML(generatedHTML);
        const bookContainer = document.querySelector(select.containerOf.bookList);
        bookContainer.appendChild(thisBook.bookParams);
      }
    }
  
    getElements(){

      const thisBook = this;
  
      thisBook.container = document.querySelector(select.containerOf.bookList);
      thisBook.bookImages = thisBook.container.querySelectorAll(select.element.bookImage);
      thisBook.filter = document.querySelector(select.filters);
    }
  

    initActions() {
      const thisBook = this;       

  
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
        //console.log(favoriteBooks);
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
        //console.log(filters);
        }
        thisBook.filterBooks();        
      });
    }
                    
    filterBooks(){
      const books = dataSource.books;      
      const bookId = [];  

      for(let book of books){     
           
        let shouldBeHidden = false;
    
        for(let filter of filters) {
          if(!book.details[filter]) {
            shouldBeHidden = true;
            bookId.push(book.id);
            break;
          }
        }
     
        if(shouldBeHidden == true){        
          const bookImage = document.querySelector('[data-id="' + book.id + '"]');
          bookImage.classList.add(bookImg.hidden);        
        }  else if (shouldBeHidden == false){
          const bookImage = document.querySelector('[data-id="' + book.id + '"]');
          bookImage.classList.remove(bookImg.hidden); 
        }
      }
    }

    setRatingBackground(rating){
      let ratingBg = '';
      if(rating < 6){
        ratingBg = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if(rating > 6 && rating <= 8){
        ratingBg = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9){
        ratingBg = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if(rating > 9){
        ratingBg = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return ratingBg;
    }
  }
  //eslint-disable-next-line no-unused-vars
  const app = new BooksList();
}

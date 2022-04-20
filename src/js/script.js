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
    bookImage: 'favorite',
    hidden: 'hidden',
  };

  const makeView = function(){
    for(let book of dataSource.books) {
      const thisBook = this;

      book.ratingBackground = setRatingBackground(book.rating);
      book.ratingWidth = book.rating * 10;

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
        filterBooks();
      }
    });
  };

  const setRatingBackground = function(rating){
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
  };

  const filterBooks = function(){
    for(let book of dataSource.books){
      const bookId = [];
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
  };

  makeView();
  initActions();
}

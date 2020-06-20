// Общие скрипты
'use strict';
(() => {
  // ссылки на якорь
  let anchorlinks = document.querySelectorAll('a[href^="#"]')
   
  for (let item of anchorlinks) {  
      item.addEventListener('click', (e)=> {
          let hashval = item.getAttribute('href')
          let target = document.querySelector(hashval)
          target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          })
         
          history.pushState(null, null, hashval)
          e.preventDefault()
      })
  }

  // моб меню
  const burgerMenu = document.querySelector('.header__burger');
  const hideMenu = document.querySelector('.header__mobile-menu');
 
  const showMenu = (evt) => {
   hideMenu.classList.toggle("header__mobile-menu--active");
   burgerMenu.classList.toggle("active");

  };
  burgerMenu.addEventListener(`click`, showMenu, true);

  // слайдер
  let mySwiper = new Swiper('.swiper-container', {
    speed: 400,
    spaceBetween: 100,
    slidesPerView: 1,
    autoplay: true,
    speed: 580,
  });

  // отправка формы
  const form = document.querySelector('.form__main');
  if (!form) {
    return;
  }
  const ACTION_ATTRIBUTE = form.getAttribute('action'); // файл-обработчик

  const msg = form.querySelector('.form__callback');
  const SHOW_MSG_CLASS = 'show';

  if(msg.classList.contains(SHOW_MSG_CLASS)) {
    msg.classList.remove(SHOW_MSG_CLASS);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const ajaxSend = (formData) => {
      let dataForm = 'param=' + formData;
      fetch(ACTION_ATTRIBUTE, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // отправляемые данные
        },
        body: dataForm
      })
        .then(response => {
          msg.classList.add(SHOW_MSG_CLASS);
          return response.text()
        }).then(function(text){
          // console.log(text) //для вывода dump в php файле
        })
        .catch(error => console.error(error))
    };

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(document.forms.phone);
      let object = {};
      formData.forEach((value, key) => {
          if(!Reflect.has(object, key)){
              object[key] = value;
              return;
          }
          if(!Array.isArray(object[key])){
              object[key] = [object[key]];    
          }
          object[key].push(value);
      });
      ajaxSend(JSON.stringify(object));
      event.target.reset(); // очищаем поля формы
    });
  });
})();

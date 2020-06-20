'use strict';

(() => {
  let switchContainers = document.querySelectorAll('.switch');

  if (!switchContainers.length) {
    return;
  }

  let contentSwitch = function (container) {
    let tabs = container.querySelectorAll('[data-toggle="tab"]');
    if (!tabs.length) {
      return;
    }

    let tabContent = container.querySelectorAll('.js-tab-content');

    if (!tabContent.length) {
      return;
    }

    Array.prototype.forEach.call(tabs, function (tab) {
      tab.addEventListener('click', function (evt) {

        evt.preventDefault();

        let thisTarget = evt.target;
        let id = thisTarget.getAttribute('data-target');
        let content = container.querySelector('.js-tab-content' + id);
        let activeTrigger = container.querySelector('.switch__item--active');
        let activeContent = container.querySelector('.js-tab-content.active');

        activeTrigger.classList.remove('switch__item--active');
        tab.classList.add('switch__item--active');

        activeContent.classList.remove('active');
        content.classList.add('active');

      
      });
    });
  };

  Array.prototype.forEach.call(switchContainers, function (item) {
    contentSwitch(item);
  });
})();


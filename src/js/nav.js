import disableScroll from 'disable-scroll';
let container, cards, selectedCard, cardboxIsActive, columnCount;

export function initNav() {
  let nav = document.querySelector('.js-nav');
  let hamburger = document.querySelector('.js-hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', event => {
      if (hamburger.classList.contains('is-active')) {
        hamburger.classList.remove('is-active');
        nav.classList.remove('is-active');
        // Remove listener to re-enable scroll
        disableScroll.off();
      } else {
        hamburger.classList.add('is-active');
        nav.classList.add('is-active');
        // add listener to disable scroll
        disableScroll.on();
      }
    });
  }
}

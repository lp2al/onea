import scrollToElement from 'scroll-to-element';

let container, cards, selectedCard, cardboxIsActive, columnCount;

export function initCards() {
  if (document.querySelector('.js-cards') === null) {
    return false;
  }

  container = document.querySelector('.js-cards');
  cards = [...document.querySelectorAll('.js-card')];
  cardboxIsActive = false;

  // The number of columns displayed, used to determine last card in column
  columnCount = Math.round(container.clientWidth / cards[0].clientWidth);

  cards.forEach((key, index) => {
    // Assign each card an index number so we can reference it's position later.
    key.setAttribute('data-index', index);
    key.addEventListener('mouseover', cardMouseOver);
    key.addEventListener('mouseout', cardMouseOut);
    key.addEventListener('click', cardClick);
  });
}

function cardMouseOver() {
  focusCard(this, event);
}

function cardMouseOut() {
  if (!cardboxIsActive) {
    resetState();
  } else {
    this.classList.add('blur');
  }
}

function cardClick() {
  focusCard(this, event);
  selectedCard = this;

  // Do nothing if the selected card is already displayed.
  if (cardboxIsActive) {
    let cardbox = document.querySelector('.cardbox');
    if (cardbox.dataset.index === this.dataset.index) {
      return false;
    }
  }

  let target = isLastColumn(this) ? this : getLastColumn(this);
  insertCardbox(target, createCardBox(this.cloneNode(true)));
  updateUrl(this.dataset.url);
}

/**
 * Inserts the cardbox after target
 * @param {Object} target - The target to insert after
 * @param {Object} cardbox - The cardbox to be inserted
 */
function insertCardbox(target, cardbox) {
  if (cardboxIsActive) {
    document.querySelector('.cardbox').remove();
  }

  //Insert.
  target.parentNode.insertBefore(cardbox, target.nextSibling);

  //Add a small delay so that CSS animation is triggered after insertion.
  setTimeout(() => {
    cardbox.classList.add('expand');
    scrollTo(cardbox);
  }, 0);

  cardboxIsActive = true;
}

/**
 * Finds the next element that is at the end of the row, starting from the position of the clicked card.
 * @param {Number} pos - the position of the clicked card.
 * @returns {Object} - the HTMLElement that is at the end of the row.
 */
function getLastColumn(el) {
  // We don't care above previous elements
  let cardTmp = cards.slice(el.dataset.index);
  for (let el of cardTmp) {
    // Find last card in row, or last card.
    if (isLastColumn(el) || el === cardTmp[cardTmp.length - 1]) {
      return el;
    }
  }
}

/**
 * Create a close button.
 * @returns {Object} - The close button.
 */
function createCloseButton() {
  let closeButton = document.createElement('span');
  closeButton.classList.add('close');
  closeButton.addEventListener('click', closeCardBox);
  return closeButton;
}

/**
 * Create the cardbox, a lightbox displaying the card's details.
 * @param {Object} content - The contents to be inserted into cardbox.
 * @returns {Object} - The cardbox to be inserted.
 */
function createCardBox(content) {
  let cardbox = document.createElement('div'),
    copy = content.querySelector('.js-copy'),
    thumb = content.querySelector('.js-thumb');

  cardbox.className = 'cardbox';
  copy.className = 'cardbox__copy';
  thumb.className = 'cardbox__thumb';
  cardbox.setAttribute('data-index', content.dataset.index);
  cardbox.appendChild(copy);
  cardbox.appendChild(thumb);
  cardbox.appendChild(createCloseButton());

  return cardbox;
}

/**
 * Collapses and Removes the cardbox from DOM
 */
function closeCardBox() {
  if (cardboxIsActive) {
    let cardbox = document.querySelector('.cardbox');
    cardbox.classList.remove('expand');
    cardbox.addEventListener('transitionend', () => {
      cardbox.remove();
    });
    cardboxIsActive = false;
    resetState();
    updateUrl('/');
    scrollTo(selectedCard);
  }
}

/**
 * Scroll to desired element.
 * @param {Object} el - the HTMLelement to scroll to.
 */
function scrollTo(el) {
  //Favour jquery animation for animating scrollTop.
  //This works better when there is not enough document height for scrolling.
  if (typeof window.jQuery != 'undefined') {
    window.jQuery('html, body').animate({ scrollTop: window.jQuery(el).offset().top - 5 }, 500);
  } else {
    scrollToElement(el, {
      offset: -10,
      ease: 'linear',
      duration: 400
    });
  }
}

/**
 * Blurs every card that is NOT the target
 * @param {Object} target - The target HTMLelement to focus on
 * @param {String} className - The class name that will be added to target's class attribute (.selected)
 */
function focusCard(target, event) {
  target.classList.remove('blur');
  if (event.type === 'click') {
    target.classList.add('selected');
  }

  for (let card of cards) {
    if (card.dataset.index !== target.dataset.index) {
      card.classList.add('blur');
      if (event.type === 'click') {
        card.classList.remove('selected');
      }
    }
  }
}

/**
 * Checks to see if the card is in the last column.
 * @param {Object} el - The card/element to check.
 * @returns {Boolean} - True or undefined
 */
function isLastColumn(el) {
  if ((Number(el.dataset.index) + 1) % columnCount === 0) {
    return true;
  }
}

/**
 * Resets the cards to it's original state.
 */
function resetState() {
  for (let card of cards) {
    card.classList.remove('blur');
    if (card.classList.contains('selected')) {
      card.classList.remove('selected');
    }
  }
}

/**
 * Update URL
 * @param {Object} el - the HTMLelement to scroll to.
 */
function updateUrl(url) {
  history.pushState({}, '', url);
}

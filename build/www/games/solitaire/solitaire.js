'use strict';

window.addEventListener('load', function () {
  let content = document.createDocumentFragment();
  let top = document.createElement('div');
  let board = document.createElement('div');
  top.style.height = '20%';
  top.style.minHeight = '265px';

  let stockPile = document.createElement('septatrix-deck');
  let wastePile = document.createElement('septatrix-deck');
  let bottomPiles = [
    document.createElement('septatrix-deck'),
    document.createElement('septatrix-deck'),
    document.createElement('septatrix-deck'),
    document.createElement('septatrix-deck'),
    document.createElement('septatrix-deck'),
    document.createElement('septatrix-deck'),
    document.createElement('septatrix-deck')
  ];
  let bottomPilesOptions = {filter:
    function (elem, deck) {
      if (deck.isEmpty() && elem.rank === 'king') {
        return true;
      } else if (suitColor(deck.topCard.suit) !== suitColor(elem.suit) && compareRank(deck.topCard.rank, elem.rank) === 1) {
        return true;
      } else {
        return false
      };
    }
  }
  let acePiles = [
    document.createElement('septatrix-deck'),
    document.createElement('septatrix-deck'),
    document.createElement('septatrix-deck'),
    document.createElement('septatrix-deck')
  ];

  let cards = []
  for (let suit of ['hearts', 'diamonds', 'clubs', 'spades']) {
    for (let rank of ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace']) {
      let card = document.createElement('septatrix-card');
      card.suit = suit;
      card.rank = rank;
      cards.push(card);
    }
  }
  shuffle(cards);

  stockPile.addEventListener('click', () => {
    if (stockPile.topCard) wastePile.addCard(stockPile.topCard);
  });
  stockPile.addEventListener('cardAdded', e => e.detail.card.flipped = true);
  stockPile.addEventListener('cardRemoved', e => e.detail.card.flipped = false);
  stockPile.addEventListener('cardRemoved', e => {
    if (e.detail.cards === 0) {
      stockPile.addEventListener('click', function refill() {
        while (!wastePile.isEmpty()) {
          stockPile.addCard(wastePile.topCard);
        }
        stockPile.removeEventListener('click', refill);
      })
    }
  });
  wastePile.addEventListener('click', moveCards);
  stockPile.style.setProperty('--offset-bottom', '.35px')
  stockPile.style.position = 'absolute';
  stockPile.style.top = '0';
  stockPile.style.left = '0';
  wastePile.style.setProperty('--offset-bottom', '.35px')
  wastePile.style.position = 'absolute';
  wastePile.style.top = '0';
  wastePile.style.left = '100px';
  let bgCard = document.createElement('septatrix-card');
  bgCard.flipped = true;
  bgCard.setCardBack('img/playingCards/deck_empty.svg');
  stockPile.addBackground(bgCard);

  top.appendChild(stockPile);
  top.appendChild(wastePile);

  for (let deck in acePiles) {
    acePiles[deck].style.position = 'absolute';
    acePiles[deck].style.top = '0';
    acePiles[deck].style.left = `calc(100% / 7 * (${deck} + 3))`;
    acePiles[deck].configureOptions(
      {filter:
        function (elem, pile) {
          if (pile.isEmpty() && elem.rank === 'ace' && elem.suit === ['hearts', 'diamonds', 'clubs', 'spades'][deck]) {
            return true;
          } else if (!pile.isEmpty() && (compareRank(pile.topCard.rank, elem.rank) === -1) && pile.topCard.suit === elem.suit) {
            return true;
          } else {
            return false;
          }
        }
      }
    )
    let bgCard = document.createElement('septatrix-card');
    bgCard.rank = 'ace';
    bgCard.suit = ['hearts', 'diamonds', 'clubs', 'spades'][deck];
    bgCard.style.opacity = .5;
    acePiles[deck].addBackground(bgCard);
    acePiles[deck].addEventListener('click', moveCards)
    top.appendChild(acePiles[deck]);
  }
  content.appendChild(top);

  for (let deck in bottomPiles) {
    for (var i = 0; i <= deck; i++) {
      bottomPiles[deck].addCard(cards.pop());
      bottomPiles[deck].topCard.flipped = true;
    }
    bottomPiles[deck].topCard.flipped = false;
    bottomPiles[deck].configureOptions(bottomPilesOptions);
    bottomPiles[deck].style.position = 'absolute';
    bottomPiles[deck].style.left = `calc(100% / 7 * ${deck})`;
    let bgCard = document.createElement('septatrix-card');
    bgCard.flipped = true;
    bgCard.setCardBack('img/playingCards/deck_empty.svg');
    bottomPiles[deck].addBackground(bgCard);
    bottomPiles[deck].addEventListener('click', moveCards);
    bottomPiles[deck].addEventListener('click', function() {this.topCard.flipped = false;});
    board.appendChild(bottomPiles[deck]);
  }

  for (let card of cards) {
    stockPile.addCard(card);
  }

  content.appendChild(board);
  document.getElementById('game').appendChild(content);


  function moveCards() {
    if (document.getElementsByClassName('selected').length === 0 ||
    document.getElementsByClassName('selected')[0] === this) {
      this.classList.toggle('selected');
      /*} else if (document.getElementsByClassName('selected')[0].isEmpty() &&
      !Array.from(acePiles).includes(document.getElementsByClassName('selected')[0])) {
      document.getElementsByClassName('selected')[0].classList.remove('selected');*/
    } else if (document.getElementsByClassName('selected')[0] === wastePile) {
      this.addCard(wastePile.topCard);
      document.getElementsByClassName('selected')[0].classList.remove('selected');
      this.classList.remove('selected');
    } else if (this  === wastePile) {
      document.getElementsByClassName('selected')[0].addCard(wastePile.topCard);
      document.getElementsByClassName('selected')[0].classList.remove('selected');
      this.classList.remove('selected');
    } else if (document.getElementsByClassName('selected')[0].isEmpty()) {
      for (let cardA of Array.from(this.cards).filter(elem => !elem.flipped)) {
        document.getElementsByClassName('selected')[0].addCard(cardA);
      }
      document.getElementsByClassName('selected')[0].classList.remove('selected');
      this.classList.remove('selected');
    } else if (this.isEmpty()) {
      for (let cardA of Array.from(document.getElementsByClassName('selected')[0].cards).filter(elem => !elem.flipped)) {
        this.addCard(cardA);
      }
      document.getElementsByClassName('selected')[0].classList.remove('selected');
      this.classList.remove('selected');
    } else {
      for (let cardA of Array.from(document.getElementsByClassName('selected')[0].cards).filter(elem => !elem.flipped)) {
        this.addCard(cardA);
      }
      document.getElementsByClassName('selected')[0].classList.remove('selected');
      this.classList.remove('selected');
    }
  }
})

function suitColor(suit) {
  return {
    spades: 'black',
    diamonds: 'red',
    hearts: 'red',
    clubs: 'black'
  }[suit];
}
function shuffle(array) {
  for (var i = array.length-1; i > 1; i--) {
    let j = Math.floor(Math.random()*(i));
    let tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
  return array;
}
function compareRank(a, b) {
  let ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
  return ranks.indexOf(a) - ranks.indexOf(b);
}

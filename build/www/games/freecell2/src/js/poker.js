const Poker = (function() {

  function Poker () {
    this.deckCards = new Array(52)
    this.init()
  }

  Poker.prototype.init = function() {
    for (let i = 0, cardsLen = this.deckCards.length; i < cardsLen; i++) {
      let sIndex = Math.floor(i / 13)
      let nIndex = i % 13
      let card = new Card(Card.SUITS[sIndex], Card.VALUE[nIndex])
      this.deckCards[i] = card
    }
  }

  Poker.prototype.shuffle = function() {
    let shuffleDeckCards = []
    let totalCards = 0, len = this.deckCards.length

    do {
      let sIndex = Math.floor(Math.random() * len)
      let target = this.deckCards[sIndex]

      if (!target) {
        continue
      }
      
      shuffleDeckCards[totalCards] = target
      this.deckCards[sIndex] = null
      totalCards++

    } while (totalCards < len)

    return shuffleDeckCards
  }

  return Poker
})()
(function (p) {
  function freeCellGame () {
    const freeCell = {
      /** bottom */
      shuffle: [[], [] ,[] ,[] ,[] ,[] ,[], []],
      /** top left */
      free: [[], [] ,[], []],
      /** top right */
      suited: [[], [] ,[], []]
    }
    /** temp record DnD data status */
    const dndCards = {
      drag: {},
      drop: {},
      totalCards: []
    }
    let currentDropTarget = null
    /** timer */
    let timer = null

    init()

    function init () {
      const poker = new Poker()
      deal(poker.shuffle())
      timer = startTimer()
      const containerEle = document.querySelector('.main-container')
      containerEle.addEventListener('mousedown', mouseDown)
    }
  
    function deal (deckCards) {
      // let totalCol = currentCol = lastCol = shuffleCol = 0
      let shuffleCol = -1
      const shuffleDecks = freeCell.shuffle
      const isFill = function () {
        if (shuffleCol < 4) {
          return shuffleDecks[shuffleCol].length >= 7
        } else {
          return shuffleDecks[shuffleCol].length >= 6
        }
      }
      deckCards.forEach((card) => {
        // currentCol = totalCol

        do {
          shuffleCol = Math.floor(Math.random() * 8)

          if (!shuffleDecks[shuffleCol]) {
            shuffleDecks[shuffleCol] = []
          }
        } while (isFill())
        
        shuffleDecks[shuffleCol].push(card)
      })

      renderCards()
    }

    function renderCards () {
      const decksContainer = document.getElementById('tableauPiles')
      freeCell.shuffle.forEach((deck, deckIndex) => {
        const deckContainer = document.querySelectorAll('.free-cell__tableau-pile')[deckIndex]
        deck.forEach((card, cardIndex) => {
          const cardEle = document.createElement('div')
          // cardEle.classList.add('free-cell__cell', 'card')
          cardEle.classList.add('card')
          cardEle.dataset.cardSuit = card.suit
          cardEle.dataset.cardNumber = card.number
          cardEle.dataset.cardIndex = cardIndex
          cardEle.dataset.dnd = 'drag'
          // cardEle.draggable = true
          cardEle.innerHTML = `
            <img src='./src/assets/images/${card.suit}_${card.number}.png' />
          `
          setTimeout(() => {
            cardEle.style.top = cardIndex * 50 + 'px'
            cardEle.style.opacity = '1'
          }, deckIndex * cardIndex * 30)

          deckContainer.appendChild(cardEle)
        })

        // decksContainer.appendChild(deckContainer)
      })
    }

    function checkFreeCellRule (cards, type = 'shuffle', isSuited = false) {
      if (type === 'free' && cards.length > 2) {
       return false
      }

      for (let i = 0, len = cards.length; i < len; i++) {
        const pre = cards[i]
        const next = cards[i + 1]

        if (!next) {
          return true
        }

        const suitedRule = isSuited ? pre.getSuitValue() == next.getSuitValue() : pre.getSuitValue() + next.getSuitValue() != 5
        // descending or ascending
        const order = isSuited ? pre.getNumberValue() + 1 == next.getNumberValue() : pre.getNumberValue() == next.getNumberValue() + 1
 
        if (suitedRule && order) {
          continue
        } else {
          return false
        }
      }

      return true
    }

    function startTimer () {
      let currentSec = 0
      const minEle = document.getElementById('timeMin')
      const secEle = document.getElementById('timeSec')
      return (function () {
        const timer = setInterval(() => {
          currentSec++
          const sec = (currentSec % 60)
          const min = Math.floor(currentSec / 60)
          secEle.innerText = sec < 10 ? `0${sec}` : sec
          minEle.innerText = min < 10 ? `0${min}` : min
        }, 1000)
  
        return timer
      })()
    }

    let target = null
    let shiftX = shiftY = 0
    // let isDraggedStart = false
    function mouseDown (e) {
      console.log(e.type, e)
      // ?
      target = e.target.closest('[data-dnd="drag"]')

      if (!target) {
        return false
      }

      recordDnD(target, 'drag')

      if (!checkFreeCellRule(dndCards.drag.cards, 'shuffle')) {
        return false
      }

      const draggedBoxEle = document.getElementById('draggedBox')
      // target.style.zIndex = 1000
      // target.style.transition = 'none'
      shiftX = e.clientX - target.getBoundingClientRect().left
      shiftY = e.clientY - target.getBoundingClientRect().top
      // document.body.append(target)
      draggedBoxEle.style.zIndex = 1000
      const draggedContainerEle = document.querySelector(`[data-type="shuffle"][data-cell="${dndCards.drag.deckIndex}"]`)
      dndCards.drag.cards.forEach((card, index) => {
        const s = card.suit
        const n = card.number
        const draggedEle = draggedContainerEle.querySelector(`[data-card-suit="${s}"][data-card-number="${n}"]`)
        draggedEle.style.transition = 'none'
        draggedBoxEle.appendChild(draggedEle)
        const x = e.clientX
        const y = e.clientY + index * 50
        doMove(draggedEle, x, y)
      })

      // isDraggedStart = true
      
      document.addEventListener('mousemove', mouseMove)
      document.addEventListener('mouseup', mouseUp)
    }

    const draggedBoxEle = document.getElementById('draggedBox')
    function mouseMove (e) {
      /** reCalc every dragged cards position */
      dndCards.drag.cards.forEach((card, index) => {
        const s = card.suit
        const n = card.number
        const draggedEle = draggedBoxEle.querySelector(`[data-card-suit="${s}"][data-card-number="${n}"]`)
        const x = e.clientX
        const y = e.clientY + index * 50
        doMove(draggedEle, x, y)
      })

      /** find the droppable area */
      draggedBoxEle.hidden = true
      getDropTarget(e.clientX, e.clientY)
      draggedBoxEle.hidden = false
    }

    function doMove (target, x, y, isShift = true) {
      /** 
       * shift used for mouse move, instead of mouse up,
       * so used `isShift` to control
       */
      if (!isShift) {
        shiftX = shiftY = 0
      }

      target.style.left = x - shiftX + 'px'
      target.style.top = y - shiftY + 'px'
    }

    function mouseUp (e) {
      console.log(e.type, e)
      recordDnD(currentDropTarget, 'drop')
      
      const dropType = currentDropTarget.dataset.type
      const isSuited = dropType !== 'shuffle'
      const isPass = checkFreeCellRule(dndCards.totalCards, dropType, isSuited)
      if (isPass) {
        console.log('true')
        /** add and remove data to/from array */
        const fromDeck = freeCell[dndCards.drag.from]
        const toDeck = freeCell[dndCards.drop.from]
        const removeIndex = dndCards.drag.cardIndex
        fromDeck[dndCards.drag.deckIndex].splice(removeIndex)
        toDeck[dndCards.drop.deckIndex].push(...dndCards.drag.cards)
      } else {
        console.log('false', target)
        /** reset `recordDnD` for rollback cards to original place */
        recordDnD(target, 'drop')
      }

      /** add drop transition */
      const draggedBoxEle = document.getElementById('draggedBox')
      // const droppedContainerEle = document.getElementById(dndCards.drop.from)
      dndCards.drag.cards.forEach((card, index) => {
        const s = card.suit
        const n = card.number
        const draggedEle = draggedBoxEle.querySelector(`[data-card-suit="${s}"][data-card-number="${n}"]`)
        // .is-dropped
        draggedEle.style.transition = 'all .3s linear'

        if (!isPass) {
          currentDropTarget = document.querySelector(`[data-type="${dndCards.drop.from}"][data-cell="${dndCards.drop.deckIndex}"]`)
        }

        currentDropTarget.appendChild(draggedEle)
        
        let x = y = 0
        if(dndCards.drop.from === 'shuffle') {
          x = 0
          y = (currentDropTarget.children.length - 1) * 50
        } else {
          x = 0
          y = 0
        }

        doMove(draggedEle, x, y, false)
        // const x = e.clientX
        // const y = e.clientY + index * 50
        // doMove(draggedEle, x, y)
      })

      /** reset data */
      currentDropTarget = null
      dndCards.drag = {}
      dndCards.drop = {}
      dndCards.totalCards = []

      document.removeEventListener('mousemove', mouseMove)
      document.removeEventListener('mousemove', mouseUp)
    }

    function recordDnD (target, action) {
      console.log(action, target)
      const isRollback = target === dndCards.drag.mouseTarget
      if (isRollback) {
        dndCards.drop = dndCards.drag
        return
      }
      // const parent = isRollback ? : target.dataset.type ? target : target.parentElement
      const parent = target.dataset.type ? target : target.parentElement
      dndCards[action].mouseTarget = target
      // dndCards[action].from = isRollback ? dndCards.drag.from : (target.dataset.type || target.parentElement.dataset.type)
      dndCards[action].from = target.dataset.type || target.parentElement.dataset.type
      dndCards[action].rect = {
        left: isRollback ? dndCards.drag.rect.left : (parseInt(target.style.left) || 0),
        top: isRollback ? dndCards.drag.rect.top : (parseInt(target.style.top) || 0)
      }
      
      const dragDecks = freeCell[dndCards.drag.from]
      const dropDecks = freeCell[dndCards.drop.from]

      dndCards[action].deckIndex = parseInt(parent.dataset.cell)
      dndCards[action].cardIndex = (action === 'drag') ? parseInt(target.dataset.cardIndex) : dropDecks[dndCards[action].deckIndex].length ? dropDecks[dndCards[action].deckIndex].length - 1 : 0
      
      dndCards.drop.cards = dndCards.drop.cards || []
      dndCards.drag.cards =  dndCards.drag.cards || []
      if (currentDropTarget) {
        let dropArray = dropDecks[dndCards.drop.deckIndex].slice(dndCards.drop.cardIndex)
        let dragArray = dragDecks[dndCards.drag.deckIndex].slice(dndCards.drag.cardIndex)
        // dndCards.cards = dropArray.concat(dndCards.cards)
        // dndCards[action].card = dropArray.concat(dragArray)
        dndCards[action].cards = dropDecks[dndCards.drop.deckIndex].slice(dndCards.drop.cardIndex)
      } else {
        dndCards[action].cards = dragDecks[dndCards.drag.deckIndex].slice(dndCards.drag.cardIndex)
      }

      dndCards.totalCards = dndCards.drop.cards.concat(dndCards.drag.cards)
    }

    function getDropTarget (x, y) {
      const mouseTargetEle = document.elementFromPoint(x, y)
      if (!mouseTargetEle) return

      currentDropTarget = mouseTargetEle.closest('[data-dnd="drop"]')
    }
  }

  freeCellGame()

})(Poker)

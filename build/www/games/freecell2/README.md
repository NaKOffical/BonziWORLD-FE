## This is a week two project from [https://challenge.thef2e.com/](https://challenge.thef2e.com/)

### FreeCell
* Vanilla JavaScript
* Pure CSS
* Implement drap and drop function with mouse events

### Workflow
1. mousedown
  - record ondraggedCard (dndCards)
    - drag
      - from (freeCell, foundations, tableauPiles)
      - (mouse target) rect (top, left)
      - deckIndex
      - cardIndex
      - cards (dndCards)
  - check card dragged rule (array, boolean)
    - true
      <!-- - array
      - reflow dom -->
    - false
      - return (stop mouse event)
  - remove class style

2. mousemove
  - check/set mouse target area is dropped area (area)
    - record currentDropTarget
  - hightlight ?

3. mouseup
  - record ondroppedCard to drop area
    - drop
      - from (freeCell, foundations, tableauPiles)
      - rect
      - deckIndex
      - cardIndex
  - check card dragged rule (array, boolean)
    - true
      - array
      - reflow dom
      - record Undo (dndCards)
      - reset dndCards
    - false
      - record ondroppedCard to original area
      - reflow dom
      - reset dndCards
  - add class style (transition) ?

* check card dragged rule
  - mousedown step
    - mouse target card to last card
  - mouseup step
    - mouse target to another area card
  - parameter
    - type array
  - return boolean





















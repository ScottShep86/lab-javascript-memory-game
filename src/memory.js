class MemoryGame {
  constructor(cards) {
    this.cards = cards;
    // add the rest of the class properties here
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
  }

  shuffleCards() {
    // ... write your code here
    if (this.cards)
      // Loop through the array starting from the last index:
      for (let i = this.cards.length - 1; i > 0; i--) {
        // Save a copy of the item at the position you are currently looping:
        const copyOfItemAtPositionBeingLooped = this.cards[i];
    
        // Select a random index position:
        const randomlySelectedPosition = Math.floor(Math.random() * (i + 1));
    
        // === The swapping takes place in the two statements below ===
        // Replace the item at the position you are currently looping with the one at the randomlySelectedPosition:
        this.cards[i] = this.cards[randomlySelectedPosition];
    
        // Replace the item at the randomlySelectedPosition with the copyOfItemAtPositionBeingLooped:
        this.cards[randomlySelectedPosition] = copyOfItemAtPositionBeingLooped;
      }
    
      // Output the shuffled array:
      return this.cards;
    }

  checkIfPair(card1, card2) {
    // ... write your code here
    this.pairsClicked +=1; 

    if (card1 === card2) {
      this.pairsGuessed += 1;
      return true;
    } else {
      this.pairsGuessed;
      return false;
    };
  }

  checkIfFinished() {
    // ... write your code here
    if (this.pairsGuessed === this.cards.length / 2) {
      return true;
    } else {
    return false;
    };

  }
}
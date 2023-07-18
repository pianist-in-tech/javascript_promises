document.addEventListener('DOMContentLoaded', function() {
    let baseURL = 'https://deckofcardsapi.com/api/deck';
  
    // 1.
    async function part1() {
      let data = await axios.get(`${baseURL}/new/draw/`);
      let { suit, value } = data.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    }
  
    // 2.
    async function part2() {
      let firstCardData = await axios.get(`${baseURL}/new/draw/`);
      let deckId = firstCardData.deck_id;
      let secondCardData = await axios.get(`${baseURL}/${deckId}/draw/`);
      [firstCardData, secondCardData].forEach(card => {
        let { suit, value } = card.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
      });
    }
  
    // 3.
    async function setup() {
        let button = document.querySelector('button');
        let cardArea = document.querySelector('#card-area');
      
        let deckData = await axios.get(`${baseURL}/new/shuffle/`);
        button.style.display = 'block';
        button.addEventListener('click', async function() {
          let cardData = await axios.get(`${baseURL}/${deckData.data.deck_id}/draw/`);
          let cardSrc = cardData.data.cards[0].image;
          let angle = Math.random() * 90 - 45;
          let randomX = Math.random() * 40 - 20;
          let randomY = Math.random() * 40 - 20;
      
          let img = document.createElement('img');
          img.src = cardSrc;
          img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`;
      
          cardArea.appendChild(img);
      
          if (cardData.data.remaining === 0) {
            button.remove();
          }
        });
      }
      
      setup();
      
  });
  
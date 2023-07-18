document.addEventListener('DOMContentLoaded', function() {
    let baseURL = 'https://deckofcardsapi.com/api/deck';
  
    // 1.Request a single card from a newly shuffled deck. 
    axios.get(`${baseURL}/new/draw/`).then(data => {
      console.log (data)
      let { suit, value } = data.data.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });
  
    // 2. Request a single card from a newly shuffled deck. 
    let firstCard = null;
    axios.get(`${baseURL}/new/draw/`)
      .then(data => {
        firstCard = data.data.cards[0];
        let deckId = data.data.deck_id;
        return axios.get(`${baseURL}/${deckId}/draw/`);
      })
      .then(data => {
        let secondCard = data.data.cards[0];
        [firstCard, secondCard].forEach(function(card) {
          console.log(
            `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
          );
        });
      });
  
    // 3.Handle button clicking to display a new card. 
    let deckId = null;
    let button = document.querySelector('button');
    let cardArea = document.querySelector('#cards');
  
    axios.get(`${baseURL}/new/shuffle/`).then(data => {
      deckId = data.data.deck_id;
      button.style.display = 'block';
    });
      button.addEventListener('click', function() {
        axios.get(`${baseURL}/${deckId}/draw/`)
            .then(data => {
            let cardSrc = data.data.cards[0].image;
            console.log(data)
            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
    
            let img = document.createElement('img');
            img.src = cardSrc;
            img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`;
    
            cardArea.appendChild(img);
    
            if (data.remaining === 0) {
              button.remove();
            }
          })
          .catch(error => {
            console.error('Error occurred:', error);
          });
      });
    }); 
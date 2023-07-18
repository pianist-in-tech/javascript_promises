let favoriteNumber = 8;
let baseURL = "http://numbersapi.com";

// 1.Get a fact about my favorite number.
axios.get(`${baseURL}/${favoriteNumber}?json`)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

// 2.Get data on multiple numbers in a single requets. 
let favoriteNumbers = [99, 3, 14];
axios.get(`${baseURL}/${favoriteNumbers}?json`).then(data => {
  console.log(data);
});

// 3.Get 4 facts on my favorite number. 
Promise.all(
  Array.from({ length: 4 }, () => {
    return axios.get(`${baseURL}/${favoriteNumber}?json`);
  })
)  .then(facts => {
  facts.forEach(data => {
    let paragraph = document.createElement('p');
    paragraph.textContent = data.data.text;
    document.body.appendChild(paragraph);
  });
})


let favoriteNumber = 5;
let baseURL = "http://numbersapi.com";

// 1. 
async function part1() {
  let data = await axios.get(`${baseURL}/${favoriteNumber}?json`);
  console.log(data);
}
part1();

// 2.
const favNumbers = [7, 11, 22];
async function part2() {
  let data = await axios.get(`${baseURL}/${favNumbers}?json`);
  console.log(data);
}
part2();

// 3.
async function part3() {
    let facts = await Promise.all(
      Array.from({ length: 4 }, () => axios.get(`${baseURL}/${favoriteNumber}?json`))
    );
    facts.forEach(data => {
      let paragraph = document.createElement('p');
      paragraph.textContent = data.data.text;
      document.body.appendChild(paragraph);
    });
  }
part3();

console.log("Client side javascript is loded!");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...'
    fetch(`http://localhost:3000/weather?address=${location}`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            if(data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {
                messageOne.textContent = data.location.toUpperCase();
                messageTwo.textContent = `${data.weather_descriptions[0]}. The temperature is ${data.temperature} degree farenheit.`
            }
        })
        .catch(err => {
            console.log(err)
        });
})
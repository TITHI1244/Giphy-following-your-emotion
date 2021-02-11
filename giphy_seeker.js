const gifTopic = document.getElementById("gif-topic");
const noOfGif = document.getElementById("gif-number");
let limit = "";
function setTheLimit(event) {
    let userInput = event.target.value;
    limit = (noOfGif === "") ? 25 : parseInt(userInput);
}
let userInput = "";
function onChange(event) {
    userInput = event.target.value;
}
gifTopic.addEventListener("input", onChange);
noOfGif.addEventListener("input", setTheLimit);
let images = [];

function slideShow() {
    images.forEach((image, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("carousel-item");
        document.getElementsByClassName("carousel-inner")[0].appendChild(itemDiv);
        const imageElement = document.createElement("img");
        imageElement.setAttribute("src", image);
        itemDiv.appendChild(imageElement);

        const liElement = document.createElement("li");
        liElement.setAttribute("data-target", document.getElementById("carousel-div"));
        liElement.setAttribute("data-slide-to", index);
        document.getElementsByClassName("carousel-indicators")[0].appendChild(liElement);
    })
    document.getElementsByClassName("carousel-item")[0].classList.add("active");
    document.getElementsByTagName("li")[0].classList.add("active");
    $('#carousel-div').carousel();
}

function getTheGif() {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=0amYlv8K1cFW1zpTSWkJiMdd7OUueNSt&q=${userInput}&limit=${limit}&offset=0&rating=g&lang=en`)
    .then(response => response.json())
    .then(apiData => (apiData.data.map(item => 
        {
            images.push(item.images.original.url);
        })))
    .then(slideShow);
}
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", getTheGif);
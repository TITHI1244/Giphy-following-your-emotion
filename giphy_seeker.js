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

function getTheGif() {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=0amYlv8K1cFW1zpTSWkJiMdd7OUueNSt&q=${userInput}&limit=${limit}&offset=0&rating=g&lang=en`)
    .then(response => response.json())
    .then(apiData => (apiData.data.map(item => 
        {
            const imgDiv = document.createElement("div");
            imgDiv.setAttribute("class", "imageDivs");
            const giphyImage = document.createElement("img");
            giphyImage.setAttribute("src", item.images.original.url);
            imgDiv.appendChild(giphyImage);
            document.body.appendChild(imgDiv);
        })));
}
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", getTheGif);
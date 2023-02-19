const controlLeftEl = document.getElementById("control-left");
const controlRightEl = document.getElementById("control-right");
const quoteTitleEl = document.getElementById("quote-title");
const quoteTextEl = document.getElementById("quote-text");
const quoteInfoEl = document.getElementById("quotes-info");
const apiURL = "https://type.fit/api/quotes";
const data = {
    quotes: [],
    currentQuote: null
}

window.addEventListener("load", () => fetchQuotes());

async function sendRequest () {
    const response = await fetch(apiURL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    
    return await response.json();
}

async function fetchQuotes () {
    const fetchedQuotes = shuffleArray(await sendRequest());
    
    for (let i = 0; i < fetchedQuotes.length; i++) {
        const quote = fetchedQuotes[i];
        quote.number = i + 1;
        data.quotes.push(quote);
    }

    if (!data.currentQuote) {
        data.currentQuote = data.quotes[0];
    }

    loadHTML();
}

function loadHTML () {    
    quoteTitleEl.textContent = data.currentQuote.author || "Unknown";
    quoteTextEl.textContent = data.currentQuote.text;
    quoteInfoEl.textContent = `Quote ${data.currentQuote.number} of ${data.quotes.length}`;
}

function shuffleArray (array) {
    return array.sort(() => Math.random() - 0.5);
}

function getRandomHexColor () {
    const hexDecimal = Math.ceil(Math.random() * 16777215);
    return "#" + hexDecimal.toString(16);
}

function selectQuote (quoteIdx) {
    if (data.quotes[quoteIdx]) {
        data.currentQuote = data.quotes[quoteIdx];
        loadHTML();
    }
}

controlLeftEl.addEventListener("click", () => {
    let quoteIdx = data.currentQuote.number - 1;
    if (!data.quotes[quoteIdx - 1]) quoteIdx = data.quotes.length;
    selectQuote(quoteIdx - 1);
});

controlRightEl.addEventListener("click", () => {
    let quoteIdx = data.currentQuote.number - 1;
    if (!data.quotes[quoteIdx + 1]) quoteIdx = -1;
    selectQuote(quoteIdx + 1);
});
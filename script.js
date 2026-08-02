let allQuotes = [];
let count = 0;

const backgrounds = [
    "https://picsum.photos/500/700?random=1",
    "https://picsum.photos/500/700?random=2",
    "https://picsum.photos/500/700?random=3",
    "https://picsum.photos/500/700?random=4",
    "https://picsum.photos/500/700?random=5"
];

// Load Quotes from API
async function loadQuotes() {

    try {

        const response = await fetch("https://dummyjson.com/quotes");
        const data = await response.json();

        allQuotes = data.quotes;

        showQuote();

    } catch (error) {

        document.getElementById("quote").textContent =
            "Unable to load quotes.";

        console.error(error);

    }

}

// Show Random Quote
function showQuote() {

    if (allQuotes.length === 0) return;

    const randomQuote =
        allQuotes[Math.floor(Math.random() * allQuotes.length)];

    const randomBg =
        backgrounds[Math.floor(Math.random() * backgrounds.length)];

    document.getElementById("quote").textContent =
        randomQuote.quote;

    document.getElementById("author").textContent =
        "- " + randomQuote.author;

    document.getElementById("quoteCard").style.backgroundImage =
        `url(${randomBg})`;

    document.getElementById("quoteCard").style.backgroundSize =
        "cover";

    document.getElementById("quoteCard").style.backgroundPosition =
        "center";

    count++;

    document.getElementById("counter").textContent =
        "Quotes Viewed: " + count;

}

// Download Quote Card
function downloadCard() {

    html2canvas(document.getElementById("quoteCard"), {
        useCORS: true
    }).then(function (canvas) {

        const link = document.createElement("a");

        link.download = "QuoteVerse.png";

        link.href = canvas.toDataURL("image/png");

        link.click();

    });

}

// Share Quote Card
async function shareImage() {

    try {

        const canvas = await html2canvas(
            document.getElementById("quoteCard"),
            {
                useCORS: true
            }
        );

        canvas.toBlob(async function (blob) {

            if (!blob) return;

            const file = new File(
                [blob],
                "QuoteVerse.png",
                {
                    type: "image/png"
                }
            );

            if (
                navigator.canShare &&
                navigator.canShare({ files: [file] })
            ) {

                await navigator.share({

                    title: "QuoteVerse",

                    text: "🌿 Daily Inspiration",

                    files: [file]

                });

            } else if (navigator.share) {

                await navigator.share({

                    title: "QuoteVerse",

                    text: document.getElementById("quote").textContent

                });

            } else {

                alert("Sharing is not supported on this browser.");

            }

        });

    } catch (error) {

        console.error(error);

    }

}

// Button Events
document.getElementById("newQuoteBtn")
    .addEventListener("click", showQuote);

document.getElementById("downloadBtn")
    .addEventListener("click", downloadCard);

document.getElementById("shareBtn")
    .addEventListener("click", shareImage);

// Load First Quote
loadQuotes();

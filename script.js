let allQuotes = [];

let count = 0;

const backgrounds = [

"https://picsum.photos/500/700?random=1",
"https://picsum.photos/500/700?random=2",
"https://picsum.photos/500/700?random=3",
"https://picsum.photos/500/700?random=4",
"https://picsum.photos/500/700?random=5"

];

async function loadQuotes(){

    try{

        const response =
        await fetch(
        "https://dummyjson.com/quotes"
        );

        const data =
        await response.json();

        allQuotes =
        data.quotes;

        showQuote();

    }catch(error){

        document.getElementById("quote")
        .innerHTML =
        "Unable to load quotes.";

        console.log(error);
    }
}

function showQuote(){

    if(allQuotes.length===0)
    return;

    const randomQuote =
    Math.floor(
    Math.random() *
    allQuotes.length
    );

    const randomBg =
    Math.floor(
    Math.random() *
    backgrounds.length
    );

    const quote =
    allQuotes[randomQuote];

    document.getElementById("quote")
    .innerHTML =
    quote.quote;

    document.getElementById("author")
    .innerHTML =
    "- " +
    quote.author;

    document.getElementById("quoteCard")
    .style.backgroundImage =
    `url(${backgrounds[randomBg]})`;

    count++;

    document.getElementById("counter")
    .innerHTML =
    "Quotes Viewed: " + count;
}

function downloadCard(){

    html2canvas(
    document.getElementById("quoteCard"))
    .then(function(canvas){

        let link =
        document.createElement("a");

        link.download =
        "Jatin-Inspiration.png";

        link.href =
        canvas.toDataURL();

        link.click();
    });
}

async function shareImage(){

    const card =
    document.getElementById("quoteCard");

    html2canvas(card)
    .then(function(canvas){

        canvas.toBlob(async function(blob){

            const file =
            new File(
            [blob],
            "Jatin-Inspiration.png",
            {
                type:"image/png"
            });

            if(
                navigator.canShare &&
                navigator.canShare({
                    files:[file]
                })
            ){

                await navigator.share({

                    title:
                    "Jatin's Daily Inspiration",

                    text:
                    "🌿 Daily Motivation",

                    files:[file]

                });

            }else{

                alert(
                "Image sharing not supported on this browser."
                );
            }

        });

    });
}

loadQuotes();
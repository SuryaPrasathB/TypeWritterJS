const paragraphs = [
    "The quick brown fox swiftly jumped over the lazy dog, while bright stars twinkled in the midnight sky. Suddenly, a gentle breeze whispered through the trees, carrying the scent of fresh rain. Nearby, a curious cat watched with wide eyes, its tail flicking back and forth. Across the street, bicycles raced down the hill, their wheels spinning rapidly on the smooth pavement. The distant hum of a train echoed in the background, fading as the sun began to rise. A new day was about to begin, full of unexpected adventures and surprises.",
    "Banana chair sunset paper blanket whisper clock orange silver thunder rocket coffee window pencil glass ladder melody jump. Zebra bubble grass river mirror apple mountain rainbow toaster firecracker button starfish curtain balloon notebook table dragon. Elephant jelly mountain whistle butterfly raindrop suitcase keyboard cactus volcano crystal cloud bench basket guitar.",
    "Candle popcorn flower spoon giraffe shadow hammer blanket sunrise cloud ocean tiger book fork clock tulip spaceship. Strawberry lion umbrella jellyfish tractor guitar blueberry stone lightning camera windmill garden bicycle eagle comet rose. Snowflake laptop jacket dragon fruit kitten whistle suitcase crocodile balloon moonlight butterfly marble spoon river forest calendar.",
    "Pillow notebook leaf pepper violin zebra ladder mountain blanket curtain starfish jelly ocean bubble cactus storm. Camera suitcase monkey rainbow fountain coconut kite elephant watermelon dragonfly whistle pancake cloud ladder star firecracker mirror. Bicycle umbrella chair feather butterfly popcorn window apple toaster laptop giraffe raindrop coin notebook river telescope.",
    "Cupcake fence camera cloud violin popcorn kitten feather pillow brick rainbow suitcase rocket pebble sandwich flower. Turtle window toaster keyboard jungle comet whistle teapot snowflake river boat eagle jellyfish pencil zebra blanket candle. Clock bubble apple butterfly mirror hammer dragonfly moon tiger cupcake shadow lantern sunflower suitcase guitar spoon.",
    "Bicycle whistle dolphin brick moonlight pancake river jacket feather camera blueberry ladder popcorn keyboard firefly butterfly. Coconut turtle starfish snow globe jelly pepper dragon rocket flower sunset cactus elephant star spoon blanket violin. Thunder rainbow pencil piano kitten notebook volcano chair eagle firecracker window hammer suitcase butterfly fountain clock.",
    "Feather clock apple kite moonlight sandwich dragon thunder camera cupcake raindrop bicycle stone river spoon. Snowflake cactus lantern mirror zebra toaster flower piano crystal monkey pencil cloud rocket strawberry mountain chair bench. Violin suitcase butterfly whistle rainbow star elephant bench dragonfly cloud jellyfish hammer bubble firecracker garden crocodile.",
    "Zebra whistle sandwich pebble dolphin mountain keyboard apple tiger chair jellyfish suitcase guitar sunflower popcorn. Cactus river teapot giraffe notebook feather cloud butterfly crystal hammer shadow rocket blanket mirror violin kite firefly. Pancake umbrella clock ocean window basket rainbow ladder volcano toaster dragon bubble jelly curtain lion.",
    "Lantern cloud monkey brick mirror whistle rainbow eagle pillow rocket moon chair teapot violin sunflower bubble guitar. Firefly camera fountain sandwich apple popcorn starfish crocodile suitcase coin kite mountain butterfly pencil ladder thunder. Dolphin zebra feather piano river firecracker jelly balloon eagle crystal sunflower spoon jellyfish window giraffe cactus.",
    "Kitten chair rainbow pencil dragon thunder butterfly suitcase lantern clock cactus spoon cupcake jelly mountain apple. Zebra window shadow crystal teapot moon whistle camera ladder firecracker rocket stone violin keyboard river garden dolphin. Feather firefly eagle popcorn bicycle jacket blanket sunflower jellyfish hammer pebble ladder fountain mirror butterfly."
]

const pg = document.getElementById("pg");
const userinput = document.querySelector(".textinput");
const resetButton = document.querySelector(".containerin button");
const totalTime = document.querySelector(".time .text2");
const totalWPM = document.querySelector(".wpm .text2");
const totalMistake = document.querySelector(".mistake .text2");
const totalCPM = document.querySelector(".cpm .text2");

let timer;
let maxTime = 60;
let timeRemaining = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;

const setparagraph = () => {
    const randIndex = Math.floor(Math.random() * paragraphs.length);
    pg.textContent = "";
    paragraphs[randIndex].split("").forEach(char => {
        pg.innerHTML += `<span>${char}</span>`
    });

    pg.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener("keydown", function (event) {
        if (event.key === "Backspace") {
            if (charIndex > 0) {
                const characters = pg.querySelectorAll('span');
                characters[charIndex].classList.remove('active');
                charIndex--;
                characters[charIndex].classList.remove('incorrect', 'correct');
                characters[charIndex].classList.add('active');
            }
        }
        userinput.focus();
    });
    pg.addEventListener("click", () => userinput.focus());

    totalMistake.innerText = 0;
    totalCPM.innerText = 0;
    totalWPM.innerText = 0;
    totalTime.innerText = timeRemaining + "s";
}

const startTyping = () => {
    characters = pg.querySelectorAll('span');
    let typedChar = userinput.value.charAt(charIndex);

    if (typedChar == "" || typedChar == null) return;

    if (charIndex < characters.length - 1 && timeRemaining > 0) {
        if (!isTyping) {
            timer = setInterval(startTimer, 1000);
            isTyping = true;
        }

        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains('incorrect')) {
                    mistakes--;
                }
                characters[charIndex].classList.remove('incorrect', 'correct');
            }
        }
        else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add('correct');
            }
            else {
                characters[charIndex].classList.add('incorrect');
                mistakes++;
            }
            charIndex++;
        }

        characters.forEach(char => {
            char.classList.remove('active');
        })
        characters[charIndex].classList.add('active');

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeRemaining) * 60)
        wpm = wpm < 0 || !wpm || wpm == Infinity ? 0 : wpm;

        totalWPM.innerText = wpm;
        totalMistake.innerText = mistakes;
        totalCPM.innerText = charIndex - mistakes;
    }
    else {
        clearInterval(timer);
        isTyping = false;
    }
}

const startTimer = () => {
    if (timeRemaining > 0) {
        timeRemaining--;
        totalTime.innerText = timeRemaining + "s";

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeRemaining) * 60)
        totalWPM.innerHTML = wpm;
    }
    else {
        clearInterval(timer);
        isTyping = false;
    }
}

const resetGame = () => {
    setparagraph();
    clearInterval(timer);
    timeRemaining = maxTime;
    charIndex = 0;
    mistakes = 0;
    isTyping = false;
    userinput.value = "";
    totalTime.innerText = timeRemaining;
    totalWPM.innerText = 0;
    totalMistake.innerText = 0;
    totalCPM.innerText = 0;
}

setparagraph();
resetButton.addEventListener('click', resetGame);
userinput.addEventListener('input', startTyping);
const optionContainer = document.getElementById("option");
const letterContainer = document.getElementById("letter");
const resultContainer = document.getElementById("result");
const canvasContainer = document.getElementById("canvas");
const newgameContainer = document.getElementById("newgame1");
const newbtnContainer = document.getElementById("newbtn");
const userinputContainer = document.getElementById("userinput");
const chanceContainer = document.getElementById("chance");

// Options for buttons
let options = {
  Fruit: [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Grape",
    "Kiwi",
    "Lemon",
    "Mango",
    "Orange",
    "Papaya",
  ],
  Animals: [
    "Lion",
    "Tiger",
    "Elephant",
    "Giraffe",
    "Zebra",
    "Kangaroo",
    "Panda",
    "Bear",
    "Wolf",
    "Leopard",
  ],
  Countries: [
    "USA",
    "Canada",
    "Brazil",
    "Germany",
    "Australia",
    "India",
    "Japan",
    "France",
    "Italy",
    "Mexico",
  ],
};

// Game variables
let wincount = 0;
let count = 0;
let chosenWord = "";

// Display Options
const display = () => {
  optionContainer.innerHTML = `<h3>Please Select An Option</h3>`;
  let buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.flexDirection = "row";
  buttonContainer.style.gap = "120px";
  buttonContainer.style.marginLeft = "-156px";
  buttonContainer.style.marginTop = "30px";
  buttonContainer.style.marginBottom = "150px";

  for (let value in options) {
    let button = document.createElement("button");
    button.classList.add("options");
    button.innerHTML = value;
    button.setAttribute("onclick", `generateWord('${value}')`);
    button.style.padding = "10px 20px";
    button.style.fontSize = "25px";
    buttonContainer.appendChild(button);
  }
  optionContainer.appendChild(buttonContainer);
};

//Generate Word
const generateWord = (optionValue) => {
  // Disable all option buttons
  let optionButtons = document.querySelectorAll(".options");
  optionButtons.forEach((button) => {
    button.disabled = true;
    if (button.innerHTML.toLowerCase() === optionValue.toLowerCase()) {
      button.classList.add("active");
    }
  });

  // Clear previous content
  userinputContainer.innerHTML = "";
  letterContainer.innerHTML = "";
  canvasContainer.innerHTML = "";

  // Reset Canvas
  resetCanvas();

  // Choose a random word
  let optionArray = options[optionValue];
  chosenWord =
    optionArray[Math.floor(Math.random() * optionArray.length)].toUpperCase();
  console.log("Chosen Word:", chosenWord);

  // Create dashes for the chosen word
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
  userinputContainer.innerHTML = displayItem;

  // Generate letter buttons (A-Z)
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letter");
    button.innerHTML = String.fromCharCode(i);

    // button.addEventListener("mouseover", function () {
    //   button.style.backgroundColor = "white";
    //   button.style.color = "black";
    // });

    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");

      let dashes = document.getElementsByClassName("dashes");
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char.toUpperCase() === button.innerText.toUpperCase()) {
            button.style.backgroundColor = "pink";
            dashes[index].innerText = char;
            wincount++;
            if (wincount == charArray.length) {
              resultContainer.innerHTML = `<h2 class="win">You Win!!</h2><p>The Word Was <span>${chosenWord}</span></p>`;
              blocker();
            }
          }
        });
      } else {
        count++;
        chanceContainer.innerHTML = `Chances Remaining: ${6 - count}`;
        button.style.backgroundColor = "blue";
        drawMan(count);

        if (count == 6) {
          resultContainer.innerHTML = `<h2 class="lose">You Lose!!</h2><p>The Word Was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      button.disabled = true;
    });

    letterContainer.appendChild(button);
  }
};

// Draw Hangman on Canvas
const drawMan = (step) => {
  const canvas = document.createElement("canvas");
  canvas.width = 200;
  canvas.height = 400;
  canvasContainer.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const drawSteps = [
    () => ctx.fillRect(50, 350, 100, 10), // Base
    () => ctx.fillRect(90, 50, 10, 300), // Pole
    () => ctx.fillRect(90, 50, 70, 10), // Beam
    () => ctx.fillRect(150, 50, 10, 50), // Rope
    () => {
      ctx.beginPath();
      ctx.arc(155, 120, 20, 0, Math.PI * 2); // Head
      ctx.stroke();
    },
    () => {
      ctx.fillRect(150, 140, 10, 80); // Body
      ctx.fillRect(135, 150, 20, 10); // Left Arm
      ctx.fillRect(165, 150, 20, 10); // Right Arm
      ctx.fillRect(145, 210, 10, 40); // Left Leg
      ctx.fillRect(155, 210, 10, 40); // Right Leg
    },
  ];

  if (step <= drawSteps.length) {
    drawSteps[step - 1]();
  }
};

// Reset Canvas
const resetCanvas = () => {
  canvasContainer.innerHTML = "";
};

// Disable All Buttons
const blocker = () => {
  let letterButtons = document.querySelectorAll(".letter");
  letterButtons.forEach((button) => {
    button.disabled = true;
  });
};

// Initialize the game
const initial = () => {
  wincount = 0;
  count = 0;
  resultContainer.innerHTML = "";
  userinputContainer.innerHTML = "";
  resetCanvas();
  chanceContainer.innerHTML = "Chances Remaining: 6";
  display();
};

// Add Event Listener
newbtnContainer.addEventListener("click", initial);
window.onload = initial;

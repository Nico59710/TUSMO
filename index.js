import { mots5 } from "./mots5.js";

document.addEventListener("DOMContentLoaded", function () {
    console.log("Document Chargé");

    const titre = document.getElementById("titre");
    const motMystere = document.getElementById("motMystere");
    const grille = document.getElementById("grille");
    const clavier = document.getElementById("clavier");
    const bouttons = document.querySelectorAll(".button");
    const lettres = document.querySelectorAll(".lettre");
    const Delete = document.getElementById("Delete");
    const Enter = document.getElementById("Enter");
    const cells = document.querySelectorAll(".cell");
    
    let currentIndex = 0;
    
    for (let index = 0; index < lettres.length; index++) {
        const element = lettres[index];
        
        element.addEventListener("click", function () {
            
            if (currentIndex < 5) {
                cells[currentIndex].textContent = element.textContent;
                currentIndex++;
            }
            
        });
    }
    Delete.addEventListener("click", function () {
        cells[currentIndex - 1].textContent = "";
        currentIndex--;
    })     
      
    console.log(mots5);
    const motSecret = mots5[Math.floor(Math.random() * mots5.length)];
    console.log("Mot secret :", motSecret);

    

    Delete.addEventListener("click", function () {
        cells[currentIndex - 1].textContent = "";
        currentIndex--;
    })

    document.addEventListener("keydown", function (e) {
        console.log(e.key);
        allowCharacter = ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p", "q", "s", "d", "f", "g", "h", "j", "k", "l", "m"]
        if (allowCharacter.includes(e.key)) {
            if (currentIndex < cells.length) {
                cells[currentIndex].textContent = e.key;
                currentIndex++;
            }
        } else if (e.key == "Backspace") {
            cells[currentIndex - 1].textContent = "";
            currentIndex--;
        }
    })
})

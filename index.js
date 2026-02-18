// Importation du tableau de mots depuis le fichier mots5.js
import { mots5 } from "./mots5.js";
// Affichage du tableau de mots dans la console pour vérification
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

    // Affichage du mot secret dans la console
    console.log(mots5);
    const motSecret = mots5[Math.floor(Math.random() * mots5.length)];
    console.log("Mot secret :", motSecret);

    // Fonction pour gérer les clics sur les lettres du clavier virtuel
    for (let index = 0; index < lettres.length; index++) {
        const element = lettres[index];
        element.addEventListener("click", function () {
            if (currentIndex < 5) {
                cells[currentIndex].textContent = element.textContent;
                currentIndex++;
            }
        });
    }

    //fonction du boutton delete
    Delete.addEventListener("click", function () {
        cells[currentIndex - 1].textContent = "";
        currentIndex--;
    })
    //fonction du boutton enter

    Enter.addEventListener("click", function () {
        // Ici, la logique pour vérifier le mot saisi par l'utilisateur
        if (currentIndex === 5) {
            let motSaisi = "";
            for (let i = 0; i < 5; i++) {
                motSaisi += cells[i].textContent;
                console.log("mot saisi:", motSaisi);
                if (motSaisi === motSecret) {
                    console.log("Bravo ! Vous avez trouvé le mot secret.");
                    alert("Bravo ! Vous avez trouvé le mot secret.");
                }
                else if (motSecret[i] == motSaisi[i]) {
                    cells[i].style.backgroundColor = "green";
                }
                else if (motSecret[i] != motSaisi[i] && !motSecret.includes(motSaisi[i])) {
                    cells[i].style.backgroundColor = "grey";
                }
                else if (motSecret[i] != motSaisi[i] && motSecret.includes(motSaisi[i])) {
                    cells[i].style.backgroundColor = "yellow";
                }
            }
        } else {
            alert("Veuillez saisir un mot de 5 lettres avant de valider.");
        }
    })







    //utilisation du clavier physique

    document.addEventListener("keydown", function (e) {
        console.log(e.key);
        const allowCharacter = ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p", "q", "s", "d", "f", "g", "h", "j", "k", "l", "m", "w", "x", "c", "v", "b", "n"]
        if (allowCharacter.includes(e.key)) {
            if (currentIndex < 5) {
                cells[currentIndex].textContent = e.key;
                currentIndex++;
            }
        } else if (e.key == "Backspace") {
            cells[currentIndex - 1].textContent = "";
            currentIndex--;
        } else if (e.key == "Enter") {
            if (currentIndex === 5) {
                let motSaisi = "";
                for (let i = 0; i < 5; i++) {
                    motSaisi += cells[i].textContent;
                    console.log("mot saisi:", motSaisi);
                    if (motSaisi === motSecret) {
                        console.log("Bravo ! Vous avez trouvé le mot secret.");
                        alert("Bravo ! Vous avez trouvé le mot secret.");
                    }
                    else if (motSecret[i] == motSaisi[i]) {
                        cells[i].style.backgroundColor = "green";
                    }
                    else if (motSecret[i] != motSaisi[i] && !motSecret.includes(motSaisi[i])) {
                        cells[i].style.backgroundColor = "grey";
                    }
                    else if (motSecret[i] != motSaisi[i] && motSecret.includes(motSaisi[i])) {
                        cells[i].style.backgroundColor = "yellow";
                    }
                }
            } else {
                alert("Veuillez saisir un mot de 5 lettres.");
            }
        }
    });





        }
    }
})







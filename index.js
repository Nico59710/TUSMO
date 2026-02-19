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
    let ligneValidee = true;

    // Affichage du mot secret dans la console
    console.log(mots5);
    const motSecret = mots5[Math.floor(Math.random() * mots5.length)];
    console.log("Mot secret :", motSecret);
    cells[0].textContent = motSecret[0];

    // Fonction pour gérer les clics sur les lettres du clavier virtuel
    for (let index = 0; index < lettres.length; index++) {
        const element = lettres[index];
        element.addEventListener("click", function () {
            if (currentIndex < cells.length && ligneValidee) {
                cells[currentIndex].textContent = element.textContent;
                currentIndex++;
                if (currentIndex % 5 === 0) {
                    ligneValidee = false;
                }
            }
        });
    }

    //fonction du boutton delete
    Delete.addEventListener("click", function () {
        if (currentIndex > 0) {
            const previousCell = cells[currentIndex - 1];
            if (!previousCell.style.backgroundColor) {
                previousCell.textContent = "";
                currentIndex--;
            }
        }
    });


    let tentative = 0; // Variable pour suivre la ligne actuelle
    Enter.addEventListener("click", function () {
        verifierMot();
    });


    //fonction de verification du  mot saisi
    function verifierMot() {
        if (currentIndex % 5 === 0 && currentIndex !== 0 && ligneValidee == false && tentative < 25) {
            let motSaisi = "";
            for (let i = 0; i < 5; i++) {
                motSaisi += cells[i + tentative].textContent;
                console.log("mot saisi:", motSaisi);
            }
            if (!mots5.includes(motSaisi.toLowerCase())) {
                alert("Le mot saisi n'est pas dans la liste des mots autorisés, CONNARD!!");
            }
            for (let i = 0; i < 5; i++) {
                if (motSaisi === motSecret) {
                    for (let j = 0; j < 5; j++) {
                    cells[j + tentative].style.backgroundColor = "green";
                }
                console.log("Bravo ! Vous avez trouvé le mot secret.");
                alert("Bravo ! Vous avez trouvé le mot secret.");
                return;
                }
                else if (motSecret[i] == motSaisi[i]) {
                    cells[i + tentative].style.backgroundColor = "green";
                    cells[i + tentative + 5].textContent = motSecret[i];
                }
                else if (motSecret[i] != motSaisi[i] && !motSecret.includes(motSaisi[i])) {
                    cells[i + tentative].style.backgroundColor = "grey";
                }
                else if (motSecret[i] != motSaisi[i] && motSecret.includes(motSaisi[i])) {
                    cells[i + tentative].style.backgroundColor = "yellow";
                }
            }
            tentative += 5; // Passer à la ligne suivante
            console.log(tentative);
            ligneValidee = true;// Réinitialiser pour la prochaine ligne
            motSaisi = ""; // Réinitialiser le mot saisi pour la prochaine tentative
        }
        else if (tentative >= 25) { // Limite de tentatives (6 lignes de 5 lettres)
            alert("perdu");
            return;
        }
        else {
            alert("Veuillez saisir un mot de 5 lettres avant de valider.");
        }
    }







    //utilisation du clavier physique

    document.addEventListener("keydown", function (e) {
        console.log(e.key);
        const allowCharacter = ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p", "q", "s", "d", "f", "g", "h", "j", "k", "l", "m", "w", "x", "c", "v", "b", "n"]
        if (allowCharacter.includes(e.key)) {
            if (currentIndex < cells.length && ligneValidee) {
                cells[currentIndex].textContent = e.key;
                currentIndex++;
                if (currentIndex % 5 === 0) {
                    ligneValidee = false;
                }
            }
        } else if (e.key == "Backspace") {
            if (currentIndex > 0) {
                const previousCell = cells[currentIndex - 1];
                if (!previousCell.style.backgroundColor) {
                    previousCell.textContent = "";
                    currentIndex--;
                }
            }
        } else if (e.key == "Enter") {
            verifierMot();
        }
    });
})







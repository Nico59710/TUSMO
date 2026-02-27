// Importation du tableau de mots depuis le fichier mots5.js
import { mots5 } from "./mots5.js";
import { dico } from "./dico.js";

// Fonction pour enlever les accents et mettre en minuscules
function enleverAccents(str) {
    return str
        .normalize("NFD")                // décompose é -> e +  ́
        .replace(/[\u0300-\u036f]/g, "") // supprime les accents
        .replace(/œ/g, "oe")             // optionnel : œ -> oe
        .replace(/æ/g, "ae")             // optionnel : æ -> ae
        .toLowerCase();                   // mettre en minuscules
}
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
    const resetButton = document.getElementById("reset");
    const victoire = document.getElementById("Victoires");
    const partiesJouees = document.getElementById("partiesJouees");
    const compteurDiv = document.getElementById("compteurTentatives");
    const resetScore = document.getElementById("resetScore");
    const ampoule = document.getElementById("ampoule");
    const body = document.body;
    const t = document.querySelectorAll(".t");
    const o = document.querySelectorAll(".o");
    const s = document.querySelectorAll(".s");
    const volume = document.getElementById("volume");

    let partiesGagnees = parseInt(localStorage.getItem("partiesGagnees")) || 0;
    let partiesTotales = parseInt(localStorage.getItem("partiesJouees")) || 0;
    let sound = localStorage.getItem("sound") === "false" ? false : true;
    let modeSombre = localStorage.getItem("modeSombre") === "true";
    if (modeSombre) {
        body.classList.add("bodydark");
        bouttons.forEach(btn => btn.classList.add("buttondark"));
        Enter.classList.add("Enterdark");
        Delete.classList.add("Deletedark");
        resetScore.classList.add("resetScoredark");
        resetButton.classList.add("resetdark");

        t.forEach(el => el.classList.add("tdark"));
        o.forEach(el => el.classList.add("odark"));
        s.forEach(el => el.classList.add("sdark"));

        lettres.forEach(lettre => {
            lettre.classList.add("lettredark");
        });
    }


    victoire.textContent = `Victoires : ${partiesGagnees}`;
    partiesJouees.textContent = `Parties jouées : ${partiesTotales}`;
    let essais = 0;
    const MAX_ESSAIS = 6;


    // Initialiser le contexte audio  
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    document.addEventListener("click", () => {
        audioCtx.resume();
    }, { once: true });
    const sounds = {};

    async function loadSound(name, url) {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
        sounds[name] = audioBuffer;
    }

    // Charger plusieurs fichiers
    async function loadAllSounds() {
        await Promise.all([
            loadSound("green", "assets/lettreVerte.mp3"),
            loadSound("goldenrod", "assets/lettreJaune.mp3"),
            loadSound("grey", "assets/lettreGrise.mp3"),
            loadSound("win", "assets/win.m4a")
        ]);
    }

    loadAllSounds();
    // Créer un contexte audio
    function playSound(name) {
        const buffer = sounds[name];
        if (!buffer) return;

        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.start(0);
    }



    let currentIndex = 0;
    let ligneValidee = true;

    const sonVictoire = document.getElementById("sonVictoire");
    const sonPerdu = document.getElementById("sonPerdu");
    const sonJingle = document.getElementById("sonJingle");

    function Confettis() {
        confetti({
            particleCount: 500,
            spread: 300,
        });
    }

    // Crée un Set normalisé pour comparer rapidement
    const dicoSet = new Set(dico.map(mot => enleverAccents(mot)));

    // Affichage du mot secret dans la console
    console.log(mots5);
    let motSecret = mots5[Math.floor(Math.random() * mots5.length)];
    console.log("Mot secret :", motSecret);
    cells[0].textContent = motSecret[0];

    resetButton.addEventListener("click", function () {
        newGame();
    })

    document.addEventListener("keydown", function playOnce() {
        sonJingle.play();
        document.removeEventListener("keydown", playOnce);
    });

    function newGame() {
        for (let i = 0; i < cells.length; i++) {

            cells[i].textContent = "";
            cells[i].style.backgroundColor = "";

        }
        essais = 0;
        compteurDiv.textContent = `Tentative : ${essais} / ${MAX_ESSAIS}`;
        console.log(mots5);
        motSecret = mots5[Math.floor(Math.random() * mots5.length)];
        console.log("Mot secret :", motSecret);
        cells[0].textContent = motSecret[0];
        lettres.forEach(lettre => {
            lettre.style.backgroundColor = "";
        });
        currentIndex = 0;
        ligneValidee = true;
        tentative = 0;
        lettresValidees = [null, null, null, null, null];

    }

    resetScore.addEventListener("click", function () {
        localStorage.removeItem("partiesGagnees");
        localStorage.removeItem("partiesJouees");
        partiesGagnees = 0;
        partiesTotales = 0;
        victoire.textContent = `Victoires : ${partiesGagnees}`;
        partiesJouees.textContent = `Parties jouées : ${partiesTotales}`;

    });

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

    ampoule.addEventListener("click", function () {

        body.classList.toggle("bodydark");
        bouttons.forEach(btn => btn.classList.toggle("buttondark"));
        Enter.classList.toggle("Enterdark");
        Delete.classList.toggle("Deletedark");
        resetScore.classList.toggle("resetScoredark");
        resetButton.classList.toggle("resetdark");
        t.forEach(el => el.classList.toggle("tdark"));
        o.forEach(el => el.classList.toggle("odark"));
        s.forEach(el => el.classList.toggle("sdark"));;
        lettres.forEach(lettre => {
            lettre.classList.toggle("lettredark");
        });
        const estActif = body.classList.contains("bodydark");
        localStorage.setItem("modeSombre", estActif);
    });



    let soundEnabled = sound;
    if (!soundEnabled) {
    audioCtx.suspend();
    sonPerdu.muted = true;
    sonJingle.muted = true;
    sonVictoire.muted = true;
    volume.textContent = "🔇";
} else {
    volume.textContent = "🔊";
}

    volume.addEventListener("click", function () {

        soundEnabled = !soundEnabled;

        if (soundEnabled) {
            audioCtx.resume();   // réactive tous les sons Web Audio
        } else {
            audioCtx.suspend();  // coupe tous les sons Web Audio
        }

        // Coupe aussi les balises <audio>
        sonPerdu.muted = !soundEnabled;
        sonJingle.muted = !soundEnabled;
        sonVictoire.muted = !soundEnabled;

        volume.textContent = soundEnabled ? "🔊" : "🔇";
        localStorage.setItem("sound", soundEnabled);
    });

    //fonction du boutton delete
    Delete.addEventListener("click", function () {
        if (currentIndex > 0) {
            const previousCell = cells[currentIndex - 1];
            if (!previousCell.style.backgroundColor) {
                previousCell.textContent = "";
                currentIndex--;
                ligneValidee = true;
            }
        }
    });


    let lettresValidees = [null, null, null, null, null]; // Tableau pour stocker les lettres déjà validées
    let tentative = 0; // Variable pour suivre la ligne actuelle
    Enter.addEventListener("click", function () {
        verifierMot();
    });
    //fonction de verification du mot saisi
    function verifierMot() {
        let motTemp = motSecret.split("");// Tableau temporaire pour suivre les lettres du mot secret
        let resultat = ["", "", "", "", ""]; // Tableau pour stocker les résultats de validation
        //verifier que le joueur a saisi un mot de 5 lettres avant de valider
        if (currentIndex - tentative < 5) {
            alert("Veuillez saisir un mot de 5 lettres avant de valider.");
            return;
        }

        if (currentIndex % 5 === 0 && currentIndex !== 0 && ligneValidee == false && tentative <= 25) {
            let motSaisi = "";
            for (let i = 0; i < 5; i++) {
                motSaisi += cells[i + tentative].textContent;
                console.log("mot saisi:", motSaisi);
            }
            if (!dicoSet.has(enleverAccents(motSaisi))) {
                alert("Le mot saisi n'est pas dans la liste des mots autorisés");
                cells[currentIndex - 1].textContent = "";
                cells[currentIndex - 2].textContent = "";
                cells[currentIndex - 3].textContent = "";
                cells[currentIndex - 4].textContent = "";
                cells[currentIndex - 5].textContent = motSecret[0];
                cells[currentIndex - 1].style.backgroundColor = "";
                cells[currentIndex - 2].style.backgroundColor = "";
                cells[currentIndex - 3].style.backgroundColor = "";
                cells[currentIndex - 4].style.backgroundColor = "";
                cells[currentIndex - 5].style.backgroundColor = "";
                currentIndex -= 5;
                ligneValidee = true;
                return;
            }
            for (let i = 0; i < 5; i++) {
                if (motSaisi === motSecret) {
                    // sonVictoire.currentTime = 0;
                    // sonVictoire.play();
                    for (let j = 0; j < 5; j++) {
                        setTimeout(() => {
                            cells[j + tentative].style.backgroundColor = "green";
                            playSound("green");
                        }, 200 * j);
                    } setTimeout(() => {
                        playSound("win");
                        Confettis();
                    }, 1200);
                    setTimeout(() => {
                        console.log("Bravo ! Vous avez trouvé le mot secret.");
                        alert("Bravo ! Vous avez trouvé le mot secret.");
                        partiesGagnees++;
                        partiesTotales++;
                        localStorage.setItem("partiesGagnees", partiesGagnees.toString());
                        localStorage.setItem("partiesJouees", partiesTotales.toString());
                        victoire.textContent = `Victoires : ${partiesGagnees}`;
                        partiesJouees.textContent = `Parties jouées : ${partiesTotales}`;
                        newGame();
                    }, 2000);
                    return;
                }
                // Première passe : Vérifier les lettres à la bonne position (vert)
                else if (motSaisi[i] === motSecret[i]) {
                    lettresValidees[i] = motSecret[i]; // Stocker la lettre validée
                    resultat[i] = "green";
                    motTemp[i] = null; // Marquer la lettre comme utilisée
                }
            }
            // Deuxième passe : Vérifier les lettres présentes mais à la mauvaise position (jaune) et les lettres absentes (gris)
            for (let i = 0; i < 5; i++) {
                if (resultat[i] === "") { // Si la lettre n'est pas déjà validée en vert
                    let lettreAVerifier = motTemp.indexOf(motSaisi[i]);//recherche la position de la lettre dans le mot secret 
                    // (si rien de trouver alors "-1")

                    if (lettreAVerifier !== -1) {// Si la lettre existe dans le mot secret
                        resultat[i] = "goldenrod";// Marquer la lettre comme présente mais à la mauvaise position
                        motTemp[lettreAVerifier] = null; // Marquer la lettre comme utilisée
                    } else {
                        resultat[i] = "grey";// Marquer la lettre comme absente du mot secret
                    }
                }
            }
            for (let i = 0; i < 5; i++) {
                lettres.forEach(lettre => {
                    if (lettre.textContent === cells[i + tentative].textContent) {
                        lettre.style.backgroundColor = resultat[i];

                    }
                })
                setTimeout(() => {

                    cells[i + tentative - 5].style.backgroundColor = resultat[i];
                    playSound(resultat[i]);
                }, 200 * i);

            }
            tentative += 5; // Passer à la ligne suivante

            console.log(tentative);// Afficher la tentative actuelle dans la console pour vérification
            ligneValidee = true;// Réinitialiser pour la prochaine ligne
            motSaisi = ""; // Réinitialiser le mot saisi pour la prochaine tentative
            essais++;
            compteurDiv.textContent = `Tentative : ${essais} / ${MAX_ESSAIS}`;
            setTimeout(() => {

                for (let i = 0; i < 5; i++) {
                    if (lettresValidees[i] !== null) {
                        cells[tentative + i].textContent = lettresValidees[i];
                    }
                }
                if (tentative < 25) {
                    cells[0 + tentative].textContent = motSecret[0];
                }
            }, 1200);



            if (essais >= MAX_ESSAIS && motSaisi !== motSecret) {
                setTimeout(() => {

                    sonPerdu.currentTime = 0;
                    sonPerdu.play()
                }, 1000);

                setTimeout(() => {
                    alert("Perdu ! Le mot était : " + motSecret);
                    partiesTotales++;
                    partiesJouees.textContent = `Parties jouées : ${partiesTotales}`;
                    localStorage.setItem("partiesJouees", partiesTotales);
                    newGame();
                }, 1500);


            }

        }
    }

    //utilisation du clavier physique

    document.addEventListener("keydown", function (e) {
        console.log(e.key);
        const allowCharacter = ["a", "A", "z", "Z", "e", "E", "r", "R", "t", "T", "y", "Y", "u", "U", "i", "I", "o", "O", "p", "P", "q", "Q", "s", "S", "d", "D", "f", "F", "g", "G", "h", "H", "j", "J", "k", "K", "l", "L", "m", "M", "w", "W", "x", "X", "c", "C", "v", "V", "b", "B", "n", "N", "à", "â", "ä", "á", "ã", "å", "À", "Â", "Ä", "Á", "Ã", "Å", "é", "è", "ê", "ë", "ẽ", "ė", "ē", "É", "È", "Ê", "Ë", "Ẽ", "Ė", "Ē", "î", "ï", "í", "ì", "ĩ", "ī", "Î", "Ï", "Í", "Ì", "Ĩ", "Ī", "ô", "ö", "ò", "ó", "õ", "ø", "ō", "Ô", "Ö", "Ò", "Ó", "Õ", "Ø", "Ō", "û", "ü", "ù", "ú", "ũ", "ū", "Û", "Ü", "Ù", "Ú", "Ũ", "Ū", "ÿ", "ý", "Ÿ", "Ý"]
        if (allowCharacter.includes(e.key)) {
            if (currentIndex < cells.length && ligneValidee) {
                cells[currentIndex].textContent = e.key;
                cells[currentIndex].textContent = cells[currentIndex].textContent.toLowerCase();
                cells[currentIndex].textContent = cells[currentIndex].textContent.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Enlever les accents

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
                    ligneValidee = true;
                }
            }
        } else if (e.key == "Enter") {
            verifierMot();
        }

    });

});








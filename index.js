document.addEventListener("DOMContentLoaded", function () {
    console.log("Document Chargé");

    const titre = document.getElementById("titre");
    const motMystere = document.getElementById("motMystere");
    const grille = document.getElementById("grille");
    const clavier = document.getElementById("clavier");
    const bouttons = document.querySelectorAll(".button");
    const cells = document.querySelectorAll(".cell");
    
    for (let index = 0; index < bouttons.length; index++) {
        const element = bouttons[index];
        element.addEventListener("click", function () {
            console.log(element.textContent);
            for (let j = 0; j < cells.length; j++) {
                const cell = cells[j];
                cell.textContent = element.textContent;
            }
        });
    }



})

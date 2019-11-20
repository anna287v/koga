//fortæller siden at documentet skal loade indholdet og hente indholdet fra funktionen "start"
document.addEventListener("DOMContentLoaded", start);

var filterValue = "alle";
let indhold;
let data;


//lader funktionen indhold blive
let dest = document.querySelector("section");
//definerer funktionen dest som section så den bliver defineret her og man derfor ikke behøver kalder den længere nede

function start() {
    const filterKnapper = document.querySelectorAll("nav button");
    //            gør knapperne til filteringen klikbare

    document.addEventListener("click", function (e) {
        console.log(e.target.getAttribute("data-enkelt"))
        switch (e.target.getAttribute("data-enkelt")) {
            case "alle":
                filterValue = "alle"

                break;
            case "Race":
                filterValue = "Race"

                break;
            case "City Tour":
                filterValue = "City Tour"

                // code block
                break;

            case "Mountain Bike":
                filterValue = "Mountain Bike"

                break;

            case "Trekking":
                filterValue = "Trekking"

                break;

            case "E-bike":
                filterValue = "E-bike"

                break;

            default:
                // code block
        }

        filtrerAlleData(filterValue)
    })

    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerAlleData));





    hentJson();
    loadMenu();
    loadFooter();
}


function filtrerAlleData(filterParam) {
    console.log("current filter", filterValue)
    if (!filterParam) {
        filterValue = this.dataset.enkelt; //sæt variabel "filter" til aktuel værdi
    }

    //document.querySelector(".valgt").classList.remove("valgt"); //fjern klassen valgt fra aktuel knap
    //this.classList.add("valgt");
    highlightButton();

    visIndhold();

}

function highlightButton() {
    const filterButtons = document.querySelectorAll("nav button");

    let buttonToHighlight;
    filterButtons.forEach(button => {
        button.classList.remove("valgt")
    })
    filterButtons.forEach(button => {
        console.log("button", button);
        if (button.getAttribute("data-enkelt") === filterValue) {
            button.classList.add("valgt")
        }
    })
    //console.log("buttonTohigh", buttonToHighlight)
    //buttonToHighlight.classList.add("valgt")


}

async function hentJson() {
    const url = "http://annaseverine.dk/kea/kogaWP/wordpress/wp-json/wp/v2/cykel?per_page=100";
    //definerer vores url, så den linker til vores hjemmeside

    let myJson = await fetch(url);
    //hent indhold fra json igennem vores URL
    indhold = await myJson.json();
    //indhold skal vente på at vise sig til json er blevet kaldt
    visIndhold();
}


//menuen bliver linket og loadet herunder
async function loadMenu() {

    let data = await fetch("nav.html");
    let navigation = await data.text();
    //console.log("loadMenu", navigation);
    opretMenu(navigation);

}

function opretMenu(e) {
    document.querySelector("nav").innerHTML = e;
    document.querySelector("#menuknap").addEventListener("click", toggleMenu);
}


function visIndhold() {
    //her tømmer vi array'et så filteringen ikke kommer oveni alle cyklerne.
    dest.textContent = "";
    indhold.forEach(enkelt => {
        if (filterValue == "alle" || enkelt.kategorier == filterValue) {

            // console.log("Kategori", enkelt.kategorier)

            const klon = document.querySelector("template").cloneNode(true).content;

            //fortæller vores content hvordan det skal fordeles i forhold til vores template
            klon.querySelector("h2").textContent = enkelt.titel;
            klon.querySelector(".pris").textContent = enkelt.pris + " DKK";;

            klon.querySelector("img").src = enkelt.billede.guid;

            //fortæller hvilket indhold der skal være på vores side

            dest.appendChild(klon);
            dest.lastElementChild.addEventListener("click", () => {
                location.href = `detaljeside.html?id=${enkelt.id}`;
                //siger til vores side, at den skal klikke ind på detaljesiden (link), når man trykker på et billede
            })

        }
    })

}

function toggleMenu() {
    //console.log("toggleMenu");
    document.querySelector("#menu").classList.toggle("hidden");

    let erSkjult = document.querySelector("#menu").classList.contains("hidden");

    if (erSkjult == true) {
        document.querySelector("#menuknap").textContent = "☰";
    } else {
        document.querySelector("#menuknap").textContent = "X";
    }
}

async function loadFooter() {
    let data = await fetch("footer.html");
    let footer = await data.text();
    console.log("loadFooter", footer);
    opretFooter(footer);
}


function opretFooter(e) {
    document.querySelector("footer").innerHTML = e;

}

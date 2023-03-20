window.onload = function() {
    showPlanets('https://swapi.dev/api/planets/');
};

let i = 1;

async function showPlanets(url) {
    let res = await fetch(url);
    let data = await res.json();
    
    const list = document.getElementById("planets-list");

    data.results.forEach(function callback(planet, index) {
        let btnPlanet = document.createElement("p");
        btnPlanet.innerHTML = `<button>Planeta ${i} ${planet.name}</button>`;
        list.appendChild(btnPlanet);
        i++;
    });
    
    if(data.next != null){
        showPlanets(data.next);
    }
};

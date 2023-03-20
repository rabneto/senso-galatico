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
        btnPlanet.innerHTML = `<button id="${i}" onClick="showPlanetDetails('${planet.url}');">Planeta ${i} ${planet.name}</button>`;
        list.appendChild(btnPlanet);
        i++;
    });
    
    if(data.next != null){
        showPlanets(data.next);
    }
};

async function showPlanetDetails(url) {
    let res = await fetch(url);
    let data = await res.json();
    
    const details = document.getElementById("planets-details");

    details.innerHTML = '';

    details.className = 'show-border';

    let planet_name = document.createElement("h1");
    let planet_climate = document.createElement("h3");
    let planet_population = document.createElement("h3");
    let planet_terrain = document.createElement("h3");

    planet_name.innerHTML = `${data.name}`;
    planet_climate.innerHTML = `Clima: ${data.climate}`;
    planet_population.innerHTML = `População: ${data.population}`;
    planet_terrain.innerHTML = `Terreno: ${data.terrain}`;

    details.appendChild(planet_name);
    details.appendChild(planet_climate);
    details.appendChild(planet_population);
    details.appendChild(planet_terrain);

};

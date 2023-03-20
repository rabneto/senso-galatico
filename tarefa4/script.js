let i = 1;
const list = document.getElementById("planets-list");

window.onload = function() {
    showPlanets('https://swapi.dev/api/planets/');
};

async function showPlanets(url) {
    let res = await fetch(url);
    let data = await res.json();
    
    data.results.forEach((planet) => {
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

    // Mostrar os residentes

    let tableResidents = document.createElement("table");

    tableResidents.innerHTML = `<tbody id="lines">
                                    <tr style="background-color: yellow;">
                                        <td style="width: 70%; color: black !important; font-weight: bold;">Residente</td>
                                        <td style="width: 30%; color: black !important; font-weight: bold;">Nascimento</td>
                                    </tr>
                                </tbody>`;
    details.appendChild(tableResidents);

    console.log(data.residents);
    FillResidents(data.residents);
    

};

async function SearchPlanets() {
    const searchField = document.getElementById("search").value;
    if(searchField != "") {
        i = 1;
        list.innerHTML = "";
        showPlanets(`https://swapi.dev/api/planets/?search=${searchField}`);
    }
}

async function ClearPlanets() {
    i = 1;
    list.innerHTML = '';
    document.getElementById("search").value = '';
    document.getElementById("planets-details").className = '';
    document.getElementById("planets-details").innerHTML = '';
    showPlanets('https://swapi.dev/api/planets/');
}

async function FillResidents(urls) {
    
    urls.forEach((residentUrl) => {
        lines += ShowResident(residentUrl);
    });

}

async function ShowResident(url) {

    const residentLine = document.getElementById("lines");
    let residentTR = document.createElement("tr");

    let resLine = await fetch(url);
    let dataLine = await resLine.json();
        line = `
                    <td>${dataLine.name}</td>
                    <td>${dataLine.birth_year}</td>
                `;
    residentTR.innerHTML = line;
    residentLine.appendChild(residentTR);
}
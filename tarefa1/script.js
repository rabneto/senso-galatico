window.onload = function() {
    showPlanets();
};
async function showPlanets() {
    let res = await fetch('https://swapi.dev/api/planets/');
    let {results} = await res.json();
    console.log(results);
};

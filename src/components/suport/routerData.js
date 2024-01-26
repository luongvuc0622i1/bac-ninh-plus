const resRoutes = await fetch('https://luongvu1012.pythonanywhere.com/api/routes');
const resStations = await fetch('https://luongvu1012.pythonanywhere.com/api/stations');
const dataRoutes = await resRoutes.json();
const dataStations = await resStations.json();
export let routes = dataRoutes;
export let stations = dataStations;
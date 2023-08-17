import { fetchDataFromApi } from './fetchDataFromApi';

const URL = [
  'https://raw.githubusercontent.com/luongvuc0622i1/project-data/master/',
  'https://raw.githubusercontent.com/luongvuc0622i1/project-data/master/bus-routes/'
];

export let routes = await fetchDataFromApi(URL[0] + 'routes.js');

export let stations = await fetchDataFromApi(URL[0] + 'stations.js');

// export let bn01Go = await fetchDataFromApi(URL[1] + 'bn01Go.js');

// export let bn01Back = await fetchDataFromApi(URL[1] + 'bn01Back.js');

// export let bn02Go = await fetchDataFromApi(URL[1] + 'bn02Go.js');

// export let bn02Back = await fetchDataFromApi(URL[1] + 'bn02Back.js');

// export let bn03Go = await fetchDataFromApi(URL[1] + 'bn03Go.js');

// export let bn03Back = await fetchDataFromApi(URL[1] + 'bn03Back.js');

// export let bn08Go = await fetchDataFromApi(URL[1] + 'bn08Go.js');

// export let bn08Back = await fetchDataFromApi(URL[1] + 'bn08Back.js');

// export let bn27Go = await fetchDataFromApi(URL[1] + 'bn27Go.js');

// export let bn27Back = await fetchDataFromApi(URL[1] + 'bn27Back.js');

// export let bn68Go = await fetchDataFromApi(URL[1] + 'bn68Go.js');

// export let bn68Back = await fetchDataFromApi(URL[1] + 'bn68Back.js');

// export let bn86aGo = await fetchDataFromApi(URL[1] + 'bn86aGo.js');

// export let bn86aBack = await fetchDataFromApi(URL[1] + 'bn86aBack.js');

// export let bn86bGo = await fetchDataFromApi(URL[1] + 'bn86bGo.js');

// export let bn86bBack = await fetchDataFromApi(URL[1] + 'bn86bBack.js');

// export let b10aGo = await fetchDataFromApi(URL[1] + 'b10aGo.js');

// export let b10aBack = await fetchDataFromApi(URL[1] + 'b10aBack.js');

// export let b54Go = await fetchDataFromApi(URL[1] + 'b54Go.js');

// export let b54Back = await fetchDataFromApi(URL[1] + 'b54Back.js');

// export let b203Go = await fetchDataFromApi(URL[1] + 'b203Go.js');

// export let b203Back = await fetchDataFromApi(URL[1] + 'b203Back.js');

// export let b204Go = await fetchDataFromApi(URL[1] + 'b204Go.js');

// export let b204Back = await fetchDataFromApi(URL[1] + 'b204Back.js');

// export let b210Go = await fetchDataFromApi(URL[1] + 'b210Go.js');

// export let b210Back = await fetchDataFromApi(URL[1] + 'b210Back.js');

// export let b212Go = await fetchDataFromApi(URL[1] + 'b212Go.js');

// export let b212Back = await fetchDataFromApi(URL[1] + 'b212Back.js');

// export let b217Go = await fetchDataFromApi(URL[1] + 'b217Go.js');

// export let b217Back = await fetchDataFromApi(URL[1] + 'b217Back.js');
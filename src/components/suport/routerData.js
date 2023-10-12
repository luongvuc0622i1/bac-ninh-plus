// import {
//   routesData, stationsData, bn01GoData, bn01BackData, bn02GoData, bn02BackData, bn03GoData, bn03BackData, bn08GoData, bn08BackData,
//   bn27GoData, bn27BackData, bn68GoData, bn68BackData, bn86aGoData, bn86aBackData, bn86bGoData, bn86bBackData, b10aGoData, b10aBackData, b54GoData, b54BackData,
//   b203GoData, b203BackData, b204GoData, b204BackData, b210GoData, b210BackData, b212GoData, b212BackData, b217GoData, b217BackData
// } from './api';

// import { routesData } from '../../data/routes';
// import { stationsData } from '../../data/stations';
// import { bn01GoData } from '../../data/bus-routes/bn01Go';
// import { bn01BackData } from '../../data/bus-routes/bn01Back';
// import { bn02GoData } from '../../data/bus-routes/bn02Go';
// import { bn02BackData } from '../../data/bus-routes/bn02Back';
// import { bn03GoData } from '../../data/bus-routes/bn03Go';
// import { bn03BackData } from '../../data/bus-routes/bn03Back';
// import { bn08GoData } from '../../data/bus-routes/bn08Go';
// import { bn08BackData } from '../../data/bus-routes/bn08Back';
// import { bn27GoData } from '../../data/bus-routes/bn27Go';
// import { bn27BackData } from '../../data/bus-routes/bn27Back';
// import { bn68GoData } from '../../data/bus-routes/bn68Go';
// import { bn68BackData } from '../../data/bus-routes/bn68Back';
// import { bn86aGoData } from '../../data/bus-routes/bn86aGo';
// import { bn86aBackData } from '../../data/bus-routes/bn86aBack';
// import { bn86bGoData } from '../../data/bus-routes/bn86bGo';
// import { bn86bBackData } from '../../data/bus-routes/bn86bBack';
// import { b10aGoData } from '../../data/bus-routes/b10aGo';
// import { b10aBackData } from '../../data/bus-routes/b10aBack';
// import { b54GoData } from '../../data/bus-routes/b54Go';
// import { b54BackData } from '../../data/bus-routes/b54Back';
// import { b203GoData } from '../../data/bus-routes/b203Go';
// import { b203BackData } from '../../data/bus-routes/b203Back';
// import { b204GoData } from '../../data/bus-routes/b204Go';
// import { b204BackData } from '../../data/bus-routes/b204Back';
// import { b210GoData } from '../../data/bus-routes/b210Go';
// import { b210BackData } from '../../data/bus-routes/b210Back';
// import { b212GoData } from '../../data/bus-routes/b212Go';
// import { b212BackData } from '../../data/bus-routes/b212Back';
// import { b217GoData } from '../../data/bus-routes/b217Go';
// import { b217BackData } from '../../data/bus-routes/b217Back';

// const arrayData = [
//   { 'go': [bn01GoData], 'back': [bn01BackData] },
//   { 'go': [bn02GoData], 'back': [bn02BackData] },
//   { 'go': [bn03GoData], 'back': [bn03BackData] },
//   { 'go': [bn08GoData], 'back': [bn08BackData] },
//   { 'go': [bn27GoData], 'back': [bn27BackData] },
//   { 'go': [bn68GoData], 'back': [bn68BackData] },
//   { 'go': [bn86aGoData], 'back': [bn86aBackData] },
//   { 'go': [bn86bGoData], 'back': [bn86bBackData] },
//   { 'go': [b10aGoData], 'back': [b10aBackData] },
//   { 'go': [b54GoData], 'back': [b54BackData] },
//   { 'go': [b203GoData], 'back': [b203BackData] },
//   { 'go': [b204GoData], 'back': [b204BackData] },
//   { 'go': [b210GoData], 'back': [b210BackData] },
//   { 'go': [b212GoData], 'back': [b212BackData] },
//   { 'go': [b217GoData], 'back': [b217BackData] }
// ]

// export let routes = {
//   ...routesData,
//   features: routesData.features.map((feature, i) => ({
//     ...feature,
//     coordinates: {
//       ...feature.coordinates,
//       go: arrayData[i].go,
//       back: arrayData[i].back
//     }
//   }))
// };

export let routes = JSON.parse(localStorage.getItem('routes'));

export let stations = JSON.parse(localStorage.getItem('stations'));
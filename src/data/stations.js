import { fetchDataFromApi } from "../components/suport/fetchDataFromApi";

export let stations = await fetchDataFromApi('https://api.github.com/repos/luongvuc0622i1/project-data/contents/stations.js');
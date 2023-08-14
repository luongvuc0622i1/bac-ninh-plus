import { routes } from "../../data/routes";

export const routeIdList = routes.features.filter(feature => feature.geometry.status).map(feature => feature.geometry.id);
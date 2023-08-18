import { routes } from './routerData';

export const routeIdList = routes.features.filter(feature => feature.geometry.status).map(feature => feature.geometry.id);
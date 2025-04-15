import routes from "routes.js";


const SiteName = (locationUrl) => {
    for (let i = 0; i < routes.length; i++) {
        if (locationUrl.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
            return routes[i].name;
        }
    }
    return "Brand";
}


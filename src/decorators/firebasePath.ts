/**
 *  Defines the route of the entity in the database
 */
function firebasePath(target: any, route?: string): any {
    target.prototype.$route = route;
    console.log(`Entity ${target.prototype.name} was setted with route: ${route}`);
}
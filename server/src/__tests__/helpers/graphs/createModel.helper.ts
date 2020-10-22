import {createApiProperties} from "./createApiProperties";
import {createApiClasses} from "./createApiClasses";
import createApiProfiles from "./createApiProfiles";
// TODO X put in right place
export async function createModel() {
    const profiles = await createApiProfiles();
    const classes = await createApiClasses();
    const properties = await createApiProperties();
    return {profiles, classes, properties};
}

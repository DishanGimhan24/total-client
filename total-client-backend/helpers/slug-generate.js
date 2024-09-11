export const generateSlug = (name) => {
    //replace spaces, commas, and slashes with a hyphen
    return name.replace(/\s|,|\//g, "-").toLowerCase();
};
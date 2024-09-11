//get path of the media files and return the media url
export const getMediaUrl = (path) => {
    //get site url
    const siteUrl = process.env.REACT_APP_API_URL;
    //return the media url
    return siteUrl + "/" + path;
};
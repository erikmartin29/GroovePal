export const getApiUrl = () => {
    const apiURL = new URL(window.location.href);
    if (process.env.NODE_ENV !== 'production') {
        console.log('using dev port')
        apiURL.port = 8282;
        console.log(apiURL.href);
    }
    // else api is running on same port as ui
    return apiURL;
}

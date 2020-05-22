export async function serverRequest({url, responseJSON = true, method = "GET", headers, body}) {
    try {
        let response = await fetch(url, {
            method,
            headers,
            body
        });            

        return responseJSON ? await response.json() : response;
    } catch (error) {
        alert("Error HTTP: " + error);           
    }

    return null;
}
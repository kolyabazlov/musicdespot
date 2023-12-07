chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {    
    if (request.contentScriptQuery == "postTrackId") {
        let url = request.url;
        console.log('postTrackId request data', request.data)
        
        fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request.data),
            })
            .then(response => response.json())
            .then(response => sendResponse(response))
            .catch()

        return true;
    }
});
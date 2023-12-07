function createRedSquare() {
  const redSquare = document.createElement('div');
  redSquare.style.position = 'absolute';
  redSquare.style.left = '200px';
  redSquare.style.top = '20px';
  redSquare.style.width = '20px';
  redSquare.style.height = '20px';
  redSquare.style.background = 'red';

  return redSquare;
}

window.addEventListener("load", (event) => {
    const targetNode = document.querySelector('.lightlist__cont')
    
    
    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };
    
    // Callback function to execute when mutations are observed
    function logChanges(records, observer) {
      // Disconnect the observer temporarily to avoid triggering more mutations
      observer.disconnect();
    
      for (const record of records) {
        for (const addedNode of record.addedNodes) {
          if (!addedNode.__redSquareAdded) {    
            // Создаем новый элемент для каждого добавленного узла
            const redSquare = createRedSquare();
    
            // addedNode.appendChild(redSquare);
            if(addedNode.querySelector('.d-track__delete')) {
    
              addedNode.querySelector('.d-track__delete').before(redSquare)
            }
            addedNode.__redSquareAdded = true;
    
            // console.log(`Added: ${addedNode.textContent}, ${addedNode}`);
            addedNode.addEventListener('click', ()=> {
              chrome.runtime.sendMessage(
                {
                  contentScriptQuery: 'postTrackId',
                  data: {
                    track: addedNode.dataset.itemId
                  },
                  url: 'http://localhost:3000/track'
                },
                // response => console.log((response.text()))
              );

              console.log('clicked', addedNode.dataset.itemId)
            })
          }
        }
        for (const removedNode of record.removedNodes) {
          // console.log(`Removed: ${removedNode.textContent}`);
        }
        // console.log(record.target.childNodes.length);
      }
    
      // Reconnect the observer after processing mutations
      observer.observe(targetNode, config);
    }
    
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(logChanges);
    
    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
    
});

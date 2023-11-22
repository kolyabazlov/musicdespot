const TRACK_CLASSNAME = 'd-track'

const tracks = document.getElementsByClassName(TRACK_CLASSNAME)
// document.body.style.display = 'none'

// it can't instantly change it
setTimeout(() => {

    if (tracks.length) {
        for (let el of tracks) {
            el.style.background = 'green'
        }
    }
    
}, 3000)

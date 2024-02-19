
export const songsArray = [
    {
        src: "./sounds/HEROES3.mp3", 
        type: "audio/mpeg"
    },
    {
        src: "./sounds/CASTLE_JAM.mp3",
        type: "audio/mpeg"
    },
    {
        src: "./sounds/VISTA_POINT.mp3",
        type: "audio/mpeg"  
    },
    {
        src: "./sounds/KAM.mp3", 
        type: "audio/mpeg"
    },
    {
        src: "./sounds/STRONGHOLD2.mp3", 
        type: "audio/mpeg"
    }]

export function newMusicArray() {
    return Array.from(songsArray)
}

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function playMusic(songsArray, audioPlayer) {
    if (!songsArray.length) {
        return false
    }
    let randomIndex = randomInt(0, songsArray.length - 1)
    audioPlayer.src = songsArray[randomIndex].src
    audioPlayer.type = songsArray[randomIndex].type
    audioPlayer.play()
    songsArray.splice(randomIndex, 1) 
}

export function stopMusic(audioPlayer) {
    audioPlayer.pause()
}

export function unstopMusic(audioPlayer) {
    audioPlayer.play()
}
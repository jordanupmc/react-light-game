import sound from './lightSound.mp3';

export default class SoundPlayer {
    audio: HTMLAudioElement;
    constructor() {
        this.audio = new Audio(sound)
    }

    play() {
        this.audio.play();
    }
}
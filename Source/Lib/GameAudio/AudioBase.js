class AudioBase
{
    constructor(name, dir) 
    {
        this.audio = GameAudio.instantiate(name,dir);
    }

    play()
    {
        this.audio.autoplay=true;
        this.audio.play();
    }
    pause(timeInSecond, offset) { this.audio.pause(timeInSecond, offset); }
    stop(timeInSecond) { this.audio.stop(timeInSecond); }

    set volume(value) { this.audio.setVolume(value); }
    get volume() { return this.audio.getVolume(); }

    set rate(value) { this.audio.setPlaybackRate(value); }

    set position(value) { this.audio.setPosition(value); }

    attachToObject(obj) { this.audio.attachToMesh(obj); }
    dettachFromObject(obj) { this.audio.detachFromMesh(obj); }
}
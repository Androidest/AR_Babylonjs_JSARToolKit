class Sound extends AudioBase
{
    constructor(name)
    {
        super(name, "Sound");
        this.audio.loop = false;
        this.audio.autoplay = false;
        this.audio.spatialSound = true;
        this.audio.volume = 1;
    }
}
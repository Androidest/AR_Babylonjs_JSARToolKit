class Music extends AudioBase
{
    constructor(name)
    {
        super(name, "Music");
        this.audio.loop = true;
        this.audio.autoplay = false;
        this.audio.spatialSound = false;
        this.audio.volume = 1;
    }
}
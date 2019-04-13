class SoundTrack
{
    constructor() 
    {
       this.list = new Array();
       this._volume = 1;
    }

    addSound(sound) { this.list.push(sound); }

    set volume(value) 
    { 
        this._volume = value; 
        for( let sound of this.list )
            sound.volume = value;
    }
    
    get volume() { return this._volume; }
}
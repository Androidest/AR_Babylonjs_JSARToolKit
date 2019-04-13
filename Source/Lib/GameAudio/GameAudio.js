class GameAudio
{
    static set audio(value) { this._audio = value; }
    static get audio() { return this._audio; }

    static set audioTemplate(value) { this._audioTemplate = value; }
    static get audioTemplate() { return this._audioTemplate; }

    static set volume(value) { this.audioEngine.setGlobalVolume(value); }
    static get volume() { return this.audioEngine.getGlobalVolume(); }

    static get audioEngine() { return BABYLON.Engine.audioEngine; }

    static init() 
    {
        this.audio = new Array();
        this.audioTemplate = new Map(); 

        if(!this.audioEngine.isOGGsupported)
            console.log("OGG format is not supported by the current browser");

        if(!this.audioEngine.canUseWebAudio)
            console.log("Web Audio is not supported by the current browser");
    }

    static clear()
    {
        for (let a of this.audio)
            a.dispose();

        for (let a of this.audioTemplate)
            a.dispose();

        this.audio.clear();
        this.audioTemplate.clear();
    }

    static instantiate(name,dir)
    {
        let instant;
        if(this.audioTemplate.has(name))
        {
            instant = this.audioTemplate.get(name).clone();
            this.audio.push(instant);
        }
        else    
        {
            instant = new BABYLON.Sound(name, "./Assets/Audio/"+dir+"/"+name+".mp3", Game.scene, null);
            this.audioTemplate.set(name, instant);
        }
        return instant;
    }
}
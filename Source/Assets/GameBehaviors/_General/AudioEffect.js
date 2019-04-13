class AudioEffect
{
    constructor()
    {
        this.soundEffect = new SoundTrack();
        this.musicEffect = new SoundTrack();

        //================initialize sound and music====================
        this.backgroundMusic = new Music("Background");
        this.musicEffect.addSound(this.backgroundMusic);

        this.shootSound = new Sound("Shoot");
        this.boomSound = new Sound("Boom");
        this.hitPlayerSound = new Sound("HitPlayer");
        this.energySound = new Sound("Energy");
        this.soundEffect.addSound(this.shootSound);
        this.soundEffect.addSound(this.boomSound);
        this.soundEffect.addSound(this.hitPlayerSound);
        this.soundEffect.addSound(this.energySound);

        //================adding to event==============================
        GameEvent.addEvent("Shoot", this.onShoot.bind(this));
        GameEvent.addEvent("HitObstacle", this.onHitObstacle.bind(this));
        GameEvent.addEvent("HitPlayer", this.onHitPlayer.bind(this));
        GameEvent.addEvent("AddEnergy", this.onAddEnergy.bind(this));
        GameEvent.addEvent("GameOver", this.onGameOver.bind(this));
        GameEvent.addEvent("Restart", this.onRestart.bind(this));
        GameEvent.addEvent("SwitchSound", this.onSwitchSound.bind(this));
        GameEvent.addEvent("SwitchMusic", this.onSwitchMusic.bind(this));
    }

    //====================event callback functions======================
    onShoot() { this.shootSound.play(); }

    onHitObstacle() { this.boomSound.play(); }

    onHitPlayer() { this.hitPlayerSound.play(); }

    onAddEnergy(count) { if(count>0) this.energySound.play(); }

    onGameOver() 
    { 
        let rate = 1;
        this.slowDownAction = GameUI.addAction(()=>
        {
            rate -= GameTime.deltaSeconds*0.5;
            if(rate < 0)
            {
                this.backgroundMusic.pause();
                return 1;
            }
            this.backgroundMusic.rate = rate;
        });
    }

    onRestart() 
    { 
        GameUI.removeAction(this.slowDownAction);
        this.backgroundMusic.pause();
        this.backgroundMusic.rate = 1;
        this.backgroundMusic.play();
    }

    onSwitchSound()
    {
        this.soundEffect.volume = (this.soundEffect.volume == 1)? 0:1;
    }

    onSwitchMusic()
    {
        this.musicEffect.volume = (this.musicEffect.volume == 1)? 0:1;
    }
}
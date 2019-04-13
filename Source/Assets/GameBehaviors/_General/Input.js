class Input
{
    constructor()
    { 
        //flags
        this.pauseCounter = 0;
        this.startX = null;
        this.startY = null;

        this.height = Game.canvas.height * 0.5;
        this.width = Game.canvas.width * 0.5;
        this.touchRegion = 0.15 * this.height;

        this.touch = GameEvent.getEvent("Touch");
        this.drag = GameEvent.getEvent("Drag");
        this.release = GameEvent.getEvent("Release");
        Game.canvas.addEventListener("pointerdown", this.onPointerDown.bind(this), false);
        Game.canvas.addEventListener("pointermove", this.onPointerMove.bind(this), false);
        Game.canvas.addEventListener("pointerup", this.onPointerUp.bind(this), false);
        GameEvent.addEvent("ResumeGameInput", this.onResume.bind(this));
        GameEvent.addEvent("PauseGameInput", this.onPause.bind(this));
    }

    onPause() { ++this.pauseCounter; }
    onResume() { --this.pauseCounter; }

    onPointerDown()
    {
        if(this.pauseCounter!=0) 
            return;
        
        if(Game.scene.pointerY >= this.touchRegion)
        {
            this.startX = Game.scene.pointerX;
            this.startY = Game.scene.pointerY;
            this.touch.triggerEvent();
        }
    }

    onPointerMove()
    {
        if(this.startY && this.pauseCounter==0)
        {
            let x = Game.scene.pointerX - this.startX;
            let y = Game.scene.pointerY - this.startY;
            this.drag.triggerEvent(x/this.width,y/this.height);
        }
    }

    onPointerUp()
    {
        if(this.startY && this.pauseCounter==0)
        {
            this.startY = null;
            this.release.triggerEvent();
        }
    }
}


        
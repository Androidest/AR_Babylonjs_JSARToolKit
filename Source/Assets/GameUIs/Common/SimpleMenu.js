class SimpleMenu extends Rectangle
{
    constructor(switchEventName)
    {
        super(0,0,1,1);
        this.background = null;
        this.isVisible = false;
        this.isOn = false;
        
        this.bg = new Rectangle(0,0,1,1);
        this.bg.background = "black";
        this.bg.alpha = 0.65;
        this.addChild(this.bg);

        GameEvent.addEvent(switchEventName, this.switchMenu.bind(this));
    }

    switchMenu(isOn)
    {
        this.isVisible = isOn;
        
        if(isOn) 
            GameEvent.triggerEvent("PauseGameInput");
        else 
            GameEvent.triggerEvent("ResumeGameInput");
    }
}
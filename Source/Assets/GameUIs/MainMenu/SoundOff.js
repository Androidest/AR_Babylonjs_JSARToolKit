class SoundOff extends ImageRect
{
    constructor(imgName, eventName, label)
    {
        if(label)
        {
            let height = Game.canvas.height*0.1;
            let imgw = (height*0.8) + "px";
            let imgx = (height*0.3) + "px";
            super(imgx,0,imgw,imgw);
            this.label = label;
            this.labelText = label.text;
            GameEvent.addEvent(eventName, this.onSwitch1.bind(this));
        }
        else
        {
            super(0,0,1,1);
            GameEvent.addEvent(eventName, this.onSwitch2.bind(this));
        }
            
        this.setImage("Assets/Textures/UI/" + imgName + ".png");
        this.isVisible = false;
    }

    onSwitch1()
    {
        this.isVisible = !this.isVisible;
        if(this.isVisible)
            this.label.text = this.labelText + " Off";
        else
            this.label.text = this.labelText + " On";
    }

    onSwitch2()
    {
        this.isVisible = !this.isVisible;
    }
}
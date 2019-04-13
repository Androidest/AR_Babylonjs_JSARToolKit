class Output extends TextBlock
{
    constructor()
    {
        super(0,0,1,1);
        this.horizontalAlignment = AlignHCenter;
        this.verticalAlignment = AlignVCenter;
        this.fontSize = Game.canvas.width * 0.04;
    
        GameEvent.addEvent("out", this.onOutput.bind(this));
    }

    onOutput(text) { this.text = text+""; }
}
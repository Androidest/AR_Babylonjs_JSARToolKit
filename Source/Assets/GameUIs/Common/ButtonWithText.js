class ButtonWithText extends Button
{
    constructor(x, y, w, h, imgName, labelName, eventName)
    {
        super(x+"px", y+"px", w+"px", h+"px"); 
        this.background = null;
        
        let imgw = (h*0.8) + "px";
        let imgx = (h*0.3) + "px";
        let img = new ImageRect(imgx,0,imgw,imgw); 
        img.setImage("Assets/Textures/UI/" + imgName);

        let fontSize = h*0.35;
        this.label = new TextBlock((h*1.5) + "px", 0, 1, 1);
        this.label.text = labelName;
        this.label.textHorizontalAlignment = AlignLeft;
        this.label.fontSize = fontSize;
        this.label.fontStyle = "bold";
        this.label.fontFamily = "MainFont";

        this.addChild(img);
        this.addChild(this.label);
        this.addOnClick(function(){GameEvent.triggerEvent(eventName)});
    }
}
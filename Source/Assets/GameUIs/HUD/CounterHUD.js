class CounterHUD extends Rectangle
{
    constructor(x,y,w,h,imgName)
    {
        let fontSize = h*0.8;
        let imSize = fontSize * 0.9 +"px";

        super(x+"px", y+"px", w+"px", h+"px");
        this.background = "#444444";
        this.alpha = 0.7;
        this.cornerRadius = fontSize * 0.5;

        let img = new ImageRect(h*0.3+"px", h*0.14+"px", imSize, imSize);
        img.setImage(imgName);
        this.addChild(img);

        this.numb = new TextBlock(0, 0, 0.95, 1);
        this.numb.fontStyle = "bold";
        this.numb.fontFamily = "MainFont";
        this.numb.fontSize = fontSize;
        this.numb.textHorizontalAlignment = AlignRight;
        this.addChild(this.numb);
    }

    setText(text) { this.numb.text = text; }
    setColor(color) { this.numb.color = color; }
}
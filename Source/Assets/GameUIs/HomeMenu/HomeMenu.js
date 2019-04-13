class HomeMenu extends SimpleMenu
{
    constructor()
    {
        super("HomeMenu");

        this.initTitle(0.2);

        let tap = new TextBlock(0, "65%", 1, 0.2);
        tap.fontStyle = "bold";
        tap.fontFamily = "MainFont";
        tap.color = "#4DD874"
        tap.fontSize = Game.canvas.width*0.05;
        tap.textHorizontalAlignment = AlignHCenter;
        tap.textVerticalAlignment = AlignVCenter;
        tap.text = "Tap to start\n\n点击开始"
        this.addChild(tap);

        let name = new TextBlock(0, 0, 0.97, 0.97);
        name.fontStyle = "bold";
        name.fontFamily = "MainFont";
        name.fontSize = Game.canvas.width*0.05;
        name.textHorizontalAlignment = AlignRight;
        name.textVerticalAlignment = AlignBottom;
        name.text = "作者：梁俊华\n\n林侑贞"
        this.addChild(name);

        this.addOnClick(()=>GameEvent.triggerEvent("HomeMenu", false));
    }

    initTitle(y)
    {
        let titlex = Game.canvas.width*0.15;
        let titley = Game.canvas.height*y;
        let titlew = Game.canvas.width*0.7;
        let titleh = titlew/334*316;
        let title = new ImageRect(titlex + "px", titley + "px", titlew + "px", titleh + "px");
        title.setImage("Assets/Textures/UI/title.png");
        this.addChild(title);
    }
}
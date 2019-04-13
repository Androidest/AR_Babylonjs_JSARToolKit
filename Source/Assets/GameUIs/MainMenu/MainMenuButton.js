class MainMenuButton extends Button
{
    constructor()
    {
        let height = Game.canvas.height*0.1;
        super(0, 0, height*1.5+"px", height+"px"); 
        this.background = null;
        
        let imgx = (height*0.4) + "px";
        let imgy = (height*0.3) + "px";
        let imgw = (height*0.5) + "px";
        let imgh = (height*0.4) + "px";

        let img = new ImageRect(imgx,imgy,imgw,imgh);
        img.setImage("Assets/Textures/UI/main_menu_button.png");

        this.isOn = false;
        this.addChild(img);
        this.addOnClick(()=>
        {
            this.isOn = !this.isOn;
            GameEvent.triggerEvent("MainMenu", this.isOn);
        });
    }
}
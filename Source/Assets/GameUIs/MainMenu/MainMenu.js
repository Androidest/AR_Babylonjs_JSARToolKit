class MainMenu extends SimpleMenu
{
    constructor()
    {
        super("MainMenu");
        this.initButtons();
    }

    initButtons()
    {
        let bheight = Game.canvas.height*0.1;
        let imgName = ["music_on_icon.png", "sound_on_icon.png","share_icon.png"];
        let labelName = ["Music", "Sound","Share"];
        let eventName = ["SwitchMusic", "SwitchSound","Share"];

        for(let i=0; i<3; ++i)
        {
            let button = new ButtonWithText(0, bheight*(i+1), Game.canvas.width, bheight, imgName[i], labelName[i], eventName[i]);
            this.addChild(button);
            if( i == 0 )  button.addChild(new SoundOff("music_off_icon", eventName[0], button.label));
            if( i == 1 )  button.addChild(new SoundOff("sound_off_icon", eventName[1], button.label));
        }
    }
}
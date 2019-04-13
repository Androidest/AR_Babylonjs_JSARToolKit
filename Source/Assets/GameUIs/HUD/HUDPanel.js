class HUDPanel extends Rectangle
{
    constructor()
    {
        let height = Game.canvas.height;
        
        super(0, 0, 1, 1);
        this.background = null;

        let h = height * 0.05;
        let w = h * 3;

        this.picNumb = new CounterHUD("-5%", "3.7%", w, h, "Assets/Textures/UI/pic.png");
        this.picNumb.horizontalAlignment = AlignRight;
        this.picNumb.setText("--");
        this.addChild(this.picNumb);

        this.chinese = new TextBlock(0, "68%", 1, 0.3);
        this.chinese.fontStyle = "bold";
        this.chinese.fontFamily = "MainFont";
        this.chinese.fontSize = Game.canvas.width*0.07;
        this.chinese.textHorizontalAlignment = AlignHCenter;
        this.chinese.textVerticalAlignment = AlignVCenter;
        this.chinese.shadowBlur = Game.canvas.width*0.07;
        this.chinese.shadowColor = "#000000";
        this.chinese.text = "中文翻译";
        this.addChild(this.chinese);
        
        this.english = new TextBlock(0, "75%", 1, 0.3);
        this.english.fontStyle = "bold";
        this.english.fontFamily = "MainFont";
        this.english.fontSize = Game.canvas.width*0.07;
        this.english.textHorizontalAlignment = AlignHCenter;
        this.english.textVerticalAlignment = AlignVCenter;
        this.english.shadowBlur = Game.canvas.width*0.07;
        this.english.shadowColor = "#000000";
        this.english.text = "ENGLISH";
        this.addChild(this.english);

        this.onRestart();

        w *= 0.5;
        h = w * 1.4;
        this.prev = new Button("2%", "80%", w+"px", h+"px");
        let img = new ImageRect(0,0,1,1);
        img.setImage("Assets/Textures/UI/prev.png");
        img.alpha = 0.3;
        this.prev.addChild(img);
        this.prev.background = null;
        this.prev.addOnClick(()=>{if(--this.curPic<0) this.curPic = 0; this.onChangeModel();});
        this.addChild(this.prev);

        this.next = new Button("85%", "80%", w+"px", h+"px");
        img = new ImageRect(0,0,1,1);
        img.setImage("Assets/Textures/UI/next.png");
        img.alpha = 0.3;
        this.next.addChild(img);
        this.next.background = null;
        this.next.addOnClick(()=>{if(++this.curPic==this.maxPic) this.curPic=this.maxPic-1; this.onChangeModel();});
        this.addChild(this.next);
    
        GameEvent.addEvent("HomeMenu", this.onHide.bind(this));
        GameEvent.addEvent("Restart", this.onRestart.bind(this));
    }

    initModels()
    {
        this.curPic = 0;
        this.enWords = ["Temple", "House", "Tree", "Car", "Ancient Building"];
        this.cnWords = ["寺庙", "房子", "树", "汽车", "古代建筑"];
        this.maxPic = this.enWords.length;
        this.models = [];
        for( let name of this.enWords )
        {
            let model = GameObject.findByName(name);
            model.isSelected = false;
            this.models.push(model);
        }
        this.curModel = this.models[0];
        this.onChangeModel();
    }

    onRestart(isContinue)
    {
        this.initModels();
        this.picNumb.setText("0");
        this.isVisible = true;
    }

    onHide(isHomeMenuOn)
    {
        this.isVisible = !isHomeMenuOn;
    }

    onChangeModel()
    {
        this.picNumb.setText(this.curPic.toString());
        this.english.text = this.enWords[this.curPic];
        this.chinese.text = this.cnWords[this.curPic];
        this.curModel.isSelected = false;
        this.curModel = this.models[this.curPic];
        this.curModel.isSelected = true;
    }
}
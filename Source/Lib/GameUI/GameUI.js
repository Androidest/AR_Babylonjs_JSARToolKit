class GameUI
{
    //===========static canvas=============================
    static set canvas(value) { this._canvas = value; }
    static get canvas() { return this._canvas; }

    //===========static action list=============================
    static set actionList(value) { this._list = value; }
    static get actionList() { return this._list; }

    //===========static action list=============================
    static set actionNames(value) { this._nameList = value; }
    static get actionNames() { return this._nameList; }

    static init() 
    {
        this.canvas = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("GameUI");
        this.actionList = new Array();
        this.actionIDCounter = 0;
    }

    static addChild(control) { this.canvas.addControl(control); }

    static addAction(action)
    {
        action.actionId = ++this.actionIDCounter;
        this.actionList.push(action);
        return this.actionIDCounter;
    }

    static removeAction(id)
    {
        if(id == undefined) return;

        for(let i = 0; i<this.actionList.length; ++i)
        {
            if(this.actionList[i].actionId == id)
            {
                this.actionList.splice(i,1);
                return;
            }
        }
    }

    static update()
    {
        for(let i = this.actionList.length -1; i >= 0 ; --i)
            if(this.actionList[i]() != undefined)
                this.actionList.splice(i,1);
    }
}

//================ Alignment =============================
let AlignTop = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
let AlignLeft = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
let AlignBottom = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
let AlignRight = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
let AlignHCenter = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
let AlignVCenter = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
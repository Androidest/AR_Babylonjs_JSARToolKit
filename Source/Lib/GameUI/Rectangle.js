//================= Rectangle ================================
class Rectangle extends BABYLON.GUI.Rectangle
{
    constructor(x,y,w,h)
    { 
        super(); 
        this.name = "";
        this.horizontalAlignment = AlignLeft;
        this.verticalAlignment = AlignTop;
        this.left = x;
        this.top = y;
        this.width = w;
        this.height = h;
        this.widthInPixels;
        this.heightInPixels;

        this.paddingTop = 0;
        this.paddingLeft = 0;
        this.paddingRight = 0;
        this.paddingBottom = 0;

        this.alpha = 1;
        this.isVisible = true;

        this.color = "black";
        this.fontStyle = "";
        this.fontSize = 18;

        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.transformCenterX = 0.5;
        this.transformCenterY = 0.5;

        this.shadowOffsetX = 0;
        this.shadowOffsetY = 0;
        this.shadowColor = "#000";
        this.shadowBlur = 0;

        this.adaptWidthToChildren = false;
        this.adaptHeightToChildren = false;
        this.thickness = 0;
        this.cornerRadius = 0;
        this.background = "white";
    }
    
    setPosition(pos) { this.left = pos.x; this.top = pos.y; }

    addOnClick(func){ this.onPointerUpObservable.add(func); }
    removeOnClick(func){ this.onPointerUpObservable.remove(func); }

    addOnTouch(func) { this.onPointerDownObservable.add(func); }
    removeOnTouch(func){ this.onPointerDownObservable.remove(func); }

    addOnOver(func){ this.onPointerMoveObservable.add(func); }
    removeOnOver(func){ this.onPointerMoveObservable.remove(func); }

    addChild(child) {this.addControl(child);}
    findChildByName(name) { return this.getChildByName(name);}
}
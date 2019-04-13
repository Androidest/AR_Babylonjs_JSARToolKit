//================= TextBlock ================================
class TextBlock extends BABYLON.GUI.TextBlock
{
    constructor(x,y,w,h)
    { 
        super(); 
        this.name = "";
        this.horizontalAlignment = AlignLeft;
        this.verticalAlignment = AlignTop;
        this.left = (x==undefined)?0:x;
        this.top = (y==undefined)?0:y;
        this.width = (w==undefined)?1:w;
        this.height = (h==undefined)?1:h;
        this.widthInPixels;
        this.heightInPixels;

        this.paddingTop = 0;
        this.paddingLeft = 0;
        this.paddingRight = 0;
        this.paddingBottom = 0;

        this.alpha = 1;
        this.isVisible = true;

        this.color = "white";
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

        this.text = "";
        this.textHorizontalAlignment = AlignHCenter;
        this.textVerticalAlignment = AlignVCenter;
        this.textWrapping = false;
        this.resizeToFit = false;
    }
    
    setPosition(pos) { this.left = pos.x; this.top = pos.y; }

    addOnClick(func){ this.onPointerUpObservable.add(func); }
    removeOnClick(func){ this.onPointerUpObservable.remove(func); }

    addOnOver(func){ this.onPointerMoveObservable.add(func); }
    removeOnOver(func){ this.onPointerMoveObservable.remove(func); }

    setTextAlignment(horizontal,vertical) 
    {
        this.textHorizontalAlignment = horizontal;
        this.textVerticalAlignment = vertical;
    }
}
//================= Image ================================
class ImageRect extends BABYLON.GUI.Image
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
    }
    
    setPosition(pos) { this.left = pos.x; this.top = pos.y; }

    addOnClick(func){ this.onPointerUpObservable.add(func); }
    removeOnClick(func){ this.onPointerUpObservable.remove(func); }

    addOnOver(func){ this.onPointerMoveObservable.add(func); }
    removeOnOver(func){ this.onPointerMoveObservable.remove(func); }

    setImage(img,x,y,w,h)
    {
        this.source = img;
        this.sourceLeft = (x==undefined)?null:x;
        this.sourceTop = (y==undefined)?null:y;
        this.sourceWidth = (w==undefined)?null:w;
        this.sourceHeight = (h==undefined)?null:h;
    }
}
class GameBehavior
{
    //===========list=======================
    static set list(value) { this._list = value; }
    static get list() { return this._list; }

    static set isEnabled(value) { this._isEnabled = value; }
    static get isEnabled() { return this._isEnabled; }

    static init()
    {
        this.list = new Array();
        this._isEnabled = true;
    }

    static add(object, behaviorClass, ...arg)
    {
        let behavior = new behaviorClass(object);
        behavior.start(...arg);
        this.list.push(behavior);
        object.behaviors.push(behavior);
    }

    static clone(src, dest)
    {
        dest.behaviors.length = 0;
        for(let behavior of src.behaviors)
        {
            if(behavior.clone)
            {
                let b = new behavior.constructor(dest);
                b.clone(behavior);
                this.list.push(b);
                dest.behaviors.push(b);
            }
        }
    }

    static update()
    {
        if (!this._isEnabled)
            return;

        for (let behavior of this.list)
            if(behavior.isEnabled && behavior.isObjectEnabled)
                behavior.update();
    }
}

class BehaviorScript
{
    constructor(obj)
    {
        this._object = obj;
        this._isEnabled = true;
    }

    //===========interfaces=================
    start(){}
    update(){}
    addOnCollide(func) { this._object.physicsImpostor.registerOnPhysicsCollide(func); }
    removeOnCollide(func) { this._object.physicsImpostor.unregisterOnPhysicsCollide(func); }

    //===========name=======================
    get object() { return this._object; }
    
    //===========name=======================
    set objectName(value) { this._object.name = value; }
    get objectName() { return this._object.name; }

    //===========parent=======================
    set parent(value) { this._object.parent = value; }
    get parent() { return this._object.parent; }

    //===========isVisible=======================
    set isVisible(value) { this._object.isVisible = value; }
    get isVisible() { return this._object.isVisible; }

    //===========isObjectEnabled=======================
    set isObjectEnabled(value) { this._object.setEnabled(value); }
    get isObjectEnabled() { return this._object.isEnabled(true); }

    //===========isEnabled=======================
    set isEnabled(value) { this._isEnabled = value; }
    get isEnabled() { return this._isEnabled; }

    //===========isPickable=======================
    set isPickable(value) { this._object.isPickable = value; }
    get isPickable() { return this._object.isPickable; }

    //===========receiveShadows=======================
    set receiveShadows(value) { this._object.receiveShadows = value; }
    get receiveShadows() { return this._object.receiveShadows; }

    //===========showBoundingBox=======================
    set showBoundingBox(value) { this._object.showBoundingBox = value; }
    get showBoundingBox() { return this._object.showBoundingBox; }

    //===========renderOutline=======================
    set renderOutline(value) { this._object.renderOutline = value; }
    get renderOutline() { return this._object.renderOutline; }

    //===========outlineColor=======================
    set outlineColor(value) { this._object.outlineColor = value; }
    get outlineColor() { return this._object.outlineColor; }

    //===========outlineWidth=======================
    set outlineWidth(value) { this._object.outlineWidth = value; }
    get outlineWidth() { return this._object.outlineWidth; }

    //===========forward=======================
    set forward(value) { this._object.forward = value; }
    get forward() { return this._object.forward; }

    //===========right=======================
    set right(value) { this._object.right = value; }
    get right() { return this._object.right; }

    //===========up=======================
    set up(value) { this._object.up = value; }
    get up() { return this._object.up; }

    //===========position=======================
    set position(value) { this._object.position = value; }
    get position() { return this._object.position; }

    //===========rotation=======================
    set rotation(value) { this._object.rotation = value; }
    get rotation() { return this._object.rotation; }
    set rotationQuaternion(value) { this._object.rotationQuaternion = value; }
    get rotationQuaternion() { return this._object.rotationQuaternion; }
    rotate(rotateAxis, angle, space) { this._object.rotate(rotateAxis, angle, space); }
    rotateAround(rotatePoint, rotateAxis, rotateAngle) { this._object.rotateAround(rotatePoint, rotateAxis, rotateAngle); }

    //===========scale=======================
    set scaling(value) { this._object.scaling = value; }
    get scaling() { return this._object.scaling; }

    //===========scale determinant=======================
    set scalingDeterminant(value) { this._object.scalingDeterminant = value; }
    get scalingDeterminant() { return this._object.scalingDeterminant; }

    //===========visibility=======================
    set visibility(value) { this._object.visibility = value; }
    get visibility() { return this._object.visibility; }

    //===========rigidbody=======================
    set rigidbody(value) { this._object.physicsImpostor = value; }
    get rigidbody() { return this._object.physicsImpostor; }

    //===========material=======================
    set material(value) { this._object.material = value; }
    get material() { return this._object.material; }

    //===========material=======================
    set animations(value) { this._object.animations = value; }
    get animations() { return this._object.animations; }

    //functions
    //===========events==========================
    addEvent(eventName, eventAction) { this._object.addEvent(eventName, eventAction); }
    removeEvent(eventName, eventAction) { this._object.removeEvent(eventName, eventAction); }
    triggerEvent(eventName, ...agr) { this._object.triggerEvent(eventName, ...agr); }

    //===========WorldMatrix=========================
    unfreezeWorldMatrix() { this._object.unfreezeWorldMatrix(); }
    freezeWorldMatrix() { this._object.freezeWorldMatrix(); }
}
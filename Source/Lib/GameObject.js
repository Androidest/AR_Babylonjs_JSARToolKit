class GameObject
{  
    //======================functions used by the framework================
    static init()
    {
        this.shadowGenerators = new Array();
        for(let l of Game.scene.lights)
        {
            let shadowGenerator = l.getShadowGenerator();
            if(shadowGenerator) 
                this.shadowGenerators.push(shadowGenerator);
        }

        for(let obj of Game.scene.cameras) 
            this.overrideObject(obj);
        for(let obj of Game.scene.meshes) 
            this.overrideObject(obj);
        for(let obj of Game.scene.lights) 
            this.overrideObject(obj);
    }

    static overrideObject(obj)
    {
        //object local events
        obj.events = new Map();
        obj.getEvent = GameEvent.getEvent;
        obj.addEvent = GameEvent.addEvent;
        obj.removeEvent = GameEvent.removeEvent;
        obj.triggerEvent = GameEvent.triggerEvent;
        obj.isDynamic = ()=>obj.events.size != 0;
        obj.addBehavior = (behaviorClass, ...arg)=>GameBehavior.add(obj, behaviorClass, ...arg);
    }

    static duplicate(obj, name, isCastShadow, parent, cloneFunc)
    {
        if(name == undefined)
            name = obj.name + "_clone";

        let temp = cloneFunc(obj, name, parent);

        if(isCastShadow)
            for(let s of this.shadowGenerators)
                s.addShadowCaster(temp);
        
        if(parent)
            temp.parent = parent;

        this.overrideObject(temp);
        GameBehavior.clone(obj, temp);
    
        for (let child of obj.getDescendants()) 
            this.duplicate(child, child.name, isCastShadow, temp, cloneFunc);
        
        return temp;
    }

    //===============================functions used by users=========================================
    //____________cloning method__________________
    //different transformation, different material, same mesh
    static clone(obj, name, isCastShadow, parent) 
    {
        let cloneFunc = function(_obj, _name, _parent)
        {
            return _obj.clone(_name, _parent, true);
        }
        return this.duplicate(obj, name, isCastShadow, parent, cloneFunc);
    }

    //____________instantiate method____________
    //different transformation, same material, same mesh
    static instantiate(obj, name, isCastShadow, parent)
    {
        let cloneFunc = function(_obj, _name, _parent)
        {
            let temp = _obj.createInstance(_name);
            if(_obj.physicsImpostor)
                temp.physicsImpostor = _obj.physicsImpostor.clone(temp);
            return temp;
        }
        return this.duplicate(obj, name, isCastShadow, parent, cloneFunc);
    }

    //________________________to find template________________________
    static findByName(name)
    {
        let scene = Game.scene;
        let obj = scene.getMeshByName(name);
        if (obj==null) obj = scene.getCameraByName(name);
        if (obj==null) obj = scene.getLightByName(name);
        if (obj==null) obj = scene.getMaterialByName(Game.modelName+'.'+name);
        if (obj==null) 
        {
            console.error("Object Named '" + name + "' Not Found!");
            return null;
        }
        this.overrideObject(obj);
            
        return obj;
    }

    static destroyByName(name)
    {
        let obj = this.findByName(name);
        if(obj)
            obj.dispose();
    }
}
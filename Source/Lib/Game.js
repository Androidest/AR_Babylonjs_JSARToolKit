//=======Stephen Loading Screen========================
class StephenLoadingScreen
{
    displayLoadingUI() {}
    hideLoadingUI() {}
}

class Game
{
    //===========static Babylon engine=======================
    static set gameName(value) { this._gameName = value; }
    static get gameName() { return this._gameName; }

    //===========static Babylon engine=======================
    static set devState(value) { this._devState = value; }
    static get devState() { return this._devState; }

    //===========static Babylon engine=======================
    static set engine(value) { this._engine = value; }
    static get engine() { return this._engine; }

    //===========static canvas=============================
    static set canvas(value) { this._canvas = value; }
    static get canvas() { return this._canvas; }

    //===========static current scene======================
    static set scene(value) { this._scene = value; }
    static get scene() { return this._scene; }

    //===========static Babylon engine=======================
    static set ui(value) { this._ui = value; }
    static get ui() { return this._ui; }
    
    //===========static current level======================
    static set level(value) { this._level = value; }
    static get level() { return this._level; }

    //===========static player camera view======================
    static set playerView(value) { this._playerView = value; this._scene.activeCamera = value; }
    static get playerView() { return this._playerView; }

    //===========static fps====================================
    static get fps() { return this.engine.getFps().toString(); }

    //===========initialize the Game======================
    static run(uiName, levelName)
    { 
        FBInterface.setLoadingProgress(55);
        
        this.canvas = document.getElementById("Stephen_Game_Canvas");
        this.engine = new BABYLON.Engine(this.canvas, false, { limitDeviceRatio: 2 }, false);
        this.engine.setHardwareScalingLevel(0.5);
        this.engine.resize();
        this.engine.loadingScreen = new StephenLoadingScreen();
        this.engine.displayLoadingUI();
        this.engine.enableOfflineSupport = true;
        this.ui = new uiName();
        this.level = new levelName();
        FBInterface.setLoadingProgress(73);
          
        BABYLON.SceneLoader.Load('Assets/Models/', "AllModels.babylon", this.engine, this.onLoadSuccess.bind(this)); //load scene
    }

    //===========callback function call on loading start===========================
    static onLoadSuccess(scene)
    {
        this.scene = scene;
        FBInterface.setLoadingProgress(82);
        this.scene.executeWhenReady(this.initGame.bind(this));
    }

    static initGame()
    {
        FBInterface.setLoadingProgress(90);
        GameEvent.init();
        GameAudio.init();
        GameBehavior.init();
        GameUI.init();
        GameObject.init();
        GameTime.init();

        this.ui.start();
        this.level.start();
        this.changeSamplingMode();
        FBInterface.setLoadingProgress(100);

        this.engine.runRenderLoop(() =>
        { 
            this.scene.render(); // run the render loop
            GameBehavior.update();
            GameUI.update();
        });

        this.engine.hideLoadingUI();
        FBInterface.startGameAsync();
    }

    static changeSamplingMode()
    {
        for(let texture of this.scene.textures)
            texture.updateSamplingMode(4);
    }
}

class Vector2 extends BABYLON.Vector2 {}
class Vector3 extends BABYLON.Vector3 {}

class Angle extends BABYLON.Angle 
{
    static createDegrees(number) { return this.FromDegrees(number); }
    static createRadians(number) { return this.FromRadians(number); }
    static betweenPoints(point1, point2) { return this.BetweenTwoPoints(point1, point2); }
    static betweenVectors(vector1, vector2) 
    { 
        let zero = Vector2.Zero();
        let rad1 = this.BetweenTwoPoints(zero, vector1).radians(); 
        let rad2 = this.BetweenTwoPoints(zero, vector2).radians(); 
        return this.FromRadians(rad2 - rad1);
    }
}
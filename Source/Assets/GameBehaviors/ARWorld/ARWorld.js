class ARWorld extends BehaviorScript
{
    start()
    {   
        this.isEnabled = false;
        this.isVisible = false;
        this.isDetected = false;
        this.worldMatrix = new BABYLON.Matrix();
        this.markerMatrix = new Float64Array(12);
        this.rotationQuaternion = new BABYLON.Quaternion(0,0,0,0);
        Game.scene.useRightHandedSystem = false;
        Game.scene.autoClear = false;
        
        this.video = ARController.getUserMedia(
        {
            maxARVideoSize: 320, // do AR processing on scaled down video of this size
            facing: "environment",
            onSuccess:()=>
            {
                this.cameraParam = new ARCameraParam();
                this.cameraParam.onload = this.onInit.bind(this);
                this.cameraParam.load('Assets/GameBehaviors/ARWorld/camera_para.dat');
            }
        });
    }

    onInit()
    {
        this.isEnabled = true;
        
        let background = new BABYLON.Layer("back", "", Game.scene, true);
        background.texture = new BABYLON.VideoTexture("Background", this.video, Game.scene);
        let width = this.video.videoWidth;
        let height = this.video.videoHeight;
        let ratio = Game.canvas.width/(Game.canvas.height * (width/height));                                                                                                                                                                                                       width/Game.canvas.height;
        background.texture.uScale = ratio; 
        background.texture.uOffset = 0.5-ratio*0.5;

        this.arController = new ARController(width/3, height/3, this.cameraParam);
        this.arController.setPatternDetectionMode(artoolkit.AR_MATRIX_CODE_DETECTION);
    }
    
    update()
    {
        this.arController.detectMarker(this.video);
        var markerNum = this.arController.getMarkerNum(); 

        if (markerNum > 0) 
        {
            if (this.isDetected) 
                this.arController.getTransMatSquareCont(0, 1, this.markerMatrix, this.markerMatrix);
            else 
                this.arController.getTransMatSquare(0 /* Marker index */, 1 /* Marker width */, this.markerMatrix);

            this.toGLMat();
            this.position.x = this.worldMatrix.m[12];
            this.position.y = this.worldMatrix.m[13];
            this.position.z = this.worldMatrix.m[14];
            this.rotationQuaternion.fromRotationMatrix(this.worldMatrix.getRotationMatrix());

            this.isDetected = true;
            this._object.getChildMeshes().forEach((mesh) =>
            { 
                if(mesh.isSelected) 
                    mesh.isVisible = true;
                else
                    mesh.isVisible = false;
            });
        } 
        else 
        {
            this.isDetected = false;
            this._object.getChildMeshes().forEach(function (mesh) { mesh.isVisible = false; });
        }
    }

    toGLMat()
    {
        let w = this.worldMatrix.m;
        let m = this.markerMatrix;

        w[0] = m[0];
        w[1] = -m[4];
        w[2] = m[8];
        w[3] = 0;
        w[4] = m[1];
        w[5] = -m[5];
        w[6] = m[9];
        w[7] = 0;
        w[8] = -m[2];
        w[9] = m[6];
        w[10] = -m[10];
        w[11] = 0;
        w[12] = m[3];
        w[13] = -m[7];
        w[14] = m[11];
        w[15] = 1;
    }
}
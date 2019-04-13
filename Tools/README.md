Basketball Instant Game - Developed by Stephen Interactive
using Unity 5 Engine

## max texture size for mobile WebGL
safe limit: 2048*2048 px
medium gpu: 4096*4096 px
huawei honor 4096 limit

## settings.json: vscode settings for disable name completion (enable only Intellisense)
{
    "git.enabled": false,
    "javascript.nameSuggestions": false,
    "javascript.suggestionActions.enabled": true
}

## jsconfig.json for custom js code intellisense
{
    "compilerOptions": {
        "target": "ES6"
    },

    "include": [
        "Assets/**/*"
    ],

    "exclude": [
        "node_modules/**/*"
    ]
}

## NPM install babylon.js for typing intellisense

BabylonJS and its modules are published on NPM with full typing support. To install use

npm init -y
npm install babylonjs --save

This will allow you to import BabylonJS entirely using:
import * as BABYLON from 'babylonjs';

or individual classes using:
import { Scene, Engine } from 'babylonjs';

If using TypeScript, don't forget to add 'babylonjs' to 'types' in tsconfig.json:
```
    ....
    "types": [
        "babylonjs",
        "anotherAwesomeDependency"
    ],
    ....
```
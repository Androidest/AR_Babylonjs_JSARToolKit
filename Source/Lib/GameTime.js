//========to get the time and delta time between frames======
class GameTime
{
    //===============functions used by the framework=========
    static init()
    {
        this.engine = Game.engine;
    }

    //==============functions for the user=======================
    static get deltaMiliseconds() { return this.engine.getDeltaTime(); } //to get delta time in miliseconds between two frames
    static get deltaSeconds() { return this.engine.getDeltaTime()/1000.0; } //to get delta time in seconds between two frames
    static get time() { return window.performance.now(); } //get the time elapse since the time origin
}
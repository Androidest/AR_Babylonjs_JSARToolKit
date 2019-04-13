//===================class to register and trigger events===================
//=========and also passing messages globally between objects or modules==============
class GameEvent
{  
    //======================functions used by the framework================
    static init()
    {
        this.events = new Map();
    }

    //====================functions for the user=======================
    //[eventName] to mark a kind of event for later triggering, 
    //[eventAction] to pass the corresponding action function
    static getEvent(eventName)  
    {
        let event;
        if(!this.events.has(eventName))
        {
            event = new Array();
            this.events.set(eventName,event);
        }
        else event = this.events.get(eventName);

        event.triggerEvent = function(...agr)
        {
            for(let e of this)
                e(...agr);
        }
        return event;
    }

    static addEvent(eventName, eventAction)  
    {
        this.getEvent(eventName).push(eventAction);
    }

    static removeEvent(eventName, eventAction)
    {
        if(this.events.has(eventName))
        {
            let event = this.events.get(eventName);
            var index = event.indexOf(eventAction);
            if (index > -1)
                array.splice(index, 1);
        }
    }

    static triggerEvent(eventName, ...arg) //[...arg] can pass different numbers of arguments
    {
        if(this.events.has(eventName))
            this.events.get(eventName).triggerEvent(...arg);
    }
}
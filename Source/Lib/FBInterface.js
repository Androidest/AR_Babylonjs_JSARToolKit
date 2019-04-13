class FBInterface
{
    static init()
    {        
        if(FBInstant != undefined)
        {
            FBInstant.initializeAsync()
            .then(()=>FBInstant.setLoadingProgress(40));

            this.setLoadingProgress = FBInstant.setLoadingProgress.bind(FBInstant);
            this.switchGameAsync = FBInstant.switchGameAsync.bind(FBInstant);
            this.getSignedPlayerInfoAsync = FBInstant.player.getSignedPlayerInfoAsync.bind(FBInstant);

            this.sharePayload = 
            {
                intent: 'CHALLENGE',
                image: null,
                text: null,
                data: { mydata:""}
            };

            this.updatePayload = 
            {
                action: "CUSTOM",
                cta: "HELP THEM!!",
                template: "Get Help",
                image: null,
                text: null,
                data: { mydata:"" },
                strategy: "IMMEDIATE_CLEAR",
                notification: "NO_PUSH"
            };

            this.helpList = new Array();
        }
        else
        {
            this.startGameAsync = ()=>{};
            this.setLeaderboard = ()=>{};
            this.setLoadingProgress = ()=>{};
            this.switchGameAsync = ()=>{};
            this.getSignedPlayerInfoAsync = ()=>{};
            this.share = ()=>{};
            this.playFriends = ()=>{};
        }        
        this.playerName = "--";
        this.playerPhoto = null;
        this.requestTime = 1;
        this.maxRequestTime = 3;
    }

    static startGameAsync()
    {
        FBInstant.startGameAsync().then(this.initPlayerInfo.bind(this));
    }

    static initPlayerInfo()
    {
        this.playerName = FBInstant.player.getName();
        this.playerPhoto = FBInstant.player.getPhoto();
        GameEvent.triggerEvent("UpdatePlayerInfo", this.playerPhoto, this.playerName);
    }

    static setLeaderboard(leaderboardName, func)
    {
        FBInstant
        .getLeaderboardAsync(leaderboardName)
        .then(leaderboard => 
        {   
            this.requestTime = 1;
            func(leaderboard);
        })
        .catch(error => 
        {  
            console.error(error);
            if(++this.requestTime > this.maxRequestTime)
            {
                this.requestTime = 1;
                console.error("Request time-out, Failed to load leaderboard")
            }
            else this.setLeaderboard(leaderboardName, func);
        });
    }

    static share(message, image)
    {
        this.sharePayload.text = message;
        this.sharePayload.image = image;
        FBInstant.shareAsync(this.sharePayload);
    }

    static playFriends(message, image, successFunc, sameContextFunc)
    {
        this.updatePayload.text = message;
        this.updatePayload.image = image;
        if(successFunc == undefined) successFunc = ()=>{};
        if(sameContextFunc == undefined) sameContextFunc = ()=>{};

        FBInstant.context.chooseAsync()
        .then(() =>
        {
            successFunc();
            FBInstant.updateAsync(this.updatePayload);
        })
        .catch((error)=>
        {
            if(error.code == "SAME_CONTEXT")
                sameContextFunc();
        });
    }

    static playFriends_2(message, image, successFunc, sameContextFunc)
    {
        this.updatePayload.text = message;
        this.updatePayload.image = image;
        if(successFunc == undefined) successFunc = ()=>{};
        if(sameContextFunc == undefined) sameContextFunc = ()=>{};

        FBInstant.context.chooseAsync({ filters: ['NEW_CONTEXT_ONLY', 'NEW_PLAYERS_ONLY'], minSize: 3 })
        .then(() =>
        {
            this.getContexPlayer((player)=>
            {
                let name = player.getName();
                if(!this.helpList.includes(name))
                {
                    this.helpList.push(name);
                    successFunc(player);
                    FBInstant.updateAsync(this.updatePayload);
                }
                else sameContextFunc(player);
            });
        })
        .catch((error)=>
        {
            if(error.code == "SAME_CONTEXT")
                this.getContexPlayer(sameContextFunc);
        });
    }

    static getContexPlayer(func)
    {
        FBInstant.context.getPlayersAsync()
        .then((players)=>
        {
            if(players[0].getName() != this.playerName)
                func(players[0]);
            else 
                func(players[1]);
        })
    }
}

FBInterface.init();
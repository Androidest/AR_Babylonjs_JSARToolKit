class Score
{
    //=============initialize Score===========================
    constructor()
    {
        this.score = 0;
        this.bestScore = "--";
        this.rank = "--";

        this.requestNumb = 5;
        this.leaderboardName = "HighScore";
        FBInterface.setLeaderboard(this.leaderboardName, this.readScore.bind(this));

        GameEvent.addEvent("GetScore", this.getBestScore.bind(this));
        GameEvent.addEvent("GetBestScore", this.getBestScore.bind(this));
        GameEvent.addEvent("Restart", this.onRestart.bind(this));
        GameEvent.addEvent("AddScore", this.onAddScored.bind(this));
        GameEvent.addEvent("AddEnergy", this.onAddEnergy.bind(this));
        GameEvent.addEvent("GameOver", this.onGameOver.bind(this));

        this.scored = GameEvent.getEvent("Scored");
        this.setEnergy = GameEvent.getEvent("SetEnergy");    
    }

    //===============Game event====================
    getBestScore(func) { func(this.bestScore); }
    getScore(func) { func(this.score); }

    onRestart() 
    {  
        GameEvent.triggerEvent("FetchPromotedGames");
        this.score = 0; 
        this.energy = 50; 
        this.setEnergy.triggerEvent(this.energy, true);
    }

    onAddScored()
    {
        ++this.score;
        this.scored.triggerEvent(this.score);
    }

    onAddEnergy(numb)
    {
        this.energy += numb;
        this.setEnergy.triggerEvent(this.energy, numb!=-1);

        if(this.energy <= 0)
        {
            this.setEnergy.triggerEvent(0, true);
            GameEvent.triggerEvent("GameOver");
        }
    }

    onGameOver()
    {
        GameEvent.triggerEvent("UpdateScore", this.score, this.bestScore, this.rank);
        FBInterface.setLeaderboard(this.leaderboardName, this.saveScore.bind(this));
        setTimeout( ()=> GameEvent.triggerEvent("Prompt", "NO ENERGY"), 800);
        setTimeout( ()=> GameEvent.triggerEvent("HomeMenu", true), 2000);
    }

    //==============FB leaderboard==============================
    readScore(leaderboard)
    {
        let func = (entries)=>
        {
            if(entries!=null)
            {
                this.bestScore = entries.getScore();
                this.rank = entries.getRank();
            }
            GameEvent.triggerEvent("UpdateScore", this.score, this.bestScore, this.rank);
        }
        leaderboard.getPlayerEntryAsync().then(func);
        leaderboard.getConnectedPlayerEntriesAsync(this.requestNumb).then( entries => GameEvent.triggerEvent("LoadLeaderboard", entries, 0) );
        leaderboard.getEntriesAsync(this.requestNumb).then( entries => GameEvent.triggerEvent("LoadLeaderboard", entries, 1) );
    }

    saveScore(leaderboard)
    {
        leaderboard
        .setScoreAsync(this.score)
        .then(() =>
        {
            console.log('Score Saved');
            this.readScore(leaderboard);
        })
        .catch(error => console.error(error));
    }
}
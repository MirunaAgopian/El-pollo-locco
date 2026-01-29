let audio = {
    effects: {
        bottleThrow: new Audio('audio/throw_object.mp3'),
        characterJump: new Audio('audio/pepe_jump.mp3'),
        characterHurt: new Audio('audio/pepe_hurt2.mp3'),
        characterWalk: new Audio('audio/pepe_walking.mp3'),
        characterSnore: new Audio('audio/pepe_snore.mp3'),
        collectCoin: new Audio('audio/collect_coin.mp3'),
        collectBottle: new Audio('audio/collect_bottle.mp3'),
        endbossAlert: new Audio('audio/endboss_alert.mp3'),
        youWon: new Audio('audio/you_won.mp3'),
        youLost: new Audio('audio/you_lost.mp3')
    },

    music: {
        backgroundMusic: new Audio('audio/background_music2.mp3')
    },

    muteAll(){
        Object.values(this.effects).forEach(s => s.muted = true);
        Object.values(this.music).forEach(s => s.muted = true);
    },

    unmuteAll(){
        Object.values(this.effects).forEach(s => s.muted = false);
        Object.values(this.music).forEach(s => s.muted = false);
    }
}

// chickenWalk: new Audio('audio/chicken_walk.mp3'),
// chickenBigDead: new Audio('audio/chicken_dead.mp3'),
// chickenSmallDead: new Audio('audio/chicken_dead2.mp3'), - these must be inside the chicken constructor
let audio = {
    effects: {
        bottleHit: new Audio('audio/bottle_hit.mp3'),
        bottleThrow: new Audio('audio/throw_object.mp3'),
        characterJump: new Audio('audio/pepe_jump.mp3'),
        characterHurt: new Audio('audio/pepe_hurt2.mp3'),
        characterWalk: new Audio('audio/pepe_walking.mp3'),
        characterSnore: new Audio('audio/pepe_snore.mp3'),
        collectCoin: new Audio('audio/collect_coin.mp3'),
        collectBottle: new Audio('audio/collect_bottle.mp3'),
        endbossAlert: new Audio('audio/endboss_alert2.mp3'),
        endbossHurt: new Audio('audio/endboss_hurt.mp3'),
        endbossDead: new Audio('audio/endboss_dead.mp3'),
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

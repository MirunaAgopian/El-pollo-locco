class AudioManager {
    constructor() {
        this.soundIsOn = true;

        //1.Background music
        this.backgroundMusic = new Audio('audio/background_music2.mp3');
        this.backgroundMusic.loop = true;

        //2.One-shot sound effects SFX (cloneNode)
        this.characterJumpSound = new Audio('audio/pepe_jump.mp3');
        this.collectCoinSound = new Audio('audio/collect_coin.mp3');
        this.collectBottleSound = new Audio('audio/collect_bottle.mp3');
        this.throwBottleSound = new Audio('audio/throw_object.mp3');
        this.bottleCollisionSound = new Audio('audio/bottle_hit.mp3');

        //3.One-time SFX per instance and time flag with boolean
        this.bigChickenDeadSound = new Audio('audio/chicken_dead.mp3');
        this.smallChickenDeadSound = new Audio('audio/chicken_dead2.mp3');
        this.endbossDeadSound = new Audio('audio/endboss_dead.mp3');
        this.endbossAlertSound = new Audio('audio/endboss_alert2.mp3');
        //maybe I sould add here also the you won/you lost SFX

        //4.Repeated SFX (sound pool) - to be played inside intervals
        this.endbossHurtSound = new Audio('audio/endboss_hurt.mp3');
        this.playEndbossHurt = this.createSoundPool(this.endbossHurtSound, 5);
        this.characterHurtSound = new Audio('audio/pepe_hurt2.mp3');
        this.playCharacterHurt = this.createSoundPool(this.characterHurtSound, 5);
        
        //5. looped ambient SFX category.
        this.characterSnoreSound = new Audio('audio/pepe_snore.mp3');

    }

    toggleBackgroundMusic(isOn){
        this.soundIsOn = isOn;
        if(isOn) {
            this.backgroundMusic.play();
            this.backgroundMusic.volume = 0.1;
        } else {
            this.backgroundMusic.pause();
        }
    }

    createSoundPool(sound, size = 5) {
        const pool = [];
        for(let i = 0; i < size; i++){
            pool.push(sound.cloneNode());
        }
        let index = 0;
        return (volume = 1) => {
            if(!this.soundIsOn) return;
            const s = pool[index];
            index = (index + 1) % size;
            s.currentTime = 0;
            s.volume = volume;
            s.play();
        };
    }

    playOneShot(sound, volume = 1) {
        if(!this.soundIsOn) return;
        const s = sound.cloneNode();
        s.volume = volume;
        s.play();
    }

    playOneTime(sound, flagName, volume = 1){
        if(this[flagName] || !this.soundIsOn) return;
        this[flagName] = true;
        sound.currentTime = 0;
        sound.volume = volume;
        sound.play();
    }

    playOneTimeForObject(obj, sound, flagName, volume = 1) { 
        if (obj[flagName] || !this.soundIsOn) return; 
        obj[flagName] = true; 
        sound.currentTime = 0; 
        sound.volume = volume; 
        sound.play(); 
    }

    playLoopedSound(sound, volume = 1){
        if(!this.soundIsOn) return;
        sound.loop = true;
        sound.volume = volume;
        if(sound.paused) {
            sound.currentTime = 0;
            sound.play();
        }
    }

    stopLoopedSound(sound){
        if(!sound.paused){
            sound.pause();
            sound.currentTime = 0;
        }
    }

    playCharacterSnoreSound(){
        this.playLoopedSound(this.characterSnoreSound, 0.3);
    }

    stopCharacterSnoreSound(){
        this.stopLoopedSound(this.characterSnoreSound);
    }

    muteAll() { 
        this.soundIsOn = false; 
        this.backgroundMusic.pause(); 
        this.characterSnoreSound.pause(); 
        this.characterSnoreSound.currentTime = 0; 
    } 
    unmuteAll() { 
        this.soundIsOn = true; 
        this.backgroundMusic.play(); 
        this.backgroundMusic.volume = 0.3; 
    }

    toggleSound() { 
        if (this.soundIsOn) { 
            this.muteAll(); 
        } else { 
            this.unmuteAll(); 
        } 
    }

    resetAllAudio(){
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
        this.characterSnoreSound.pause();
        this.characterSnoreSound.currentTime = 0;
        if (this.hurtSoundPool) { 
            this.hurtSoundPool.forEach(s => { 
                s.pause(); 
                s.currentTime = 0; 
            }); 
        }
        this.endbossAlertSoundPlayed = false; 
        this.endbossDeadSoundPlayed = false;
        this.soundIsOn = true;
    }
}
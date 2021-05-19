////////// CONFIG //////////

const screenWidth = 896;
const screenHeight = 448;

const config = {
    width: screenWidth,
    height: screenHeight,
    pixelArt: true,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 700
            },
            debug: true
        }
    },
    input: {
        gamepad: true
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        zoom: 1,
    }
}

var game = new Phaser.Game(config);

////////// VARIABLES //////////

//debug

var debugText;

// Player

var player;
var jumpPower = 0;
var jumpPowerGoesUp;
var playerHasJumped;
var playerHasLanded;
var jumpTarget;


var click;



////////// PRELOAD //////////

function preload() {

    this.load.image('tiles', 'assets/Placeholders/tilemapPlaceholders.png');
    this.load.tilemapTiledJSON('map', 'assets/Placeholders/map.json');

    this.load.image('player', 'assets/Grenouille2.png');
}

////////// CREATE //////////

function create() {

    const map = this.make.tilemap({
        key: 'map'
    });
    const tileset = map.addTilesetImage('tilemapPlaceholders', 'tiles');
    var bg_Layer = map.createLayer('BG', tileset);
    var platforms_Layer = map.createLayer('Platforms', tileset);

    initPlayer(this);

    initCamera(this);

    initDebug(this);

    platforms_Layer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(player, platforms_Layer);

    click = this.input.activePointer.isDown;

}

////////// UPDATE //////////

function update() {

    jumpPowerVariation(this);
    jump(this);

    debugging(this);
}


////////// FONCTIONS //////////

function initCamera(context) {
    context.cameras.main.startFollow(player);
    context.cameras.main.setBounds(0, 0, player.widthInPixels, player.heightInPixels);
    context.cameras.main.followOffset.set(0, 120);
}

function initDebug(context) {
    if (config.physics.arcade.debug) {
        debugText = context.add.text(0, screenHeight, "bonjour, ça va ? super", {
            fontSize: '24px',
            padding: {
                x: 10,
                y: 5
            },
            backgroundColor: '#000000',
            fill: '#ffffff'
        });
        debugText.setScrollFactor(0)
            .setOrigin(0, 1)
            .setDepth(11);
    }
}

function initPlayer(context) {
    player = context.physics.add.sprite(1053, 1028, 'player')
        .setOrigin(0.5, 0.5);
    jumpPower = false;
    jumpPowerGoesUp = true;
    playerHasJumped = false;
    playerHasLanded = player.body.blocked.down;
}

function jumpPowerVariation(context) {
    if (player.body.blocked.down) {
        if (jumpPowerGoesUp) {
            jumpPower += 1;
            if (jumpPower >= 100) {
                jumpPowerGoesUp = false;
            }
        } else {
            jumpPower -= 1;
            if (jumpPower <= 0) {
                jumpPowerGoesUp = true;
            }
        }
    }
}

function debugging(context) {
    if (config.physics.arcade.debug) {
        debugText.setText('jumpPower : ' + jumpPower + ' player.y : ' + player.y);
    }

}

function jump(context) {
    if (!playerHasLanded && player.body.blocked.down){
        playerHasLanded = true;
    }

    if (context.input.activePointer.isDown) {
        if (!playerHasJumped) {
            player.setVelocityY(jumpPower * -6);
            playerHasJumped = true;
            playerHasLanded = false;
        } else{
            playerHasJumped = false;
        }
    }
    if (playerHasJumped && !playerHasLanded){
        if (player.body.blocked.down) {
            jumpPowerGoesUp = true;
            jumpPower = 0;
        }
    }
    
}
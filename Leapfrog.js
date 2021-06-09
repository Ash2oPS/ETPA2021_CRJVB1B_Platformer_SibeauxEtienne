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

// Backgrounds

var skyBG1;

// Player

var player;
//var cameraFocus;
var jumpPower = 0;
var jumpPowerGoesUp;
var playerHasJumped;
var playerHasLanded;
var jumpTarget;


var click;
var clickX;
var clickY;

// Map

var map;
var tileset;
var collider_layer;



////////// PRELOAD //////////

function preload() {

    this.load.image('skyBG1', 'assets/Backgrounds/SkyBG1.png');
    //this.load.image('cameraFocus', 'assets/debug/CameraFocus.png')

    this.load.image('tiles', 'assets/Placeholders/tilemap.png');
    this.load.tilemapTiledJSON('map', 'assets/Placeholders/map.json');

    this.load.image('player', 'assets/Grenouille2.png');
}

////////// CREATE //////////

function create() {


    initPlayer(this);

    initDebug(this);

    initCamera(this);

    initMap(this);

    initBackground(this);
    

    collider_layer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(player, collider_layer);

    click = this.input.activePointer.isDown;
    clickX = game.input.mousePointer.x + player.x - screenWidth/2;
    clickY = game.input.mousePointer.y + player.y - screenHeight/2 + 120;
    /*if (clickX <= player.x){
        clickDirection = false;
    } else { 
        clickDirection = true;
    }*/

}

////////// UPDATE //////////

function update() {

    jumpPowerVariation(this);
    
    //clickDirectionChecker(this);
    
    jump(this);
    //cameraFocuser(this);


    debugging(this);
}


////////// FONCTIONS //////////

function initCamera(context) {
    context.cameras.main.startFollow(player);
    context.cameras.main.setBounds(0, 0, player.widthInPixels, player.heightInPixels);
    context.cameras.main.followOffset.set(0, 120);
}

function initDebug(context) {
    //cameraFocus = context.add.image(player.x, player.y,'cameraFocus');
    //.alpha = 0;
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
    player = context.physics.add.sprite(928, 9344, 'player')
        .setOrigin(0.5, 1);
    jumpPower = false;
    jumpPowerGoesUp = true;
    playerHasJumped = false;
    playerHasLanded = player.body.blocked.down;
}

function initMap(context){
    map = context.make.tilemap({
        key: 'map'
    });
    tileset = map.addTilesetImage('tilemap', 'tiles');
    collider_layer = map.createLayer('collider', tileset);
}

function initBackground(context){
    skyBG1 = context.add.image(0, 0, 'skyBG1')
    .setScrollFactor(0)
    .setOrigin(0, 0)
    .setDepth(-1);
/*
    for (i = 0; i < 7; i++){
        var coordX = Phaser.Math.Between(1, 4);
        var nuage = context.add.image(coordX, coordY,'nuage1')}*/
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
        debugText.setText('jumpPower : ' + jumpPower + ' playerHasLanded : ' + playerHasLanded + ' playerHasJumped : ' + playerHasJumped);
    }

}

function jump(context) {
    if (!playerHasLanded && player.body.blocked.down && !context.input.activePointer.isDown){
        playerHasLanded = true;
    }

    if (context.input.activePointer.isDown) {
        if (!playerHasJumped && playerHasLanded) {
            jumpPower = 95;
            player.setVelocityY(jumpPower * -6.8);
            console.log(jumpPower);
            //cameraFocus.x = player.x;
            //cameraFocus.y = player.y - 120;
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

/*function clickDirectionChecker(context){
    clickX = game.input.mousePointer.x + player.x - screenWidth/2;
    clickY = game.input.mousePointer.y + player.y - screenHeight/2 - 120;


}*/

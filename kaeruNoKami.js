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
            fps: 60,
            debug: false
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
var bg0;
var bg1;
var fog0;
var fog1;
var fog2;
var fog3;

var skyBG2;
var blackCloud0;
var blackCloud1;
var blackCloud2;
var blackCloud3;
var blackCloud4;
var blackCloud5;
var snowStorm0;
var snowStorm1;
var snowStorm2;

// Player

var player;
var mouseCursor;
var jumpPower = 1;
var jumpPowerGoesUp;
var playerHasJumped;
var playerHasLanded;
var jumpGauge;
var jumpVelHor;
var jumpVelVer;

var playerIdleBool;
var playerJumpBool;
var playerFallBool;

var backgroundChanger;

var click;
var clickX;
var clickY;
var clickDirection;

// Mobs

var heart;

// Map

var map;
var tileset;
var collider_layer;
var layerMinus1;
var layerMinus075;
var layerMinus05;
var layer0;
var layer05;
var layer075;
var layer1;
var layer2;
var layer3;
var brouillard1_layer;
var brouillard2_layer;
var brouillard3_layer;
var brouillard4_layer;



////////// PRELOAD //////////

function preload() {

    loadGauge(this);

    this.load.image('skyBG1', 'assets/Backgrounds/SkyBG1.png');
    this.load.image('skyBG2', 'assets/Backgrounds/SkyBG2.png');
    this.load.image('blackCloud0', 'assets/Backgrounds/blackCloud0.png');
    this.load.image('blackCloud1', 'assets/Backgrounds/blackCloud1.png');
    this.load.image('blackCloud2', 'assets/Backgrounds/blackCloud2.png');
    this.load.image('blackCloud3', 'assets/Backgrounds/blackCloud3.png');
    this.load.image('blackCloud4', 'assets/Backgrounds/blackCloud4.png');
    this.load.image('blackCloud5', 'assets/Backgrounds/blackCloud5.png');
    this.load.spritesheet('snowStorm0', 'assets/Backgrounds/snowStorm0.png',{frameWidth : 896, frameHeight : 448});
    this.load.spritesheet('snowStorm1', 'assets/Backgrounds/snowStorm1.png',{frameWidth : 896, frameHeight : 448});
    this.load.spritesheet('snowStorm2', 'assets/Backgrounds/snowStorm2.png',{frameWidth : 896, frameHeight : 448});
    this.load.image('bg0', 'assets/Backgrounds/bg0.png');
    this.load.image('bg1', 'assets/Backgrounds/bg1.png');
    this.load.image('fog0', 'assets/Backgrounds/brouillard0.png');
    this.load.image('fog1', 'assets/Backgrounds/brouillard1.png');
    this.load.image('fog2', 'assets/Backgrounds/brouillard2.png');
    this.load.image('fog3', 'assets/Backgrounds/brouillard3.png');
    this.load.image('cursorPosition', 'assets/debug/CameraFocus.png');

    this.load.image('tiles', 'assets/Placeholders/tilemap.png');
    this.load.tilemapTiledJSON('map', 'assets/Placeholders/map.json');

    this.load.spritesheet('player', 'assets/grenouille_spritesheet.png', {frameWidth : 68, frameHeight : 64});
    this.load.spritesheet('snail', 'assets/snail.png',{frameWidth : 64, frameHeight : 64});

    this.load.spritesheet('heart', 'assets/Tilemap/Heart/HeartAsset.png',{frameWidth : 262, frameHeight : 312});
}

////////// CREATE //////////

function create() {


    initPlayer(this);

    initCamera(this);

    initMap(this);

    initBackground(this);

    initMobs(this);

    initDebug(this);
    

    collider_layer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(player, collider_layer);

    click = this.input.activePointer.isDown;
    clickX = game.input.mousePointer.x + player.x - screenWidth/2;
    clickY = game.input.mousePointer.y + player.y - 120 - screenHeight/2;
    if (clickX <= player.x){
        clickDirection = false;
    } else { 
        clickDirection = true;
    }

}

////////// UPDATE //////////

function update() {

    jumpPowerVariation(this);
    
    clickDirectionChecker(this);
    
    jump(this);

    backgroundsManager(this);
    //cameraFocuser(this);


    debugging(this);

}


////////// FONCTIONS //////////

function loadGauge(context){

    /*
    context.load.image('gaugeLeft0', 'assets/UI/left0.png');
    context.load.image('gaugeLeft5', 'assets/UI/left5.png');
    context.load.image('gaugeLeft10', 'assets/UI/left10.png');
    context.load.image('gaugeLeft15', 'assets/UI/left15.png');
    context.load.image('gaugeLeft20', 'assets/UI/left20.png');
    context.load.image('gaugeLeft25', 'assets/UI/left25.png');
    context.load.image('gaugeLeft30', 'assets/UI/left30.png');
    context.load.image('gaugeLeft35', 'assets/UI/left35.png');
    context.load.image('gaugeLeft40', 'assets/UI/left40.png');
    context.load.image('gaugeLeft45', 'assets/UI/left45.png');
    context.load.image('gaugeLeft50', 'assets/UI/left50.png');
    context.load.image('gaugeLeft55', 'assets/UI/left55.png');
    context.load.image('gaugeLeft60', 'assets/UI/left60.png');
    context.load.image('gaugeLeft65', 'assets/UI/left65.png');
    context.load.image('gaugeLeft70', 'assets/UI/left70.png');
    context.load.image('gaugeLeft75', 'assets/UI/left75.png');
    context.load.image('gaugeLeft80', 'assets/UI/left80.png');
    context.load.image('gaugeLeft85', 'assets/UI/left85.png');
    context.load.image('gaugeLeft90', 'assets/UI/left90.png');
    context.load.image('gaugeLeft95', 'assets/UI/left95.png');
    context.load.image('gaugeLeft100', 'assets/UI/left100.png');

    context.load.image('gaugeRight0', 'assets/UI/right0.png');
    context.load.image('gaugeRight5', 'assets/UI/right5.png');
    context.load.image('gaugeRight10', 'assets/UI/right10.png');
    context.load.image('gaugeRight15', 'assets/UI/right15.png');
    context.load.image('gaugeRight20', 'assets/UI/right20.png');
    context.load.image('gaugeRight25', 'assets/UI/right25.png');
    context.load.image('gaugeRight30', 'assets/UI/right30.png');
    context.load.image('gaugeRight35', 'assets/UI/right35.png');
    context.load.image('gaugeRight40', 'assets/UI/right40.png');
    context.load.image('gaugeRight45', 'assets/UI/right45.png');
    context.load.image('gaugeRight50', 'assets/UI/right50.png');
    context.load.image('gaugeRight55', 'assets/UI/right55.png');
    context.load.image('gaugeRight60', 'assets/UI/right60.png');
    context.load.image('gaugeRight65', 'assets/UI/right65.png');
    context.load.image('gaugeRight70', 'assets/UI/right70.png');
    context.load.image('gaugeRight75', 'assets/UI/right75.png');
    context.load.image('gaugeRight80', 'assets/UI/right80.png');
    context.load.image('gaugeRight85', 'assets/UI/right85.png');
    context.load.image('gaugeRight90', 'assets/UI/right90.png');
    context.load.image('gaugeRight95', 'assets/UI/right95.png');
    context.load.image('gaugeRight100', 'assets/UI/right100.png');
    */

    context.load.spritesheet('gauge', 'assets/UI/gaugeSpritesheet.png', {frameWidth : 64, frameHeight : 64});
    context.load.spritesheet('gaugeAnim', 'assets/UI/gaugeAnimSpritesheet.png', {frameWidth : 64, frameHeight : 64});
}


function initCamera(context) {
    context.cameras.main.startFollow(player);
    context.cameras.main.setBounds(0, 0, player.widthInPixels, player.heightInPixels);
    context.cameras.main.followOffset.set(0, 120);
}

function initDebug(context) {
    mouseCursor = context.add.image(clickX, clickY,'cursorPosition');
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
        collider_layer.alpha = 0.2
        collider_layer.setDepth(3);
    }
    else{
        collider_layer.alpha = 0;
        mouseCursor.alpha = 0;
    }
}

function initPlayer(context) {
    player = context.physics.add.sprite(928, 9300, 'player')
    //player = context.physics.add.sprite(5058, 5626, 'player')
    //player = context.physics.add.sprite(7248, 3732, 'player')
    //player = context.physics.add.sprite(11103, 839, 'player')
        .setBounce(0.9, 0)
        .setDepth(-0.2)
        .setOrigin(0.5, 1)
        .setSize(30, 35)
        .setOffset(19, 29)
        .setMaxVelocity(750);
    

    jumpPower = 1;
    jumpPowerGoesUp = true;
    playerHasJumped = false;
    playerHasLanded = player.body.blocked.down

    jumpVelHor = - 4;
    jumpVelVer = - 6.8;

    jumpGauge = context.add.sprite(player.x + 60, player.y -30, 'gauge')
    .setDepth(3);

    context.anims.create({
        key :'playerIdle',
        frames : context.anims.generateFrameNumbers('player', {start :0, end: 11}),
        frameRate : 6,
        repeat : -1
    });

    context.anims.create({
        key :'playerJump',
        frames : context.anims.generateFrameNumbers('player', {start :12, end: 14}),
        frameRate : 6,
        repeat : 0
    });

    context.anims.create({
        key :'playerFall',
        frames : context.anims.generateFrameNumbers('player', {start :15, end: 15}),
        frameRate : 6,
        repeat : 0
    });

    player.play('playerIdle');
    playerIdleBool = true;
    playerJumpBool = false;
    playerFallBool = false;

    context.anims.create({
        key :'gaugeValue',
        frames : context.anims.generateFrameNumbers('gauge', {start :0, end: 99}),
        frameRate : 0,
        repeat : -1
    });

    jumpGauge.play('gaugeValue');

    

}

function initMap(context){
    map = context.make.tilemap({
        key: 'map'
    });
    tileset = map.addTilesetImage('tilemap', 'tiles');
    collider_layer = map.createLayer('collider', tileset);
    layerMinus1 = map.createLayer('Calque-1', tileset)
    .setDepth(-0.3);
    layerMinus075 = map.createLayer('Calque-0.75', tileset)
    .setDepth(-0.3);
    layerMinus05 = map.createLayer('Calque-0.5', tileset)
    .setDepth(-0.1);
    layer0 = map.createLayer('Calque0', tileset)
    .setDepth(-0.1);
    layer05 = map.createLayer('Calque0.5', tileset);
    layer075 = map.createLayer('Calque0.75', tileset);
    layer1 = map.createLayer('Calque1', tileset);
    layer2 = map.createLayer('Calque2', tileset)
    .setDepth(2);

    brouillard1_layer = map.createLayer('brouillard1', tileset)
    .setDepth(3);
    brouillard2_layer = map.createLayer('brouillard2', tileset)
    .setDepth(3);
    brouillard3_layer = map.createLayer('brouillard3', tileset)
    .setDepth(3);
    brouillard4_layer = map.createLayer('brouillard4', tileset)
    .setDepth(3);
}

function initBackground(context){

    // PHASE 1

    skyBG1 = context.add.image(0, 0, 'skyBG1')
    .setScrollFactor(0)
    .setOrigin(0, 0)
    .setDepth(-1);

    bg1 = context.add.image(300, 500, 'bg1')
    .setScrollFactor(0.04)
    .setOrigin(0, 0)
    .setDepth(-1);

    bg0 = context.add.image(10, 800, 'bg0')
    .setScrollFactor(0.08)
    .setOrigin(0, 0)
    .setDepth(-1);

    fog0 = context.add.image(320, 1050, 'fog0')
    .setScrollFactor(0.092)
    .setOrigin(0, 0)
    .setDepth(-1);

    fog1 = context.add.image(450, 1150, 'fog1')
    .setScrollFactor(0.1)
    .setOrigin(0, 0)
    .setDepth(-1);

    fog2 = context.add.image(700, 1150, 'fog2')
    .setScrollFactor(0.104)
    .setOrigin(0, 0)
    .setDepth(-1);

    // PHASE 2

    skyBG2 = context.add.image(0, 0, 'skyBG2')
    .setScrollFactor(0)
    .setOrigin(0, 0)
    .setDepth(-1);

    blackCloud0 = context.add.tileSprite(0, 0, 0, 0, 'blackCloud0')
    .setScrollFactor(0)
    .setOrigin(0, 0)
    .setDepth(-1);

    blackCloud1 = context.add.tileSprite(0, 0, 0, 0, 'blackCloud1')
    .setScrollFactor(0)
    .setOrigin(0, 0)
    .setDepth(-1);

    blackCloud2 = context.add.tileSprite(0, 0, 0, 0, 'blackCloud2')
    .setScrollFactor(0)
    .setOrigin(0, 0)
    .setDepth(-1);

    blackCloud3 = context.add.tileSprite(0, 0, 0, 0, 'blackCloud3')
    .setScrollFactor(0)
    .setOrigin(0, 0)
    .setDepth(-1);

    blackCloud4 = context.add.tileSprite(0, 0, 0, 0, 'blackCloud4')
    .setScrollFactor(0)
    .setOrigin(0, 0)
    .setDepth(-1);

    blackCloud5 = context.add.tileSprite(0, 0, 0, 0, 'blackCloud5')
    .setScrollFactor(0)
    .setOrigin(0, 0)
    .setDepth(-1);

    snowStorm0 = context.add.sprite(0, 0, 0, 0, 'snowStorm0')
    .setScrollFactor(0)
    .setOrigin(0, 0)
    .setDepth(3);
    context.anims.create({
        key :'snowStorm0Anim',
        frames : context.anims.generateFrameNumbers('snowStorm0', {start :0, end: 4}),
        frameRate : 8,
        repeat : -1
    });
    snowStorm0.play('snowStorm0Anim');

    snowStorm2 = context.add.sprite(0, 0, 0, 0, 'snowStorm2')
    .setScrollFactor(0)
    .setOrigin(0, 0)
    .setDepth(-0.4);
    context.anims.create({
        key :'snowStorm2Anim',
        frames : context.anims.generateFrameNumbers('snowStorm2', {start :0, end: 4}),
        frameRate : 8,
        repeat : -1
    });
    snowStorm2.play('snowStorm2Anim');

    snowStorm1 = context.add.sprite(0, 0, 0, 0, 'snowStorm1')
    .setScrollFactor(0)
    .setOrigin(0, 0)
    .setDepth(-0.4);
    context.anims.create({
        key :'snowStorm1Anim',
        frames : context.anims.generateFrameNumbers('snowStorm1', {start :0, end: 4}),
        frameRate : 8,
        repeat : -1
    });
    snowStorm1.play('snowStorm1Anim');


/*
    for (i = 0; i < 7; i++){
        var coordX = Phaser.Math.Between(1, 4);
        var nuage = context.add.image(coordX, coordY,'nuage1')}*/
}

function initMobs(context){
    heart = context.add.sprite(11360, 1040, 'heart');

}

function jumpPowerVariation(context) {

    if (playerHasLanded && !playerHasJumped) {
        jumpGauge.setFrame(jumpPower-1);
        jumpGauge.alpha = 1;
        if (!playerIdleBool){
            player.play('playerIdle');
            playerIdleBool = true;
            playerJumpBool = false;
            playerFallBool = false;
            console.log('IdelAnim');
        }
        if (jumpPowerGoesUp) {
            jumpPower += 1;
            if (jumpPower >= 100) {
                jumpPowerGoesUp = false;
            }
        } else {
            jumpPower -= 1;
            if (jumpPower <= 1) {
                jumpPowerGoesUp = true;
            }
        }
    }else{    
        jumpGauge.alpha = 0;

        if (player.body.velocity.y < 0 && !playerJumpBool){
            player.play('playerJump', false);
            playerJumpBool = true;
            playerIdleBool = false;
            playerFallBool = false;
            console.log('jumpAnim');
        }

        if (player.body.velocity.y > 0 && !playerFallBool){
            player.play('playerFall', false);
            playerJumpBool = false;
            playerIdleBool = false;
            playerFallBool = true;
            console.log('jumpFall');
        }
    }
    //JAUGE
    /*
    if (jumpPower >= 0 && jumpPower < 5 && jumpGauge){
        if (jumpGauge){
            jumpGauge.destroy();
        }
        jumpGauge = context.add.image(player.x + 80, player.y - 40, 'gaugeRight5');
    }            
    else if  (jumpPower >= 5 && jumpPower < 10){
        jumpGauge.destroy();
        jumpGauge = context.add.image(player.x + 80, player.y - 40, 'gaugeRight10');
    }      
    else if (jumpPower >= 10 && jumpPower < 15){
        jumpGauge.destroy();
        jumpGauge = context.add.image(player.x + 80, player.y - 40, 'gaugeRight15');
    }     
    else if (jumpPower >= 15 && jumpPower < 20){
        jumpGauge.destroy();
        jumpGauge = context.add.image(player.x + 80, player.y - 40, 'gaugeRight20');
    }     
    else if (jumpPower >= 20 && jumpPower < 25){
        jumpGauge.destroy();
        jumpGauge = context.add.image(player.x + 80, player.y - 40, 'gaugeRight25');
    }     
    else if (jumpPower >= 25 && jumpPower < 30){
        jumpGauge.destroy();
        jumpGauge = context.add.image(player.x + 80, player.y - 40, 'gaugeRight30');
    }     
    else if (jumpPower >= 30 && jumpPower < 35){
        jumpGauge.destroy();
        jumpGauge = context.add.image(player.x + 80, player.y - 40, 'gaugeRight35');
    }     
    else if (jumpPower >= 35 && jumpPower < 40){
        jumpGauge.destroy();
        jumpGauge = context.add.image(player.x + 80, player.y - 40, 'gaugeRight40');
    }     
    else if (jumpPower >= 40 && jumpPower < 45){
        jumpGauge.destroy();
        jumpGauge = context.add.image(player.x + 80, player.y - 40, 'gaugeRight45');
    }     
    else if (jumpPower >= 45 && jumpPower < 50){
        jumpGauge.destroy();
        jumpGauge = context.add.image(player.x + 80, player.y - 40, 'gaugeRight50');
    }     
    else if (jumpPower >= 50 && jumpPower < 65){
        jumpGauge.destroy();
        jumpGauge = context.add.image(player.x + 80, player.y - 40, 'gaugeRight55');
    }     
    else if (jumpPower >= 55 && jumpPower < 60){
        jumpGauge.destroy();
        jumpGauge = context.add.image(player.x + 80, player.y - 40, 'gaugeRight60');
    }    
    else if (jumpPower >= 60 && jumpPower < 65){
        jumpGauge.destroy();
        jumpGauge = context.add.image(player.x + 80, player.y - 40, 'gaugeRight65');
    }     
    else if (jumpPower >= 65 && jumpPower < 70){
        jumpGauge.destroy();
        jumpGauge = context.add.image(player.x + 80, player.y - 40, 'gaugeRight70');
    }     
    else if (jumpPower >= 70 && jumpPower < 75){
        jumpGauge.destroy();
        jumpGauge = context.add.image(player.x + 80, player.y - 40, 'gaugeRight75');
    }     
    else if (jumpPower >= 75 && jumpPower < 80){
        jumpGauge.destroy();
        jumpGauge = context.add.image(player.x + 80, player.y - 40, 'gaugeRight80');
    }     
    else if (jumpPower >= 80 && jumpPower < 85){
        jumpGauge.destroy();
        jumpGauge = context.add.image(player.x + 80, player.y - 40, 'gaugeRight85');
    }    
    else if (jumpPower >= 85 && jumpPower < 90){
        jumpGauge.destroy();
        jumpGauge = context.add.image(player.x + 80, player.y - 40, 'gaugeRight90');
    }     
    else if (jumpPower >= 90 && jumpPower < 95){
        jumpGauge.destroy();
        jumpGauge = context.add.image(player.x + 80, player.y - 40, 'gaugeRight95');
    }     
    else if (jumpPower >= 95 && jumpPower <= 100){
        jumpGauge.destroy();
        jumpGauge = context.add.image(player.x + 80, player.y - 40, 'gaugeRight100');
    }   
    */

    //jumpGauge.setOrigin = (0, 1);

    /*if (!playerHasJumped && playerHasLanded){
        jumpGauge.alpha = 1
    }
    else{
        jumpGauge.alpha = 0;
    }*/




    //FIN JAUGE
    
}

function debugging(context) {
    if (config.physics.arcade.debug) {
        debugText.setText('jumpPower : ' + jumpPower + ' playerHasLanded : ' + playerHasLanded + ' playerHasJumped : ' + playerHasJumped + 
        '\nclickDirection : ' + clickDirection + ' velocity : ' + player.body.velocity.y);
    }

}

function jump(context) {
    if (!playerHasLanded && player.body.blocked.down && !context.input.activePointer.isDown){
        playerHasLanded = true;
    }

    if (player.body.blocked.down && !playerHasJumped){
        player.setVelocityX(0);
    }

    if (context.input.activePointer.isDown) {
        if (!playerHasJumped && playerHasLanded && clickY < player.y) {
            //jumpPower = 100
            mouseCursor.x = clickX;
            mouseCursor.y = clickY;
            //if (clickDirection)  player.setVelocity(jumpVelHor * jumpPower * -1, jumpVelVer * jumpPower);
            //else  player.setVelocity(jumpVelHor * jumpPower, jumpVelVer * jumpPower);
            player.setVelocityX(jumpPower * 8 * Math.cos(Phaser.Math.Angle.BetweenPoints(player, mouseCursor)));
            player.setVelocityY(jumpPower * 8 * Math.sin(Phaser.Math.Angle.BetweenPoints(player, mouseCursor)));
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
            var doesItGoUp = Phaser.Math.Between(0, 1);
            if (doesItGoUp == 0)    jumpPowerGoesUp = false;
            else    jumpPowerGoesUp = true;
            jumpPower = Phaser.Math.Between(1, 100);
        }
    }

    jumpGauge.x = player.x + 60;
    jumpGauge.y = player.y - 30;
    
    
}

function clickDirectionChecker(context){

    if (clickX <= player.x){
        clickDirection = false;
    } else { 
        clickDirection = true;
    }
    clickX = game.input.mousePointer.x + player.x - screenWidth/2;
    clickY = game.input.mousePointer.y + player.y - 120 - screenHeight/2;

}

function backgroundsManager(context){

    if (player.x > 5400 && player.y < 5800){
        backgroundChanger = true;
    } else  backgroundChanger = false;

    if (!backgroundChanger){
        skyBG1.alpha = 1;
        bg1.alpha = 1;
        bg0.alpha = 1;
        fog0.alpha = 1;
        fog1.alpha = 1;
        fog2.alpha = 1;

        skyBG2.alpha = 0;
        blackCloud0.alpha = 0;
        blackCloud1.alpha = 0;
        blackCloud2.alpha = 0;
        blackCloud3.alpha = 0;
        blackCloud4.alpha = 0;
        blackCloud5.alpha = 0;
        snowStorm0.alpha = 0;
        snowStorm1.alpha = 0;
        snowStorm2.alpha = 0;

        brouillard1_layer.setScrollFactor(1);
        brouillard2_layer.setScrollFactor(1);
        brouillard3_layer.setScrollFactor(1);
        brouillard4_layer.setScrollFactor(1);

    } else {
        skyBG2.alpha = 1;
        blackCloud0.alpha = 1;
        blackCloud1.alpha = 1;
        blackCloud2.alpha = 1;
        blackCloud3.alpha = 1;
        blackCloud4.alpha = 1;
        blackCloud5.alpha = 1;
        snowStorm1.alpha = 1;
        snowStorm2.alpha = 1;

        if (player.x < 5800){
            snowStorm0.alpha = 0.2;
        } else if (player.x < 6000){
            snowStorm0.alpha = 0.4;
        }
        else if (player.x < 6200){
            snowStorm0.alpha = 0.6;
        }else if (player.x < 6300){
            snowStorm0.alpha = 0.8;
        }else{
            snowStorm0.alpha = 1;
        }

        blackCloud0.tilePositionX -= 0.04;
        blackCloud1.tilePositionX -= 0.1;
        blackCloud2.tilePositionX -= 0.2;
        blackCloud3.tilePositionX -= 0.35;
        blackCloud4.tilePositionX -= 0.5;
        blackCloud5.tilePositionX -= 0.6;

        brouillard1_layer.setScrollFactor(1.1);
        brouillard2_layer.setScrollFactor(1.12);
        brouillard3_layer.setScrollFactor(1.13);
        brouillard4_layer.setScrollFactor(1.15);
        

        skyBG1.alpha = 0;
        bg1.alpha = 0;
        bg0.alpha = 0;
        fog0.alpha = 0;
        fog1.alpha = 0;
        fog2.alpha = 0;

    }

}

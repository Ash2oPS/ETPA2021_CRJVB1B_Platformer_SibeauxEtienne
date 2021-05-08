////////// CONFIG //////////

const screenWidth = 1920;
const screenHeight = 1080;

const config = {
    width: screenWidth,
    height: screenHeight,
    type: Phaser.AUTO,
    physics:{
        default: 'arcade',
        arcade:{
            gravity: {y: 700},
            debug: true
        }
    },
    input : {gamepad:true},
    scene: {
        preload: preload,
        create: create,
        update: update},
        scale: {
        zoom:1,
    }
}

var game = new Phaser.Game(config);

////////// VARIABLES //////////

//debug

var debugText;

// Player

var player;
var jumpPower = 0;
var jumpTimer = 0;



////////// PRELOAD //////////

function preload(){
    
    this.load.image('player', 'assets/Placeholders/dot.png');
}

////////// CREATE //////////

function create(){

    // Camera

    //this.cameras.main.startFollow(maya);
    //this.cameras.main.setBounds(0, 0, maya.widthInPixels, maya.heightInPixels);

    //debug
    if (config.physics.arcade.debug) {
        debugText = this.add.text(0, 935, "bonjour, ça va ? super", {
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

    player = this.add.image(960, 540, 'player')
    .setOrigin(0.5,0.5);
}

////////// UPDATE //////////

function update(){

    jumpPower = 50 + Math.sin(jumpTimer*0.02)*50;
    jumpTimer ++;

    /*if (config.physics.arcade.debug) {
        debugText.setText(jumpPower);
    }*/
    player.y = 300 + (jumpPower*6);
}


////////// FONCTIONS //////////


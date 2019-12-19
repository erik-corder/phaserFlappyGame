class Example1 extends Phaser.Scene {
    constructor() {
        super({ key: "Example1", active: true });
        //pipe gap
        this.pip = {
            pipGap: 85,
            width: config.width / 10,
            height: config.width / 10,
            position: 150,
            dx: 2,
            maxYposition: -150
        }
        var land = "";
        var bird = "";
        this.pipeNorth = [];
        this.pipeSouth = []
        this.timer = 0;
        this.i = 0;
        this.score = 0;
    }

    preload() {
        this.load.image('background', 'assets/images/bg.png');
        this.load.image('bird', 'assets/images/flappy-bird-20.png');
        this.load.image('land', 'assets/images/fg.png');
        this.load.image('pipNorth', 'assets/images/pipeNorth.png');
        this.load.image('pipSouth', 'assets/images/pipeSouth.png');
        this.load.image('gameOver', 'assets/images/game_over.jpg');
        this.load.audio('flySound', 'assets/audio/sfx_flap.wav');
        this.load.audio('hitPip', 'assets/audio/sfx_hit.wav');
    }

    randy(x, y) {
        return Phaser.Math.Between(x, y);
    }

    create() {
        this.image = this.add.image(120, 160, 'background');

        //brid
        this.bird = this.physics.add.sprite(this.sys.game.config.width / 5, this.sys.game.config.height / 2, "bird");
        this.bird.setGravityY(100);
        this.bird.setBounceY(.2);

        this.pipeNorth[this.i] = this.physics.add.sprite(240, this.randy(10, 50), "pipNorth");
        this.pipeNorth[this.i].displayWidth = this.pip.width;

        this.pipeSouth[this.i] = this.physics.add.sprite(240, this.randy(400, 450), "pipSouth");
        this.pipeSouth[this.i].displayWidth = this.pip.height;

        //land
        this.land = this.physics.add.sprite(0, this.sys.game.config.height * .85, "land");
        this.land.displayWidth = this.sys.game.config.width * 1.1;
        this.land.setOrigin(0, 0);
        this.land.setImmovable();

        //score
        this.scoreText = this.add.text(16, 20, "Score: 0", { font: "15px Impact", color: "black" });

        this.key_ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        //collider
        this.physics.add.collider(this.bird, this.land);

    }

    collision1() {
        var hit = this.sound.add('hitPip');
        hit.play();
        return true;
    }
    collision2() {
        var hit = this.sound.add('hitPip');
        hit.play();
        return true;
    }

    update(delta) {
        this.timer++;

        // this.pipeNorth[this.i].x -= 2;
        // this.pipNorthCollesion = this.physics.collide(this.bird, this.pipeNorth[this.i], this.collision1, null, this);
        // this.pipeSouth[this.i].x -= 2;
        // this.pipSourthCollesion = this.physics.collide(this.bird, this.pipeSouth[this.i], this.collision2, null, this);


        if (this.pipNorthCollesion == true || this.pipSourthCollesion == true) {
            this.image = this.add.image(120, 160, 'gameOver');
            this.scene.pause();
            
            //score
            this.finalScore = this.add.text(75, 170, "Your Score: "+this.score, { font: "15px Impact", color: "black" });
        }
        

        for (var i = 0; i <= this.pipeNorth.length; i++) {
            this.pipeNorth[this.i].x -= 1;
            this.pipNorthCollesion = this.physics.collide(this.bird, this.pipeNorth[this.i], this.collision1, null, this);
            this.pipeNorth[this.i].setImmovable();
        }

        for (var i = 0; i <= this.pipeSouth.length; i++) {
            this.pipeSouth[this.i].x -= 1;
            this.pipSourthCollesion = this.physics.collide(this.bird, this.pipeSouth[this.i], this.collision2, null, this);
            this.pipeSouth[this.i].setImmovable();
        }

        if (this.key_ENTER.isDown) {
            this.bird.setVelocityY(-100);
            var fly = this.sound.add('flySound');
            fly.play();
        }


        if (this.timer / 200 % 1 == 0 && this.timer != 0) {

            var randyX = this.randy(100, 150);
            //pipNorth
            this.pipeNorth[this.i] = this.physics.add.sprite(240, this.randy(10, 50), "pipNorth");
            this.pipeNorth[this.i].displayWidth = this.pip.width;

            //pipSourth
            this.pipeSouth[this.i] = this.physics.add.sprite(240, this.randy(400, 450), "pipSouth");
            this.pipeSouth[this.i].displayWidth = this.pip.height;
        }

        if (this.timer / 100 % 1 == 0) {
            console.log(this.score);
            this.score++;
            this.scoreText.setText("Score: " + this.score);
        }
    }
}
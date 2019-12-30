class Example2 extends Phaser.Scene {
    constructor() {
        super({ key: "Example2", active: true });
        var land = "";
        var bird = "";
        this.timer = 0;
    }

    preload() {
        this.load.image('background', 'assets/images/bg.png');
        this.load.image('land', 'assets/images/fg.png');

        this.load.image('bird1', 'assets/bird/bird1.png');
        this.load.image('bird2', 'assets/bird/bird2.png');
    }


    create() {
        this.image = this.add.image(120, 160, 'background');

        this.anims.create({
            key: 'bird',
            frames: [
                { key: 'bird1' },
                { key: 'bird2' },
            ],
            frameRate: 5,
            repeat: 1000,
            //hideOnComplete: true
        });



        //brid
        // this.bird = this.physics.add.sprite(this.sys.game.config.width / 5, this.sys.game.config.height / 2, "bird2");
        this.bird = this.physics.add.sprite(this.sys.game.config.width / 5, this.sys.game.config.height / 2, 'bird1').play('bird');
        this.bird.setBounceY(.2);
        // this.bird.angle += 30;

        //land
        this.land = this.physics.add.sprite(0, this.sys.game.config.height * .85, "land");
        this.land.displayWidth = this.sys.game.config.width * 1.1;
        this.land.setOrigin(0, 0);
        this.land.setImmovable();

        //collider
        this.physics.add.collider(this.bird, this.land);

        //game title
        this.title = this.add.text(55, 120, "Flappy Bird", { font: "25px Impact", color: "#071c40" });
        this.scoreText = this.add.text(80, 160, "[ press 5 ]", { font: "15px Impact", color: "#071c40" });
    
        this.input.keyboard.on('keyup',function(e){
            if(e.key == "5"){
                this.scene.start("Example1");
            }
        },this);

    }

    update(delta) {
        this.timer++;
        this.image.tilePositionY -= 2;

        if (this.timer / 100 % 1 == 0) {
           this.bird.y--;
        }
    }
}
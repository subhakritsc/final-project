class Scene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene1' });
    }

    preload() {
        this.load.image('wallpaper', 'wallpaper2.jpg');
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        WebFont.load({
            google: {
                families: ["Press Start 2P"]
            },
            active: () => {
                const self = this;

                const buttonWidth = 200;
                const buttonHeight = 70;
                const buttonX = 400;
                const buttonY = 350;

                const heading = this.add.text(100, 150, 'Tell Me!', { fontFamily: '"Press Start 2P"', fontSize: '65px', fill: '#fff' });
                const headingWidht = heading.width;
                heading.setX(buttonX - headingWidht/2);


                const startButton = this.add.rectangle(buttonX, buttonY, buttonWidth, buttonHeight, 0xffffff)
                .setInteractive()
                .on('pointerup', async () => {
                    self.scene.start('Scene2');                    
                    console.log('Start Game clicked!');
                });

                const buttonText = this.add.text(buttonX, buttonY, 'Start Game', { fontFamily: '"Press Start 2P"',fill: '#000', fontSize: '15px' });
                const textWidth = buttonText.width;
                const textHeight = buttonText.height;
                buttonText.setX(buttonX - textWidth / 2);
                buttonText.setY(buttonY - textHeight / 2);

            },

            inactive: () => {
                console.error('Failed to load font');
            }
        });

        this.add.image(0,0,'wallpaper').setOrigin(0,0);
    }

    showNotification(message) {
        const style = {
            fontFamily: '"Press Start 2P"',
            fontSize: '16px',
            fill: '#000000',
            backgroundColor: '#ffffff',
            padding: { x: 10, y: 5 }
        };
    
        this.notificationText = this.add.text(
            this.sys.game.config.width - 20,
            20,
            message,
            style
        ).setOrigin(1, 0).setDepth(1);
    
        this.time.delayedCall(2500, () => {
            this.notificationText.destroy();
        });
    }
}

export default Scene1;
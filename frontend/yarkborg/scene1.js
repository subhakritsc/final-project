class Scene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene1' });
    }

    preload() {
        this.load.image('wallpaper', 'wallpaper1.jpg');
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        WebFont.load({
            google: {
                families: ["Press Start 2P"]
            },
            active: () => {
                //everything that use pacifico font
                const buttonWidth = 200;
                const buttonHeight = 100;
                const buttonX = 400;
                const buttonY = 400;
        
                const heading = this.add.text(100, 100, 'YarkBorg', { fontFamily: '"Press Start 2P"', fontSize: '75px', fill: '#fff' });
                const headingWidht = heading.width;
                heading.setX(buttonX - headingWidht/2);
        
                this.add.rectangle(buttonX, buttonY, buttonWidth, buttonHeight, 0xffffff)
                .setInteractive()
                .on('pointerup', () => {
                    this.scene.switch('Scene2');
                    
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
}

export default Scene1;
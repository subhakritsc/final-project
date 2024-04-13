class Scene4 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene4' });
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

                const buttonWidth = 170;
                const buttonHeight = 75;
                const middleX = 400;
                const buttonX = 650;
                const buttonY = 500;

                const head = this.add.text(100, 140, 'what to you want to tell next person' , { fontFamily: '"Press Start 2P"', fontSize: '15px', fill: '#fff' });
                const headWidht = head.width;
                head.setX(middleX - headWidht/2);

                const head2 = this.add.text(100, 200, 'type something in english only :' , { fontFamily: '"Press Start 2P"', fontSize: '15px', fill: '#fff' });
                const headWidht2 = head2.width;
                head2.setX(middleX - headWidht2/2);

                const input = this.add.text(400, 300, '', { fontFamily: '"Press Start 2P"', fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);
        
                // Handle keyboard input
                this.input.keyboard.on('keydown', function(event) {
                    if (/^[\w\s]$/i.test(event.key)) { // Allow alphanumeric characters and blank space
                        input.text += event.key;
                    } else if (event.key === 'Backspace' && input.text.length > 0) { // Handle backspace
                        input.text = input.text.slice(0, -1);
                    }
                });


                this.add.rectangle(buttonX, buttonY, buttonWidth, buttonHeight, 0xffffff)
                .setInteractive()
                .on('pointerup', () => {
                    this.scene.switch('Scene1');
                    console.log('Back to main menu clicked!');
                });

                const buttonText = this.add.text(buttonX, buttonY, 'Continue', { fontFamily: '"Press Start 2P"',fill: '#000', fontSize: '8px' });
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

export default Scene4;

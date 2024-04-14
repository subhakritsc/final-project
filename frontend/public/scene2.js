class Scene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene2' });
    }

    preload() {
        this.load.image('wallpaper', 'wallpaper1.jpg');
        this.load.image('card','card.png')
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        WebFont.load({
            google: {
                families: ["Press Start 2P"]
            },
            active: async() => {
                const self = this;

                const buttonWidth = 170;
                const buttonHeight = 75;
                const middleX = 400;
                const buttonX = 650;
                const buttonY = 500;
        
                const heading = this.add.text(100, 100, 'Choose the card', { fontFamily: '"Press Start 2P"', fontSize: '40px', fill: '#fff' });
                const headingWidht = heading.width;
                heading.setX(middleX - headingWidht/2);

                const card1 = this.add.image(175,300,'card').setScale(0.3)
                .setInteractive()
                .on('pointerup', () => {
                    console.log('Card1 clicked!')
                    self.scene.start('Scene3')
                });

                const card2 = this.add.image(325,300,'card').setScale(0.3)
                .setInteractive()
                .on('pointerup', () => {
                    console.log('Card2 clicked!')
                    self.scene.start('Scene3')
                });

                const card3 = this.add.image(475,300,'card').setScale(0.3)
                .setInteractive()
                .on('pointerup', () => {
                    console.log('Card3 clicked!')
                    self.scene.start('Scene3')
                });

                const card4 = this.add.image(625,300,'card').setScale(0.3)
                .setInteractive()
                .on('pointerup', () => {
                    console.log('Card4 clicked!')
                    self.scene.start('Scene3')
                });

                this.add.rectangle(buttonX, buttonY, buttonWidth, buttonHeight, 0xffffff)
                .setInteractive()
                .on('pointerup', () => {
                    self.scene.start('Scene1');
                    
                    console.log('Back to Main Menu clicked!');
                });

                const buttonText = this.add.text(buttonX, buttonY, 'Back to Main Menu', { fontFamily: '"Press Start 2P"',fill: '#000', fontSize: '8px' });
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

export default Scene2;

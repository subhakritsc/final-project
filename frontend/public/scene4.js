import { id,word } from './scene3.js';
import { deleteItem , createItem } from './scripts/api.js';


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
                families: ["Press Start 2P",'Mitr']
            },
            active: () => {

                const buttonWidth = 170;
                const buttonHeight = 75;
                const middleX = 400;
                const buttonX = 650;
                const buttonY = 500;

                const head = this.add.text(100, 140, 'what to you want to tell next person' , { fontFamily: '"Press Start 2P"', fontSize: '15px', fill: '#fff' });
                const headWidht = head.width;
                head.setX(middleX - headWidht/2);

                const head2 = this.add.text(100, 200, 'type here:' , { fontFamily: '"Press Start 2P"', fontSize: '15px', fill: '#fff' });
                const headWidht2 = head2.width;
                head2.setX(middleX - headWidht2/2);

                
                const input = this.add.text(400, 275, '', { fontFamily: 'MItr', fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);

                
                this.input.keyboard.on('keydown', function(event) {
                    const thaiPattern = /^[a-zA-Z0-9\sก-๙]$/; // Allow alphanumeric characters, blank space, and Thai characters
                    if (thaiPattern.test(event.key)) {
                        input.text += event.key;
                    } else if (event.key === 'Backspace' && input.text.length > 0) {
                        input.text = input.text.slice(0, -1);
                    }
                });

                this.add.rectangle(buttonX, buttonY, buttonWidth, buttonHeight, 0xffffff)
                .setInteractive()
                .on('pointerup', async () => {
                    await deleteItem(id);
                    
                    const payload = {
                        item : input.text
                    }
                    await createItem(payload);

                    console.log('Send Message : '+input.text)
                    console.log("Already delete : "+ word +" "+id)
                    
                    this.scene.start('Scene1');
                });

                const buttonText = this.add.text(buttonX, buttonY, 'Send Message', { fontFamily: '"Press Start 2P"',fill: '#000', fontSize: '12px' });
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

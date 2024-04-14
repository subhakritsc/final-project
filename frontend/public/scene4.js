import { id,word } from './scene3.js';
import { deleteItem , createItem } from './scripts/api.js';


class Scene4 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene4' });
    }

    preload() {
        this.load.image('wallpaper', 'wallpaper2.jpg');
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

    }

    create() {
        WebFont.load({
            google: {
                families: ["Press Start 2P",'Mitr']
            },
            active: () => {

                const buttonWidth = 170;
                const buttonHeight = 50;
                const middleX = 400;
                const buttonX = 650;
                const buttonY = 500;

                const head = this.add.text(100, 140, 'what to you want to tell next person' , { fontFamily: '"Press Start 2P"', fontSize: '15px', fill: '#fff' });
                const headWidht = head.width;
                head.setX(middleX - headWidht/2);

                const head2 = this.add.text(100, 200, 'type here:' , { fontFamily: '"Press Start 2P"', fontSize: '15px', fill: '#fff' });
                const headWidht2 = head2.width;
                head2.setX(middleX - headWidht2/2);
                
                const inputElement = document.createElement('input');
                inputElement.type = 'text';
                inputElement.style.position = 'absolute';
                inputElement.style.transform = 'translate(-50%, -50%)';
                inputElement.style.padding = '10px';
                inputElement.style.fontSize = '15px';
                inputElement.style.borderRadius = '5px';
                inputElement.style.fontFamily = 'Mitr'
                inputElement.style.left = `400px`;
                inputElement.style.top = `300px`;

                this.game.canvas.parentElement.appendChild(inputElement);
            
                this.add.rectangle(buttonX, buttonY, buttonWidth, buttonHeight, 0xffffff)
                .setInteractive()
                .on('pointerup', async () => {
                    await deleteItem(id);
                    
                    const payload = {
                        item : inputElement.value
                    }
                    await createItem(payload);

                    console.log('Send Message : '+inputElement.value)
                    console.log("Already delete : "+ word +" "+id)

                    this.scene.start('Scene1');
                    this.game.canvas.parentElement.removeChild(inputElement);
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

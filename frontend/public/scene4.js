import { id,word } from './scene3.js';
import { deleteItem , createItem } from './scripts/api.js';


class Scene4 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene4' });
    }

    preload() {
        this.load.image('wallpaper', 'wallpaper2.jpg');
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.audio('clock','clock.mp3');
        this.load.image('cat','cat.png');
    }

    create() {
        const clockSound = this.sound.add('clock');
        clockSound.loop = true;
        clockSound.play;
        WebFont.load({
            google: {
                families: ["Press Start 2P",'Mitr']
            },
            active: () => {

                const buttonWidth = 170;
                const buttonHeight = 50;
                const middleX = 400;
                const buttonX = 650;
                const buttonY = 525;
                
                const catWalk = this.add.image(700,420,'cat').setScale(0.3);

                const head = this.add.text(100, 140, 'what do you want to tell next person' , { fontFamily: '"Press Start 2P"', fontSize: '15px', fill: '#fff' });
                const headWidht = head.width;
                head.setX(middleX - headWidht/2);

                const header = this.add.text(100, 220, 'type here : ' , { fontFamily: '"Press Start 2P"', fontSize: '15px', fill: '#000' });
                const headerWidht = header.width;
                header.setX(middleX - headerWidht/2);
                
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
                    clockSound.stop();
                    await deleteItem(id);
                    
                    const payload = {
                        item : inputElement.value,
                        type : "Text"
                    }
                    await createItem(payload);

                    console.log('Send Message : '+inputElement.value)
                    console.log("Already delete : "+ word +" "+id)

                    this.scene.get('Scene1').showNotification("Your message has been sent!");
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

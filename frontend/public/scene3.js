export var word ;
export var id ;
var items = [];

import { getItems } from "./scripts/api.js";

class Scene3 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene3' });
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
            active: async () => {
                const self = this;

                items = await getItems()
                console.log(items)
        
                let randomIndex = Math.floor(Math.random() * items.length);
                const item = items[randomIndex];
                
                id = item._id;
                word = item.item;
                console.log("the random word is "+word)
                console.log("id is "+id)

                const buttonWidth = 170;
                const buttonHeight = 75;
                const middleX = 400;
                const buttonX = 650;
                const buttonY = 500;

                const head = this.add.text(100, 140, 'the word is' , { fontFamily: '"Press Start 2P"', fontSize: '45px', fill: '#fff' });
                const headWidht = head.width;
                head.setX(middleX - headWidht/2);

                const heading = this.add.text(100, 250, '" '+word+' "' , { fontFamily: 'Mitr' , fontSize: '30px', fill: '#fff' });
                const headingWidht = heading.width;
                heading.setX(middleX - headingWidht/2);


                this.add.rectangle(buttonX, buttonY, buttonWidth, buttonHeight, 0xffffff)
                .setInteractive()
                .on('pointerup', () => {    
                    self.scene.start('Scene4');
                    console.log('Continue clicked!');
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

export default Scene3;

export var word ;
export var id ;
var items = [];

import { getItems } from "./scripts/api.js";

class Scene3 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene3' });
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
            active: async () => {
                const self = this;

                items = await getItems()
                console.log(items)
        
                let randomIndex = Math.floor(Math.random() * items.length);
                const item = items[randomIndex];
                
                id = item._id;
                word = item.item;

                const buttonWidth = 170;
                const buttonHeight = 50;
                const middleX = 400;
                const distanceX = 250;
                const buttonY = 525;
                this.graphics = this.add.graphics();

                if(item.type == "Text"){
                    console.log("the random word is "+word)
                    console.log("id is "+id)

                    const head = this.add.text(100, 170, 'prevoius person want to tell you that' , { fontFamily: '"Press Start 2P"', fontSize: '15px', fill: '#000' });
                    const headWidth = head.width;
                    head.setX(middleX - headWidth/2);

                    const heading = this.add.text(100, 250, '" '+word+' "' , { fontFamily: 'Mitr' , fontSize: '50px', fill: '#fff' });
                    const headingWidth = heading.width;
                    heading.setX(middleX - headingWidth/2);
                } else if(item.type == "Drawing") {
                    console.log("drawing's id is "+id)

                    const head = this.add.text(100, 170, 'this is the drawing from previous person' , { fontFamily: '"Press Start 2P"', fontSize: '15px', fill: '#000' });
                    const headWidth = head.width;
                    head.setX(middleX - headWidth/2);

                    this.displayDrawing(item.item)
                }
            

                this.add.rectangle(middleX + distanceX, buttonY, buttonWidth, buttonHeight, 0xffffff)
                .setInteractive()
                .on('pointerup', () => {    
                    self.scene.start('Scene4');
                    console.log('Continue clicked!');
                });

                const buttonText = this.add.text(middleX + distanceX, buttonY, 'Pass message', { fontFamily: '"Press Start 2P"',fill: '#000', fontSize: '11px' });
                const textWidth = buttonText.width;
                const textHeight = buttonText.height;
                buttonText.setX(middleX + distanceX - textWidth / 2);
                buttonText.setY(buttonY - textHeight / 2);


                this.add.rectangle(middleX - distanceX, buttonY, buttonWidth, buttonHeight, 0xffffff)
                .setInteractive()
                .on('pointerup', () => {    
                    self.scene.start('DrawScene');
                    console.log('Continue clicked!');
                });

                const buttonText2 = this.add.text(middleX - distanceX, buttonY, 'Pass drawing', { fontFamily: '"Press Start 2P"',fill: '#000', fontSize: '11px' });
                const textWidth2 = buttonText2.width;
                const textHeight2 = buttonText2.height;
                buttonText2.setX(middleX - distanceX - textWidth2 / 2);
                buttonText2.setY(buttonY - textHeight2 / 2);

            },

            inactive: () => {
                console.error('Failed to load font');
            }
        });

        this.add.image(0,0,'wallpaper').setOrigin(0,0);
    }

    displayDrawing(imageDataURL) {
        this.graphics.clear();
    
        const previousDrawing = this.children.getByName('drawing');
        if (previousDrawing) {
            console.log('Destroying previous drawing');
            previousDrawing.destroy();
        } else {
            console.log('No previous drawing found');
        }
    
        const img = new Image();
        img.src = imageDataURL;
    
        img.onload = () => {
            const middleX = 400;
            const middleY = 300;
    
            const texture = this.textures.addImage('drawing_' + Date.now(), img);
    
            const drawingSprite = this.add.sprite(middleX, middleY, texture.key);
            drawingSprite.setName('drawing');
    
            drawingSprite.setScale(0.5);
        };
    }
        
}

export default Scene3;

import { id, word } from './scene3.js';
import { deleteItem, createItem } from './scripts/api.js';

class DrawScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DrawScene' });
    }

    preload() {
        this.load.image('wallpaper', 'wallpaper2.jpg');
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        const self = this;
        let strokeColor = '#000'; // default color (black)

        WebFont.load({
            google: {
                families: ["Press Start 2P", 'Mitr']
            },
            active: () => {
                const buttonWidth = 40;
                const buttonHeight = 40;
                const buttonMargin = 10;
                const middleX = this.cameras.main.width / 2;
                const middleY = this.cameras.main.height / 2;
                const buttonX = this.cameras.main.width - 100;
                const buttonY = middleY - (6 * buttonHeight + 5 * buttonMargin) / 2;

                const head = this.add.text(100, 90, 'Draw something for the next person', { fontFamily: '"Press Start 2P"', fontSize: '15px', fill: '#fff' });
                const headWidth = head.width;
                head.setX(middleX - headWidth / 2);

                const canvas = document.createElement('canvas');
                canvas.width = 500;
                canvas.height = 300;
                canvas.style.position = 'absolute';
                canvas.style.left = '400px';
                canvas.style.top = '300px';
                canvas.style.transform = 'translate(-50%, -50%)';
                canvas.style.border = '2px solid #ffffff';
                document.body.appendChild(canvas);

                const ctx = canvas.getContext('2d');

                let isDrawing = false;
                let lastX = 0;
                let lastY = 0;

                canvas.addEventListener('mousedown', startDrawing);
                canvas.addEventListener('mousemove', draw);
                canvas.addEventListener('mouseup', endDrawing);
                canvas.addEventListener('mouseout', endDrawing);

                canvas.addEventListener('pointerdown', startDrawing);
                canvas.addEventListener('pointermove', draw);
                canvas.addEventListener('pointerup', endDrawing);

                function startDrawing(e) {
                    isDrawing = true;
                    [lastX, lastY] = [e.offsetX, e.offsetY];
                }

                function draw(e) {
                    if (!isDrawing) return;
                    ctx.beginPath();
                    ctx.moveTo(lastX, lastY);
                    ctx.lineTo(e.offsetX, e.offsetY);
                    ctx.strokeStyle = strokeColor;
                    ctx.lineWidth = 5;
                    ctx.lineCap = 'round';
                    ctx.stroke();
                    [lastX, lastY] = [e.offsetX, e.offsetY];
                }

                function endDrawing() {
                    isDrawing = false;
                }

                // color options (red, orange, yellow, green, blue, violet, balck, white)
                const colors = ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#8a2be2', '#000000', '#ffffff'];
                const colorButtons = [];

                colors.forEach((color, index) => {
                    const colorButton = self.add.rectangle(buttonX - 30, (buttonY - 5) + index * (canvas.height / colors.length + 1), buttonWidth, canvas.height / colors.length - 20, parseInt(color.replace('#', '0x'), 16))
                        .setInteractive()
                        .on('pointerup', () => {
                            strokeColor = color;
                        });
                    colorButtons.push(colorButton);
                });

                self.add.rectangle(middleX, buttonY + colors.length * (canvas.height / colors.length + buttonMargin), 170, buttonHeight, 0xffffff)
                    .setInteractive()
                    .on('pointerup', async () => {
                        try {
                            await deleteItem(id);
                            const image = canvas.toDataURL('image/png');
                            const payload = {
                                item: image,
                                type: "Drawing"
                            };
                            await createItem(payload);
                            console.log('Drawing sent!');
                            console.log("Already deleted: " + word + " " + id);
                            self.scene.get('Scene1').showNotification("Your drawing has been sent!");
                            self.scene.start('Scene1');
                            canvas.remove();
                        } catch (error) {
                            console.error('Error:', error);
                        }
                    });

                const buttonText = self.add.text(middleX, buttonY + colors.length * (canvas.height / colors.length + buttonMargin), 'Send Drawing', { fontFamily: '"Press Start 2P"', fill: '#000', fontSize: '12px' });
                const textWidth = buttonText.width;
                const textHeight = buttonText.height;
                buttonText.setX(middleX - textWidth / 2);
                buttonText.setY(buttonY + colors.length * (canvas.height / colors.length + buttonMargin) - textHeight / 2);

            },

            inactive: () => {
                console.error('Failed to load font');
            }
        });

        this.add.image(0, 0, 'wallpaper').setOrigin(0, 0);
    }

}

export default DrawScene;

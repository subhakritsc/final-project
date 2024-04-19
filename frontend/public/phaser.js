import Scene1 from './scene1.js';
import Scene2 from './scene2.js';
import Scene3 from './scene3.js';
import Scene4 from './scene4.js';
import DrawScene from './drawScene.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene:  [Scene1,Scene2,Scene3,Scene4,DrawScene]
        
};

const game = new Phaser.Game(config);

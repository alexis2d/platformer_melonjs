import * as me from 'melonjs/dist/melonjs.module.js';
//import HUD from '../renderables/hud/container.js'
//import data from '../data.js'

class PlayScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {

        // load a level
		me.level.load("map1");

		// reset the score
		//data.score = 0;

		// add our HUD to the game world
		/* this.HUD = new HUDContainer();
		me.game.world.addChild(this.HUD); */
    }
};

export default PlayScreen;

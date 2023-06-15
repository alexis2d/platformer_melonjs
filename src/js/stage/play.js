import * as me from 'melonjs/dist/melonjs.module.js';
import HUDContainer from "../renderables/hud.js";
import data from './../data.js';

class PlayScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {

        // load a level
		me.level.load("map1");

        // play the audio track
        me.audio.playTrack("dst-inertexponent");

		// reset the score
		data.score = 0;

		// add our HUD to the game world
        this.HUD = new HUDContainer();
		me.game.world.addChild(this.HUD);
    }

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);

        // stop the current audio track
        me.audio.stopTrack();
    }
};

export default PlayScreen;

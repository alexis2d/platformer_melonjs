import * as me from 'melonjs/dist/melonjs.module.js';
import ScoreItem from "./score.js";


export default class HUDContainer extends me.Container {
    constructor() {
        super();

        // persistent across level change
        this.isPersistent = true;

        // make sure we use screen coordinates
        this.floating = true;

        // give a name
        this.name = "HUD";

        this.addChild(new ScoreItem(0, 0));
    }
}
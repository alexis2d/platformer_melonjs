import * as me from 'melonjs';

class TomatoEntity extends me.Collectable {

    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y , settings);

        // this item collides ONLY with PLAYER_OBJECT
        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);
    }

    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision(response, other) {
        if (response.b.body.collisionType !== me.collision.types.ENEMY_OBJECT) {
            // res.y >0 means touched by something on the bottom
            // which mean at top position for this one
            if (this.alive && (response.overlapV.y > 0) && response.a.body.falling) {
                this.renderable.flicker(750, () => {
                    this.body.setCollisionMask(me.collision.types.NO_OBJECT);
                    me.game.world.removeChild(this);
                });
            }
            return false;
        }
        // Make all other objects solid
        return true;
    };
    
}

export default TomatoEntity;

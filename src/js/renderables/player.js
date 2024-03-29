import * as me from 'melonjs';

let nb_jump = 0;
let forcedJump = false;
let leftCenterX = 0;
let rightCenterX = 0;

class PlayerEntity extends me.Entity {

    /**
     * constructor
     */
    nbTomatoes;
    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y , settings);

        // max walking & jumping speed
        this.body.setMaxVelocity(3, 15);
        this.body.setFriction(0.4, 0);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH, 0.4);

        this.body.collisionType = me.collision.types.PLAYER_OBJECT;

        // ensure the player is updated even when outside of the viewport
        this.alwaysUpdate = true;

        // define a basic walking animation (using all frames)
        this.renderable.addAnimation("walk",  [1, 2]);

        // define a standing animation (using the first frame)
        this.renderable.addAnimation("stand",  [0]);

        // set the standing animation as default
        this.renderable.setCurrentAnimation("stand");

        // fix le bug d'affichage du sprite
        leftCenterX = this.renderable.width + 16;
        rightCenterX = this.renderable.width / 2;

    }

    /**
     * update the entity
     */
    update(dt) {
        if (me.input.isKeyPressed('left')) {

            // flip the sprite on horizontal axis
            this.renderable.centerX = leftCenterX;
            this.renderable.flipX(true);
            // update the default force
            this.body.force.x = -this.body.maxVel.x;
            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else if (me.input.isKeyPressed('right')) {

            // unflip the sprite
            this.renderable.centerX = rightCenterX;
            this.renderable.flipX(false);
            // update the entity velocity
            this.body.force.x = this.body.maxVel.x;
            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else {
            // change to the standing animation
            this.renderable.setCurrentAnimation("stand");
        }

        if (me.input.isKeyPressed('jump')) {

            if (nb_jump <= 1)
            {
                // play some audio
                me.audio.play("jump");
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.body.force.y = -this.body.maxVel.y;
                if (nb_jump === 1) {
                    this.body.vel.y = -this.body.maxVel.y;
                }
                nb_jump++;
            }
        } else {
            this.body.force.y = 0;
        }

        if (this.body.vel.y === 0 && nb_jump > 1) {
            nb_jump = 0;
        }

        return (super.update(dt) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    }

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision(response, other) {
        switch (response.b.body.collisionType) {
            case me.collision.types.WORLD_SHAPE:
              // Simulate a platform object
              if (other.type === "platform") {
                if (this.body.falling &&
                  !me.input.isKeyPressed('down') &&
        
                  // Shortest overlap would move the player upward
                  (response.overlapV.y > 0) &&
        
                  // The velocity is reasonably fast enough to have penetrated to the overlap depth
                  (~~this.body.vel.y >= ~~response.overlapV.y)
                ) {
                  // Disable collision on the x axis
                  response.overlapV.x = 0;
        
                  // Repond to the platform (it is solid)
                  return true;
                }
        
                // Do not respond to the platform (pass through)
                return false;
              }
              break;
        
            case me.collision.types.ENEMY_OBJECT:
                if ((response.overlapV.y>0) && this.body.falling) {
                    // play some audio
                    me.audio.play("stomp");
                    // bounce (force jump)
                    this.body.vel.y = -this.body.maxVel.y;
                    forcedJump = true;
                }
                else {
                    // let's flicker in case we touched an enemy
                    if (forcedJump === false) {
                        this.renderable.flicker(750);
                    }
                    forcedJump = false;
                }
                break;

            default:
              // Do not respond to other objects (e.g. coins)
              return false;
          }
        
          // Make the object solid
          return true;
    }
};

export default PlayerEntity;

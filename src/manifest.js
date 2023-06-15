// a melonJS data manifest
// note : this is note a webpack manifest
const DataManifest = [

    {
        name: "area1",
        type: "image",
        src:  "data/img/map/area1.png"
    },
    {
        name: "background",
        type: "image",
        src:  "data/img/background.png"
    },
    {
        name: "cube_right",
        type: "image",
        src:  "data/img/sprite/cube_right.png"
    },
    {
        name: "tomato",
        type: "image",
        src:  "data/img/sprite/tomato.png"
    },
    {
        name: "angry_tomato",
        type: "image",
        src:  "data/img/sprite/angry_tomato.png"
    },
    {
        name: "map1",
        type: "tmx",
        src: "data/map/map1.tmx"
    },
    {
        name: "map2",
        type: "tmx",
        src: "data/map/map2.tmx"
    },
    {
        name: "PressStart2P",
        type:"image",
        src: "data/fnt/PressStart2P.png"
    },
    {
        name: "PressStart2P",
        type:"binary",
        src: "data/fnt/PressStart2P.fnt"
    },
    /*
	 * Background music.
	 */
    {
        name: "dst-inertexponent",
        type: "audio",
        src: "data/bgm/"
    },
    /*
	 * Sound effects.
	 */
    {
        name: "cling",
        type: "audio",
        src: "data/sfx/"
    },
    {
        name: "stomp",
        type: "audio",
        src: "data/sfx/"},
    {
        name: "jump",
        type: "audio",
        src: "data/sfx/"
    }
];

export default DataManifest;

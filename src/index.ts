import { Application, FederatedPointerEvent, Graphics, Sprite, Texture } from 'pixi.js'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x111111,
	width: window.innerWidth,
	height: window.innerHeight,
});

const background_sprite : Sprite = new Sprite(Texture.EMPTY);

const waves : Graphics[] = [];

function init() {
	background_sprite.width = window.innerWidth;
	background_sprite.height = window.innerHeight;
	app.stage.addChild(background_sprite);
	background_sprite.interactive = true;
	background_sprite.on('click', accept_click);
}

function accept_click(click_evt: FederatedPointerEvent) {
	let x = click_evt.x;
	let y = click_evt.y;
	let new_wave = new Graphics;
	new_wave.lineStyle(1, 0xff0000);
	new_wave.drawCircle(x, y, 10);
	new_wave.x = 0;
	new_wave.y = 0;
	waves.push(new_wave);
	app.stage.addChild(new_wave);
}

function update() {
	for (const wave of waves) {
		wave.scale.set(wave.scale.x + 0.01);
	}
}

init();
setInterval(update, 10);

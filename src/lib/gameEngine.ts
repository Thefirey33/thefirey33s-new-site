import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import SoulTexture from '$lib/assets/imgs/game_assets/soul.png';
import SoulShatterTexture from '$lib/assets/imgs/game_assets/soul_shatter.png';
import CPlusPlusItem from '$lib/assets/imgs/game_assets/cpluspluslogo.gif';
import BackgroundMusic from '$lib/assets/sounds/game/cplusplusboss.ogg';
import HurtSound from '$lib/assets/sounds/game/hurt.wav';
import BreakSound from '$lib/assets/sounds/game/snd_break1_c.wav';
import CongratsSound from '$lib/assets/sounds/game/success.mp3';
import ShatterSound from '$lib/assets/sounds/game/snd_break2_c.wav';

import { achievementGet, achievementName, coolUsername, isDead } from '$lib';

export const ALREADY_DONE_ASSETS: Map<string, string> = new Map<string, string>();
/**
 * This loads a image from the server.
 * @param assetSource The IMG Link.
 * @returns ImageBlob.
 */
export async function getAssetFromServer(assetSource: string) {
	if (ALREADY_DONE_ASSETS.has(assetSource)) return ALREADY_DONE_ASSETS.get(assetSource);
	GameEngine.CurrentlyBusyLoading++;
	const blobSource = await fetch(assetSource)
		.then((response) => response.blob())
		.then((blob) => URL.createObjectURL(blob));
	console.log('OK, Loaded Asset', blobSource);
	ALREADY_DONE_ASSETS.set(assetSource, blobSource);
	GameEngine.CurrentlyBusyLoading--;
	return blobSource;
}
/**
 * The Vector2 Positioning System.
 */
export class Vector2 {
	public x: number;
	public y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	public add(other: Vector2): Vector2 {
		return new Vector2(this.x + other.x, this.y + other.y);
	}
	public subtract(other: Vector2): Vector2 {
		return new Vector2(this.x - other.x, this.y - other.y);
	}
	public multiply(scalar: number): Vector2 {
		return new Vector2(this.x * scalar, this.y * scalar);
	}
	public divide(scalar: number): Vector2 {
		return new Vector2(this.x / scalar, this.y / scalar);
	}
}

export function assetLoadingFailure() {
	alert('Asset Loading Failure!');
	goto(resolve('/'));
}
export class Renderable {
	public constructor(textureSource: string) {
		if (textureSource == '') return;
		this.textureSource = new Image();
		getAssetFromServer(textureSource).then((r) => {
			if (!r) {
				assetLoadingFailure();
				return;
			}
			this.textureSource.src = r;
		});
		// When the texture is loaded, stop the busy loading.
		this.textureSource.onload = () => {
			this.textureSize = new Vector2(this.textureSource.width, this.textureSource.height);
		};
	}
	/**
	 * The base rendering function. This rendering function is a dummy function,
	 * So other more streamlined systems can render instead.
	 * This is a polymorphic rendering base.
	 */
	public renderThisObject() {}
	public textureSource: HTMLImageElement = new Image();
	public textureSize: Vector2 = new Vector2(0, 0);
}
/**
 * The GameObject itself.
 */
export class GameObject extends Renderable {
	/**
	 * Make this GameObject.
	 * @param position The position of the GameObject.
	 * @param textureSource The source of the texture.
	 */
	public constructor(position: Vector2, textureSource: string) {
		super(textureSource);
		this.position = position;
	}
	public position: Vector2;

	/**
	 * Render this GameObject to the scene.
	 */
	public renderThisObject(): void {
		if (this.textureSource)
			GameEngine.CanvasContext?.drawImage(
				this.textureSource,
				this.position.x - this.textureSize.x / 2,
				this.position.y - this.textureSize.y / 2
			);
	}
}

export class Particle extends GameObject {
	public Velocity: Vector2;
	public constructor(position: Vector2) {
		super(position, '');
		function getRandomValue(maxVal: number) {
			return Math.random() * maxVal - Math.random() * maxVal;
		}
		this.Velocity = new Vector2(getRandomValue(10), getRandomValue(10));
	}

	public renderThisObject(): void {
		GameEngineDrawing.DrawRectangle(this.position, new Vector2(10, 10), 'red');
		this.position = this.position.add(this.Velocity);
		this.Velocity = this.Velocity.add(new Vector2(0, GameEngine.deltaTime * 10));
	}
}

export async function getAsset(assetSource: string) {
	return getAssetFromServer(assetSource).then((r) => {
		if (!r) {
			assetLoadingFailure();
			throw 'Asset Loading Failure';
		}
		return r;
	});
}
export class PlayerObject extends GameObject {
	public static PlayerSpeed: number = 200;
	public static PlayerHealth = 1;
	public static PlayerFlicker = 0;
	public DeathAnimationPhase = 0;

	public constructor(position: Vector2, textureSource: string) {
		super(position, textureSource);
	}
	public renderThisObject(): void {
		if (PlayerObject.PlayerHealth <= 0) {
			switch (this.DeathAnimationPhase) {
				case 0:
					// Firstly, save the highscore. If possible.
					saveState();
					// Show UI button for resetting.
					isDead.set(true);
					this.DeathAnimationPhase = 1;
					GameEngine.Objects = [];
					GameEngine.BackgroundMusicSource.stopAudio();
					setTimeout(() => {
						// change the texture.
						getAsset(SoulShatterTexture).then((r) => (this.textureSource.src = r));
						GameEngine.BreakSoundSource.playAudio();
						setTimeout(() => (this.DeathAnimationPhase = 2), 1000);
					}, 500);
					break;
				case 1:
					super.renderThisObject();
					break;
				case 2:
					GameEngine.ShatterSoundSource.playAudio();
					for (let i = 0; i < 100; i++) {
						GameEngine.Objects.push(new Particle(this.position));
					}
					this.DeathAnimationPhase = 3;
					break;
			}
			return;
		}
		// axis stuff
		const speed = PlayerObject.PlayerSpeed * (GameEngine.KeyboardHandler.IsKeyPressed('x') ? 2 : 1);
		let horizontalAxis =
			GameEngine.KeyboardHandler.InputAxis('a', 'd') * speed * GameEngine.deltaTime;
		let verticalAxis =
			GameEngine.KeyboardHandler.InputAxis('w', 's') * speed * GameEngine.deltaTime;

		// bullet-board collision

		/**
		 * This checks for collisional edges.
		 * @param thisObj the object to
		 * @param comparingValue the first value to compare.
		 * @param positiveValue the value that is destined to be higher than this, usually the right / up side of the collision.
		 * @param negativeValue the value that is destined to be lower than this, usually the left / down side of the collision.
		 * @param axisValue the axis value.
		 * @returns if the collision reported successful.
		 */
		function checkForCollisionEdges(
			comparingValue: number,
			positiveValue: number,
			negativeValue: number,
			axisValue: number
		): boolean {
			return (
				(comparingValue > positiveValue && axisValue > 0) ||
				(comparingValue < negativeValue && axisValue < 0)
			);
		}

		const bulletBoardXRight =
				GameEngine.BulletBoardLocation.x + GameEngine.BulletBoardSize.x - this.textureSize.x / 2,
			bulletBoardXLeft = GameEngine.BulletBoardLocation.x + this.textureSize.x / 2;

		const bulletBoardYUp =
				GameEngine.BulletBoardLocation.y + GameEngine.BulletBoardSize.y - this.textureSize.y / 2,
			bulletBoardYDown = GameEngine.BulletBoardLocation.y + this.textureSize.y / 2;

		// this if statement checks if we are over the bullet board's boundary line.
		// so we should stop the player from PROCEED-ing further.
		if (
			checkForCollisionEdges(this.position.x, bulletBoardXRight, bulletBoardXLeft, horizontalAxis)
		) {
			horizontalAxis = 0;
		}

		if (checkForCollisionEdges(this.position.y, bulletBoardYUp, bulletBoardYDown, verticalAxis)) {
			verticalAxis = 0;
		}

		/**
		 * This function checks if we are over the set boundary lines of a collision-box / bulletboard.
		 * @param comparingValue The positional value to compare.
		 * @param rightUp The positive, the right side.
		 * @param leftDown The negative, the left side.
		 * @returns
		 */
		function collisionABCheck(comparingValue: number, rightUp: number, leftDown: number): number {
			if (comparingValue > rightUp) return rightUp;
			if (comparingValue < leftDown) return leftDown;
			return comparingValue;
		}
		this.position.x = collisionABCheck(this.position.x, bulletBoardXRight, bulletBoardXLeft);
		this.position.y = collisionABCheck(this.position.y, bulletBoardYUp, bulletBoardYDown);

		// change the position of the player.
		this.position = new Vector2(this.position.x + horizontalAxis, this.position.y + verticalAxis);
		if ((Date.now() % 2 && PlayerObject.PlayerFlicker > 0) || PlayerObject.PlayerFlicker <= 0)
			super.renderThisObject();

		PlayerObject.PlayerFlicker =
			PlayerObject.PlayerFlicker > 0
				? PlayerObject.PlayerFlicker - GameEngine.deltaTime * 10
				: PlayerObject.PlayerFlicker;
		GameEngine.Objects.forEach((nextObject) => {
			const peaceScore = 3;
			if (
				this.position.x > nextObject.position.x - nextObject.textureSize.x / peaceScore &&
				this.position.x < nextObject.position.x + nextObject.textureSize.x / peaceScore &&
				this.position.y > nextObject.position.y - nextObject.textureSize.y / peaceScore &&
				this.position.y < nextObject.position.y + nextObject.textureSize.y / peaceScore &&
				PlayerObject.PlayerFlicker <= 0
			) {
				PlayerObject.PlayerFlicker = 5;
				PlayerObject.PlayerHealth -= 1;
				GameEngine.HurtSoundSource.playAudio();
			}
		});
	}
}

export class GameEngineDrawing {
	/**
	 * This function draws a rectangle to the canvas.
	 * @param position The position of the rectangle.
	 * @param size The size of the rectangle.
	 * @param color The color of the rectangle.
	 */
	public static DrawRectangle(position: Vector2, size: Vector2, color: string) {
		if (!GameEngine.CanvasContext) return;
		GameEngine.CanvasContext.fillStyle = color;
		GameEngine.CanvasContext.fillRect(position.x, position.y, size.x, size.y);
		GameEngine.CanvasContext.fill();
	}

	/**
	 * Clear the screen.
	 */
	public static ClearCanvasContext() {
		if (!GameEngine.CanvasContext) return;
		const canvasCurrent = GameEngine.CanvasContext.canvas;
		GameEngine.CanvasContext.clearRect(0, 0, canvasCurrent.width, canvasCurrent.height);
		GameEngineDrawing.DrawRectangle(
			new Vector2(0, 0),
			GameEngine.CANVAS_RENDERING_SIZE,
			'rgba(0, 0, 0, 0.9)'
		);
	}

	/**
	 * Text-Init. The step before the text is fully rendered.
	 * @param fontSize The font size.
	 */
	public static InitializeText(fontSize: number) {
		if (!GameEngine.CanvasContext) return;
		GameEngine.CanvasContext.font = `${fontSize}px Cool Font`;
	}
	/**
	 * Draw text on the screenç
	 * @param location The location of the text the draw.
	 * @param fontSize The font size of the text.
	 * @param stringToDraw The text itself.
	 */
	public static DrawText(location: Vector2, fontSize: number, stringToDraw: string = '') {
		if (!GameEngine.CanvasContext) return;
		GameEngineDrawing.InitializeText(fontSize);
		GameEngine.CanvasContext.fillStyle = 'white';
		GameEngine.CanvasContext.fillText(stringToDraw, location.x, location.y);
		return GameEngineDrawing.GetFontMeasurements(fontSize, stringToDraw);
	}

	public static DrawShakyText(
		location: Vector2,
		fontSize: number,
		shakeAmount = 5,
		stringToDraw: string = ''
	) {
		let xPos = 0;
		for (let i = 0; i < stringToDraw.length; i++) {
			const charCurrent = stringToDraw.charAt(i);
			const fontMeasurement = GameEngineDrawing.GetFontMeasurements(fontSize, charCurrent);
			// Check if the measurement was a success or not.
			if (!fontMeasurement) return;
			GameEngineDrawing.DrawText(
				location.add(
					new Vector2(xPos + Math.random() * shakeAmount, location.y + Math.random() * shakeAmount)
				),
				fontSize,
				charCurrent
			);
			xPos += fontMeasurement.width;
		}
	}
	/**
	 * Get measurements of the text.
	 * @param fontSize The font size.
	 * @param stringToDraw The text to draw
	 * @returns
	 */
	public static GetFontMeasurements(fontSize: number, stringToDraw: string) {
		if (!GameEngine.CanvasContext) return;
		GameEngineDrawing.InitializeText(fontSize);
		return GameEngine.CanvasContext.measureText(stringToDraw);
	}

	public static DrawStrokeRectangle(
		location: Vector2,
		size: Vector2,
		color: string,
		repeatTimes: number = 5
	) {
		if (!GameEngine.CanvasContext) return;
		for (let i = 0; i < repeatTimes; i++) {
			GameEngine.CanvasContext.strokeStyle = color;
			GameEngine.CanvasContext.strokeRect(location.x, location.y, size.x, size.y);
		}
	}

	public static DrawCircle(location: Vector2, radius: number, color: string) {
		if (!GameEngine.CanvasContext) return;
		GameEngine.CanvasContext.fillStyle = color;
		GameEngine.CanvasContext.beginPath();
		GameEngine.CanvasContext.ellipse(location.x, location.y, radius, radius, 0, 0, Math.PI * 2);
		GameEngine.CanvasContext.fill();
	}
}
export class AudioSource {
	public innerAudioSource;
	/**
	 * The audioSource constructor.
	 * @param audioSource The audio source itself.
	 */
	constructor(audioSource: string) {
		this.innerAudioSource = new Audio(audioSource);
	}
	/**
	 * Play the audio.
	 * @param looping Will the audio loop?
	 */
	public playAudio(looping = false) {
		this.innerAudioSource.loop = looping;
		this.innerAudioSource.currentTime = 0;
		this.innerAudioSource.play();
	}

	public stopAudio() {
		this.innerAudioSource.currentTime = 0;
		this.innerAudioSource.pause();
	}
}
/**
 * The main keyboard input system, that checks for keyboard input and such.
 */
export class KeyboardHandler {
	public keysPressed: string[] = [];
	constructor() {
		window.addEventListener('keydown', (event) => {
			const lowerCasedKey = event.key.toLocaleLowerCase();
			if (!this.keysPressed.includes(lowerCasedKey)) this.keysPressed.push(lowerCasedKey);
		});
		window.addEventListener('keyup', (event) => {
			const lowerCasedKey = event.key.toLocaleLowerCase();
			if (this.keysPressed.includes(lowerCasedKey))
				this.keysPressed.splice(this.keysPressed.indexOf(lowerCasedKey), 1);
		});
	}
	/**
	 * This checks if a certain keycode was pressed.
	 * @param keycode The keycode to check.
	 * @returns If they keycode was pressed or not.
	 */
	public IsKeyPressed(keycode: string): boolean {
		return this.keysPressed.includes(keycode);
	}
	/**
	 * This is the axis function.
	 * @param upAxis Plus Axis.
	 * @param backAxis Negative Axis.
	 * @returns The Axis Value through 1 : 0 : -1.
	 */
	public InputAxis(upAxis: string, backAxis: string): -1 | 0 | 1 {
		return this.IsKeyPressed(backAxis) ? 1 : this.IsKeyPressed(upAxis) ? -1 : 0;
	}
}
export class RainingStar extends GameObject {
	constructor(position: Vector2) {
		super(position, CPlusPlusItem);
	}
	public renderThisObject(): void {
		super.renderThisObject();
		this.position = this.position.add(new Vector2(0, GameEngine.deltaTime * 500));
	}
}
export function saveState() {
	const currentHighScore = localStorage.getItem(achievementName);
	const val = GameEngine.Countdown.toString();
	if (currentHighScore !== null && Number.parseFloat(currentHighScore) > GameEngine.Countdown)
		localStorage.setItem(achievementName, val);
	else if (currentHighScore == null) localStorage.setItem(achievementName, val);
}
export class GameEngine {
	/**
	 * The current rendering context.
	 */
	public static CanvasContext: CanvasRenderingContext2D | null = null;
	/**
	 * The Input Handler.
	 */
	public static KeyboardHandler: KeyboardHandler;
	/**
	 * Is the engine busy fetching content?
	 */
	public static CurrentlyBusyLoading: number = 0;
	/**
	 * Good Ol' Chara.
	 */
	public static Player: PlayerObject;
	/**
	 * The BGM.
	 */
	public static BackgroundMusicSource: AudioSource;

	/**
	 * The first initial soul break sound.
	 */
	public static BreakSoundSource: AudioSource;
	/**
	 * The second soul shatter sound.
	 */
	public static ShatterSoundSource: AudioSource;

	public static HurtSoundSource: AudioSource;

	public static DeathTriggered = false;

	public static Congrats: AudioSource;
	/**
	 * DeltaTime calculation attribute.
	 */
	protected static LAST_DELTA: number = 0;
	/**
	 * DeltaTime calculation attribute.
	 */
	protected static NOW_DELTA: number = 0;
	/**
	 * The delta time number.
	 */
	public static deltaTime: number = 0;
	/**
	 * Is the engine being forced to stop?
	 */
	public static STOP_ENGINE = false;
	/**
	 * Is the game engine running?
	 */
	public static ENGINE_RUNNING = false;
	/**
	 * The size of what the canvas is rendering.
	 */
	public static CANVAS_RENDERING_SIZE: Vector2 = new Vector2(0, 0);
	/**
	 * The location of the bullet board.
	 */
	public static BulletBoardLocation: Vector2 = new Vector2(0, 0);
	/**
	 * The size of the current bullet board.
	 */
	public static BulletBoardSize: Vector2 = new Vector2(300, 300);
	/**
	 * The countdown on the top of the screen.
	 */

	public static CountdownMax = 121;

	public static Countdown = GameEngine.CountdownMax;
	/**
	 * The player name.
	 */
	public static PlayerName = 'CHARA';
	/**
	 * The bullet board's actual location.
	 */
	public static FixedBulletBoardLocation: Vector2 = new Vector2(0, 0);

	/**
	 * All the other objects beside the player.
	 */
	public static Objects: GameObject[] = [];

	public static async AudioLoad(audioLocation: string) {
		return getAssetFromServer(audioLocation).then((r) => {
			if (r == undefined) {
				assetLoadingFailure();
				throw 'Asset Loading Error';
			}
			return r;
		});
	}
	public static renderObjects() {
		// object rendering.
		GameEngine.Objects.forEach((object) => {
			object.renderThisObject();
			if (object.position.y > GameEngine.CANVAS_RENDERING_SIZE.y)
				GameEngine.Objects.splice(GameEngine.Objects.indexOf(object), 1);
		});
	}
	public static MaxPlayerHealth = 20;
	/**
	 * The initialization method of the game engine.
	 */
	public static GameEngineInit() {
		// Extra assets, that definetly need loading.
		getAssetFromServer(SoulShatterTexture);
		getAssetFromServer(CPlusPlusItem);
		// Reset all states.
		PlayerObject.PlayerHealth = GameEngine.MaxPlayerHealth;
		GameEngine.Objects = [];

		GameEngine.AudioLoad(BackgroundMusic).then((r) => {
			GameEngine.BackgroundMusicSource = new AudioSource(r);
			GameEngine.BackgroundMusicSource.playAudio(true);
		});
		// Load the shatter sound.
		GameEngine.AudioLoad(ShatterSound).then(
			(r) => (GameEngine.ShatterSoundSource = new AudioSource(r))
		);
		// Load the break sound.
		GameEngine.AudioLoad(BreakSound).then(
			(r) => (GameEngine.BreakSoundSource = new AudioSource(r))
		);
		GameEngine.AudioLoad(CongratsSound).then((r) => (GameEngine.Congrats = new AudioSource(r)));
		// Load the hurt sound.
		GameEngine.AudioLoad(HurtSound).then((r) => (GameEngine.HurtSoundSource = new AudioSource(r)));
		// the countdown value, for the survival of the fittest.
		GameEngine.Countdown = GameEngine.CountdownMax;
		// deltatime calculation attributes.
		GameEngine.NOW_DELTA = 0;
		GameEngine.LAST_DELTA = 0;

		if (!GameEngine.CanvasContext) return;

		// Get the size of the canvas, please.
		const canvasToRender = GameEngine.CanvasContext.canvas;
		GameEngine.CANVAS_RENDERING_SIZE = new Vector2(canvasToRender.width, canvasToRender.height);

		// initalize base stuff.
		GameEngine.KeyboardHandler = new KeyboardHandler();
		// get the center of the screen.
		const centerOfScreen = new Vector2(
			GameEngine.CANVAS_RENDERING_SIZE.x / 2,
			GameEngine.CANVAS_RENDERING_SIZE.y / 2
		);
		GameEngine.Player = new PlayerObject(centerOfScreen, SoulTexture);
		this.Player.DeathAnimationPhase = 0;
		GameEngine.BulletBoardLocation = centerOfScreen.subtract(this.BulletBoardSize.divide(2));
		GameEngine.FixedBulletBoardLocation = GameEngine.BulletBoardLocation;
		coolUsername.subscribe((player) => {
			GameEngine.PlayerName = player;
		});
	}
	/**
	 * The game engine rendering function.
	 */
	public static GameEngineRender() {
		// When the player successfully completes the game.
		if (GameEngine.Countdown <= 0) {
			GameEngine.BackgroundMusicSource.stopAudio();
			GameEngine.Congrats.playAudio();
			GameEngineDrawing.ClearCanvasContext();
			const textToRender = {
				size: 50,
				text: 'HOLY SHIT, YOU DID IT!'
			};
			const measurements = GameEngineDrawing.GetFontMeasurements(
				textToRender.size,
				textToRender.text
			);
			if (!measurements) return;
			GameEngineDrawing.DrawText(
				new Vector2(
					GameEngine.CANVAS_RENDERING_SIZE.x / 2 - measurements?.width / 2,
					GameEngine.CANVAS_RENDERING_SIZE.y / 2
				),
				textToRender.size,
				textToRender.text
			);
			// Set the states and keep rolling.
			achievementGet.set(true);
			GameEngine.Countdown = 0;
			saveState();
			return;
		}
		/**
		 * This function draws a shaky text to the screen.
		 * @param pos The position of the text.
		 * @param text The text to render.
		 * @param fontSize The font size.
		 */
		function drawShakyTextCentered(pos: Vector2, text: string, fontSize: number) {
			const measurement = GameEngineDrawing.GetFontMeasurements(fontSize, text);
			if (!measurement) {
				assetLoadingFailure();
				return;
			}
			GameEngineDrawing.DrawShakyText(
				new Vector2(GameEngine.CANVAS_RENDERING_SIZE.x / 2 - measurement.width / 2, pos.y),
				fontSize,
				3,
				text
			);
		}
		// Do the last delta.
		if (GameEngine.STOP_ENGINE) return;
		// DeltaTime calculation.
		GameEngine.NOW_DELTA = Date.now();
		if (GameEngine.LAST_DELTA == 0) GameEngine.LAST_DELTA = GameEngine.NOW_DELTA;
		GameEngine.deltaTime = (GameEngine.NOW_DELTA - GameEngine.LAST_DELTA) / 1000;

		// Clear the context, then draw the player and do deltaTime stuff.
		GameEngineDrawing.ClearCanvasContext();
		if (GameEngine.CurrentlyBusyLoading > 0) {
			GameEngineDrawing.DrawText(new Vector2(0, 20), 20, 'Loading...');
			requestAnimationFrame(GameEngine.GameEngineRender);
			return;
		}

		// slowly move the bullet board.
		function retrieveMathmeticalSin(dateOffset = 0): number {
			return Math.sin((Date.now() + dateOffset) / 500) * 10;
		}
		// the new bulletboard position and stuff.
		GameEngine.BulletBoardLocation = GameEngine.FixedBulletBoardLocation.add(
			new Vector2(retrieveMathmeticalSin(), retrieveMathmeticalSin(500))
		);

		// Render the player to the screen.
		GameEngine.Player.renderThisObject();
		GameEngine.renderObjects();

		if (PlayerObject.PlayerHealth > 0) {
			if (Date.now() % 4 == 0) {
				GameEngine.Objects.push(
					new RainingStar(new Vector2(Math.random() * GameEngine.CANVAS_RENDERING_SIZE.x, -500))
				);
			}
		}

		// Only render the UI, when the player isn't dead.
		if (PlayerObject.PlayerHealth <= 0) {
			drawShakyTextCentered(
				new Vector2(0, GameEngine.CANVAS_RENDERING_SIZE.y / 2 - 50),
				'YOU DEAD!',
				50
			);
		} else {
			// Render the bulletboard.
			GameEngineDrawing.DrawStrokeRectangle(
				GameEngine.BulletBoardLocation,
				GameEngine.BulletBoardSize,
				'white',
				3
			);
			drawShakyTextCentered(new Vector2(0, 30), 'C++ Boss Battle!', 50);
			GameEngine.renderHealthAndInfo();
			/**
			 * Make it into a clock-like thing.
			 * @param numberToGet The number to clock-ify.
			 * @returns The clocky number.
			 */
			function toClock(numberToGet: number) {
				return numberToGet.toString().padStart(2, '0');
			}
			drawShakyTextCentered(
				new Vector2(0, 60),
				`survive for ${toClock(Math.floor(GameEngine.Countdown / 60))}:${toClock(
					Math.floor(GameEngine.Countdown % 60)
				)}`,
				20
			);
		}
		GameEngine.LAST_DELTA = GameEngine.NOW_DELTA;

		if (!GameEngine.STOP_ENGINE) {
			requestAnimationFrame(GameEngine.GameEngineRender);
			GameEngine.Countdown -= GameEngine.deltaTime;
		}
	}
	public static renderHealthAndInfo(fontSize: number = 30) {
		const marginValue = 50;
		const posOfText = new Vector2(0, GameEngine.CANVAS_RENDERING_SIZE.y - fontSize);
		const firstMeasurement = GameEngineDrawing.DrawText(
			posOfText,
			fontSize,
			`${GameEngine.PlayerName}  LV1`
		);
		if (!firstMeasurement) return;

		// the HP part of the hud.
		const nowLeftMargin = firstMeasurement.width + marginValue;
		const secondMeasurement = GameEngineDrawing.DrawText(
			posOfText.add(new Vector2(nowLeftMargin, -(fontSize - fontSize / 1.5) / 2.5)),
			fontSize / 1.5,
			'HP'
		);
		if (!secondMeasurement) return;
		const HPPos = new Vector2(nowLeftMargin + secondMeasurement.width * 2, posOfText.y - fontSize);
		GameEngineDrawing.DrawRectangle(HPPos, new Vector2(fontSize, fontSize), 'red');
		GameEngineDrawing.DrawRectangle(
			HPPos,
			new Vector2((PlayerObject.PlayerHealth / 20) * fontSize, fontSize),
			'yellow'
		);

		GameEngineDrawing.DrawText(
			HPPos.add(new Vector2(marginValue, fontSize)),
			fontSize,
			`${PlayerObject.PlayerHealth.toString().padStart(2, '0')} / 20`
		);
	}
	public static Dismount() {
		if (GameEngine.BackgroundMusicSource !== undefined)
			GameEngine.BackgroundMusicSource.stopAudio();
	}
}

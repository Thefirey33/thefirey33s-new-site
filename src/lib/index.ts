import { writable } from 'svelte/store';
import IconOfWebsite from '$lib/assets/imgs/website_guy.gif';

/**
 * The base css value for all of the buttons.
 */
export const BASE_CSS_FOR_BUTTON =
	'focus:bg-white select-none lg:text-xl text-xs outline-2 p-2 rounded-md hover:rounded-2xl hover:scale-110 transition-all duration-75 m-2 cursor-pointer image-rendering-pixelated';
/**
 * The background css property.
 */
export const BACKGROUND_CSS_VAL = '--background-img';
export const BASE_CSS_FOR_INPUT = 'bg-black outline-2 border-0 rounded-md';
/**
 * the isMobile statement, which is when the screen width is less than 768px.
 */
export const isMobile = writable(false);

export const coolUsername = writable('CHARA');

export const isDead = writable(false);

export const achievementName = 'timeLeft';

export function getCurrentState() {
	const achievementSelf = localStorage.getItem(achievementName);
	if (achievementSelf !== null) {
		return achievementSelf == '0';
	}
	return false;
}

export const achievementGet = writable(false);

export const websiteIconURL = writable(IconOfWebsite);

export const tooltip = writable('');

export const birthdayTime = writable(false);

export const websitePosition = writable({ x: 0, y: 0 })
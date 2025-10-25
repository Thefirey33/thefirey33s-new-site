import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const MAX_COOLNESS = 10;
/**
 * the coolness flows before you.
 */
const COOLNESS_ADDITIONS = [
	{ leftAddition: '_', rightAddition: '_' },
	{ leftAddition: '->', rightAddition: '<-' },
	{ leftAddition: '-_-', rightAddition: '-_-' },
	{ leftAddition: 'OwO ', rightAddition: ' :3' },
	{ leftAddition: 'xXx', rightAddition: 'xXx' }
];

export const POST: RequestHandler = async (event) => {
	const request = event.request;

	const { coolnessFactor, username }: { coolnessFactor: number; username: string } =
		await request.json();

	if (username.length > 100) return json({ response: 'too long' });
	if (username == 'thefirey33') {
		return json({ response: 'nah' });
	}
	if (!username) {
		return json({ response: 'forgot about the username dawg?' });
	}

	const coolnessAdditionPicker = Math.min(
		Math.floor(
			Math.abs(
				(Math.random() + coolnessFactor / (MAX_COOLNESS * 2)) *
					(coolnessFactor / MAX_COOLNESS) *
					COOLNESS_ADDITIONS.length
			)
		),
		COOLNESS_ADDITIONS.length - 1
	);

	const { leftAddition, rightAddition } = COOLNESS_ADDITIONS[coolnessAdditionPicker];
	const newUsername = `${leftAddition}${username}${rightAddition}`;
	return json({ response: newUsername });
};

import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { birthdayTime } from '$lib';
import { fromStore } from 'svelte/store';

export const load = (async () => {
    const dateCurrent = new Date();
    birthdayTime.set(dateCurrent.getMonth() == 5 && dateCurrent.getDate() == 24)
    if (!fromStore(birthdayTime).current)
        error(404, "this page does not exist.")
    return {};
}) satisfies PageLoad;
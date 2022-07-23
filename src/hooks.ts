import { getChannels, getUsers } from '$lib/data';
import type { GetSession, Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.channels = await getChannels();
	event.locals.users = await getUsers();

	const response = await resolve(event);
	return response;
};

export const getSession: GetSession = (event) => {
	return {
		channels: event.locals.channels,
		users: event.locals.users
	};
};

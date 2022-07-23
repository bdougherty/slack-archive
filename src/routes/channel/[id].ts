import { getChannels, loadAllMessages } from '$lib/data';
import type { RequestHandler } from './__types/[id]';

export const GET: RequestHandler = async ({ params }) => {
	const channels = await getChannels();
	const id = params.id;

	const channel = channels.find((channel) => channel.id === id);

	if (!channel) {
		return {
			status: 404
		};
	}

	const messages = await loadAllMessages(channel);

	return {
		body: {
			channel,
			messages
		}
	};
};

import fs from 'node:fs/promises';
import path from 'node:path';
import type { Channel, Message, User } from './types';

const archiveDir = path.resolve('export');

export async function getChannels() {
	const channelsPath = path.resolve(archiveDir, 'channels.json');
	const contents = await fs.readFile(channelsPath);
	return JSON.parse(contents.toString()) as Channel[];
}

export async function getUsers() {
	const usersPath = path.resolve(archiveDir, 'users.json');
	const contents = await fs.readFile(usersPath);
	return JSON.parse(contents.toString()) as User[];
}

export async function loadAllMessages(channel: Channel) {
	const channelFolderPath = path.resolve(archiveDir, channel.name);
	const files = await fs.readdir(channelFolderPath);
	const messages = [];

	for await (const file of files.slice(files.length - 20)) {
		const contents = await fs.readFile(path.resolve(channelFolderPath, file));
		const dailyMessages = JSON.parse(contents.toString()) as Message[];
		messages.push(dailyMessages);
	}

	return messages.flat();
}

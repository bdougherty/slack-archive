/// <reference types="@sveltejs/kit" />

type Channel = import('$lib/types').Channel;
type User = import('$lib/types').User;

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		channels: Channel[];
		users: User[];
	}

	interface Session {
		channels: Channel[];
		users: User[];
	}
}

export interface Channel {
	id: string;
	name: string;
	created: number;
	creator: string;
	is_archived: boolean;
	is_general: boolean;
	members: string[];
	pins: {
		id: string;
		type: string;
		created: number;
		user: string;
		owner: string;
	}[];
	topic: {
		value: string;
		creator: string;
		last_set: number;
	};
	purpose: {
		value: string;
		creator: string;
		last_set: number;
	};
}

export interface User {
	id: string;
	team_id: string;
	name: string;
	deleted: boolean;
	color: string;
	real_name: string;
	tz: string;
	tz_label: string;
	tz_offset: number;
	profile: {
		title: string;
		phone: string;
		skype: string;
		real_name: string;
		real_name_normalized: string;
		display_name: string;
		display_name_normalized: string;
		fields: Record<string, unknown>;
		status_text: string;
		status_emoji: string;
		status_emoji_display_info: Record<string, unknown>;
		status_expiration: number;
		avatar_hash: string;
		image_original: string;
		is_custom_image: boolean;
		email: string;
		first_name: string;
		last_name: string;
		image_24: string;
		image_32: string;
		image_48: string;
		image_72: string;
		image_192: string;
		image_512: string;
		image_1024: string;
		status_text_canonical: string;
		team: string;
	};
	is_admin: boolean;
	is_owner: boolean;
	is_primary_owner: boolean;
	is_restricted: boolean;
	is_ultra_restricted: boolean;
	is_bot: boolean;
	is_app_user: boolean;
	is_email_confirmed: boolean;
	who_can_share_contact_card: string;
}

export enum MessageType {
	Message = 'message'
}

export interface Message {
	client_msg_id?: string;
	type: MessageType;
	text: string;
	user: string;
	ts: string;
	team?: string;
	user_team?: string;
	source_team?: string;
	user_profile?: UserProfile;
	blocks?: Block[];
	reactions?: Reaction[];
	subtype?: string;
	thread_ts?: string;
	reply_count?: number;
	reply_users_count?: number;
	latest_reply?: string;
	reply_users?: string[];
	replies?: Edited[];
	is_locked?: boolean;
	subscribed?: boolean;
	parent_user_id?: string;
	edited?: Edited;
	attachments?: Attachment[];
	files?: File[];
	upload?: boolean;
	display_as_bot?: boolean;
	old_name?: string;
	name?: string;
}

export interface Attachment {
	from_url: string;
	ts?: number;
	image_url?: string;
	image_width?: number;
	image_height?: number;
	image_bytes?: number;
	service_icon?: string;
	id: number;
	original_url: string;
	fallback: string;
	text?: string;
	title?: string;
	title_link?: string;
	service_name?: string;
	fields?: Field[];
	author_name?: string;
	author_link?: string;
	author_icon?: string;
	author_subname?: string;
	service_url?: string;
	footer?: string;
	footer_icon?: string;
}

export interface Field {
	value: string;
	title: string;
	short: boolean;
}

export interface Block {
	type: BlockType;
	block_id: string;
	elements: BlockElement[];
}

export interface BlockElement {
	type: FluffyType;
	elements: ElementElementClass[];
}

export interface ElementElementClass {
	type: PurpleType;
	text?: string;
	name?: string;
	unicode?: string;
	user_id?: string;
	style?: Style;
	url?: string;
}

export interface Style {
	bold: boolean;
	italic: boolean;
}

export enum PurpleType {
	Emoji = 'emoji',
	Link = 'link',
	Text = 'text',
	User = 'user'
}

export enum FluffyType {
	RichTextSection = 'rich_text_section'
}

export enum BlockType {
	RichText = 'rich_text'
}

export interface Edited {
	user: string;
	ts: string;
}

export interface File {
	id: string;
	created: number;
	timestamp: number;
	name: string;
	title: string;
	mimetype: string;
	filetype: string;
	pretty_type: string;
	user: string;
	editable: boolean;
	size: number;
	mode: string;
	is_external: boolean;
	external_type: string;
	is_public: boolean;
	public_url_shared: boolean;
	display_as_bot: boolean;
	username: string;
	url_private: string;
	url_private_download: string;
	media_display_type: string;
	thumb_64: string;
	thumb_80: string;
	thumb_360: string;
	thumb_360_w: number;
	thumb_360_h: number;
	thumb_480: string;
	thumb_480_w: number;
	thumb_480_h: number;
	thumb_160: string;
	thumb_720?: string;
	thumb_720_w?: number;
	thumb_720_h?: number;
	thumb_800?: string;
	thumb_800_w?: number;
	thumb_800_h?: number;
	thumb_960?: string;
	thumb_960_w?: number;
	thumb_960_h?: number;
	thumb_1024?: string;
	thumb_1024_w?: number;
	thumb_1024_h?: number;
	original_w: number;
	original_h: number;
	thumb_tiny: string;
	permalink: string;
	permalink_public: string;
	is_starred: boolean;
	has_rich_preview: boolean;
	subtype?: string;
}

export interface Reaction {
	name: string;
	users: string[];
	count: number;
}

export interface UserProfile {
	avatar_hash: string;
	image_72: string;
	first_name: string;
	real_name: string;
	display_name: string;
	team: string;
	name: string;
	is_restricted: boolean;
	is_ultra_restricted: boolean;
}

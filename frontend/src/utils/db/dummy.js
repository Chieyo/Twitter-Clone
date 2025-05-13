export const POSTS = [
	{
		_id: "1",
		text: "The new pirate flag of Mugiwara Pirates😁",
		img: "/posts/luffyPost.jpg",
		user: {
			username: "Luffy",
			profileImg: "/icons/luffy.jpg",
			fullName: "Monkey D. Luffy",
		},
		comments: [
			{
				_id: "5",
				text: "What an ugly drawing. A pirate flag does not look like dat!",
				user: {
					username: "Ussop",
					profileImg: "/icons/ussop.jpg",
					fullName: "God Ussop",
				},
			},
		],
		likes: ["6658s891", "6658s892", "6658s893", "6658s894"],
	},
	{
		_id: "2",
		text: "How are you ladies doing?~😍",
		user: {
			username: "Mr. Prince",
			profileImg: "/icons/sanji.jpg",
			fullName: "Vinsmoke Sanji",
		},
		comments: [
			{
				_id: "1",
				text: "Sanji! I'm hungryyyy",
				user: {
					username: "Luffy",
			        profileImg: "/icons/luffy.jpg",
			        fullName: "Monkey D. Luffy",
				},
			},
		],
		likes: ["6658s891", "6658s892", "6658s893", "6658s894"],
	},
	{
		_id: "3",
		text: "Busy making maps 🍊",
		img: "/posts/namiPost.jpg",
		user: {
			username: "Weatheriarie",
			profileImg: "/icons/nami.jpg",
			fullName: "Nami",
		},
		comments: [],
		likes: ["6658s891", "6658s892", "6658s893", "6658s894", "6658s895", "6658s896"],
	},
	{
		_id: "4",
		text: "SUUUPPPEEEERRRR ⭐🤖",
		img: "/posts/frankyPost.gif",
		user: {
			username: "Robofranky",
			profileImg: "/icons/franky.jpg",
			fullName: "Franky",
		},
		comments: [
			{
				_id: "1",
				text: "OOHHH SUNNYYYY ~samui⛄",
				user: {
					username: "Luffy",
		            profileImg: "/icons/luffy.jpg",
		            fullName: "Monkey D. Luffy",
				},
			},
		],
		likes: [
			"6658s891",
			"6658s892",
			"6658s893",
			"6658s894",
			"6658s895",
			"6658s896",
			"6658s897",
			"6658s898",
			"6658s899",
		],
	},
];

export const USERS_FOR_RIGHT_PANEL = [
	{
		_id: "1",
		username: "Luffy",
		profileImg: "/icons/luffy.jpg",
		fullName: "Monkey D. Luffy",
	},
	{
		_id: "2",
		username: "Mr. Prince",
		profileImg: "/icons/sanji.jpg",
		fullName: "Vinsmoke Sanji",
	},
	{
		_id: "3",
		username: "Weatheriarie",
		profileImg: "/icons/nami.jpg",
		fullName: "Nami",
	},
	{
		_id: "4",
		username: "Robofranky",
		profileImg: "/icons/franky.jpg",
		fullName: "Franky",
	},
    {
		_id: "5",
		username: "Ussop",
		profileImg: "/icons/ussop.jpg",
		fullName: "God Ussop",
	},
];
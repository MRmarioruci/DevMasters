export const menu = [
	{
		"title": "Interview Cheatsheets",
		"description": "Interview specific cheatsheets. Concepts and general interview material to brush up before the big day.",
		"id": 'cheatsheets',
		"items": [
			{
				title: 'Javascript',
				href: 'javascript',
				icon: "https://api.iconify.design/logos:javascript.svg",
				hasContent: true,
				related: [],
			},
			{
				title: 'React.js',
				href: 'react',
				icon: 'https://api.iconify.design/devicon:react-wordmark.svg',
				hasContent: true,
				related: ['javascript'],
			},
			{
				title: 'Flask',
				href: 'flask',
				icon: 'https://api.iconify.design/skill-icons:flask-light.svg',
				hasContent: true,
				related: ['python'],
			},
			{
				title: 'APIs',
				href: 'apis',
				icon: 'https://api.iconify.design/vscode-icons:file-type-graphql.svg',
				hasContent: true,
				related: [],
			},
			{
				title: 'Typescript',
				href: 'typescript',
				icon: 'https://api.iconify.design/logos:typescript-icon.svg',
				hasContent: true,
				related: ['javascript'],
			},
			{
				title: 'Python',
				href: 'python',
				icon: 'https://api.iconify.design/logos:python.svg',
				hasContent: true,
				related: ['flask', 'oop'],
			},
			{
				title: 'Next.js',
				href: 'next',
				icon: 'https://api.iconify.design/logos:nextjs-icon.svg',
				hasContent: false,
				related: ['javascript', 'react'],
			},
			{
				title: 'Node.js',
				href: 'node',
				icon: 'https://api.iconify.design/logos:nodejs-icon.svg',
				hasContent: false,
				related: ['javascript'],
			},
			{
				title: 'PHP',
				href: 'php',
				icon: 'https://api.iconify.design/devicon:php.svg',
				hasContent: false,
				related: [],
			},
			{
				title: 'Docker',
				href: 'docker',
				icon: 'https://api.iconify.design/logos:docker-icon.svg',
				hasContent: true,
				related: [],
			},
			{
				title: 'Css',
				href: 'css',
				icon: 'https://api.iconify.design/vscode-icons/file-type-css.svg',
				hasContent: true,
				related: ['sass'],
			},
			{
				title: 'Sass(Scss)',
				href: 'sass',
				icon: 'https://api.iconify.design/vscode-icons:file-type-scss.svg',
				hasContent: false,
				related: ['css'],
			},
			{
				title: 'Angular',
				href: 'angular',
				icon: 'https://api.iconify.design/devicon:angular.svg',
				hasContent: false,
				related: ['javascript'],
			},
			{
				title: 'HTML',
				href: 'html',
				icon: 'https://api.iconify.design/vscode-icons:file-type-html.svg',
				hasContent: true,
				related: [],
			},
			{
				title: 'Security',
				href: 'security',
				icon: 'https://api.iconify.design/material-symbols:lock-open-outline-sharp.svg',
				hasContent: true,
				related: [],
			},
			{
				title: 'Jest',
				href: 'jest',
				icon: 'https://api.iconify.design/logos:jest.svg',
				hasContent: true,
				related: [],
			},
			{
				title: 'OOP',
				href: 'oop',
				icon: '',
				hasContent: true,
				related: [],
			},
			{
				title: 'Functional Programming',
				href: 'fp',
				icon: '',
				hasContent: true,
				related: [],
			},
			{
				title: 'Git',
				href: 'git',
				icon: 'https://api.iconify.design/vscode-icons:file-type-git.svg',
				hasContent: true,
				related: [],
			},
		]
	},
	{
		"title": "Project Based Learning",
		"description": "Learn by doing. Project based learning is the way to go in this profession <br/>and here you will find a list of projects to complete with instructions, based on your level",
		"id": 'pbl',
		"items": [
			{
				title: 'Web Frontend Master',
				href: 'webFrontend',
				icon: '',
				hasContent: true,
				related: [],
			},
			{
				title: 'Web Backend Master',
				href: 'webBackend',
				icon: '',
				hasContent: false,
				related: [],
			}
		]
	},
	{
		"title": "Mistakes / Best Practices",
		"description": "Here you will find anti-patterns and coding mistakes every junior falls into. Don't worry, we've got you.",
		"id": 'bestpractices',
		"items": [
			{
				title: 'Javascript',
				href: 'javascript',
				icon: '',
				hasContent: true,
				related: [],
			},
		]
	},
	{
		"title": "Leetcode",
		"description": "Practice for the leetcode-style problems. Learn DSA, Algorithms and Solving patterns. Be a pro.",
		"id": 'leetcode',
		"items": [
			/* {
				title: 'DSA',
				href: 'dsa',
				icon: '',
			},
			{
				title: 'Patterns',
				href: 'leetcodePatterns',
				icon: '',
			},
			{
				title: 'Problems',
				href: 'leetcodeProblems',
				icon: '',
			}, */
		]
	}
]
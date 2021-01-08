const puppeteer = require('puppeteer');
const championsList = require('../champions.json');
const { Client, Collection, MessageEmbed } = require('discord.js');

// Создаем карту чампионов
const champMap = new Collection();
for(let champItem of championsList.champions) {
	//console.log(champItem.name);
	champItem.aliases.forEach(alias => champMap.set(alias, champItem.name));
}
//console.log(champMap);

async function getBuild(message, champion, mode = 'normal') {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	let link = `https://u.gg/lol/champions/${champion}/build`;
	if(mode === 'aram') link = `https://u.gg/lol/champions/aram/${champion}-aram`;

	await page.goto(link);
	//await page.waitForSelector('.recommended-build_runes');
	await page.setViewport({width: 1920, height: 1080});
	

	const element1 = await page.$('.recommended-build_runes');
	const element2 = await page.$('.recommended-build_skills');
	const element3 = await page.$('.recommended-build_items.media-query_DESKTOP_MEDIUM__DESKTOP_LARGE');

	

	await element1.screenshot({path: `./tmp/image1.png`});
	await element2.screenshot({path: `./tmp/image2.png`});
	await element3.screenshot({path: `./tmp/image3.png`});

	await browser.close();

	await message.channel.send(`Держи ${message.author}`, { files: ["./tmp/image1.png", "./tmp/image2.png", "./tmp/image3.png"] });
}

module.exports = {
	name: 'build',
	aliases: ['build', 'билд'],
	description: 'Info about champion build',
	args: true,
	execute(message, args) {
		let mode = 'normal';
		if(args[1] === 'арам' || args[1] === 'aram') mode = 'aram';

		//if(!client.commands.has(client.aliases.get(commandName))) return;
		const champion = champMap.get(args[0]);
		console.log(champion);

		if(!champion) return message.channel.send(`Сорян, ${message.author}, чемпион не найден.`);
		//message.channel.send(`Arguments: ${args} \nArguments Length: ${args.length}`);

		getBuild(message, champion, mode);
	},
}
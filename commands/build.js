const fs = require('fs');
const puppeteer = require('puppeteer');
const championsList = require('../champions.json');
const {Client, Collection, MessageEmbed} = require('discord.js');

// Создаем карту чемпионов
const champMap = new Collection();
for(let champItem of championsList.champions) {
	//console.log(champItem.name);
	champItem.aliases.forEach(alias => champMap.set(alias, champItem.name));
}
//console.log(champMap);

/**
 * Генератор случайной строки
 * @param {number} length - длина строки
 */
function makeid(length) {
	let result = '';
	let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

/**
 * Удаление фалов
 * @param {array} filePaths - массив ссылок на файлы
 */
function clearFiles(filePaths) {
	for(let file of filePaths) {
		fs.unlinkSync(file);
	}
}

/**
 * Функция получения билда с сайта
 * @param {object} message - объект сообщения
 * @param {string} champion - имя чемпиона
 * @param {string} mode - режим игры (normal, aram)
 */
async function getBuild(message, champion, mode = 'normal') {
	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
	
		let link = `https://u.gg/lol/champions/${champion}/build`;
		if(mode === 'aram') link = `https://u.gg/lol/champions/aram/${champion}-aram`;
	
		await page.goto(link);
		//await page.waitForSelector('.recommended-build_runes');
		await page.setViewport({width: 1920, height: 1080});
	
		let elements = [
			'.recommended-build_runes',
			'.recommended-build_skills',
			'.recommended-build_items.media-query_DESKTOP_MEDIUM__DESKTOP_LARGE'
		]
	
		// Делаем скриншоты билда и ссылки на них
		let filePaths = [];
		for(let element of elements) {
			let postfix = makeid(5);
			let pageElement = await page.$(element);
			await pageElement.screenshot({path: `./tmp/${champion}${postfix}.png`});
			filePaths.push(`./tmp/${champion}${postfix}.png`);
		}
	
		await browser.close();
	
		await message.channel.send(`Держи ${message.author}`, { files: filePaths });
	
		// Удаляем файлы
		clearFiles(filePaths);
	} catch(e) {
		console.log(`Произошла ошибка ${e}`);
	}
}

module.exports = {
	name: 'build',
	aliases: ['build', 'билд'],
	description: 'Info about champion build',
	args: true,
	execute(message, args) {
		message.channel.send('Ищу подходящий билд').then(message => {message.delete({ timeout: 2000 });});
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
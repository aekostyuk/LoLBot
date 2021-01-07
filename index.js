const Discord = require("discord.js");
const puppeteer = require('puppeteer');
const config = require("./config.json");
const comms = require("./comms.js");
const prefix = config.prefix;
//const champions = require("./champions.json");

const client = new Discord.Client();


client.on("ready", function() {
	/* При успешном запуске, в консоли появится сообщение «[Имя бота] запустился!» */
	console.log(client.user.username + " запустился!");
});

// Обработчик команд
client.on('message', (msg) => { // Реагирование на сообщения
	if (msg.author.username != client.user.username && msg.author.discriminator != client.user.discriminator) {
		var comm = msg.content.trim() + " ";
		var comm_name = comm.slice(0, comm.indexOf(" "));
		var messArr = comm.split(" ");
		for (comm_count in comms.comms) {
		var comm2 = prefix + comms.comms[comm_count].name;
		if (comm2 == comm_name) {
			comms.comms[comm_count].out(client, msg, messArr);
		}
		}
	}
});

client.login(config.BOT_TOKEN);


async function getPic() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://www.leagueofgraphs.com/ru/champions/builds/jhin');
	await page.waitForSelector('#hplogo');
	
	await page.evaluate(() => {
		// что-нибудь возвращаем
		
		// скрываем кнопки
		let buttons = document.querySelectorAll('.overviewSeeMoreButton');
		buttons.forEach((element) => {
			element.hidden = true;
		})
	});
	await page.setViewport({width: 1920, height: 1080});
	await page.screenshot({path: 'image.png'});

	await browser.close();
}

//getPic();

let scrape = async () => {
	const browser = await puppeteer.launch({headless: false});
	const page = await browser.newPage();
	await page.goto("https://www.leagueofgraphs.com/ru/champions/builds/jhin");
	await page.waitFor(1000);
	// Здесь выполняются операции скрапинга...
	await page.click('.d-map__region-path_level3');
	
	const result = await page.evaluate(() => {
		// что-нибудь возвращаем
		document.querySelector('.overviewSeeMoreButton').hidden = true;
		
	});

	// Возврат значения
	browser.close();
	return result;
};

/*scrape().then((value) => {
	console.log(value); // Получилось!
});*/
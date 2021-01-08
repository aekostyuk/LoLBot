
// Обработка команд
client.on('message', message => {
	// Если сообщение не команда или отправитель бот, прекращаем выполнение функции
	if(!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if(!client.commands.has(command)) return;
	try{
		client.commands.get(command).execute(message, args);
	} catch(error) {
		console.error(error);
		message.reply('Произошла ошибка в обработке команды!');
	}
	/*
	// Обработка аргументов команды
	if(command === 'args') {
		if(!args.length) {
			return message.channel.send(`Вы не отправили ни одного аргумента, ${message.author}!`);
		} else if(args[0] === 'cat') {
			return message.channel.send('Meow');
		}

		message.channel.send(`Command name: ${command}\nArguments: ${args}`);
	}
	*/

	/*
	// Базовая обработка команд
	if(message.content === `${prefix}name`) {
		message.channel.send(message.guild.name);
		console.log(message.content);
	} else if (message.content === `${prefix}online`) {
		message.channel.send(`Total Members: ${message.guild.memberCount}`);
	} else if (message.content === `${prefix}me`) {
		message.channel.send(`Username: ${message.author.username}`);
		message.channel.send(`ID: ${message.author.id}`);
	}*/
});

// Обработчик команд
/*client.on('message', (msg) => { // Реагирование на сообщения
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
});*/
/*
client.on('message', (message) => {
	if(message.author.bot) return;
	if(message.content.startsWith(PREFIX)) {
		const [CMD_NAME, ...args] = message.content
			.trim()
			.substring(PREFIX.length)
			.split(/\s+/);
		console.log(CMD_NAME);
		console.log(args);

		let res = commands.list.filter(function(entry) {
			return entry.name.toUpperCase().indexOf(CMD_NAME) !== -1;
		});
		console.log(res);
	}
});

*/



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
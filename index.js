//require("dotenv").config();
const fs = require('fs');
const {Client, Collection, MessageEmbed} = require('discord.js');

const client = new Client();
client.commands = new Collection();
client.aliases = new Collection();

// Подключаем список команд
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const {prefix, token, bot_age, words_array, bot_info} = require("./config.json");
//const PREFIX = process.env.CMD_PREFIX;
//const champions = require("./champions.json");

// Бот готов
client.once("ready", () => {
	/* При успешном запуске, в консоли появится сообщение «[Имя бота] запустился!» */
	console.log(client.user.username + " запущен.");
});

// Логиним бота
client.login(token);

// Регистрируем команды
for(const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);

	// Делаем карту команд
	if (command.aliases && Array.isArray(command.aliases)) command.aliases.forEach(alias => client.aliases.set(alias, command.name));
}

// Обработка команд
client.on('message', message => {
	// Если сообщение не команда или отправитель бот, прекращаем выполнение функции
	if(!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	// Получаем команду по имени или алиасу
	if(!client.commands.has(client.aliases.get(commandName))) return;
	const command = client.commands.get(client.aliases.get(commandName));
	//if (!command) command = client.commands.get(client.aliases.get(commandName));
	//if (!command) return;

	//console.log(command.aliases);
	console.log(command);
	// Проверяем команду на аргументы
	if(command.args === true && !args.length) {
		const embed = new MessageEmbed()
		.setColor('#ff0000')
		.setTitle('Ошибка')
		.setDescription('Не достаточно аргументов.')
		.setFooter('Bot Error Log')
		.addField('Code', '000x9', true)
		.addFields(
			{name: 'name', value: 'value', inline: true},
			{name: 'name2', value: 'value2', inline: true},
		)
		.setTimestamp();
		return message.channel.send(embed);
	}

	try {
		command.execute(message, args);
	} catch(error) {
		console.error(error);
		message.reply('Произошла ошибка в обработке команды!');
	}
});
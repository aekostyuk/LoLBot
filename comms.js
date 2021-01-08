require("dotenv").config();
const { Client } = require('discord.js');
const PREFIX = process.env.CMD_PREFIX;
//const versions = config.versions;


// Команды //
function test(client, mess, args) {
	mess.channel.send("Тест!")
	console.log("Команда !test выполнена.");
}

function hello(client, mess, args) {
	mess.reply("Привет!")
	console.log("Команда !hello выполнена.");
}

// Список комманд //
let CMD_LIST = [{
		name: "test",
		out: test,
		about: "Тестовая команда"
	},
	{
		name: "hello",
		out: hello,
		about: "Команда для приветствия!"
	}
];

module.exports.list = CMD_LIST;
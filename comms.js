const config = require('./config.json');
const Discord = require('discord.js');
const prefix = config.prefix;
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
let comms_list = [{
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

module.exports.comms = comms_list;
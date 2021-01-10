const {Client, Collection, MessageEmbed} = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['help', 'помощь'],
    description: 'Help Command',
    args: false,
	execute(message, args) {
        //message.channel.send('Help!');
        const embed = new MessageEmbed()
		.setColor('#34deeb')
		.setTitle('LoL Bot Help')
		.setDescription('Список команд бота:')
		//.setFooter('Bot Error Log')
		//.addField('Code', '000x9', true)
		.addFields(
			{name: '!help', value: 'Подсказка по командам', inline: false},
			{name: '!build', value: 'Запрос билда для чемпиона, например !build lux. Можно писать на русском, например !билд люкс.', inline: false},
		)
		//.setTimestamp();
		return message.channel.send(embed);
	},
}
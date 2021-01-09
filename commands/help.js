const {Client, Collection, MessageEmbed} = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['help', 'помощь'],
    description: 'Help Command',
    args: false,
	execute(message, args) {
        message.channel.send('Help!');
        const embed = new MessageEmbed()
		.setColor('#34deeb')
		.setTitle('Помощь')
		.setDescription('Не достаточно аргументов.')
		.setFooter('Bot Error Log')
		.addField('Code', '000x9', true)
		.addFields(
			{name: 'name', value: 'value', inline: true},
			{name: 'name2', value: 'value2', inline: true},
		)
		.setTimestamp();
		return message.channel.send(embed);
	},
}
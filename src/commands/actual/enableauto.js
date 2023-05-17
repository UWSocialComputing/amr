const { SlashCommandBuilder } = require('discord.js');
// const path = require('node:path');
// const Keyv = require('keyv');
// const channels = path.join(__dirname, './../../../database/channels.sqlite');
// const channels_keyv = new Keyv('sqlite://' + channels);
const { Channel } = require('./../../models');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('enableauto')
		.setDescription('enables auto translations in specified channel')
		.addStringOption(option =>
			option.setName('setting')
				.setDescription('enable or disable auto translation')
				.setRequired(true)
				.addChoices(
					{ name: 'enable', value: 'enable' },
					{ name: 'disable', value: 'disable' },
				)),

	async execute(interaction) {
		const setting = interaction.options.getString('setting');
		const isEnabled = setting == 'enabled';
		const channelId = interaction.channelId;
		const serverId = interaction.guildId;
		let replyMessage;
		await Channel.upsert({
			serverId: serverId,
			channelId: channelId,
			isEnabled: isEnabled,
		});
		if (isEnabled) {
			replyMessage = 'Bot will now translate automatically in this channel';
		}
		else {
			replyMessage = 'Bot will stop translating automatically in this channel';
		}
		await interaction.reply(replyMessage);
	},
};
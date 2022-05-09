const command = require("../Structures/Slash_Interaction.js");
const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports = new command({
    command: new SlashCommandBuilder()
        .setName("example-command")
        .setDescription("This command is just for shows")
        .addStringOption(option => option.setName("example-string").setDescription("Woah another example")),
    permissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    cooldown: 3,
    execute: async (client, interaction) => {
        const user = interaction.user;
        const string = interaction.options.getString("example-string");
        interaction.reply(`Hello ${user.username}! ${string}`);
    }
})
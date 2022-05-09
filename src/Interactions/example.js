const interaction = require("../Structures/Interaction.js");
const discord = require("discord.js").interaction
module.exports = new interaction({
    name: "example-interaction",
    check: "",
    execute: (client, interaction) => {
        interaction.reply("Hello!");
    }
});

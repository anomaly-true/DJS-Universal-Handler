const Discord = require("discord.js");
const Client = require("./Client.js");

/**
 * 
 * @param {Client} client 
 * @param {Discord.Interaction} interaction 
 */
function exec(client, interaction) {}

class Interaction {
    /**
     * 
     * @typedef {{name: string, type: "PING" | "MESSAGE_COMPONENT" | "APPLICATION_COMMAND_AUTOCOMPLETE", execute: exec}} InteractionOptions
     * @param {InteractionOptions} options 
     */
    constructor(options) {
        this.name = options.name;
        this.type = options.type;
        this.execute = options.execute;
    }
}

module.exports = Interaction;
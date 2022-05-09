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
     * @typedef {{name: string, check: "isApplicationCommand" | "isCommand" | "isContextMenu" | "isUserContextMenu" | "isMessageContextMenu" | "isAutocomplete" | "isMessageComponent" | "isButton" | "isSelectMenu", execute: exec}} InteractionOptions
     * @param {InteractionOptions} options 
     */
    constructor(options) {
        this.name = options.name;
        this.check = options.check;
        this.execute = options.execute;
    }
}

module.exports = Interaction;
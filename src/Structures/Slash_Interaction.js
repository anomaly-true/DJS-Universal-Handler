const Discord = require("discord.js");
const Client = require("./Client.js");

/**
 * 
 * @param {Client} client 
 * @param {Discord.Interaction} interaction 
 */
function exec(client, interaction) {}

class Command {
    /**
     * @typedef {{command: object, permissions: Discord.PermissionString[], cooldown: number, execute: exec}} CommandOptions
     * @param {CommandOptions} options
     */
    constructor(options) {
        this.command = options.command;
        this.permissions = options.permissions;
        this.cooldown = options.cooldown;
        this.execute = options.execute;
    }
}
module.exports = Command;
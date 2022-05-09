const discord = require("discord.js");
const intents = new discord.Intents(32767);
const {MongoDB_URI} = require("../Config/data.json");
const Interaction = require("./Slash_Interaction.js");
const fs = require("fs");
const mongoose = require("mongoose");

class Client extends discord.Client {
    constructor() {
        super({ intents, allowedMentions: { repliedUser: false },  });
            /**
             * @type {discord.Collection<string, Interaction>}
             */
        this.commands = new discord.Collection();
        this.interactions = new discord.Collection();
    }

    start(token) {
        // Load commands
        fs.readdirSync("./src/Commands").filter(file => file.endsWith(".js")).forEach(file => {
            const command = require(`../Commands/${file}`);
            command["id"] = 0;
            this.commands.set(command.command.name, command);
            command.command = command.command.toJSON();
            console.log("\x1b[32m[CMD]\x1b[0m   | Loaded Command: " + command.command.name);
        });

        // Load events
        fs.readdirSync("./src/Events").filter(file => file.endsWith(".js")).forEach(file => {
            const event = require(`../Events/${file}`);
            this.on(event.event, event.run.bind(null, this));
            console.log("\x1b[32m[EVENT]\x1b[0m | Loaded event: " + event.event);
        });

        // Load interactions
        fs.readdirSync("./src/Interactions").filter(file => file.endsWith(".js")).forEach(file => {
            const interaction = require(`../Interactions/${file}`);
            this.interactions.set(interaction.name, interaction);
            console.log("\x1b[32m[INT]\x1b[0m   | Loaded interaction: " + interaction.name);
        })

        // Connect to database
        mongoose.connect(MongoDB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            keepAlive: true
        }).then(() => {
            console.log("\x1b[32m[DB]\x1b[0m    | Connected to database!");
        }).catch(err => {
            console.log("\x1b[31m[DB]\x1b[0m    | Connection error: " + err);
        });

        this.login(token);
    }
}

module.exports = Client;
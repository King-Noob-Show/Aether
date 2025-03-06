// Imports
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const c = require("ansi-colors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const errorHandler = require("./errors/errorHandler");
const fs = require("fs");
dotenv.config();

// Creating A New Client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
  allowedMentions: {
    parse: ["everyone", "roles", "users"],
    repliedUser: true,
    users: true,
    roles: true,
  },
});

// Collections
client.scommands = new Collection();
client.mcommands = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
client.scategories = fs.readdirSync("./src/commands/scommands/");
client.mcategories = fs.readdirSync("./src/commands/mcommands/");

// Exporting Client
module.exports = client;

// Connect To MongoDB
async function initiateMongoDB() {
  console.log(c.magenta.bold("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
  console.log(c.magenta.bold("[DATABASE] Connecting To MongoDB..."));

  const mongo = process.env.MONGOOSE;
  if (!mongo) {
    console.log(c.red.bold("[ERROR] No MongoDB URI Provided."));
    process.exit(1);
  }

  try {
    await mongoose.connect(mongo);
    console.log(c.magenta.bold("[DATABASE] Connected To MongoDB!"));
    console.log(c.magenta.bold("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
  } catch (e) {
    console.log(
      c.red.bold(
        "[ERROR] An Error Has Occurred During Connection To MongoDB.\n",
        e.message,
      ),
    );
    process.exit(1);
  }
}

async function clientLogin() {
  try {
    // Token
    const token = process.env.TOKEN;
    if (!token) {
      console.log(c.red.bold("[ERROR] No Token Provided."));
      process.exit(1);
    }
    console.log(c.blue.bold("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
    console.log(c.blue.bold("[SERVER] Logging In..."));

    // Logging In
    await client.login(token);
  } catch (error) {
    console.error(c.red.bold("[ERROR] Failed to log in:"), error);
    process.exit(1);
  }
}

async function loadHandlers() {
  // Dynamically Loading Handlers
  console.log(c.yellow.bold("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
  console.log(c.yellow.bold("[HANDLERS] Loading Handlers..."));
  const handlers = ["eventHandler", "messageHandler", "commandHandler"];
  for (const handler of handlers) {
    await require(`./handlers/${handler}`)(client);
  }
}

// Loading Everything In.
(async () => {
  await errorHandler();
  await initiateMongoDB();
  await loadHandlers().then(() => {
    console.log(c.yellow.bold("[HANDLERS] Loaded Handlers."));
    console.log(c.yellow.bold("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
  });
  await clientLogin().then(() => {
    console.log(c.blue.bold("[SERVER] Logged In."));
    console.log(c.blue.bold("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
  });
})();

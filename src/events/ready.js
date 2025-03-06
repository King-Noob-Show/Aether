const client = require("../index.js");
const { Events, ActivityType } = require("discord.js");
const c = require("ansi-colors");
const config = require("../configs/botConfig.json");
let activityType;
let status = config.activity.status.toLowerCase();

if (
  status !== "online" &&
  status !== "offline" &&
  status !== "dnd" &&
  status !== "idle"
) {
  console.warn(
    c.red.bold(
      `Invalid status in config: ${config.activity.status}. Defaulting to online.`,
    ),
  );
  status = "online";
}

switch (config.activity.type.toLowerCase()) {
  case "listening":
    activityType = ActivityType.Listening;
    break;
  case "watching":
    activityType = ActivityType.Watching;
    break;
  case "playing":
    activityType = ActivityType.Playing;
    break;
  case "streaming":
    if (
      !config.activity.urlForStreamingActivity ||
      config.activity.urlForStreamingActivity.length === 0
    ) {
      activityType = ActivityType.Watching;
      break;
    }
    activityType = ActivityType.Streaming;
    break;
  case "competing":
    activityType = ActivityType.Competing;
    break;
  default:
    console.warn(
      c.red.bold(
        `Invalid activity type: ${config.activity.type}. Defaulting to Playing.`,
      ),
    );
    activityType = ActivityType.Playing;
}

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(c.cyan.bold("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
    console.log(c.cyan.bold(`${client.user.username} Is Now Online.`));
    console.log(c.cyan.bold("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
    client.user.setPresence({
      activities: [
        {
          name: config.activity.name,
          type: activityType,
          state: config.activity.state,
        },
      ],
      status: status,
    });
  },
};

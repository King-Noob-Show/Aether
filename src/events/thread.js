const { Events, ThreadChannel } = require("discord.js");

module.exports = {
  name: Events.ThreadCreate,
  /**
   * @param {ThreadChannel} thread
   */
  async execute(thread) {
    if (thread.joinable) {
      await thread
        .join()
        .then(() => {})
        .catch(() => {});
    }
  },
};

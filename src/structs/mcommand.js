class MCommand {
  constructor(options) {
    this.name = options.name;
    this.description = options.description || "No Description Provided";
    this.aliases = options.aliases || null;
    this.category = options.category;
    this.usage = options.usage;
    this.run = options.run;
  }

  toJSON() {
    return {
      name: this.name,
      description: this.description,
      usage: this.usage,
    };
  }
}

module.exports = { MCommand };

class SCommand {
  constructor(options) {
    this.name = options.name;
    this.description = options.description || "No description provided.";
    this.permissions = options.permissions || [];
    this.category = options.category;
    this.usage = options.usage;
    this.run = options.run;
  }

  toJSON() {
    return {
      name: this.name,
      description: this.description,
    };
  }
}

module.exports = { SCommand };

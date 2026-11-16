const catalog = require("./skills.json");

module.exports = {
  skills: catalog,
  getSkill: (name) => catalog.find((s) => s.name.toLowerCase() === name.toLowerCase()),
  categories: [...new Set(catalog.map((s) => s.category))],
};

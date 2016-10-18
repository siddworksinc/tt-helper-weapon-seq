var heroToName = {
   1: "Takeda",
   2: "Contessa",
   3: "Hornetta",
   4: "Mila",
   5: "Terra",
   6: "Inquisireaux",
   7: "Charlotte",
   8: "Jordaan",
   9: "Jukka",
  10: "Milo",
  11: "Macelord",
  12: "Gertrude",
  13: "Twitterella",
  14: "Master Hawk",
  15: "Elpha",
  16: "Poppy",
  17: "Skulptor",
  18: "Sterling",
  19: "Orba",
  20: "Remus",
  21: "Mikey",
  22: "Peter",
  23: "Teeny Tom",
  24: "Deznis",
  25: "Hamlette",
  26: "Eistor",
  27: "Flavius",
  28: "Chester",
  29: "Mohacas",
  30: "Jaqulin",
  31: "Pixie",
  32: "Jackalope",
  33: "Dark Lord"
};

// a is [[k1, v1], [k2, v2], etc.]
var arrayToMap = function(a) {
  var newMap = {}
  a.forEach(function(a, i) {
    newMap[a[0]] = a[1];
  });
  return newMap;
};


var BonusTypes = {
  ALL_DAMAGE_ARTIFACTS:        0,
  ALL_DAMAGE_HEROSKILLS:       1,
  ALL_DAMAGE_CUSTOMIZATIONS:   2,
  ALL_DAMAGE_MEMORY:           3,
  TAP_DAMAGE_ARTIFACTS:        4,
  TAP_DAMAGE_HEROSKILLS:       5,
  TAP_DAMAGE_CUSTOMIZATIONS:   6,
  TAP_DAMAGE_DPS:              7,
  CRIT_CHANCE:                 8,
  CRIT_DAMAGE_ARTIFACTS:       9,
  CRIT_DAMAGE_HEROSKILLS:     10,
  CRIT_DAMAGE_CUSTOMIZATIONS: 11,
  GOLD_ARTIFACTS:             12,
  GOLD_HEROSKILLS:            13,
  GOLD_CUSTOMIZATIONS:        14,
  GOLD_OVERALL:               15, // gold while playing
  GOLD_MOBS:                  16,
  GOLD_BOSS:                  17,
  GOLD_10X_CHANCE:            18,
  CHEST_ARTIFACTS:            19,
  CHEST_HEROSKILLS:           20,
  CHEST_CUSTOMIZATIONS:       21,
  CHEST_CHANCE:               22,
  INDIVIDUAL_HERO_DAMAGE:     23,
  BOSS_HEALTH:                24,
  BOSS_TIME:                  25,
  BOSS_DAMAGE:                26,
  NUM_MOBS:                   27,
  RELICS:                     28,
  UPGRADE_COST:               29,
  ARTIFACT_DAMAGE_BOOST:      30,
  SKILL_CDR_AUTO:             31,
  SKILL_CDR_CRIT:             32,
  SKILL_CDR_HERO:             33,
  SKILL_CDR_GOLD:             34,
  SKILL_CDR_TDMG:             35,
  SKILL_CDR_OHKO:             36,
  SKILL_DRN_AUTO:             37,
  SKILL_DRN_CRIT:             38,
  SKILL_DRN_HERO:             39,
  SKILL_DRN_GOLD:             40,
  SKILL_DRN_TDMG:             41,
  SKILL_DRN_OHKO:             42,
  HERO_DEATH_CHANCE:          43,
  HERO_REVIVE_TIME:           44,
  WEAPON_INDIVIDUAL:          45,
  WEAPON_SET:                 46,
};

var Artifact = function(name, world, id, x, y, levelcap, effects, flavor) {
  this.name = name;
  this.world = world;
  this.id = id;
  this.x = x;
  this.y = y;
  this.levelcap = levelcap;
  this.effects = arrayToMap(effects);
  this.flavor = flavor;

  this.adpl = this.effects[BonusTypes.ALL_DAMAGE_ARTIFACTS];

  this.cost = function(level) {
    return x * Math.pow(level, y)
  };

  this.getAD = function(level) {
    return level > 0 ? (adpl * (level + 1)) : 0;
  };

  this.costToLevel = function(level) {
    if (level == 0 || (this.levelcap != null && level >= this.levelcap)) {
      return Infinity;
    } else {
      return Math.ceil(this.cost(level + 1));
    }
  };
};

var artifactInfo = {
  AOV:       new Artifact("Amulet of the Valrunes",  1,  2, 0.7, 2.0, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  25], [BonusTypes.GOLD_MOBS,               10]], ""),
  AXE:       new Artifact("Axe of Resolution",       1, 16, 0.5, 1.7, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  35], [BonusTypes.SKILL_DRN_TDMG,          10]], ""),
  BM:        new Artifact("Barbarian's Mettle",      1, 10, 0.4, 1.5,   10, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  35], [BonusTypes.SKILL_CDR_TDMG,          -5]], ""),
  BREW:      new Artifact("Brew of Absorption",      1, 30, 0.6, 1.7, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  30], [BonusTypes.TAP_DAMAGE_ARTIFACTS,     2]], ""),
  CHEST:     new Artifact("Chest of Contentment",    1, 19, 1.0, 1.5, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  20], [BonusTypes.CHEST_ARTIFACTS,         20]], ""),
  ELIXIR:    new Artifact("Crafter's Elixir",        1, 27, 0.5, 1.8, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  20], [BonusTypes.GOLD_OVERALL,            15]], ""), // gold while playing
  EGG:       new Artifact("Crown Egg",               1, 18, 1.0, 1.5, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  20], [BonusTypes.CHEST_CHANCE,            20]], ""),
  CLOAK:     new Artifact("Dark Cloak of Life",      1,  3, 0.5, 2.0,   25, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  15], [BonusTypes.BOSS_HEALTH,             -2]], ""),
  DS:        new Artifact("Death Seeker",            1,  4, 0.8, 2.5,   25, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  15], [BonusTypes.CRIT_CHANCE,              2]], ""),
  CHALICE:   new Artifact("Divine Chalice",          1, 21, 0.7, 1.7, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  15], [BonusTypes.GOLD_10X_CHANCE,        0.5]], ""),
  HAMMER:    new Artifact("Drunken Hammer",          1, 29, 0.6, 1.7, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  30], [BonusTypes.TAP_DAMAGE_ARTIFACTS,     2]], ""),
  FF:        new Artifact("Future's Fortune",        1, 20, 0.7, 2.0, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  15], [BonusTypes.GOLD_ARTIFACTS,           5]], ""),
  HT:        new Artifact("Hero's Thrust",           1, 17, 0.7, 1.7, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  15], [BonusTypes.CRIT_DAMAGE_ARTIFACTS,   20]], ""),
  HO:        new Artifact("Hunter's Ointment",       1,  8, 0.4, 1.5,   10, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  60], [BonusTypes.SKILL_CDR_HERO,          -5]], ""),
  KS:        new Artifact("Knight's Shield",         1,  1, 0.7, 1.5, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  30], [BonusTypes.GOLD_BOSS,              100]], ""),
  LP:        new Artifact("Laborer's Pendant",       1,  9, 0.7, 1.5,   10, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  35], [BonusTypes.SKILL_CDR_GOLD,          -5]], ""),
  GAUNTLET:  new Artifact("Ogre's Gauntlet",         1, 12, 0.5, 1.7, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  35], [BonusTypes.SKILL_DRN_AUTO,          10]], ""),
  OA:        new Artifact("Otherworldly Armor",      1, 28, 1.0, 2.2,   10, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  35], [BonusTypes.HERO_DEATH_CHANCE,       -5]], ""),
  LOTION:    new Artifact("Overseer's Lotion",       1,  6, 0.4, 1.5,   10, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  35], [BonusTypes.SKILL_CDR_AUTO,          -5]], ""),
  PARCHMENT: new Artifact("Parchment of Importance", 1, 13, 0.5, 1.7, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  35], [BonusTypes.SKILL_DRN_CRIT,          10]], ""),
  ROO:       new Artifact("Ring of Opulence",        1, 15, 0.7, 1.7, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  35], [BonusTypes.SKILL_DRN_GOLD,          10]], ""),
  ROWC:      new Artifact("Ring of Wondrous Charm",  1, 24, 0.5, 1.7,   25, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  15], [BonusTypes.UPGRADE_COST,            -2]], ""),
  SCROLL:    new Artifact("Sacred Scroll",           1,  7, 0.4, 1.5,   10, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  35], [BonusTypes.SKILL_CDR_CRIT,          -5]], ""),
  SAINTLY:   new Artifact("Saintly Shield",          1, 11, 0.3, 1.5,   10, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  35], [BonusTypes.SKILL_CDR_OHKO,          -5]], ""),
  SAVIOR:    new Artifact("Savior Shield",           1,  5, 0.5, 1.7,   25, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  15], [BonusTypes.BOSS_TIME,               10]], ""),
  TINCTURE:  new Artifact("Tincture of the Maker",   1, 26, 0.6, 2.5, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,   5], [BonusTypes.ARTIFACT_DAMAGE_BOOST,    5]], ""),
  UA:        new Artifact("Undead Aura",             1, 22, 0.7, 2.0, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  15], [BonusTypes.RELICS,                   5]], ""),
  FISSURE:   new Artifact("Universal Fissure",       1, 14, 0.5, 1.7, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  60], [BonusTypes.SKILL_DRN_HERO,          10]], ""),
  WR:        new Artifact("Warrior's Revival",       1, 23, 1.0, 2.2,   10, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  35], [BonusTypes.HERO_REVIVE_TIME,        -5]], ""),
  WI:        new Artifact("Worldly Illuminator",     1, 25, 0.6, 3.0,    5, [[BonusTypes.ALL_DAMAGE_ARTIFACTS, 150], [BonusTypes.NUM_MOBS,              -100]], ""),

  AOS:       new Artifact("Amulet of Storms",        2, 55, 2.0, 6.0,    5, [[BonusTypes.ALL_DAMAGE_ARTIFACTS, 300], [BonusTypes.NUM_MOBS,              -100]], ""),
  ORB:       new Artifact("Annihilation Orb",        2, 49, 1.0, 1.5, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  20], [BonusTypes.CHEST_ARTIFACTS,         10], [BonusTypes.GOLD_ARTIFACTS,          2]], ""),
  AO:        new Artifact("Anointment Ointment",     2, 54, 0.5, 2.8,   25, [[BonusTypes.ALL_DAMAGE_ARTIFACTS, 150], [BonusTypes.UPGRADE_COST,            -1], [BonusTypes.GOLD_OVERALL,            5]], ""),
  BATON:     new Artifact("Aphrodite's Baton",       2, 53, 1.0, 4.0,   10, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  35], [BonusTypes.HERO_REVIVE_TIME,        -2], [BonusTypes.GOLD_OVERALL,            5]], ""),
  WAND:      new Artifact("Atomic Wand",             2, 52, 0.7, 2.0, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  15], [BonusTypes.RELICS,                   2], [BonusTypes.GOLD_OVERALL,            5]], ""),
  ADS:       new Artifact("Azure Dragon Statuette",  2, 57, 0.5, 1.8, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  20], [BonusTypes.GOLD_OVERALL,             5], [BonusTypes.SKILL_DRN_TDMG,          5]], ""),
  BOOTS:     new Artifact("Boots of Wilting",        2, 41, 0.3, 2.8,   25, [[BonusTypes.ALL_DAMAGE_ARTIFACTS, 200], [BonusTypes.SKILL_CDR_OHKO,          -2], [BonusTypes.CRIT_DAMAGE_ARTIFACTS,   5]], ""),
  BOB:       new Artifact("Braid of Binding",        2, 48, 1.1, 2.1, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  30], [BonusTypes.CHEST_CHANCE,             5], [BonusTypes.GOLD_ARTIFACTS,          2]], ""),
  CC:        new Artifact("Chilling Chalice",        2, 40, 0.4, 2.8,   25, [[BonusTypes.ALL_DAMAGE_ARTIFACTS, 200], [BonusTypes.SKILL_CDR_TDMG,          -2], [BonusTypes.CRIT_DAMAGE_ARTIFACTS,   5]], ""),
  CM:        new Artifact("Circe's Mirror",          2, 67, 0.7, 2.0, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  15], [BonusTypes.RELICS,                   2], [BonusTypes.GOLD_BOSS,              30]], ""),
  CRYSTAL:   new Artifact("Conjuror Crystal",        2, 58, 1.1, 4.0,   12, [[BonusTypes.ALL_DAMAGE_ARTIFACTS, 115], [BonusTypes.HERO_DEATH_CHANCE,       -2], [BonusTypes.CRIT_DAMAGE_ARTIFACTS,  10]], ""),
  CANDLE:    new Artifact("Cosmic Candle",           2, 66, 0.6, 2.5, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,   5], [BonusTypes.ARTIFACT_DAMAGE_BOOST,    2], [BonusTypes.GOLD_BOSS,              30]], ""),
  CROWN:     new Artifact("Crown of Cleopatra",      2, 32, 0.9, 2.1, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  25], [BonusTypes.GOLD_MOBS,                5], [BonusTypes.SKILL_DRN_CRIT,          5]], ""),
  HORNS:     new Artifact("Demon Horns",             2, 38, 0.4, 2.8,   25, [[BonusTypes.ALL_DAMAGE_ARTIFACTS, 200], [BonusTypes.SKILL_CDR_HERO,          -2], [BonusTypes.CRIT_DAMAGE_ARTIFACTS,   5]], ""),
  EOV:       new Artifact("Elixir of Verve",         2, 44, 0.5, 2.1, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  35], [BonusTypes.SKILL_DRN_HERO,           5], [BonusTypes.GOLD_ARTIFACTS,          2]], ""),
  HARP:      new Artifact("Harp of Medea",           2, 69, 0.5, 3.1,   50, [[BonusTypes.ALL_DAMAGE_ARTIFACTS, 140], [BonusTypes.BOSS_HEALTH,           -0.5], [BonusTypes.GOLD_MOBS,               5]], ""),
  HOF:       new Artifact("Horseshoe of Fortune",    2, 61, 0.6, 2.1, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  30], [BonusTypes.TAP_DAMAGE_ARTIFACTS,     1], [BonusTypes.CRIT_DAMAGE_ARTIFACTS,  10]], ""),
  STAFF:     new Artifact("Inebriated Staff",        2, 70, 0.7, 2.0, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  15], [BonusTypes.GOLD_10X_CHANCE,        0.2], [BonusTypes.RELICS,                  2]], ""),
  MANGLE:    new Artifact("Mage's Mantle",           2, 31, 0.7, 2.1, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  30], [BonusTypes.GOLD_BOSS,               40], [BonusTypes.SKILL_DRN_AUTO,          5]], ""),
  MM:        new Artifact("Magic Mist",              2, 43, 0.5, 2.1, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  35], [BonusTypes.SKILL_DRN_CRIT,           5], [BonusTypes.GOLD_ARTIFACTS,          2]], ""),
  MARK:      new Artifact("Mark of Dominance",       2, 56, 0.6, 2.5, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,   5], [BonusTypes.ARTIFACT_DAMAGE_BOOST,    2], [BonusTypes.SKILL_DRN_GOLD,          5]], ""),
  EARRING:   new Artifact("Mercury's Earring",       2, 47, 0.7, 2.3, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  15], [BonusTypes.CRIT_DAMAGE_ARTIFACTS,    5], [BonusTypes.SKILL_DRN_HERO,          5]], ""),
  GLOBE:     new Artifact("Merlin's Globe",          2, 36, 0.4, 2.8,   25, [[BonusTypes.ALL_DAMAGE_ARTIFACTS, 200], [BonusTypes.SKILL_CDR_AUTO,          -2], [BonusTypes.CRIT_DAMAGE_ARTIFACTS,   5]], ""),
  MOR:       new Artifact("Mirror of Refraction",    2, 60, 0.6, 2.1, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  30], [BonusTypes.TAP_DAMAGE_ARTIFACTS,     1], [BonusTypes.GOLD_10X_CHANCE,         1]], ""),
  GOBLET:    new Artifact("Morgana's Goblet",        2, 68, 0.6, 1.7, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  30], [BonusTypes.GOLD_ARTIFACTS,           2], [BonusTypes.GOLD_BOSS,              30]], ""),
  NECKLACE:  new Artifact("Necklace of Nether",      2, 39, 0.7, 2.8,   25, [[BonusTypes.ALL_DAMAGE_ARTIFACTS, 200], [BonusTypes.SKILL_CDR_GOLD,          -2], [BonusTypes.CRIT_DAMAGE_ARTIFACTS,   5]], ""),
  PMB:       new Artifact("Pandora's Music Box",     2, 37, 0.4, 2.8,   25, [[BonusTypes.ALL_DAMAGE_ARTIFACTS, 200], [BonusTypes.SKILL_CDR_CRIT,          -2], [BonusTypes.CRIT_DAMAGE_ARTIFACTS,   5]], ""),
  PETALS:    new Artifact("Petals of Protection",    2, 59, 0.6, 4.0,   12, [[BonusTypes.ALL_DAMAGE_ARTIFACTS, 130], [BonusTypes.TAP_DAMAGE_ARTIFACTS,     1], [BonusTypes.HERO_DEATH_CHANCE,      -2]], ""),
  PR:        new Artifact("Phoenix Renewed",         2, 42, 0.5, 2.1, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  35], [BonusTypes.SKILL_DRN_AUTO,           5], [BonusTypes.GOLD_ARTIFACTS,          2]], ""),
  RR:        new Artifact("Ra's Ring",               2, 51, 0.7, 1.7, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  15], [BonusTypes.GOLD_10X_CHANCE,       0.25], [BonusTypes.GOLD_OVERALL,            5]], ""),
  ROF:       new Artifact("Ring of Fire",            2, 50, 0.7, 2.3, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  15], [BonusTypes.GOLD_ARTIFACTS,           2], [BonusTypes.CRIT_DAMAGE_ARTIFACTS,   2]], ""),
  ROD:       new Artifact("Rod of Great Gales",      2, 62, 0.9, 4.0,   12, [[BonusTypes.ALL_DAMAGE_ARTIFACTS, 130], [BonusTypes.HERO_DEATH_CHANCE,       -2], [BonusTypes.HERO_REVIVE_TIME,      -10]], ""),
  ROPE:      new Artifact("Rope of Lashes",          2, 63, 0.5, 3.3,   25, [[BonusTypes.ALL_DAMAGE_ARTIFACTS, 125], [BonusTypes.GOLD_MOBS,                5], [BonusTypes.BOSS_TIME,               5]], ""),
  SCARAB:    new Artifact("Scarab of Insanity",      2, 64, 0.7, 2.0, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  15], [BonusTypes.RELICS,                   2], [BonusTypes.GOLD_MOBS,               5]], ""),
  SOL:       new Artifact("Scroll of Lightning",     2, 34, 0.8, 3.4,   25, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  15], [BonusTypes.CRIT_CHANCE,              1], [BonusTypes.GOLD_MOBS,               5]], ""),
  SG:        new Artifact("Shock Gauntlets",         2, 33, 0.5, 2.6,   50, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  85], [BonusTypes.BOSS_HEALTH,           -0.5], [BonusTypes.GOLD_ARTIFACTS,          2]], ""),
  SOS:       new Artifact("Slippers of Sleep",       2, 65, 0.6, 2.5,   10, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,   5], [BonusTypes.ARTIFACT_DAMAGE_BOOST,    2], [BonusTypes.HERO_REVIVE_TIME,       -2]], ""),
  SS:        new Artifact("Swift Swill",             2, 46, 0.5, 2.5, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,   5], [BonusTypes.GOLD_BOSS,               30], [BonusTypes.CHEST_ARTIFACTS,        10]], ""),
  VIAL:      new Artifact("Vial of Frost",           2, 45, 0.7, 2.1, null, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  35], [BonusTypes.SKILL_DRN_GOLD,           5], [BonusTypes.GOLD_ARTIFACTS,          2]], ""),
  WOW:       new Artifact("Wand of Wonder",          2, 35, 0.5, 3.4,   25, [[BonusTypes.ALL_DAMAGE_ARTIFACTS,  15], [BonusTypes.BOSS_TIME,                5], [BonusTypes.CRIT_CHANCE,             1]], ""),
};

var HERO_UPGRADE_SCALING = 1.075;
var PRECOMPUTE_UPGRADE_COST = 6000;
var Hero = function(name, id, baseCost, skills) {
  this.name = name;
  this.id = id;
  this.baseCost = baseCost;
  this.skills = skills;

  // base_cost should be of form {1: x, 2: y}
  this.baseCost10 = mapMap(baseCost, function(c) { return c*10; });
  this.upgradeCosts = mapMap(baseCost, function(c) { return [c]; });

  // precompute a bunch of upgrade costs
  var m = HERO_UPGRADE_SCALING;
  for (var i = 1; i < PRECOMPUTE_UPGRADE_COST; i++) {
    for (var w in baseCost) {
      // this.upgradeCosts[w].push((i < 1000 ? this.baseCost[w] : this.baseCost10[w]) * Math.pow(HERO_UPGRADE_SCALING, i));
      this.upgradeCosts[w].push((i < 1000 ? this.baseCost[w] : this.baseCost10[w]) * m);
    }
    m *= HERO_UPGRADE_SCALING;
  }

  this.evolveCost = mapMap(this.upgradeCosts, function(l) { return 10.75 * l[999]; });

  this.getUpgradeCost = function(world, level) {
    if (level < PRECOMPUTE_UPGRADE_COST) {
      return this.upgradeCosts[world][level];
    }
    return (level < 1000 ? this.baseCost[world] : this.baseCost10[world]) * Math.pow(HERO_UPGRADE_SCALING, level);
  };

  this.costToLevel = function(world, startLevel, endLevel) {
    if (endLevel == startLevel + 1) {
      return this.getUpgradeCost(world, startLevel);
    }
    if (endLevel <= 1000) {
      return this.baseCost[world] * (Math.pow(1.075, endLevel) - Math.pow(1.075, startLevel)) / 0.075;
    }
    if (startLevel >= 1000) {
      return this.baseCost10[world] * (Math.pow(1.075, endLevel) - Math.pow(1.075, startLevel)) / 0.075;
    }
    return this.costToLevel(world, startLevel, 1000) + this.evolveCost[world] + this.costToLevel(world, 1000, endLevel);
  };

  this.getBonuses = function(world, level, btype) {
    var bonus = 0;
    for (var i = 0; i < levelToSkills(world, level); i++) {
      if (skills[world][i][1] == btype) {
        bonus += skills[world][i][0];
      }
    }
    return bonus;
  };

  this.getAllBonuses = function(world, level) {
    // console.log(this.name, " level: ", level);
    var bonuses = {};
    for (var i = 0; i < levelToSkills(world, level); i++) {
      var skillType = skills[world][i][1];
      // console.log(skillType, "value: ", skills[world][i][0]);
      // TODO: ternary if (bonuses[skillType] ? bonuses[skillType] : 0) + blah
      if (!(skillType in bonuses)) {
        bonuses[skillType] = 0;
      }
      bonuses[skillType] += skills[world][i][0];
    }
    return bonuses;
  };

  this.getBaseDamage = function(world, level) {
    // TODO: handle large levels, breaks at around 9k (c > e308)
    // HeroInfo.GetDPSByLevel (without all the multipliers)
    var n, m;
    var c = this.getUpgradeCost(world, level - 1);
    // console.log("c: ", c);
    if (level >= 1001) {
      // console.log(Math.pow(0.904, level - 1001));
      n = Math.max(Math.pow(0.904, level - 1001) * Math.pow(0.715, this.id + 33), 1e-308);
      m = Math.pow(1.075, level - 1000) - 1;
    } else {
      n = Math.max(Math.pow(0.904, level - 1) * Math.pow(1 - (0.019 * Math.min(this.id, 15)), this.id), 1e-308);
      m = Math.pow(1.075, level) - 1;
    }
    return (n * c * m) / 0.75;
  };
}


var heroInfo = [
  new Hero("Takeda the Blade Assassin", 1, {1: 50, 2: 36}, {
    1: [[50, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [100, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [10, BonusTypes.CRIT_DAMAGE_HEROSKILLS],
        [1000, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [25, BonusTypes.ALL_DAMAGE_HEROSKILLS], [10000, BonusTypes.INDIVIDUAL_HERO_DAMAGE]],
    2: [[100, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [200, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [10, BonusTypes.CRIT_DAMAGE_HEROSKILLS],
        [1000, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [20, BonusTypes.ALL_DAMAGE_HEROSKILLS], [50000, BonusTypes.INDIVIDUAL_HERO_DAMAGE]]}),
  new Hero("Contessa the Torch Wielder", 2, {1: 175, 2: 140}, {
    1: [[5, BonusTypes.TAP_DAMAGE_HEROSKILLS], [100, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [1000, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [0.4, BonusTypes.TAP_DAMAGE_DPS],
        [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [10, BonusTypes.GOLD_HEROSKILLS], [10000, BonusTypes.INDIVIDUAL_HERO_DAMAGE]],
    2: [[6, BonusTypes.TAP_DAMAGE_HEROSKILLS], [200, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [1200, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [0.4, BonusTypes.TAP_DAMAGE_DPS],
        [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [15, BonusTypes.GOLD_HEROSKILLS], [30000, BonusTypes.INDIVIDUAL_HERO_DAMAGE]]}),
  new Hero("Hornetta, Queen of the Valrunes", 3, {1: 674, 2: 1.12e3}, {
    1: [[150, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [10, BonusTypes.GOLD_HEROSKILLS], [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [0.4, BonusTypes.TAP_DAMAGE_DPS],
        [20, BonusTypes.CHEST_HEROSKILLS], [1, BonusTypes.CRIT_CHANCE], [30, BonusTypes.ALL_DAMAGE_HEROSKILLS]],
    2: [[250, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [10, BonusTypes.GOLD_HEROSKILLS], [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [0.4, BonusTypes.TAP_DAMAGE_DPS],
        [20, BonusTypes.CHEST_HEROSKILLS], [1, BonusTypes.CRIT_CHANCE], [30, BonusTypes.ALL_DAMAGE_HEROSKILLS]]}),
  new Hero("Mila the Hammer Stomper", 4, {1: 2.85e3, 2: 6.72e3}, {
    1: [[100, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [800, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [6, BonusTypes.GOLD_HEROSKILLS], [500, BonusTypes.INDIVIDUAL_HERO_DAMAGE],
        [5, BonusTypes.CRIT_DAMAGE_HEROSKILLS], [20, BonusTypes.ALL_DAMAGE_HEROSKILLS], [20, BonusTypes.CHEST_HEROSKILLS]],
    2: [[150, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [900, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [10, BonusTypes.GOLD_HEROSKILLS], [600, BonusTypes.INDIVIDUAL_HERO_DAMAGE],
        [5, BonusTypes.CRIT_DAMAGE_HEROSKILLS], [20, BonusTypes.ALL_DAMAGE_HEROSKILLS], [25, BonusTypes.CHEST_HEROSKILLS]]}),
  new Hero("Terra the Land Scorcher", 5, {1: 13.30e3, 2: 60.63e3}, {
    1: [[300, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [10, BonusTypes.GOLD_HEROSKILLS], [0.4, BonusTypes.TAP_DAMAGE_DPS], [15, BonusTypes.GOLD_HEROSKILLS],
        [20, BonusTypes.CHEST_HEROSKILLS], [5, BonusTypes.TAP_DAMAGE_HEROSKILLS], [10000, BonusTypes.INDIVIDUAL_HERO_DAMAGE]],
    2: [[300, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [10, BonusTypes.GOLD_HEROSKILLS], [0.4, BonusTypes.TAP_DAMAGE_DPS], [17, BonusTypes.GOLD_HEROSKILLS],
        [20, BonusTypes.CHEST_HEROSKILLS], [5, BonusTypes.TAP_DAMAGE_HEROSKILLS], [88000, BonusTypes.INDIVIDUAL_HERO_DAMAGE]]}),
  new Hero("Inquisireaux the Terrible", 6, {1: 68.10e3, 2: 423e3}, {
    1: [[200, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [700, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [20, BonusTypes.ALL_DAMAGE_HEROSKILLS],
        [5, BonusTypes.CRIT_DAMAGE_HEROSKILLS], [2, BonusTypes.CRIT_CHANCE], [10000, BonusTypes.INDIVIDUAL_HERO_DAMAGE]],
    2: [[230, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [777, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [15, BonusTypes.ALL_DAMAGE_HEROSKILLS], [15, BonusTypes.ALL_DAMAGE_HEROSKILLS],
        [5, BonusTypes.CRIT_DAMAGE_HEROSKILLS], [2, BonusTypes.CRIT_CHANCE], [65000, BonusTypes.INDIVIDUAL_HERO_DAMAGE]]}),
  new Hero("Charlotte the Special", 7, {1: 384.00e3, 2: 5.08e6}, {
    1: [[200, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [5, BonusTypes.BOSS_DAMAGE], [7, BonusTypes.BOSS_DAMAGE], [600, BonusTypes.INDIVIDUAL_HERO_DAMAGE],
        [5, BonusTypes.TAP_DAMAGE_HEROSKILLS], [20, BonusTypes.CHEST_HEROSKILLS], [30, BonusTypes.ALL_DAMAGE_HEROSKILLS]],
    2: [[550, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [5, BonusTypes.BOSS_DAMAGE], [7, BonusTypes.BOSS_DAMAGE], [1600, BonusTypes.INDIVIDUAL_HERO_DAMAGE],
        [5, BonusTypes.TAP_DAMAGE_HEROSKILLS], [20, BonusTypes.CHEST_HEROSKILLS], [30, BonusTypes.ALL_DAMAGE_HEROSKILLS]]}),
  new Hero("Jordaan, Knight of Mini", 8, {1: 2.38e6, 2: 20.29e6}, {
    1: [[200, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [0.4, BonusTypes.TAP_DAMAGE_DPS], [15, BonusTypes.GOLD_HEROSKILLS],
        [20, BonusTypes.CHEST_HEROSKILLS], [1900, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [20, BonusTypes.ALL_DAMAGE_HEROSKILLS]],
    2: [[480, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [0.4, BonusTypes.TAP_DAMAGE_DPS], [20, BonusTypes.GOLD_HEROSKILLS],
        [25, BonusTypes.CHEST_HEROSKILLS], [8500, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [20, BonusTypes.ALL_DAMAGE_HEROSKILLS]]}),
  new Hero("Jukka, Master of Axes", 9, {1: 23.80e6, 2: 102e6}, {
    1: [[150, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [5, BonusTypes.BOSS_DAMAGE], [30, BonusTypes.ALL_DAMAGE_HEROSKILLS], [5, BonusTypes.CRIT_DAMAGE_HEROSKILLS],
        [5000, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [25, BonusTypes.ALL_DAMAGE_HEROSKILLS], [10000, BonusTypes.INDIVIDUAL_HERO_DAMAGE]],
    2: [[250, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [5, BonusTypes.BOSS_DAMAGE], [30, BonusTypes.ALL_DAMAGE_HEROSKILLS], [5, BonusTypes.CRIT_DAMAGE_HEROSKILLS],
        [9000, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [25, BonusTypes.ALL_DAMAGE_HEROSKILLS], [58000, BonusTypes.INDIVIDUAL_HERO_DAMAGE]]}),
  new Hero("Milo and Clonk-Clonk", 10, {1: 143.00e6, 2: 610e6}, {
    1: [[150, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [1, BonusTypes.CRIT_CHANCE], [5, BonusTypes.BOSS_DAMAGE], [15, BonusTypes.GOLD_HEROSKILLS],
        [20, BonusTypes.CHEST_HEROSKILLS], [25, BonusTypes.CHEST_HEROSKILLS], [15, BonusTypes.ALL_DAMAGE_HEROSKILLS]],
    2: [[220, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [1, BonusTypes.CRIT_CHANCE], [5, BonusTypes.BOSS_DAMAGE], [15, BonusTypes.GOLD_HEROSKILLS],
        [20, BonusTypes.CHEST_HEROSKILLS], [9900, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [15, BonusTypes.ALL_DAMAGE_HEROSKILLS]]}),
  new Hero("Macelord the Ruthless", 11, {1: 943.00e6, 2: 6.09e9}, {
    1: [[200, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [850, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [5, BonusTypes.TAP_DAMAGE_HEROSKILLS], [0.4, BonusTypes.TAP_DAMAGE_DPS],
        [15, BonusTypes.GOLD_HEROSKILLS], [5, BonusTypes.TAP_DAMAGE_HEROSKILLS], [3800, BonusTypes.INDIVIDUAL_HERO_DAMAGE]],
    2: [[200, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [1400, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [5, BonusTypes.TAP_DAMAGE_HEROSKILLS], [0.4, BonusTypes.TAP_DAMAGE_DPS],
        [15, BonusTypes.GOLD_HEROSKILLS], [1, BonusTypes.CRIT_CHANCE], [67600, BonusTypes.INDIVIDUAL_HERO_DAMAGE]]}),
  new Hero("Gertrude the Goat Rider", 12, {1: 6.84e9, 2: 18.29e9}, {
    1: [[250, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [1300, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [7, BonusTypes.BOSS_DAMAGE], [5, BonusTypes.CRIT_DAMAGE_HEROSKILLS],
        [0.4, BonusTypes.TAP_DAMAGE_DPS], [5, BonusTypes.TAP_DAMAGE_HEROSKILLS], [20, BonusTypes.GOLD_HEROSKILLS]],
    2: [[250, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [1300, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [7, BonusTypes.BOSS_DAMAGE], [5, BonusTypes.CRIT_DAMAGE_HEROSKILLS],
        [0.4, BonusTypes.TAP_DAMAGE_DPS], [5, BonusTypes.TAP_DAMAGE_HEROSKILLS], [20, BonusTypes.GOLD_HEROSKILLS]]}),
  new Hero("Twitterella the Tweeter", 13, {1: 54.70e9, 2: 73.2e9}, {
    1: [[150, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [850, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [5, BonusTypes.TAP_DAMAGE_HEROSKILLS], [20, BonusTypes.ALL_DAMAGE_HEROSKILLS],
        [30, BonusTypes.ALL_DAMAGE_HEROSKILLS], [5, BonusTypes.CRIT_DAMAGE_HEROSKILLS], [12000, BonusTypes.INDIVIDUAL_HERO_DAMAGE]],
    2: [[280, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [1000, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [5, BonusTypes.TAP_DAMAGE_HEROSKILLS], [20, BonusTypes.ALL_DAMAGE_HEROSKILLS],
        [30, BonusTypes.ALL_DAMAGE_HEROSKILLS], [7, BonusTypes.CRIT_DAMAGE_HEROSKILLS], [55500, BonusTypes.INDIVIDUAL_HERO_DAMAGE]]}),
  new Hero("Master Hawk, Lord of Luft", 14, {1: 8200e9, 2: 1.1e12}, {
    1: [[200, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [1100, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [0.4, BonusTypes.TAP_DAMAGE_DPS], [400, BonusTypes.INDIVIDUAL_HERO_DAMAGE],
        [10, BonusTypes.GOLD_HEROSKILLS], [10, BonusTypes.CRIT_DAMAGE_HEROSKILLS], [20, BonusTypes.GOLD_HEROSKILLS]],
    2: [[200, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [1100, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [0.4, BonusTypes.TAP_DAMAGE_DPS], [400, BonusTypes.INDIVIDUAL_HERO_DAMAGE],
        [10, BonusTypes.GOLD_HEROSKILLS], [10, BonusTypes.CRIT_DAMAGE_HEROSKILLS], [20, BonusTypes.GOLD_HEROSKILLS]]}),
  new Hero("Elpha, Wielder of Gems", 15, {1: 8.20e12, 2: 11e12}, {
    1: [[300, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [40, BonusTypes.ALL_DAMAGE_HEROSKILLS], [5, BonusTypes.BOSS_DAMAGE], [2, BonusTypes.CRIT_CHANCE],
        [15, BonusTypes.CRIT_DAMAGE_HEROSKILLS], [20, BonusTypes.CHEST_HEROSKILLS], [10000, BonusTypes.INDIVIDUAL_HERO_DAMAGE]],
    2: [[800, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [40, BonusTypes.ALL_DAMAGE_HEROSKILLS], [5, BonusTypes.BOSS_DAMAGE], [2, BonusTypes.CRIT_CHANCE],
        [15, BonusTypes.CRIT_DAMAGE_HEROSKILLS], [20, BonusTypes.CHEST_HEROSKILLS], [78000, BonusTypes.INDIVIDUAL_HERO_DAMAGE]]}),
  new Hero("Poppy, Daughter of Ceremony", 16, {1: 164.00e12, 2: 274e12}, {
    1: [[350, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [25, BonusTypes.CHEST_HEROSKILLS], [20, BonusTypes.GOLD_HEROSKILLS], [5, BonusTypes.BOSS_DAMAGE],
        [7, BonusTypes.BOSS_DAMAGE], [15, BonusTypes.ALL_DAMAGE_HEROSKILLS], [20, BonusTypes.ALL_DAMAGE_HEROSKILLS]],
    2: [[350, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [25, BonusTypes.CHEST_HEROSKILLS], [20, BonusTypes.GOLD_HEROSKILLS], [5, BonusTypes.BOSS_DAMAGE],
        [7, BonusTypes.BOSS_DAMAGE], [15, BonusTypes.ALL_DAMAGE_HEROSKILLS], [20, BonusTypes.ALL_DAMAGE_HEROSKILLS]]}),
  new Hero("Skulptor, Protector of Bridges", 17, {1: 1.64e15, 2: 2.19e15}, {
    1: [[150, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [900, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [10, BonusTypes.GOLD_HEROSKILLS], [10, BonusTypes.GOLD_HEROSKILLS],
        [5, BonusTypes.TAP_DAMAGE_HEROSKILLS], [10, BonusTypes.CRIT_DAMAGE_HEROSKILLS], [25, BonusTypes.GOLD_HEROSKILLS]],
    2: [[270, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [900, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [10, BonusTypes.GOLD_HEROSKILLS], [10, BonusTypes.GOLD_HEROSKILLS],
        [5, BonusTypes.TAP_DAMAGE_HEROSKILLS], [10, BonusTypes.CRIT_DAMAGE_HEROSKILLS], [25, BonusTypes.GOLD_HEROSKILLS]]}),
  new Hero("Sterling the Enchantor", 18, {1: 49.20e15, 2: 98.8e15}, {
    1: [[400, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [500, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [5, BonusTypes.BOSS_DAMAGE], [450, BonusTypes.INDIVIDUAL_HERO_DAMAGE],
        [5, BonusTypes.TAP_DAMAGE_HEROSKILLS], [20, BonusTypes.CHEST_HEROSKILLS], [15, BonusTypes.ALL_DAMAGE_HEROSKILLS]],
    2: [[400, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [1000, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [5, BonusTypes.BOSS_DAMAGE], [3500, BonusTypes.INDIVIDUAL_HERO_DAMAGE],
        [5, BonusTypes.TAP_DAMAGE_HEROSKILLS], [20, BonusTypes.CHEST_HEROSKILLS], [15, BonusTypes.ALL_DAMAGE_HEROSKILLS]]}),
  new Hero("Orba the Foreseer", 19, {1: 2.46e18, 2: 5.43e18}, {
    1: [[200, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [1000, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [0.5, BonusTypes.TAP_DAMAGE_DPS], [5, BonusTypes.TAP_DAMAGE_HEROSKILLS],
        [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [10, BonusTypes.GOLD_HEROSKILLS], [10, BonusTypes.ALL_DAMAGE_HEROSKILLS]],
    2: [[400, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [1000, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [0.5, BonusTypes.TAP_DAMAGE_DPS], [5, BonusTypes.TAP_DAMAGE_HEROSKILLS],
        [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [10, BonusTypes.GOLD_HEROSKILLS], [15, BonusTypes.ALL_DAMAGE_HEROSKILLS]]}),
  new Hero("Remus the Noble Archer", 20, {1: 73.80e18, 2: 81.49e18}, {
    1: [[250, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [600, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [20, BonusTypes.CRIT_DAMAGE_HEROSKILLS], [450, BonusTypes.INDIVIDUAL_HERO_DAMAGE],
        [0.4, BonusTypes.TAP_DAMAGE_DPS], [10, BonusTypes.TAP_DAMAGE_HEROSKILLS], [10, BonusTypes.GOLD_HEROSKILLS]],
    2: [[250, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [900, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [20, BonusTypes.CRIT_DAMAGE_HEROSKILLS], [2800, BonusTypes.INDIVIDUAL_HERO_DAMAGE],
        [0.4, BonusTypes.TAP_DAMAGE_DPS], [10, BonusTypes.TAP_DAMAGE_HEROSKILLS], [10, BonusTypes.GOLD_HEROSKILLS]]}),
  new Hero("Mikey the Magician Apprentice", 21, {1: 2.44e21, 2: 2.6e21}, {
    1: [[200, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [5, BonusTypes.TAP_DAMAGE_HEROSKILLS], [30, BonusTypes.ALL_DAMAGE_HEROSKILLS], [2, BonusTypes.CRIT_CHANCE],
        [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [20, BonusTypes.CHEST_HEROSKILLS], [10000, BonusTypes.INDIVIDUAL_HERO_DAMAGE]],
    2: [[200, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [5, BonusTypes.TAP_DAMAGE_HEROSKILLS], [30, BonusTypes.ALL_DAMAGE_HEROSKILLS], [2, BonusTypes.CRIT_CHANCE],
        [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [20, BonusTypes.CHEST_HEROSKILLS], [73000, BonusTypes.INDIVIDUAL_HERO_DAMAGE]]}),
  new Hero("Peter Pricker the Prickly Poker", 22, {1: 244.00e21, 2: 289e21}, {
    1: [[250, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [750, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [500, BonusTypes.INDIVIDUAL_HERO_DAMAGE],
        [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [30, BonusTypes.CRIT_DAMAGE_HEROSKILLS], [20, BonusTypes.ALL_DAMAGE_HEROSKILLS]],
    2: [[250, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [1050, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [4000, BonusTypes.INDIVIDUAL_HERO_DAMAGE],
        [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [30, BonusTypes.CRIT_DAMAGE_HEROSKILLS], [20, BonusTypes.ALL_DAMAGE_HEROSKILLS]]}),
  new Hero("Teeny Tom, Keeper of the Castle", 23, {1: 48.70e24, 2: 64.2e24}, {
    1: [[300, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [800, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [0.4, BonusTypes.TAP_DAMAGE_DPS], [20, BonusTypes.CRIT_DAMAGE_HEROSKILLS],
        [10, BonusTypes.TAP_DAMAGE_HEROSKILLS], [2, BonusTypes.CRIT_CHANCE], [10000, BonusTypes.INDIVIDUAL_HERO_DAMAGE]],
    2: [[300, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [800, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [0.4, BonusTypes.TAP_DAMAGE_DPS], [20, BonusTypes.CRIT_DAMAGE_HEROSKILLS],
        [10, BonusTypes.TAP_DAMAGE_HEROSKILLS], [2, BonusTypes.CRIT_CHANCE], [75000, BonusTypes.INDIVIDUAL_HERO_DAMAGE]]}),
  new Hero("Deznis the Cleanser", 24, {1: 1950e27, 2: 21.4e27}, {
    1: [[200, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [500, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [1200, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [15, BonusTypes.GOLD_HEROSKILLS],
        [20, BonusTypes.CHEST_HEROSKILLS], [9000, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [15, BonusTypes.ALL_DAMAGE_HEROSKILLS]],
    2: [[200, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [1000, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [8000, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [15, BonusTypes.GOLD_HEROSKILLS],
        [20, BonusTypes.CHEST_HEROSKILLS], [88000, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [15, BonusTypes.ALL_DAMAGE_HEROSKILLS]]}),
  new Hero("Hamlette, Painter of Skulls", 25, {1: 21.40e30, 2: 23.49e30}, {
    1: [[5, BonusTypes.TAP_DAMAGE_HEROSKILLS], [5, BonusTypes.TAP_DAMAGE_HEROSKILLS], [0.4, BonusTypes.TAP_DAMAGE_DPS], [10, BonusTypes.ALL_DAMAGE_HEROSKILLS],
        [15, BonusTypes.GOLD_HEROSKILLS], [2, BonusTypes.CRIT_CHANCE], [15000, BonusTypes.INDIVIDUAL_HERO_DAMAGE]],
    2: [[5, BonusTypes.TAP_DAMAGE_HEROSKILLS], [5, BonusTypes.TAP_DAMAGE_HEROSKILLS], [0.4, BonusTypes.TAP_DAMAGE_DPS], [10, BonusTypes.ALL_DAMAGE_HEROSKILLS],
        [15, BonusTypes.GOLD_HEROSKILLS], [2, BonusTypes.CRIT_CHANCE], [15000, BonusTypes.INDIVIDUAL_HERO_DAMAGE]]}),
  new Hero("Eistor the Banisher", 26, {1: 2.36e36, 2: 2.81e36}, {
    1: [[350, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [650, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [0.4, BonusTypes.TAP_DAMAGE_DPS], [5, BonusTypes.BOSS_DAMAGE],
        [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [5, BonusTypes.BOSS_DAMAGE], [12, BonusTypes.GOLD_HEROSKILLS]],
    2: [[350, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [999, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [0.4, BonusTypes.TAP_DAMAGE_DPS], [5, BonusTypes.BOSS_DAMAGE],
        [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [5, BonusTypes.BOSS_DAMAGE], [12, BonusTypes.GOLD_HEROSKILLS]]}),
  new Hero("Flavius and Oinksbjorn", 27, {1: 25.90e45, 2: 36.69e45}, {
    1: [[300, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [700, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [5, BonusTypes.BOSS_DAMAGE],
        [2, BonusTypes.CRIT_CHANCE], [30, BonusTypes.CRIT_DAMAGE_HEROSKILLS], [20, BonusTypes.CHEST_HEROSKILLS]],
    2: [[300, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [1500, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [5, BonusTypes.BOSS_DAMAGE],
        [2, BonusTypes.CRIT_CHANCE], [30, BonusTypes.CRIT_DAMAGE_HEROSKILLS], [20, BonusTypes.CHEST_HEROSKILLS]]}),
  new Hero("Chester the Beast Tamer", 28, {1: 2850e60, 2: 44.09e60}, {
    1: [[350, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [1, BonusTypes.ALL_DAMAGE_HEROSKILLS], [400, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [600, BonusTypes.INDIVIDUAL_HERO_DAMAGE],
        [20, BonusTypes.CRIT_DAMAGE_HEROSKILLS], [2, BonusTypes.CRIT_CHANCE], [15, BonusTypes.ALL_DAMAGE_HEROSKILLS]],
    2: [[350, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [1, BonusTypes.ALL_DAMAGE_HEROSKILLS], [1500, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [3200, BonusTypes.INDIVIDUAL_HERO_DAMAGE],
        [20, BonusTypes.CRIT_DAMAGE_HEROSKILLS], [2, BonusTypes.CRIT_CHANCE], [15, BonusTypes.ALL_DAMAGE_HEROSKILLS]]}),
  new Hero("Mohacas the Wind Warrior", 29, {1: 3.14e81, 2: 4.84e81}, {
    1: [[330, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [550, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [10, BonusTypes.GOLD_HEROSKILLS], [10, BonusTypes.TAP_DAMAGE_HEROSKILLS],
        [20, BonusTypes.GOLD_HEROSKILLS], [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [30, BonusTypes.GOLD_HEROSKILLS]],
    2: [[330, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [600, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [10, BonusTypes.GOLD_HEROSKILLS], [10, BonusTypes.TAP_DAMAGE_HEROSKILLS],
        [20, BonusTypes.GOLD_HEROSKILLS], [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [30, BonusTypes.GOLD_HEROSKILLS]]}),
  new Hero("Jaqulin the Unknown", 30, {1: 3.14e96, 2: 5.83e106}, {
    1: [[1000, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [10, BonusTypes.TAP_DAMAGE_HEROSKILLS], [4, BonusTypes.TAP_DAMAGE_DPS], [20, BonusTypes.GOLD_HEROSKILLS],
        [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [20, BonusTypes.ALL_DAMAGE_HEROSKILLS], [30, BonusTypes.ALL_DAMAGE_HEROSKILLS]],
    2: [[1000, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [10, BonusTypes.TAP_DAMAGE_HEROSKILLS], [4, BonusTypes.TAP_DAMAGE_DPS], [20, BonusTypes.GOLD_HEROSKILLS],
        [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [20, BonusTypes.ALL_DAMAGE_HEROSKILLS], [30, BonusTypes.ALL_DAMAGE_HEROSKILLS]]}),
  new Hero("Pixie the Rebel Fairy", 31, {1: 3.76e116, 2: 7.43e136}, {
    1: [[900, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [2000, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [1, BonusTypes.CRIT_CHANCE], [60, BonusTypes.TAP_DAMAGE_HEROSKILLS],
        [25, BonusTypes.CHEST_HEROSKILLS], [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [15, BonusTypes.GOLD_HEROSKILLS]],
    2: [[900, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [5000, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [1, BonusTypes.CRIT_CHANCE], [60, BonusTypes.TAP_DAMAGE_HEROSKILLS],
        [25, BonusTypes.CHEST_HEROSKILLS], [10, BonusTypes.ALL_DAMAGE_HEROSKILLS], [15, BonusTypes.GOLD_HEROSKILLS]]}),
  new Hero("Jackalope the Fireballer", 32, {1: 4.14e136, 2: 9.07e176}, {
    1: [[40, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [20, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [25, BonusTypes.GOLD_HEROSKILLS], [60, BonusTypes.TAP_DAMAGE_HEROSKILLS],
        [2, BonusTypes.CRIT_CHANCE], [30, BonusTypes.ALL_DAMAGE_HEROSKILLS], [10, BonusTypes.BOSS_DAMAGE]],
    2: [[990, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [2000, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [25, BonusTypes.GOLD_HEROSKILLS], [60, BonusTypes.TAP_DAMAGE_HEROSKILLS],
        [2, BonusTypes.CRIT_CHANCE], [30, BonusTypes.ALL_DAMAGE_HEROSKILLS], [10, BonusTypes.BOSS_DAMAGE]]}),
  new Hero("Dark Lord, Punisher of All", 33, {1: 4.56e156, 2: 9.99e226}, {
    1: [[2000, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [20, BonusTypes.TAP_DAMAGE_HEROSKILLS], [1, BonusTypes.TAP_DAMAGE_DPS], [25, BonusTypes.GOLD_HEROSKILLS],
        [20, BonusTypes.ALL_DAMAGE_HEROSKILLS], [30, BonusTypes.ALL_DAMAGE_HEROSKILLS], [40, BonusTypes.ALL_DAMAGE_HEROSKILLS]],
    2: [[2500, BonusTypes.INDIVIDUAL_HERO_DAMAGE], [20, BonusTypes.TAP_DAMAGE_HEROSKILLS], [1, BonusTypes.TAP_DAMAGE_DPS], [25, BonusTypes.GOLD_HEROSKILLS],
        [20, BonusTypes.ALL_DAMAGE_HEROSKILLS], [30, BonusTypes.ALL_DAMAGE_HEROSKILLS], [40, BonusTypes.ALL_DAMAGE_HEROSKILLS]]})];

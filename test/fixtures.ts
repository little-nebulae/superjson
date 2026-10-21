import type { JSONType } from "zod";

export const sc2Match = {
  // string
  mapName: "Ever Dream LE",
  // number (int, float, negative, and exponent forms all round-trip)
  gameLoop: 22400,
  gameSpeedMultiplier: 1.4,
  mineralDelta: -150,
  tinyValue: 1e-7,
  // boolean
  isRanked: true,
  isPaused: false,
  // null
  winner: null,
  // nested plain object
  players: [
    {
      name: "Serral",
      race: "Zerg",
      mmr: 7200,
      isActive: true,
      resources: {
        minerals: 1850,
        gas: 425,
        supply: { used: 198, cap: 200 },
      },
      // array of strings
      upgrades: [
        "Zergling Metabolic Boost",
        "Adrenal Glands",
        "+3 Melee Attacks",
      ],
      // array of numbers
      controlGroups: [1, 2, 3, 4, 5],
      // array of mixed types
      mixedBag: ["Hydralisk", 12, true, null, { tech: "Lurker Den" }],
    },
    {
      name: "Maru",
      race: "Terran",
      mmr: 7150,
      isActive: true,
      resources: { minerals: 920, gas: 0, supply: { used: 200, cap: 200 } },
      upgrades: ["Stimpack", "Combat Shield"],
      controlGroups: [],
      mixedBag: [],
    },
  ],
  // empty object and nested arrays
  replayMetadata: {},
  buildOrderTimings: [
    [12, "Pool"],
    [17, "Hatchery"],
    [18, "Gas"],
  ],
} satisfies JSONType;

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

export const sc2Replay = {
  // undefined (dropped from objects, becomes null in arrays)
  opponentClanTag: undefined,
  // bigint (JSON.stringify throws a TypeError on these)
  replayId: 9007199254740993n, // beyond Number.MAX_SAFE_INTEGER
  totalResourcesMined: 123456789012345678901234567890n,
  // Date (serializes to an ISO string via toJSON)
  matchStart: new Date("2026-10-21T14:30:00.000Z"),
  // RegExp (serializes to {})
  chatCommandPattern: /^\/(allies|all|observers)\s+(.+)$/i,
  // Set (serializes to {})
  unlockedAchievements: new Set([
    "Zerg Rush",
    "Nuclear Launch Detected",
    "Perfect Wall-off",
  ]),
  // Map (serializes to {})
  supplyByPlayer: new Map<string, number>([
    ["Serral", 198],
    ["Maru", 200],
  ]),
  // Error (serializes to {}; message and stack are non-enumerable)
  crashReason: new Error("Not enough minerals"),
  // URL (serializes to its href string via toJSON)
  replayDownloadUrl: new URL(
    "https://sc2replaystats.example/replay/9007199254740993?player=Serral",
  ),

  // Same types in nested positions
  players: [
    {
      name: "Serral",
      race: "Zerg",
      // undefined inside an array becomes null
      lastBuildingPlaced: [undefined, "Spire", undefined],
      apmHistory: new Map<number, bigint>([
        [0, 0n],
        [60, 310n],
      ]),
      joinedAt: new Date("2026-10-21T14:29:12.345Z"),
      supplyBlockedErrors: [new Error("Must build additional pylons")],
    },
  ],
};

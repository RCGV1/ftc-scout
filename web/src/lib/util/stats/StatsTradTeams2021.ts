import {
    Tep2021FieldName,
    Tep2021Group,
    type FullStatsGroup2021TradFragment,
} from "../../graphql/generated/graphql-operations";
import { makeStat, type Stat } from "./Stat";
import { StatColor } from "./stat-color";
import { StatDisplayType } from "./stat-display-type";
import { groupGetter, type StatSet, type StatSetGroup } from "./StatSet";
import {
    AUTO_BONUS_INDIVIDUAL_STAT,
    AUTO_BONUS_STAT,
    AUTO_CAROUSEL_STAT,
    AUTO_FREIGHT1_STAT,
    AUTO_FREIGHT2_STAT,
    AUTO_FREIGHT3_STAT,
    AUTO_FREIGHT_STAT,
    AUTO_FREIGHT_STORAGE_STAT,
    AUTO_NAV_INDIVIDUAL_STAT,
    AUTO_NAV_STAT,
    AUTO_STAT,
    DC_ALLIANCE1_STAT,
    DC_ALLIANCE2_STAT,
    DC_ALLIANCE3_STAT,
    DC_ALLIANCE_STAT,
    DC_STAT,
    DC_STORAGE_STAT,
    ENDGAME_BALANCED_STAT,
    ENDGAME_CAPPING_STAT,
    ENDGAME_DELIVERY_STAT,
    ENDGAME_PARKING_INDIVIDUAL_STAT,
    ENDGAME_PARKING_STAT,
    ENDGAME_STAT,
    PENALTIES_MAJOR_STAT,
    PENALTIES_MINOR_STAT,
    PENALTIES_STAT,
    PLAYED_STAT,
    EVENT_RANK_STAT,
    RP_STAT,
    TBP2_STAT,
    TBP_STAT,
    TEAM_STAT,
    TOTAL_NP_STAT,
    TOTAL_STAT,
} from "./StatsSharedTeams2021";

export type FullTep2021Traditional = {
    team: {
        number: number;
        name: string;
    };
    stats: {
        __typename?: "TeamEventStats2021Traditional";
        rank: number;
        rp: number;
        tb1: number;
        tb2: number;
        wins: number;
        losses: number;
        ties: number;
        dqs: number;
        qualMatchesPlayed: number;
        total: FullStatsGroup2021TradFragment;
        average: FullStatsGroup2021TradFragment;
        opr: FullStatsGroup2021TradFragment;
        min: FullStatsGroup2021TradFragment;
        max: FullStatsGroup2021TradFragment;
        standardDev: FullStatsGroup2021TradFragment;
    };
};

export const WINS_STAT: Stat<FullTep2021Traditional> = {
    color: StatColor.GREEN,
    displayType: StatDisplayType.INTEGER,
    listName: "Wins",
    columnName: "Wins",
    identifierName: "Wins",
    read: (s) => s.data.stats.wins,
    apiField: { fieldName: Tep2021FieldName.Wins },
};

export const lOSSES_STAT: Stat<FullTep2021Traditional> = {
    color: StatColor.GREEN,
    displayType: StatDisplayType.INTEGER,
    listName: "Losses",
    columnName: "Losses",
    identifierName: "Losses",
    read: (s) => s.data.stats.losses,
    apiField: { fieldName: Tep2021FieldName.Losses },
};

export const TIES_STAT: Stat<FullTep2021Traditional> = {
    color: StatColor.GREEN,
    displayType: StatDisplayType.INTEGER,
    listName: "Ties",
    columnName: "Ties",
    identifierName: "Ties",
    read: (s) => s.data.stats.ties,
    apiField: { fieldName: Tep2021FieldName.Ties },
};

export const RECORD_STAT: Stat<FullTep2021Traditional> = {
    color: StatColor.GREEN,
    displayType: StatDisplayType.RECORD,
    listName: "Record",
    columnName: "Record",
    identifierName: "Event Record",
    read: (s) => ({ wins: s.data.stats.wins, losses: s.data.stats.losses, ties: s.data.stats.ties }),
    apiField: { fieldName: Tep2021FieldName.Wins },
};

export const DQ_STAT: Stat<FullTep2021Traditional> = {
    color: StatColor.GREEN,
    displayType: StatDisplayType.INTEGER,
    listName: "Disqualifications (DQs)",
    columnName: "DQs",
    identifierName: "Disqualifications (DQs)",
    read: (s) => s.data.stats.dqs,
    apiField: { fieldName: Tep2021FieldName.Dq },
};

type Group = FullTep2021Traditional["stats"]["total"];

// ------------------------------------------------------------------------------------------------------------------------

const DC_SHARED_STAT: Stat<Group> = makeStat(
    "driverControlledSharedHubPoints",
    "Shared Hub Points",
    "Shared",
    "Driver Controlled Shared Hub Points",
    Tep2021FieldName.DriverControlledSharedHubPoints
);

// ------------------------------------------------------------------------------------------------------------------------

export const ENDGAME_TIPPED_STAT: Stat<Group> = makeStat(
    "sharedUnbalancedPoints",
    "Shared Tipped Points",
    "Shared Tipped ",
    "Endgame Shared Hub Tipped Points",
    Tep2021FieldName.SharedUnbalancedPoints
);

// ------------------------------------------------------------------------------------------------------------------------

export let STAT_SET_TEAMS_2021_TRAD: StatSet<FullTep2021Traditional, Group> = [
    {
        name: "Team's Event Performance",
        type: "standalone",
        set: {
            standalone: [
                TEAM_STAT,
                EVENT_RANK_STAT,
                RP_STAT,
                TBP_STAT,
                TBP2_STAT,
                PLAYED_STAT,
                WINS_STAT,
                lOSSES_STAT,
                TIES_STAT,
                RECORD_STAT,
                DQ_STAT,
            ],
        },
    },
    {
        name: "Match Scores",
        type: "group",
        set: {
            groups: [
                {
                    longName: "Total",
                    shortName: "TOT",
                    description: "The sum of all points scored in the category.",
                    color: StatColor.RED,
                    get: (s) =>
                        groupGetter(
                            (t) => ({ ...t, data: t.data.stats.total }),
                            s,
                            StatColor.RED,
                            "TOT",
                            "Total",
                            "Total",
                            Tep2021Group.Total
                        ),
                },
                {
                    longName: "Average",
                    shortName: "AVG",
                    description: "The average number of points scored in the category.",
                    color: StatColor.PURPLE,
                    get: (s) =>
                        groupGetter(
                            (t) => ({ ...t, data: t.data.stats.average }),
                            s,
                            StatColor.PURPLE,
                            "AVG",
                            "Average",
                            "Average",

                            Tep2021Group.Avg,
                            StatDisplayType.DECIMAL
                        ),
                },
                {
                    longName: "OPR",
                    shortName: "OPR",
                    description: "Offensive Power Rating.",
                    color: StatColor.PURPLE,
                    get: (s) =>
                        groupGetter(
                            (t) => ({ ...t, data: t.data.stats.opr }),
                            s,
                            StatColor.PURPLE,
                            "OPR",
                            "OPR",
                            "OPR",
                            Tep2021Group.Opr,
                            StatDisplayType.DECIMAL
                        ),
                },
                {
                    longName: "Minimum",
                    shortName: "MIN",
                    description: "The lowest number of points scored in the category.",
                    color: StatColor.LIGHT_BLUE,
                    get: (s) =>
                        groupGetter(
                            (t) => ({ ...t, data: t.data.stats.min }),
                            s,
                            StatColor.LIGHT_BLUE,
                            "MIN",
                            "Minimum",
                            "Minimum",
                            Tep2021Group.Min
                        ),
                },
                {
                    longName: "Maximum",
                    shortName: "MAX",
                    description: "The highest number of points scored in the category.",
                    color: StatColor.BLUE,
                    get: (s) =>
                        groupGetter(
                            (t) => ({ ...t, data: t.data.stats.max }),
                            s,
                            StatColor.BLUE,
                            "MAX",
                            "Maximum",
                            "Maximum",
                            Tep2021Group.Max
                        ),
                },
                {
                    longName: "Std. Dev.",
                    shortName: "DEV",
                    description: "The standard deviation of scores in the category.",
                    color: StatColor.GREEN,
                    get: (s) =>
                        groupGetter(
                            (t) => ({ ...t, data: t.data.stats.standardDev }),
                            s,
                            StatColor.GREEN,
                            "DEV",
                            "Std. Dev.",
                            "Standard Deviation",
                            Tep2021Group.Dev,
                            StatDisplayType.DECIMAL
                        ),
                },
            ],
            groupStats: [
                {
                    stat: TOTAL_STAT,
                    nestedStats: [],
                },
                {
                    stat: TOTAL_NP_STAT,
                    nestedStats: [],
                },
                {
                    stat: AUTO_STAT,
                    nestedStats: [
                        {
                            stat: AUTO_FREIGHT_STAT,
                            nestedStats: [
                                {
                                    stat: AUTO_FREIGHT1_STAT,
                                    nestedStats: [],
                                },
                                {
                                    stat: AUTO_FREIGHT2_STAT,
                                    nestedStats: [],
                                },
                                {
                                    stat: AUTO_FREIGHT3_STAT,
                                    nestedStats: [],
                                },
                                {
                                    stat: AUTO_FREIGHT_STORAGE_STAT,
                                    nestedStats: [],
                                },
                            ],
                        },
                        {
                            stat: AUTO_CAROUSEL_STAT,
                            nestedStats: [],
                        },
                        {
                            stat: AUTO_NAV_STAT,
                            nestedStats: [
                                {
                                    stat: AUTO_NAV_INDIVIDUAL_STAT,
                                    nestedStats: [],
                                },
                            ],
                        },
                        {
                            stat: AUTO_BONUS_STAT,
                            nestedStats: [
                                {
                                    stat: AUTO_BONUS_INDIVIDUAL_STAT,
                                    nestedStats: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    stat: DC_STAT,
                    nestedStats: [
                        {
                            stat: DC_ALLIANCE_STAT,
                            nestedStats: [
                                {
                                    stat: DC_ALLIANCE1_STAT,
                                    nestedStats: [],
                                },
                                {
                                    stat: DC_ALLIANCE2_STAT,
                                    nestedStats: [],
                                },
                                {
                                    stat: DC_ALLIANCE3_STAT,
                                    nestedStats: [],
                                },
                            ],
                        },
                        {
                            stat: DC_SHARED_STAT,
                            nestedStats: [],
                        },
                        {
                            stat: DC_STORAGE_STAT,
                            nestedStats: [],
                        },
                    ],
                },
                {
                    stat: ENDGAME_STAT,
                    nestedStats: [
                        {
                            stat: ENDGAME_DELIVERY_STAT,
                            nestedStats: [],
                        },
                        {
                            stat: ENDGAME_CAPPING_STAT,
                            nestedStats: [],
                        },
                        {
                            stat: ENDGAME_TIPPED_STAT,
                            nestedStats: [],
                        },
                        {
                            stat: ENDGAME_BALANCED_STAT,
                            nestedStats: [],
                        },
                        {
                            stat: ENDGAME_PARKING_STAT,
                            nestedStats: [
                                {
                                    stat: ENDGAME_PARKING_INDIVIDUAL_STAT,
                                    nestedStats: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    stat: PENALTIES_STAT,
                    nestedStats: [
                        {
                            stat: PENALTIES_MAJOR_STAT,
                            nestedStats: [],
                        },
                        {
                            stat: PENALTIES_MINOR_STAT,
                            nestedStats: [],
                        },
                    ],
                },
            ],
        },
    },
];

const SCORES = STAT_SET_TEAMS_2021_TRAD.find((s) => s.name == "Match Scores")!.set as StatSetGroup<
    FullTep2021Traditional,
    Group
>;
const AVG = SCORES.groups.find((g) => g.shortName == "AVG")!;
const MAX = SCORES.groups.find((g) => g.shortName == "MAX")!;
const OPR = SCORES.groups.find((g) => g.shortName == "OPR")!;

export const AVERAGE_STAT = AVG.get(TOTAL_STAT);
export const MAX_STAT = MAX.get(TOTAL_STAT);
export const OPR_STAT = OPR.get(TOTAL_STAT);
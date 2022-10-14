import { Field, Int, ObjectType } from "type-graphql";
import { MatchScores2020 } from "../../db/entities/MatchScores2020";
import { WobbleEndPositions } from "../../db/entities/types/2020/WobbleEndPositions";
import { Season } from "../../ftc-api/types/Season";

@ObjectType("MatchScores2020Remote", { simpleResolvers: true })
export class MatchScores2020RemoteGraphql {
    constructor(dbScore: MatchScores2020) {
        this.season = dbScore.season;
        this.eventCode = dbScore.eventCode;
        this.matchId = dbScore.matchId;

        this.autoWobble1 = dbScore.autoWobble1;
        this.autoWobble2 = dbScore.autoWobble2;
        this.autoNavigated = dbScore.autoNavigated;
        this.autoPowershots = dbScore.autoPowershots;
        this.autoGoalLow = dbScore.autoGoalLow;
        this.autoGoalMid = dbScore.autoGoalMid;
        this.autoGoalHigh = dbScore.autoGoalHigh;
        this.driverControlledLow = dbScore.driverControlledLow;
        this.driverControlledMid = dbScore.driverControlledMid;
        this.driverControlledHigh = dbScore.driverControlledHigh;
        this.wobbleEndPositions1 = dbScore.wobbleEndPositions1;
        this.wobbleEndPositions2 = dbScore.wobbleEndPositions2;
        this.endgameRingsOnWobble = dbScore.endgameRingsOnWobble;
        this.endgamePowershots = dbScore.endgamePowershots;
        this.minorPenalties = dbScore.minorPenalties;
        this.majorPenalties = dbScore.majorPenalties;
        this.autoNavigationPoints = dbScore.autoNavigationPoints;
        this.autoGoalPoints = dbScore.autoGoalPoints;
        this.autoWobblePoints = dbScore.autoWobblePoints;
        this.autoPowershotPoints = dbScore.autoPowershotPoints;
        this.endgameWobblePoints = dbScore.endgameWobblePoints;
        this.endgamePowershotPoints = dbScore.endgamePowershotPoints;
        this.endgameWobbleRingPoints = dbScore.endgameWobbleRingPoints;
        this.autoPoints = dbScore.autoPoints;
        this.driverControlledPoints = dbScore.driverControlledPoints;
        this.endgamePoints = dbScore.endgamePoints;
        this.penaltyPoints = dbScore.penaltyPoints;
        this.totalPoints = dbScore.totalPoints;
        this.totalPointsNp = dbScore.totalPointsNp;
    }

    @Field(() => Int)
    season: Season;

    @Field()
    eventCode: string;

    @Field(() => Int)
    matchId: number;

    @Field()
    autoWobble1: boolean;

    @Field()
    autoWobble2: boolean;

    @Field()
    autoNavigated: boolean;

    @Field(() => Int)
    autoPowershots: number;

    @Field(() => Int)
    autoGoalLow: number;

    @Field(() => Int)
    autoGoalMid: number;

    @Field(() => Int)
    autoGoalHigh: number;

    @Field(() => Int)
    driverControlledLow: number;

    @Field(() => Int)
    driverControlledMid: number;

    @Field(() => Int)
    driverControlledHigh: number;

    @Field(() => WobbleEndPositions)
    wobbleEndPositions1: WobbleEndPositions;

    @Field(() => WobbleEndPositions)
    wobbleEndPositions2: WobbleEndPositions;

    @Field(() => Int)
    endgameRingsOnWobble: number;

    @Field(() => Int)
    endgamePowershots: number;

    @Field(() => Int)
    minorPenalties: number;

    @Field(() => Int)
    majorPenalties: number;

    @Field(() => Int)
    autoNavigationPoints: number;

    @Field(() => Int)
    autoGoalPoints: number;

    @Field(() => Int)
    autoWobblePoints: number;

    @Field(() => Int)
    autoPowershotPoints: number;

    @Field(() => Int)
    endgameWobblePoints: number;

    @Field(() => Int)
    endgamePowershotPoints: number;

    @Field(() => Int)
    endgameWobbleRingPoints: number;

    @Field(() => Int)
    autoPoints: number;

    @Field(() => Int)
    driverControlledPoints: number;

    @Field(() => Int)
    endgamePoints: number;

    @Field(() => Int)
    penaltyPoints: number;

    @Field(() => Int)
    totalPoints: number;

    @Field(() => Int)
    totalPointsNp: number;
}
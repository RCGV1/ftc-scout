import { FieldResolver, Resolver, Root } from "type-graphql";
import { Loader } from "type-graphql-dataloader";
import { MatchScores2020TradAllianceGraphql } from "../../objects/MatchScores2020TradGraphql";
import { Event } from "../../../db/entities/Event";
import DataLoader from "dataloader";
import { MatchScores2020RemoteGraphql } from "../../objects/MatchScores2020RemoteGraphql";
import { TeamMatchParticipation } from "../../../db/entities/TeamMatchParticipation";
import { stationMatchesAlliance } from "../../../db/entities/types/Station";
import { Alliance, otherAlliance } from "../../../db/entities/types/Alliance";
import { MatchScores2020 } from "../../../db/entities/MatchScores2020";
import { Match } from "../../../db/entities/Match";

@Resolver(MatchScores2020TradAllianceGraphql)
export class Scores2020TradResolver {
    @FieldResolver(() => Event)
    @Loader<{ season: number; code: string }, Event>(async (ids, _) => {
        let events = await Event.find({
            where: ids as { season: number; code: string }[],
        });

        return ids.map((id) => events.find((t) => t.season == id.season && t.code == id.code)!);
    })
    event(@Root() score: MatchScores2020TradAllianceGraphql) {
        return async (dl: DataLoader<{ season: number; code: string }, Event>) => {
            return dl.load({
                season: score.season,
                code: score.eventCode,
            });
        };
    }

    @FieldResolver(() => Match)
    @Loader<{ eventSeason: number; eventCode: string; id: number }, Match>(async (ids, _) => {
        let matches = await Match.find({
            where: ids as { eventSeason: number; eventCode: string; id: number }[],
        });

        return ids.map(
            (id) =>
                matches.find((t) => t.eventSeason == id.eventSeason && t.eventCode == id.eventCode && t.id == id.id)!
        );
    })
    match(@Root() score: MatchScores2020TradAllianceGraphql) {
        return async (dl: DataLoader<{ eventSeason: number; eventCode: string; id: number }, Event>) => {
            return dl.load({
                eventSeason: score.season,
                eventCode: score.eventCode,
                id: score.matchId,
            });
        };
    }

    @FieldResolver(() => [TeamMatchParticipation])
    @Loader<{ season: number; eventCode: string; matchId: number }, TeamMatchParticipation[]>(async (ids, _) => {
        let teams = await TeamMatchParticipation.find({
            where: ids as { season: number; eventCode: string; matchId: number }[],
        });

        return ids.map((id) =>
            teams.filter((t) => t.season == id.season && t.eventCode == id.eventCode && t.matchId == id.matchId)
        );
    })
    teams(@Root() score: MatchScores2020TradAllianceGraphql) {
        return async (
            dl: DataLoader<{ season: number; eventCode: string; matchId: number }, TeamMatchParticipation[]>
        ) => {
            let all = await dl.load({
                season: score.season,
                eventCode: score.eventCode,
                matchId: score.matchId,
            });
            return all.filter((t) => stationMatchesAlliance(score.alliance, t.station));
        };
    }

    @FieldResolver(() => MatchScores2020TradAllianceGraphql)
    @Loader<{ season: number; eventCode: string; matchId: number; alliance: Alliance }, MatchScores2020>(
        async (ids, _) => {
            let mappedIds = ids.map((id) => ({
                ...id,
                alliance: otherAlliance(id.alliance),
            }));

            let teams = await MatchScores2020.find({
                where: mappedIds,
            });

            return ids.map(
                (id) =>
                    teams.find(
                        (t) =>
                            t.season == id.season &&
                            t.eventCode == id.eventCode &&
                            t.matchId == id.matchId &&
                            t.alliance != id.alliance
                    )!
            );
        }
    )
    opponentsScore(@Root() score: MatchScores2020TradAllianceGraphql) {
        return async (
            dl: DataLoader<{ season: number; eventCode: string; matchId: number; alliance: Alliance }, MatchScores2020>
        ) => {
            let oppScore = await dl.load({
                season: score.season,
                eventCode: score.eventCode,
                matchId: score.matchId,
                alliance: score.alliance,
            });
            return new MatchScores2020TradAllianceGraphql(oppScore);
        };
    }
}

@Resolver(MatchScores2020RemoteGraphql)
export class Scores2020RemoteResolver {
    @FieldResolver(() => Event)
    @Loader<{ season: number; code: string }, Event>(async (ids, _) => {
        let events = await Event.find({
            where: ids as { season: number; code: string }[],
        });

        return ids.map((id) => events.find((t) => t.season == id.season && t.code == id.code)!);
    })
    event(@Root() score: MatchScores2020RemoteGraphql) {
        return async (dl: DataLoader<{ season: number; code: string }, Event>) => {
            return dl.load({
                season: score.season,
                code: score.eventCode,
            });
        };
    }

    @FieldResolver(() => Match)
    @Loader<{ eventSeason: number; eventCode: string; id: number }, Match>(async (ids, _) => {
        let matches = await Match.find({
            where: ids as { eventSeason: number; eventCode: string; id: number }[],
        });

        return ids.map(
            (id) =>
                matches.find((t) => t.eventSeason == id.eventSeason && t.eventCode == id.eventCode && t.id == id.id)!
        );
    })
    match(@Root() score: MatchScores2020RemoteGraphql) {
        return async (dl: DataLoader<{ eventSeason: number; eventCode: string; id: number }, Event>) => {
            return dl.load({
                eventSeason: score.season,
                eventCode: score.eventCode,
                id: score.matchId,
            });
        };
    }

    @FieldResolver(() => TeamMatchParticipation)
    @Loader<{ season: number; eventCode: string; matchId: number }, TeamMatchParticipation>(async (ids, _) => {
        let teams = await TeamMatchParticipation.find({
            where: ids as { season: number; eventCode: string; matchId: number }[],
        });

        return ids.map(
            (id) => teams.find((t) => t.season == id.season && t.eventCode == id.eventCode && t.matchId == id.matchId)!
        );
    })
    team(@Root() score: MatchScores2020RemoteGraphql) {
        return async (
            dl: DataLoader<{ season: number; eventCode: string; matchId: number }, TeamMatchParticipation>
        ) => {
            return dl.load({
                season: score.season,
                eventCode: score.eventCode,
                matchId: score.matchId,
            });
        };
    }
}
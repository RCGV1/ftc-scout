import { GraphQLOutputType } from "graphql";
import { Season } from "../Season";
import { type ColumnType } from "typeorm";

export type AnyObject = { [key: string]: any };

export type DescriptorType = {
    typeorm: {
        type: ColumnType;
        enum?: Object | any[];
    };
    gql: GraphQLOutputType;
};

export type Descriptor = GenDescriptor<AnyObject, AnyObject, string>;
export function inferDescriptor<
    TradApi extends AnyObject,
    RemoteApi extends AnyObject,
    Names extends string
>(d: GenDescriptor<TradApi, RemoteApi, Names>): Descriptor {
    return d;
}
export type GenDescriptor<TradApi, RemoteApi, Names extends string> = {
    season: Season;
    hasRemote: boolean;
    penaltiesSubtract: boolean;
    rankings: {
        rp: "TotalPoints" | "Record";
        tb: "AutoEndgameTot" | "AutoEndgameAvg" | "LosingScore";
    };
    columns: {
        name: Names;
        type: DescriptorType;
        tradOnly?: boolean;
        ms?: MsDbDescriptor<TradApi, RemoteApi, Names> & MsApiDescriptor<Names>;
        tep?: TepDbDescriptor<Names>;
    }[];
};

type MsDbDescriptor<TradApi, RemoteApi, Names extends string> =
    | {
          fromTradApi(ours: TradApi, opp: TradApi): any;
          fromRemoteApi?(ours: RemoteApi): any;
      }
    | {
          fromSelf(self: Record<Names, any>): any;
      };

type MsApiDescriptor<Names extends string> = {
    outer?: boolean;
    mapForApi?(red: Record<Names, any>, blue: Record<Names, any>): any;
};

type TepDbDescriptor<Names extends string> = {
    individual?: {
        first(self: Record<Names, any>): any;
        second(self: Record<Names, any>): any;
    };
    fromSelf?(self: Record<Names, any>): any;
};

export function desGqlName(col: Descriptor["columns"][number], remote: boolean): string {
    if (remote && col.name.endsWith("1")) {
        return col.name.replace(/1$/, "");
    } else {
        return col.name;
    }
}
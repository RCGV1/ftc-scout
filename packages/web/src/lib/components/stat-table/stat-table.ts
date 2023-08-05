export const StatType = {
    Int: "int",
    Float: "float",
    Team: "team",
    Rank: "rank",
    Record: "record",
} as const;
export type StatType = (typeof StatType)[keyof typeof StatType];
export type StatValue =
    | { ty: "int"; val: number }
    | { ty: "float"; val: number }
    | { ty: "rank"; val: number }
    | { ty: "team"; number: number; name: string }
    | { ty: "record"; wins: number; losses: number; ties: number };

export const Color = {
    White: "white",
    Purple: "purple",
    Green: "green",
} as const;
export type Color = (typeof Color)[keyof typeof Color];

export class StatColumn<T> {
    id: string;
    columnName: string;
    dialogName: string;
    titleName: string;

    color: Color;

    ty: StatType;
    getValue: (_: StatData<T>) => StatValue | null;
    getValueDistilled(d: StatData<T>) {
        return StatColumn.distill(this.getValue(d));
    }

    static distill(val: StatValue | null): number | string | null {
        if (val == null) return null;
        if (val.ty == "int" || val.ty == "float" || val.ty == "rank") {
            return val.val;
        } else if (val.ty == "team") {
            return val.number;
        } else {
            let num = val.wins + val.ties / 2;
            let denom = val.wins + val.losses + val.ties;
            return num / denom;
        }
    }

    constructor(opts: {
        id: string;
        columnName: string;
        dialogName: string;
        titleName: string;

        color: Color;

        ty: StatType;
        getValue: (_: StatData<T>) => StatValue | null;
    }) {
        this.id = opts.id;
        this.columnName = opts.columnName;
        this.dialogName = opts.dialogName;
        this.titleName = opts.titleName;
        this.color = opts.color;
        this.ty = opts.ty;
        this.getValue = opts.getValue;
    }

    shouldExpand(): boolean {
        return this.ty == StatType.Team;
    }
}

export class NonRankStatColumn<T> extends StatColumn<T> {
    getNonRankValue: (_: T) => StatValue | null;
    getNonRankValueDistilled(d: T) {
        return StatColumn.distill(this.getNonRankValue(d));
    }

    constructor(opts: {
        id: string;
        columnName: string;
        dialogName: string;
        titleName: string;

        color: Color;

        ty: StatType;
        getNonRankValue: (_: T) => StatValue | null;
    }) {
        super({ ...opts, getValue: (d) => opts.getNonRankValue(d.data) });
        this.getNonRankValue = opts.getNonRankValue;
    }
}

export type StatData<T> = {
    noFilterRank: number;
    filterRank: number;
    noFilterSkipRank: number;
    filterSkipRank: number;
    data: T;
};

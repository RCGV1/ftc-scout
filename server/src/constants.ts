import { Season } from "./ftc-api/types/Season";

export const SECOND_MS = 1000;
export const MINUTE_MS = SECOND_MS * 60;
export const HOUR_MS = MINUTE_MS * 60;
export const DAY_MS = HOUR_MS * 24;
export const YEAR_MS = DAY_MS * 365;

export const IS_PROD = process.env.NODE_ENV === "production";
export const IS_DEV = !IS_PROD;

export const SERVER_PORT = +process.env.PORT;

export const LOGGING = process.env.LOGGING == "1";

export const WEB_ORIGIN = process.env.WEB_URL;

export const DATABASE_URL = process.env.DATABASE_URL;

export const FTC_API_KEY = process.env.FTC_API_KEY;

export const CURRENT_SEASON: Season = 2022;
export const PAST_SEASONS: Season[] = [2019, 2020, 2021];
export const ALL_SEASONS: Season[] = [2019, 2020, 2021, 2022];

export const SYNC = process.env.SYNC ? process.env.SYNC === "1" : false;

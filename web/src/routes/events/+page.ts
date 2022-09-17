import { redirect } from "@sveltejs/kit";
import { CURRENT_SEASON } from "../../lib/constants";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    throw redirect(301, `/events/${CURRENT_SEASON}`);
};

import { customCreateClient } from "$lib/graphql/client";
import {
    operationStore,
    type OperationContext,
    type OperationStore,
    type TypedDocumentNode,
} from "@urql/svelte";
import type { Load } from "@sveltejs/kit";
import type { DocumentNode } from "graphql";
import { derived, get, readable } from "svelte/store";

export const graphqlSetupLoad: Load = async function ({ fetch, stuff }) {
    const client = customCreateClient(fetch);

    return {
        stuff: {
            ...stuff,
            client,
            query: async (
                query: string | DocumentNode | TypedDocumentNode<any, any>,
                variables?: any,
                context?: Partial<OperationContext & { pause: boolean }>
            ): Promise<OperationStore> => {
                const store = operationStore(query, variables, context);
                const result = await client
                    .query(store.query, store.variables, store.context)
                    .toPromise();
                Object.assign(get(store), result);
                return store;
            },
        },
        props: { client },
    };
};
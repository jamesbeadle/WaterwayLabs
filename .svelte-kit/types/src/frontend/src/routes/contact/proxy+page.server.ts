// @ts-nocheck
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { Actor, HttpAgent } from "@dfinity/agent";
import {idlFactory} from "../../../../declarations/backend";

const CANISTER_ID = process.env.BACKEND_CANISTER_ID;
if (!CANISTER_ID) {
  throw new Error('CANISTER_ID_BACKEND is not defined in environment variables');
}

export const actions = {
  default: async ({ request }: import('./$types').RequestEvent) => {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      return fail(400, { error: "All fields are required" });
    }

    try {
      console.log('Creating HttpAgent');
      const agent = new HttpAgent({ host: "http://localhost:8080" });
      
      console.log('Fetching root key');
      await agent.fetchRootKey();
      
      console.log('Creating actor');
      const actor = Actor.createActor(idlFactory, { agent, canisterId: CANISTER_ID });

      console.log('Calling submitForm');
      const result = await actor.submitForm({
        name: String(name),
        email: String(email),
        message: String(message)
      });
      console.log("Form submitted to canister:", result);

      return { success: true, message: result };
    } catch (error) {
      console.error('Detailed error:', error);
      if (error instanceof Error) {
        console.error('Stack:', error.stack);
      }
      return fail(500, { error: 'Failed to submit form' });
    }
  },
};
;null as any as Actions;
import { authStore } from "$lib/stores/auth-store";
import { isError, type ErrorResponse } from "$lib/utils/helpers";
import { idlFactory } from "../../../../declarations/backend";
import type {
  FormSubmission,
  SubmitContactFormDTO,
} from "../../../../declarations/backend/backend.did";
import { ActorFactory } from "../../utils/ActorFactory";

export class ContactService {
  private actor: any;

  constructor() {
    this.actor = ActorFactory.createActor(
      idlFactory,
      process.env.BACKEND_CANISTER_ID,
    );
  }

  async submitContactForm(
    dto: SubmitContactFormDTO,
  ): Promise<any | ErrorResponse> {
    return await this.actor.submitForm(dto);
  }

  async getFormSubmissions(): Promise<FormSubmission[]> {
    await authStore.sync();
    const identityActor: any = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result = await identityActor.getFormSubmissions();
    if (isError(result)) throw new Error("Failed to fetch form submissions");
    return result.ok;
  }
}

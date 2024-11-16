import { writable } from "svelte/store";
import type {
  FormSubmission,
  SubmitContactFormDTO,
} from "../../../../declarations/backend/backend.did";
import { ContactService } from "$lib/services/contact-service";
import type { ErrorResponse } from "$lib/utils/helpers";

function createContactStore() {
  async function submitContactForm(
    dto: SubmitContactFormDTO,
  ): Promise<any | ErrorResponse> {
    return new ContactService().submitContactForm(dto);
  }

  async function getFormSubmissions(): Promise<FormSubmission[]> {
    return new ContactService().getFormSubmissions();
  }

  return {
    submitContactForm,
    getFormSubmissions,
  };
}

export const contactStore = createContactStore();

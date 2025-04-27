import { SupportService } from "$lib/services/support-service";
import type { ErrorResponse } from "$lib/utils/helpers";
import type {
  CreateSupportQuery,
  GetSupportQueries,
  SupportQueries,
} from "../../../../declarations/backend/backend.did";

function createSupportStore() {
  async function createSupportQuery(
    dto: CreateSupportQuery,
  ): Promise<any | ErrorResponse> {
    return new SupportService().createSupportQuery(dto);
  }

  async function getSupportQueries(
    dto: GetSupportQueries,
  ): Promise<SupportQueries | undefined> {
    return new SupportService().getSupportQueries(dto);
  }

  return {
    createSupportQuery,
    getSupportQueries,
  };
}

export const supportStore = createSupportStore();

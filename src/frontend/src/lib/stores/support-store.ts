import { SupportService } from "$lib/services/support-service";
import type { ErrorResponse } from "$lib/utils/helpers";
import type {
  AddSupportQueryComment,
  CreateSupportQuery,
  GetArchivedSupportQueries,
  GetSupportQueries,
  GetUserSupportQueries,
  SupportQueries,
} from "../../../../declarations/backend/backend.did";

function createSupportStore() {
  async function getSupportQueries(
    dto: GetSupportQueries,
  ): Promise<SupportQueries | undefined> {
    return new SupportService().getSupportQueries(dto);
  }

  async function getArchivedSupportQueries(
    dto: GetArchivedSupportQueries,
  ): Promise<SupportQueries | undefined> {
    return new SupportService().getArchivedSupportQueries(dto);
  }

  async function getUserSupportQueries(
    dto: GetUserSupportQueries,
  ): Promise<SupportQueries | undefined> {
    return new SupportService().getUserSupportQueries(dto);
  }

  async function getArchivedUserSupportQueries(
    dto: GetArchivedSupportQueries,
  ): Promise<SupportQueries | undefined> {
    return new SupportService().getArchivedUserSupportQueries(dto);
  }

  async function createSupportQuery(
    dto: CreateSupportQuery,
  ): Promise<any | ErrorResponse> {
    return new SupportService().createSupportQuery(dto);
  }

  async function addSupportQueryComment(
    dto: AddSupportQueryComment,
  ): Promise<any | ErrorResponse> {
    return new SupportService().addSupportQueryComment(dto);
  }

  return {
    getSupportQueries,
    getArchivedSupportQueries,
    getUserSupportQueries,
    getArchivedUserSupportQueries,
    createSupportQuery,
    addSupportQueryComment,
  };
}

export const supportStore = createSupportStore();

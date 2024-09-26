import { vi } from "vitest";
import * as api from "./api";

export function mockApi(args: {
  response: Awaited<ReturnType<(typeof api)["apiCall"]>>;
}) {
  return vi.spyOn(api, "apiCall").mockImplementation(() => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(args.response);
      }, 0)
    );
  });
}

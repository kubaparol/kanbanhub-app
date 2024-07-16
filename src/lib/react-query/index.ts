import { QueryClient } from "@tanstack/react-query";

export * from "./mutations";
export * from "./queries";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60,
    },
  },
});

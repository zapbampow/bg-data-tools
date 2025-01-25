import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PropTypes from "prop-types";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5000,
        }
    },
});

import { ReactNode } from "react";

export function ReactQueryProvider({ children }: { children: ReactNode }) {

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

ReactQueryProvider.propTypes = {
    children: PropTypes.node,
};

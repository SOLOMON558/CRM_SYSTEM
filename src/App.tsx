import { QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./routes/AppRouter";
import { queryClient } from "./api/query-client";

function App(): JSX.Element {
  return (
    <>
      <QueryClientProvider client={queryClient}>
      <AppRouter />
      </QueryClientProvider>
    </>
  );
}
export default App;

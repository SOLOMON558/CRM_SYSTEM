import { QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./routes/AppRouter";
import { queryClient } from "./api/query-client";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}
export default App;

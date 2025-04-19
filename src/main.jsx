import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(
  <QueryClientProvider client={queryClient}>
  <Provider store={store}>
    <App />
  </Provider>
  </QueryClientProvider>
);

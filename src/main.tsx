import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import "react-loading-skeleton/dist/skeleton.css";
import "yet-another-react-lightbox/styles.css";

// react query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// context
import ShowFilterContextProvider from "./context/showFilterContextProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ShowFilterContextProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </ShowFilterContextProvider>
);

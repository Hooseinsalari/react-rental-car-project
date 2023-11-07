import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import "react-loading-skeleton/dist/skeleton.css";
import "yet-another-react-lightbox/styles.css";
import "react-widgets/styles.css";

// react query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// context
import ShowFilterContextProvider from "./context/ShowFilterContextProvider.tsx";
import AuthContextProvider from "./context/AuthContextProvider.tsx";
import RentCarContextProvider from "./context/RentCarContextProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RentCarContextProvider>
    <AuthContextProvider>
      <ShowFilterContextProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </ShowFilterContextProvider>
    </AuthContextProvider>
  </RentCarContextProvider>
);

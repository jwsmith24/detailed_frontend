import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "@/App.tsx";
import RosterList from "@/RosterList.tsx";
import RosterView from "@/RosterView.tsx";

const queryClient = new QueryClient();



createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<App/>}/>
              <Route path={"/rosters"} element={<RosterList/>}/>
              <Route path={"/rosters/:id"} element={<RosterView/>}/>
          </Routes>

          <ReactQueryDevtools initialIsOpen={false}/>

      </BrowserRouter>
      </QueryClientProvider>
  </StrictMode>,
)

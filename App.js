import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./src/context/AuthContext";
import { FilterProvider } from "./src/context/FilterContext";
import RootNavigator from "./src/navigation/RootNavigator";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FilterProvider>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </FilterProvider>
    </QueryClientProvider>
  );
};

export default App;

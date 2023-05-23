import { createContext, useContext, useState } from "react";

export type PagesType =
  | "category"
  | "product"
  | "supplier"
  | "shipper"
  | "order-list";

type GlobalContextTypes = {
  endpoint: string | null;
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>
};

const GlobalContext = createContext<GlobalContextTypes | null>(null);

type GlobalContextProviderProps = {
  children: React.ReactNode;
};

function GlobalContextProvider({ children }: GlobalContextProviderProps) {
  const endpoint: string | null = "https://localhost:7168/api";
  const [loader, setLoader] = useState(true);

  return (
    <GlobalContext.Provider value={{ endpoint, loader, setLoader }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};

import { createContext, useContext, useState } from "react";

export type PagesType =
  | "category"
  | "product"
  | "supplier"
  | "shipper"
  | "order-list";

type GlobalContextTypes = {
  endpoint: string;
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>
};

type GlobalContextProviderProps = {
  children: React.ReactNode;
};

const GlobalContext = createContext<GlobalContextTypes | null>(null);

function GlobalContextProvider({ children }: GlobalContextProviderProps) {
  const endpoint: string = "https://localhost:7168/api";
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

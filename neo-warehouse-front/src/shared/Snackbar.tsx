import { createContext, useContext, useState } from "react";

type SnackbarContextType = {
  showSnackbar: (msg: string) => void;
};

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const useSnackbar = () => {
  const ctx = useContext(SnackbarContext);
  if (!ctx) throw new Error("useSnackbar must be used inside <SnackbarProvider>");
  return ctx;
};

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  function showSnackbar(msg: string) {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      {visible && (
        <div className="fixed bottom-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in">
          {message}
        </div>
      )}
    </SnackbarContext.Provider>
  );
}

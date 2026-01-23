import { ThemeProvider } from "next-themes";
import Router from "./routes/Router";
import TanStackQueryProvider from "./providers/TanStackQueryProvider";
import { Toaster } from "sonner";
import AppDialog from "./components/dialogs/AppDialog";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TanStackQueryProvider>
        <Router />
        <Toaster position="top-right" />
        <AppDialog />
      </TanStackQueryProvider>
    </ThemeProvider>
  );
}

export default App;

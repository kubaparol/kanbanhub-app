import { ThemeProvider } from "@/components/providers/Theme";
import { ModeToggle } from "@/components/shared/mode-toggle";

function App() {
  return (
    <>
      <ThemeProvider>
        <ModeToggle />
      </ThemeProvider>
    </>
  );
}

export default App;

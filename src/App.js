import { ThemeTogglerButton } from "./components/toggler-button/toggler-button";
import { ThemeProvider } from "./contexts/toggler";
import { PokeRoutes } from "./pages/routes";









function App() {
  return (
    <div>
      <ThemeProvider>
        <ThemeTogglerButton />
        <PokeRoutes />
      </ThemeProvider>
    </div>
  );
}

export default App;



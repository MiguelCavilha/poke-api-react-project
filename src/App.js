import { ThemeProvider } from "./contexts/toggler";
import { PokeRoutes } from "./pages/routes";










function App() {
  return (
    <div>
      <ThemeProvider>
        <PokeRoutes />
      </ThemeProvider>
    </div>
  );
}

export default App;

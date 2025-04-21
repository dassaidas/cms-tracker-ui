import AppRoutes from "./routes/AppRoutes";
import { useLoading } from "./context/LoadingContext";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const { isLoading } = useLoading();
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <AppRoutes />
    </>
  );
}

export default App;

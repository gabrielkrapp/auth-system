import { BrowserRouter } from "react-router-dom";
import { RouterComponent } from "./router/Routes";

export const BASE_URL = "http://localhost:3000";

function App() {
  return (
    <>
      <BrowserRouter>
        <RouterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;

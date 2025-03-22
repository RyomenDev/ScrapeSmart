import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/store.js";
import { Provider } from "react-redux";
import store from "./store/store.js";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;

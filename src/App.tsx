import { SettingsPage } from "pages/SettingsPage";
import { AllNotesPage } from "./pages/AllNotesPage";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { ThemeProvider } from "context/ThemeContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Outlet />,
      children: [
        {
          path: "/",
          element: <AllNotesPage />,
        },
        {
          path: "/settings",
          element: <SettingsPage />,
        },
      ],
    },
  ]);
  return (
    <>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;

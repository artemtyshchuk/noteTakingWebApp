import { SettingsPage } from "pages/SettingsPage";
import { AllNotesPage, ArchivedPage } from "./pages/NotesPage";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { ThemeProvider } from "context/ThemeContext";
import { ColorThemeWrapper } from "components/ColorTheme/ColorThemeWrapper";
import { NoteEditor } from "components/NoteContent/NoteEditor";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "/",
        element: <AllNotesPage />,
        children: [{ path: "note/:noteId", element: <NoteEditor /> }],
      },
      {
        path: "/archived",
        element: <ArchivedPage />,
        children: [{ path: "note/:noteId", element: <NoteEditor /> }],
      },
      {
        path: "/settings",
        element: <SettingsPage />,
        children: [{ path: "color-theme", element: <ColorThemeWrapper /> }],
      },
      {
        path: "/tags/:tagName",
        element: <AllNotesPage />,
        children: [{ path: "note/:noteId", element: <NoteEditor /> }],
      },
      {
        path: "/archived/tags/:tagName",
        element: <ArchivedPage />,
        children: [{ path: "note/:noteId", element: <NoteEditor /> }],
      },
    ],
  },
]);

export default App;

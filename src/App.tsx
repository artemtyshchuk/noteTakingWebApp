import { SettingsPage } from "pages/SettingsPage";
import { AllNotesPage, ArchivedPage } from "./pages/NotesPage";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { ThemeProvider } from "components/Settings/context/ThemeContext";
import { ColorThemeWrapper } from "components/Settings/wrappers/ColorThemeWrapper";
import { NoteEditor } from "components/NoteContent/NoteEditor";
import { FontThemeWrapper } from "components/Settings/wrappers/FontThemeWrapper";
import { FontProvider } from "components/Settings/context/FontContext";
import { SearchPage } from "pages/SearchPage";
import { TagsPage } from "pages/TagsPage";
import { NotesList } from "components/NotesList/NotesList";
import { ErrorBoundary } from "components/ErrorBoundary/ErrorBoundary";
import { ErrorPage } from "components/ErrorPage/ErrorPage";

function App() {
  return (
    <ThemeProvider>
      <FontProvider>
        <RouterProvider router={router} />
      </FontProvider>
    </ThemeProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
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
        children: [
          { path: "color-theme", element: <ColorThemeWrapper /> },
          { path: "font-theme", element: <FontThemeWrapper /> },
        ],
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
      {
        path: "/search",
        element: <SearchPage />,
        children: [
          {
            path: "note/:noteId",
            element: <NoteEditor />,
          },
        ],
      },
      {
        path: "/tags",
        element: <TagsPage />,
        children: [
          {
            path: "tags/:tagName",
            element: <NotesList isArchived={false} />,
          },
        ],
      },
    ],
  },
]);

export default App;

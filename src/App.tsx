// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/clerk-react";

import { AllNotesPage } from "./pages/AllNotesPage";

function App() {
  return (
    <>
      <div>
        <AllNotesPage />
        {/* <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn> */}
      </div>
    </>
  );
}

export default App;

FIX LOGOUT BLANK-SCREEN BUG

There is currently a critical navigation/state bug in the application:

When the user clicks "Logout", the application goes to a blank/empty
screen instead of returning to the appropriate logged-out/auth screen.

Fix this properly.

IMPORTANT:
Do not redesign the authentication screens.
Do not create a fake workaround.
Trace the existing logout flow and fix the underlying state/navigation
problem.

--------------------------------------------------
EXPECTED LOGOUT FLOW
--------------------------------------------------

Current behavior:

User clicks Logout
→ session/auth state changes
→ application becomes blank

Expected behavior:

User clicks Logout
→ logout/session state is cleared correctly
→ authenticated user state is removed
→ application redirects to the existing Login/Auth screen
→ Login/Auth screen renders normally

--------------------------------------------------
INVESTIGATE THE ROOT CAUSE
--------------------------------------------------

Inspect the existing authentication implementation and determine why the
application renders blank after logout.

Check for:

• Auth state becoming undefined/null without a fallback
• Protected routes rendering nothing when the user is unauthenticated
• Missing redirect after logout
• Incorrect route handling
• Auth context/provider state updates
• React state update issues
• Race conditions during logout
• Components assuming a logged-in user always exists
• Missing loading/auth transition state
• Router configuration
• Conditional rendering around authenticated routes
• Logout handler errors
• Console/runtime errors triggered during logout

Do not simply add a redirect without understanding the existing flow.

--------------------------------------------------
AUTH STATE RULE
--------------------------------------------------

The application must always have a valid UI state.

There should be no situation where:

isAuthenticated === false

causes the application to render:

null

or an empty container with no fallback.

Instead:

AUTHENTICATED
→ render the authenticated application

AUTHENTICATION LOADING
→ render the existing loading state

UNAUTHENTICATED
→ render/redirect to the existing login/authentication screen

--------------------------------------------------
LOGOUT HANDLER
--------------------------------------------------

Review the existing logout function.

It should:

1. Clear the authenticated session/state correctly.
2. Clear any relevant user-specific state.
3. Clear authentication-related storage if the application uses it.
4. Update the auth provider/context.
5. Navigate to the existing login/auth route.
6. Ensure the protected application is no longer rendered.

Do not clear unrelated application data.

Do not destroy persistent preferences that should survive logout.

--------------------------------------------------
PROTECTED ROUTES
--------------------------------------------------

Review every protected route.

If the user is no longer authenticated, protected routes must NOT render
the authenticated application.

They should redirect/render the existing login screen.

There must be no blank route.

For example:

Authenticated:
Dashboard → Workspace → Profile → etc.

Logged out:
Any protected route
→ Login/Auth screen

--------------------------------------------------
IMPORTANT — PRESERVE EXISTING UI
--------------------------------------------------

Do not redesign:

• Login
• Authentication
• Dashboard
• Navigation
• Sidebar/top bar
• Employee workspace
• Existing routes

Only fix the authentication/logout behavior necessary to resolve the
blank screen.

--------------------------------------------------
ERROR HANDLING
--------------------------------------------------

If logout fails for any reason:

• Do not leave the application on a blank screen.
• Keep the user in a valid UI state.
• Show the existing error/notification pattern if one already exists.
• Do not expose raw technical errors to the user.

--------------------------------------------------
TEST THE FIX
--------------------------------------------------

After fixing the issue, test:

TEST 1
Login
→ Dashboard
→ Logout
→ Login screen

TEST 2
Login
→ Navigate to another protected page
→ Logout
→ Login screen

TEST 3
Login
→ Logout
→ Browser back button

Expected:
Protected content must not become accessible without authentication.

TEST 4
Refresh after logout.

Expected:
Login/Auth screen remains visible.

TEST 5
Directly open a protected route while logged out.

Expected:
Redirect to the existing Login/Auth screen instead of blank screen.

TEST 6
Login again after logging out.

Expected:
Normal login flow works and dashboard loads correctly.

--------------------------------------------------
FINAL REQUIREMENT
--------------------------------------------------

The application must NEVER display a blank screen because the user has
logged out.

There must always be a valid UI state:

Loading → Loading UI
Authenticated → Application
Unauthenticated → Login/Auth

Fix the underlying auth/navigation/state issue and verify the complete
logout flow before finishing.

Do not modify unrelated parts of the application.
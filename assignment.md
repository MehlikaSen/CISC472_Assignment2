**Hosted application:** [https://cisc472-assignment2-1.onrender.com](https://cisc472-assignment2-1.onrender.com)

# Stored Cross-Site Scripting (XSS)

**Location:** `lib/markdown.js`, `escapeUnused(_src)`

**Trigger:** Entering malicious text such as HTML or JavaScript content into post body

*Example:* An attacker enters `<strong>Important text</strong>` in the post body. Instead of displaying the tags as text, the application renders the words in bold. This happens because the user input is interpreted as HTML, changing the page's rendered content in the viewer's browser. The application's source code is not changed.

**The Fix**:
In `markdown.js`, user input is converted into HTML for the supported Markdown features. Before that conversion, the `escapeUnused(_src)` function should replace HTML characters such as `<` and `>`. This makes raw HTML display as text instead of being interpreted by the browser, while supported Markdown formatting continues to work.

**Server vs Browser Code**
Server code handles restricted operations, including CRUD operations for posts and saving those changes to the database. It verifies passwords during login, checks the current session user, reads the user's assigned role, and determines whether the user has the correct role to access the officer desk.

Browser code handles the layout, structure, and styling of the pages users see. It lets users enter text into forms and submit that data to the server for processing. It also supports interaction and navigation from page to page when users click links or tabs.


**how a session cookie becomes `currentUser`**
When a user logs in, `createSession(user.id)` creates a random session token. The token and the user's ID are stored together in the database's `sessions` table, and the token is placed in the browser's `chalk_session` cookie. When `currentUser()` is called, it reads the token from that cookie and passes it to `userFromToken()`. That function finds the matching session and user in the database and returns the user's information. When the user logs out, `destroySession()` removes the session record and the cookie is deleted.

**how a post body gets from the compose form onto the wall**
The user enters text into the `textarea` in `app/compose/page.js` and submits the form. The form calls `createPostAction` in `lib/actions.js`, where the server reads the text with `formData.get("body")`, checks its length, and inserts it into the `posts` table in SQLite. When the user visits the wall, `app/page.js` retrieves the posts from the database, passes each post body to `renderMarkdown` in `lib/markdown.js`, and sends the resulting HTML to `PostBody` for display.

**what an officer can see that a member cannot**
If the logged-in user's role is `officer`, the navigation shows an **Officer desk** link in the upper-right corner. Regular members do not see this link. When an officer opens it, the app displays a restricted page containing private notes stored in the database, similar to a digitized notebook. The page checks the user's role before showing those notes.
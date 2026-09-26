**Hosted application:** [https://cisc472-assignment2-1.onrender.com](https://cisc472-assignment2-1.onrender.com)

# Stored Cross-Site Scripting (XSS)

**Location:** `lib/markdown.js`, `escapeUnused(_src)`

**Trigger:** Entering malicious text such as HTML or JavaScript content into post body

*Example:* An attacker enters `<strong>Important text</strong>` in the post body. Instead of displaying the tags as text, the application renders the words in bold. This happens because the user input is interpreted as HTML, changing the page's rendered content in the viewer's browser. The application's source code is not changed.

**The Fix**:
In `markdown.js`, user input is converted into HTML for the supported Markdown features. Before that conversion, the `escapeUnused(_src)` function should replace HTML characters such as `<` and `>`. This makes raw HTML display as text instead of being interpreted by the browser, while supported Markdown formatting continues to work.
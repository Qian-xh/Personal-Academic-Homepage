# Personal Academic Homepage Maintenance Notes

This is a lightweight static academic homepage. Open `index.html` directly in a browser to preview it.

## File Structure

- `index.html`: page structure; usually no need to edit.
- `styles.css`: visual styling, layout, responsive rules, and contact icons.
- `data.js`: profile information, research interests, publications, and contact links. This is the main file for future updates.
- `app.js`: renders the data into the page and maintains the browser-local view counter.
- `assets/qian-xiaohe-photo.png`: homepage portrait.
- `assets/qian-xiaohe-rill-formation-2024.pdf`: local PDF linked from the corresponding publication.

## How To Update Content

Edit `data.js`:

- `profile.displayName`: English name.
- `profile.chineseName`: Chinese name shown in parentheses.
- `profile.gender`: gender.
- `profile.institution`: institution.
- `profile.degree`: degree or current program.
- `profile.bio`: biography paragraphs.
- `research`: research-interest cards.
- `publications`: publication list and links.
- `contacts`: phone, email, ResearchGate, Google Scholar, and GitHub.
- `lastUpdated`: page update date.

The view counter is stored in the visitor's browser through `localStorage`, so it counts local browser views rather than global server-side traffic.

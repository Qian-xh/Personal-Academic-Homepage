const data = window.siteData;

const icons = {
  phone: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.6 10.8c1.6 3.2 3.4 5 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.3 1.2.4 2.5.6 3.8.6.7 0 1.1.5 1.1 1.1v3.5c0 .7-.5 1.1-1.1 1.1C10.8 21.2 2.8 13.2 2.8 3.6c0-.7.5-1.1 1.1-1.1h3.5c.7 0 1.1.5 1.1 1.1 0 1.3.2 2.6.6 3.8.1.4 0 .9-.3 1.2l-2.2 2.2Z"/>
    </svg>`,
  mail: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2Zm8 8.1L4.8 7.5 4 8.5l8 6.2 8-6.2-.8-1-7.2 5.6Z"/>
    </svg>`,
  researchgate: `
    <img
      src="https://www.researchgate.net/favicon.ico"
      alt=""
      aria-hidden="true"
    />`,
  scholar: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 2 8.4l10 5.4 10-5.4L12 3Zm-6 8.2v4.1c0 2.3 2.7 4.2 6 4.2s6-1.9 6-4.2v-4.1l-6 3.2-6-3.2Z"/>
    </svg>`,
  github: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.4A9.6 9.6 0 0 0 8.9 21c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 0 1.6 1 1.6 1 .9 1.5 2.3 1.1 2.8.8.1-.6.4-1.1.7-1.3-2.2-.3-4.6-1.1-4.6-4.8 0-1.1.4-1.9 1-2.6-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 4.9 0c1.8-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.5 1 2.6 0 3.7-2.4 4.5-4.6 4.8.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A9.6 9.6 0 0 0 12 2.4Z"/>
    </svg>`
};

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node) node.textContent = value || "";
}

function createLink(className, href, label, detail, isPrimary = false) {
  const link = document.createElement("a");
  link.className = isPrimary ? `${className} primary` : className;
  link.href = href;
  link.textContent = label;
  if (/^https?:\/\//.test(href)) {
    link.target = "_blank";
    link.rel = "noreferrer";
  }
  if (detail) link.setAttribute("aria-label", detail);
  return link;
}

function renderProfile() {
  const { profile } = data;
  document.title = `${profile.displayName} | Personal Academic Homepage`;
  setText('[data-field="displayName"]', profile.displayName);
  setText('[data-field="initials"]', profile.initials);
  setText('[data-field="tagline"]', profile.tagline);
  setText('[data-field="heroTitle"]', profile.heroTitle);
  setText('[data-field="summary"]', profile.summary);

  const avatar = document.querySelector("#avatar");
  avatar.src = profile.avatar;
  avatar.alt = `${profile.displayName} portrait`;

  const facts = [
    ["Name", `${profile.displayName} (${profile.chineseName})`],
    ["Gender", profile.gender],
    ["Institution", profile.institution],
    ["Degree", profile.degree],
    ["Position", profile.title]
  ];
  const factsNode = document.querySelector("#profile-facts");
  factsNode.innerHTML = "";
  facts.forEach(([label, value]) => {
    const row = document.createElement("div");
    row.innerHTML = `<dt>${label}</dt><dd>${value}</dd>`;
    factsNode.append(row);
  });

  const bioNode = document.querySelector("#bio");
  bioNode.innerHTML = "";
  profile.bio.forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    bioNode.append(p);
  });

  const actionNode = document.querySelector("#hero-actions");
  actionNode.innerHTML = "";
  actionNode.append(
    createLink("button", "#publications", "View Publications", "Jump to publications", true),
    createLink("button", "#contact", "Contact", "Jump to contact")
  );
}

function renderResearch() {
  const node = document.querySelector("#research-list");
  node.innerHTML = "";
  data.research.forEach((item) => {
    const card = document.createElement("article");
    card.className = "research-card";
    card.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`;
    node.append(card);
  });
}

function renderPublications() {
  const node = document.querySelector("#publication-list");
  node.innerHTML = "";
  data.publications.forEach((publication) => {
    const article = document.createElement("article");
    article.className = "publication";
    article.innerHTML = `
      <div class="pub-year">${publication.year}</div>
      <div>
        <h3>${publication.title}</h3>
        <p>${publication.authors}. ${publication.venue}.</p>
        ${publication.link ? `<p><a href="${publication.link}" target="_blank" rel="noreferrer">View publication</a></p>` : ""}
      </div>
    `;
    node.append(article);
  });
}

function renderContacts() {
  const node = document.querySelector("#contact-list");
  node.innerHTML = "";
  data.contacts.forEach((contact) => {
    const card = createLink("contact-card", contact.url, "", contact.label);
    card.innerHTML = `
      <span class="contact-icon">${icons[contact.icon] || icons.mail}</span>
      <strong>${contact.label}</strong>
      <span>${contact.value}</span>
    `;
    node.append(card);
  });
}

function renderFooter() {
  setText("#footer-name", `${data.profile.displayName} © ${new Date().getFullYear()}`);
  setText("#last-updated", data.lastUpdated);
  document.querySelector("#last-updated").dateTime = data.lastUpdated;
}

function renderViewCounter() {
  const key = "qian-xiaohe-homepage-views";
  const views = Number.parseInt(localStorage.getItem(key) || "0", 10) + 1;
  localStorage.setItem(key, String(views));
  setText("#view-counter", `Browser-local views: ${views}`);
}

renderProfile();
renderResearch();
renderPublications();
renderContacts();
renderFooter();
renderViewCounter();

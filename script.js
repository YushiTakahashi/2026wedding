const storageKey = "wedding-invitation-rsvp";
const content = window.invitationContent;
const googleForm = content.googleForm;

function createSectionTitle(eyebrow, title, copy) {
  return `
    <div class="section-title reveal">
      <p class="section-title__eyebrow">${eyebrow}</p>
      <h2 class="section-title__title">${title}</h2>
      ${copy ? `<p class="section-title__copy">${copy}</p>` : ""}
    </div>
  `;
}

function renderApp() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section class="hero" id="hero">
      <div class="hero__backdrop"></div>
      <div class="hero__inner reveal">
        <p class="hero__eyebrow">${content.hero.eyebrow}</p>
        <p class="hero__date">${content.hero.date}</p>
        <h1 class="hero__title">${content.hero.couple}</h1>
        <p class="hero__names">${content.hero.namesJa}</p>
        <div class="hero__meta">
          <div>
            <span class="hero__label">Ceremony</span>
            <strong>${content.hero.ceremony}</strong>
          </div>
          <div>
            <span class="hero__label">Reception</span>
            <strong>${content.hero.reception}</strong>
          </div>
          <div>
            <span class="hero__label">Venue</span>
            <strong>${content.hero.venue}</strong>
          </div>
        </div>
        <div class="hero__actions">
          <a class="button button--primary" href="#rsvp">出欠を回答する</a>
          <a class="button button--ghost" href="#venue">会場情報を見る</a>
        </div>
        <p class="hero__deadline">ご回答期限: ${content.hero.rsvpDeadline}</p>
      </div>
    </section>

    <section class="section section--greeting" id="greeting">
      <div class="container">
        ${createSectionTitle("Greeting", content.greeting.title, content.greeting.lead)}
        <div class="greeting-card reveal">
          <p>${content.greeting.body}</p>
        </div>
      </div>
    </section>

    <section class="section" id="hosts">
      <div class="container">
        ${createSectionTitle("Hosts", "ホスト", "参考URLのプロフィール構成を土台に、2名の紹介カードとして再構成しています。")}
        <div class="host-list" id="host-list"></div>
      </div>
    </section>

    <section class="section section--warm" id="schedule">
      <div class="container">
        ${createSectionTitle("Schedule", "当日の流れ", "ブラプラの縦タイムライン構成をベースに、ローカル資料の時刻を反映した見せ方です。")}
        <ol class="timeline" id="timeline"></ol>
      </div>
    </section>

    <section class="section" id="venue">
      <div class="container">
        ${createSectionTitle("Information", "会場情報", content.venue.address)}
        <div class="info-grid">
          <article class="info-card reveal">
            <p class="info-card__eyebrow">Venue</p>
            <h3>${content.venue.name}</h3>
            <p>${content.venue.address}</p>
            <a class="text-link" href="${content.venue.url}" target="_blank" rel="noreferrer">会場公式ページ</a>
          </article>
          <article class="info-card reveal">
            <p class="info-card__eyebrow">Access</p>
            <ul class="info-list">
              ${content.venue.access.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--form" id="rsvp">
      <div class="container">
        ${createSectionTitle("RSVP", "ご出欠について", `お手数ですが ${content.hero.rsvpDeadline} までにご回答をお願いいたします。`)}
        <div class="rsvp-layout">
          <form class="rsvp-form reveal" id="rsvp-form">
            <label class="field">
              <span>お名前</span>
              <input name="name" data-field-key="name" type="text" required />
            </label>
            <label class="field">
              <span>フリガナ</span>
              <input name="furigana" data-field-key="furigana" type="text" required />
            </label>
            <label class="field">
              <span>ゲスト様</span>
              <select name="guestType" data-field-key="guestType" required>
                <option value="">選択してください</option>
                ${content.rsvp.sideOptions
                  .map((option) => `<option value="${option}">${option}</option>`)
                  .join("")}
              </select>
            </label>
            <label class="field">
              <span>郵便番号(ハイフンなし)</span>
              <input
                name="postcode"
                data-field-key="postcode"
                type="text"
                inputmode="numeric"
                required
              />
            </label>
            <label class="field">
              <span>ご住所</span>
              <textarea name="address" data-field-key="address" rows="3" required></textarea>
            </label>
            <label class="field">
              <span>電話番号</span>
              <input name="phone" data-field-key="phone" type="tel" required />
            </label>
            <fieldset class="field">
              <legend>アレルギーはありますか？</legend>
              <div class="choice-row">
                ${content.rsvp.allergyOptions
                  .map(
                    (option) => `
                      <label class="choice">
                        <input
                          type="radio"
                          name="allergy"
                          data-field-key="allergy"
                          value="${option}"
                          required
                        />
                        <span>${option}</span>
                      </label>
                    `,
                  )
                  .join("")}
              </div>
            </fieldset>
            <label class="field">
              <span>「あり」と回答した方</span>
              <textarea
                name="allergyDetail"
                data-field-key="allergyDetail"
                rows="3"
                placeholder="${content.rsvp.messagePlaceholder}"
              ></textarea>
            </label>
            <fieldset class="field">
              <legend>挙式</legend>
              <div class="choice-row">
                ${content.rsvp.ceremonyOptions
                  .map(
                    (option) => `
                      <label class="choice">
                        <input
                          type="radio"
                          name="ceremony"
                          data-field-key="ceremony"
                          value="${option}"
                          required
                        />
                        <span>${option}</span>
                      </label>
                    `,
                  )
                  .join("")}
              </div>
            </fieldset>
            <fieldset class="field">
              <legend>披露宴</legend>
              <div class="choice-row">
                ${content.rsvp.receptionOptions
                  .map(
                    (option) => `
                      <label class="choice">
                        <input
                          type="radio"
                          name="reception"
                          data-field-key="reception"
                          value="${option}"
                          required
                        />
                        <span>${option}</span>
                      </label>
                    `,
                  )
                  .join("")}
              </div>
            </fieldset>
            <div class="form-actions">
              <button class="button button--primary" type="submit">送信する</button>
              <button class="button button--ghost" type="button" id="download-json">
                JSONを書き出す
              </button>
            </div>
            <p class="form-status" id="form-status" aria-live="polite"></p>
            <p class="form-note">
              Googleフォーム未接続でも入力保持できます。接続時は content.js の googleForm を埋めるだけで送信先を差し替えられます。
            </p>
          </form>

          <aside class="preview-card reveal">
            <p class="preview-card__eyebrow">Preview</p>
            <h3>回答プレビュー</h3>
            <dl id="rsvp-preview">
              <div><dt>お名前</dt><dd>未入力</dd></div>
              <div><dt>ゲスト区分</dt><dd>未入力</dd></div>
              <div><dt>電話番号</dt><dd>未入力</dd></div>
              <div><dt>挙式</dt><dd>未入力</dd></div>
              <div><dt>披露宴</dt><dd>未入力</dd></div>
              <div><dt>アレルギー</dt><dd>未入力</dd></div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  `;
}

function renderHosts() {
  const root = document.getElementById("host-list");
  const template = document.getElementById("host-card-template");

  content.hosts.forEach((host) => {
    const fragment = template.content.cloneNode(true);
    fragment.querySelector(".host-card__avatar").textContent = host.initial;
    fragment.querySelector(".host-card__role").textContent = host.role;
    fragment.querySelector(".host-card__name").textContent = host.name;
    fragment.querySelector(".host-card__message").textContent = host.message;
    root.appendChild(fragment);
  });
}

function renderTimeline() {
  const root = document.getElementById("timeline");
  const template = document.getElementById("timeline-item-template");

  content.schedule.forEach((item) => {
    const fragment = template.content.cloneNode(true);
    fragment.querySelector(".timeline__time").textContent = item.time;
    fragment.querySelector(".timeline__label").textContent = item.label;
    fragment.querySelector(".timeline__note").textContent = item.note;
    root.appendChild(fragment);
  });
}

function updatePreview(formData) {
  const preview = document.getElementById("rsvp-preview");
  const pairs = [
    formData.name || "未入力",
    formData.guestType || "未入力",
    formData.phone || "未入力",
    formData.ceremony || "未入力",
    formData.reception || "未入力",
    formData.allergyDetail
      ? `${formData.allergy || "未入力"} / ${formData.allergyDetail}`
      : formData.allergy || "未入力",
  ];

  preview.querySelectorAll("dd").forEach((element, index) => {
    element.textContent = pairs[index];
  });
}

function collectFormData(form) {
  const data = {};
  form.querySelectorAll("[data-field-key]").forEach((field) => {
    const key = field.dataset.fieldKey;
    if (!key || data[key] !== undefined) return;

    if (field.type === "radio") {
      const checked = form.querySelector(
        `input[data-field-key="${key}"]:checked`,
      );
      data[key] = checked ? checked.value : "";
      return;
    }

    data[key] = field.value ?? "";
  });
  data.updatedAt = new Date().toISOString();
  return data;
}

function restoreForm(form) {
  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return;

  const data = JSON.parse(raw);
  Object.entries(data).forEach(([key, value]) => {
    if (key === "updatedAt") return;

    const fields = form.querySelectorAll(`[data-field-key="${key}"]`);
    if (!fields.length) return;

    if (fields[0].type === "radio") {
      const target = Array.from(fields).find((item) => item.value === value);
      if (target) target.checked = true;
    } else {
      fields[0].value = value;
    }
  });

  updatePreview(data);
}

function persistAndPreview(form) {
  const data = collectFormData(form);
  window.localStorage.setItem(storageKey, JSON.stringify(data));
  updatePreview(data);
  return data;
}

function bindForm() {
  const form = document.getElementById("rsvp-form");
  const downloadButton = document.getElementById("download-json");
  const status = document.getElementById("form-status");

  restoreForm(form);
  applyGoogleFormConfig(form);

  form.addEventListener("input", () => {
    persistAndPreview(form);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = persistAndPreview(form);
    if (googleForm.enabled && form.action) {
      status.textContent = "Googleフォームへ送信しています...";
      form.submit();
      window.setTimeout(() => {
        status.textContent = googleForm.submitMessage;
      }, 800);
      return;
    }

    const summary = [
      `お名前: ${data.name || "未入力"}`,
      `ゲスト区分: ${data.guestType || "未入力"}`,
      `挙式: ${data.ceremony || "未入力"}`,
      `披露宴: ${data.reception || "未入力"}`,
    ].join("\n");
    status.textContent = "内容をローカル保存しました。";
    window.alert(`入力内容を保存しました。\n\n${summary}`);
  });

  downloadButton.addEventListener("click", () => {
    const data = persistAndPreview(form);
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "wedding-rsvp.json";
    link.click();
    URL.revokeObjectURL(url);
  });
}

function applyGoogleFormConfig(form) {
  if (!googleForm.enabled) return;
  if (!googleForm.action) return;

  form.method = "POST";
  form.action = googleForm.action;
  form.target = googleForm.submitTarget || "google-form-submit-frame";

  const fieldNames = {
    guestType: googleForm.entries.guestType,
    name: googleForm.entries.name,
    furigana: googleForm.entries.furigana,
    postcode: googleForm.entries.postcode,
    address: googleForm.entries.address,
    phone: googleForm.entries.phone,
    allergy: googleForm.entries.allergy,
    allergyDetail: googleForm.entries.allergyDetail,
    ceremony: googleForm.entries.ceremony,
    reception: googleForm.entries.reception,
  };

  Object.entries(fieldNames).forEach(([fieldKey, fieldName]) => {
    if (!fieldName) return;
    const fields = form.querySelectorAll(`[data-field-key="${fieldKey}"]`);
    if (!fields.length) return;
    fields.forEach((field) => {
      field.name = fieldName;
    });
  });
}

function bindReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

renderApp();
renderHosts();
renderTimeline();
bindForm();
bindReveal();

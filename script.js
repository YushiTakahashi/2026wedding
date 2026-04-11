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
      <div class="hero__art reveal">
        <img class="hero__text-bg" src="./img/hero_text_bg.svg" alt="" aria-hidden="true" />
        <img class="hero__text-rotate" src="./img/hero_text_rotate.svg" alt="" aria-hidden="true" />
        <img class="hero__deco" src="./img/hero_deco.png" alt="" aria-hidden="true" />
      </div>
      <div class="hero__info reveal">
        <img class="hero__info-bg" src="./img/hero_info_bg.svg" alt="" aria-hidden="true" />
        <div class="hero__info-text">
          <p class="hero__date">${content.hero.date}</p>
          <h1 class="hero__title">${content.hero.namesJa}</h1>
        </div>
      </div>
    </section>

    <section class="section section--greeting" id="greeting">
      <div class="container">
        <div class="section-title section-title--center reveal">
          <img class="section-title__asset section-title__asset--thankyou" src="./img/thankyou.svg" alt="THANK YOU!" />
          <p class="section-title__copy">${content.greeting.lead}</p>
        </div>
        <div class="greeting-card reveal">
          <img class="greeting-card__icon" src="./img/icon.png" alt="" aria-hidden="true" />
          <p class="greeting-card__sign">${content.hero.namesJa}</p>
        </div>
      </div>
    </section>

    <section class="section section--warm" id="schedule">
      <div class="container">
        <div class="section-title section-title--stacked reveal">
          <img class="section-title__asset section-title__asset--timetable" src="./img/timetable_title.svg" alt="TIME TABLE" />
        </div>
        <div class="schedule-board reveal">
          <img class="schedule-board__deco" src="./img/timetable_deco.png" alt="" aria-hidden="true" />
          <ol class="timeline" id="timeline"></ol>
        </div>
      </div>
    </section>

    <section class="section" id="venue">
      <div class="container">
        <div class="section-title reveal">
          <p class="section-title__eyebrow">ACCESS</p>
          <h2 class="section-title__subheading">会場情報</h2>
        </div>
        <div class="info-grid reveal">
          <article class="info-card">
            <h2 class="section-title__title">${content.venue.name}</h2>
            <p>${content.venue.address}</p>
            <ul class="info-list">
              ${content.venue.access.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--form" id="rsvp">
      <div class="container">
        <div class="section-title reveal">
          <p class="section-title__eyebrow">RSVP</p>
          <h2 class="section-title__title">ご出欠について</h2>
          <p class="section-title__copy">お手数ですが<br> ${content.hero.rsvpDeadline}に<br>ご回答をお願いいたします</p>
        </div>
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
              <button class="button button--primary" type="submit">回答する</button>
            </div>
            <p class="form-status" id="form-status" aria-live="polite"></p>
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
  if (!root || !template) return;

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
    const note = fragment.querySelector(".timeline__note");
    if (item.note) {
      note.textContent = item.note;
    } else {
      note.remove();
    }
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
  const status = document.getElementById("form-status");
  const submitFrame = document.getElementById(
    googleForm.submitTarget || "google-form-submit-frame",
  );
  let isSubmitting = false;

  restoreForm(form);
  applyGoogleFormConfig(form);

  if (submitFrame) {
    submitFrame.addEventListener("load", () => {
      if (!isSubmitting) return;
      isSubmitting = false;
      const completedStatusMessage = `${googleForm.submitMessage}\nこの画面は閉じて大丈夫です`;
      status.textContent = completedStatusMessage;
      window.alert(completedStatusMessage);
    });
  }

  form.addEventListener("input", () => {
    persistAndPreview(form);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = persistAndPreview(form);
    if (googleForm.enabled && form.action) {
      isSubmitting = true;
      status.textContent = "送信中です 少々お待ちください";
      form.submit();
      return;
    }

    const summary = [
      `お名前: ${data.name || "未入力"}`,
      `ゲスト区分: ${data.guestType || "未入力"}`,
      `挙式: ${data.ceremony || "未入力"}`,
      `披露宴: ${data.reception || "未入力"}`,
    ].join("\n");
    status.textContent = "内容をローカル保存しました";
    window.alert(`入力内容を保存しました\n\n${summary}`);
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

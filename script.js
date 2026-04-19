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
      <div class="hero__inner reveal reveal--hero">
        <p class="hero__names">YUSHI &amp; AIRI</p>
        <div class="hero__meta">
          <p class="hero__enjoy">ENJOY!</p>
          <p class="hero__date hero__meta-line">${content.hero.dateDisplay || content.hero.date}</p>
          <p class="hero__time hero__meta-line">${content.hero.timeDisplay || content.hero.reception}</p>
        </div>
        <div class="hero__scroll" aria-hidden="true">
          <span class="hero__scroll-mouse">
            <span class="hero__scroll-dot"></span>
          </span>
          <span class="hero__scroll-arrow"></span>
        </div>
        <div class="hero__deco" aria-hidden="true">
          <img class="hero__deco-image" src="./img/hero_deco.svg" alt="" />
          <img class="hero__deco-image hero__deco-image--close" src="./img/hero_deco_close.svg" alt="" />
        </div>
      </div>
    </section>

    <section class="section section--greeting" id="greeting">
      <div class="section-bg-decos" aria-hidden="true">
        <img class="section-bg-decos__item section-bg-decos__item--2" src="./img/bg_deco_002.png" alt="" />
        <img class="section-bg-decos__item section-bg-decos__item--3" src="./img/bg_deco_003.png" alt="" />
      </div>
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
      <div class="section-bg-decos" aria-hidden="true">
        <img class="section-bg-decos__item section-bg-decos__item--1" src="./img/bg_deco_001.png" alt="" />
      </div>
      <div class="container">
        <div class="section-title reveal">
          <img class="section-title__asset section-title__asset--section-head" src="./img/access.svg" alt="ACCESS" />
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
          <img class="section-title__asset section-title__asset--section-head" src="./img/rsvp.svg" alt="RSVP" />
          <h2 class="section-title__title">ご出欠について</h2>
          <p class="section-title__copy">お手数ですが<br><span class="section-title__deadline">${content.hero.rsvpDeadline}</span>に<br>ご回答をお願いいたします</p>
        </div>
        <div class="rsvp-layout">
          <form class="rsvp-form reveal" id="rsvp-form">
            <label class="field">
              <span>お名前<br>※複数入力する時は「、」で区切ってください</span>
              <input name="name" data-field-key="name" type="text" required />
            </label>
            <label class="field">
              <span>フリガナ<br>※複数入力する時は「、」で区切ってください</span>
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
              <legend>アレルギーや苦手な食べ物はありますか？</legend>
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
            <label class="field">
              <span>その他</span>
              <textarea
                name="note"
                data-field-key="note"
                rows="4"
                placeholder="${content.rsvp.notePlaceholder}"
              ></textarea>
            </label>
            <fieldset class="field">
              <legend>【アンケート】二次会について</legend>
              <p class="field__hint">${content.rsvp.afterPartyDescription}</p>
              <div class="choice-row">
                ${content.rsvp.afterPartyOptions
                  .map(
                    (option) => `
                      <label class="choice">
                        <input
                          type="radio"
                          name="afterParty"
                          data-field-key="afterParty"
                          value="${option.value}"
                          required
                        />
                        <span>${option.label}</span>
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
  return data;
}

function bindForm() {
  const form = document.getElementById("rsvp-form");
  const status = document.getElementById("form-status");
  const submitFrame = document.getElementById(
    googleForm.submitTarget || "google-form-submit-frame",
  );
  let isSubmitting = false;
  let submissionMode = null;

  applyGoogleFormConfig(form);

  if (submitFrame) {
    submitFrame.addEventListener("load", () => {
      if (!isSubmitting) return;
      if (submissionMode !== "google-form") return;
      isSubmitting = false;
      submissionMode = null;
      const completedStatusMessage = `${googleForm.submitMessage}\nこの画面は閉じて大丈夫です`;
      status.textContent = completedStatusMessage;
      window.alert(completedStatusMessage);
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = collectFormData(form);
    if (googleForm.enabled && form.action) {
      isSubmitting = true;
      submissionMode = "google-form";
      status.textContent = "送信中です 少々お待ちください";
      form.submit();
      return;
    }

    const summary = [
      `お名前: ${data.name || "未入力"}`,
      `ゲスト区分: ${data.guestType || "未入力"}`,
      `挙式: ${data.ceremony || "未入力"}`,
      `披露宴: ${data.reception || "未入力"}`,
      `その他: ${data.note || "未入力"}`,
      `二次会: ${data.afterParty || "未入力"}`,
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
    note: googleForm.entries.note,
    afterParty: googleForm.entries.afterParty,
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

function bindHeroBlink() {
  const heroDeco = document.querySelector(".hero__deco");
  if (!heroDeco) return;

  const randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

  async function blink(blinkCount) {
    for (let index = 0; index < blinkCount; index += 1) {
      heroDeco.classList.add("is-blinking");
      await wait(48);
      heroDeco.classList.remove("is-blinking");

      if (index < blinkCount - 1) {
        await wait(100);
      }
    }
  }

  async function runBlinkSequence() {
    const blinkCount = Math.random() < 0.5 ? 1 : 2;
    await blink(blinkCount);

    await wait(randomRange(2000, 5000));
    runBlinkSequence();
  }

  wait(randomRange(2000, 5000)).then(runBlinkSequence);
}

renderApp();
renderHosts();
renderTimeline();
bindForm();
bindReveal();
bindHeroBlink();

const Data_URL = "./appData.json";
const videoSection = document.getElementById("videoSection");
const footer = document.getElementById("footer");
const postsSection = document.querySelectorAll("[data-posts-category]");

/* =====================================================================
   Scroll-reveal animations (IntersectionObserver)
===================================================================== */
function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal, .reveal-stagger");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => {
    if (!el.classList.contains("is-visible")) observer.observe(el);
  });
}

/* =====================================================================
   Mobile nav: close the collapsed menu after a link is tapped
===================================================================== */
function initMobileNavClose() {
  const navbarNav = document.getElementById("navbarNav");
  if (!navbarNav || navbarNav.dataset.closeBound) return;
  navbarNav.dataset.closeBound = "true";

  navbarNav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarNav.classList.contains("show") && window.bootstrap) {
        const collapseInstance =
          window.bootstrap.Collapse.getInstance(navbarNav) ||
          new window.bootstrap.Collapse(navbarNav, { toggle: false });
        collapseInstance.hide();
      }
    });
  });
}

/* =====================================================================
   Contact / Apply forms: lightweight client-side handling
   (No backend on this static site - we package the message into a
   mailto link so it reaches info@husyntechnologies.com directly.)
===================================================================== */
function initSimpleForms() {
  document.querySelectorAll("form[data-mailto-form]").forEach((form) => {
    if (form.dataset.bound) return;
    form.dataset.bound = "true";

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = new FormData(form);
      const lines = [];
      data.forEach((value, key) => {
        if (String(value).trim()) lines.push(`${key}: ${value}`);
      });

      const subject = form.dataset.mailtoSubject || "New website enquiry";
      const to = form.dataset.mailtoTo || "info@husyntechnologies.com";
      const body = encodeURIComponent(lines.join("\n"));
      const mailtoUrl = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;

      const successEl = form.parentElement.querySelector(".form-success");
      if (successEl) {
        successEl.classList.add("show");
        successEl.setAttribute("role", "status");
      }

      window.location.href = mailtoUrl;
      form.reset();
    });
  });
}

/* =====================================================================
   FAQ Chat Widget
===================================================================== */
const COMPANY_INFO = {
  whatsappNumber: "+92 348 0931908",
  whatsappLink: "https://wa.me/923480931908",
  email: "info@husyntechnologies.com",
  location: "Dubai, United Arab Emirates",
  hours: "Monday to Saturday, 9:00 AM \u2013 6:00 PM (GST)",
};

const FAQ_INTENTS = [
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "salam", "assalam", "good morning", "good afternoon", "good evening"],
    reply:
      "Hello! \uD83D\uDC4B I'm the Husyn Technologies assistant. Ask me about our services, pricing, contact details, or business hours - or tap one of the quick options below.",
  },
  {
    id: "services",
    keywords: ["service", "services", "what do you do", "offer", "what can you build", "do you build", "capabilities"],
    reply:
      "We offer three core services: <strong>Web Development</strong> (business websites, e-commerce, landing pages), <strong>AI Integration for Websites</strong> (smart chatbots, automation, personalization), and <strong>Cybersecurity</strong> (audits, pentesting, vulnerability assessments). See the full breakdown on our <a href='./service.html'>Services page</a>.",
  },
  {
    id: "ai",
    keywords: ["ai", "artificial intelligence", "chatbot", "automation", "machine learning"],
    reply:
      "Our AI Integration service adds smart chatbots, content tools, personalization, and workflow automation to your existing website - similar to the assistant you're chatting with right now! Check out the <a href='./service.html'>Services page</a> for details.",
  },
  {
    id: "web-development",
    keywords: ["website", "web development", "web design", "ecommerce", "e-commerce", "landing page"],
    reply:
      "We design and build modern, fast, secure websites - from business sites and landing pages to full e-commerce stores. You can see examples on our <a href='./portfolio.html'>Portfolio page</a>.",
  },
  {
    id: "cybersecurity",
    keywords: ["security", "cybersecurity", "cyber security", "pentest", "penetration test", "vulnerability", "audit", "hack"],
    reply:
      "Our Cybersecurity service covers security audits, penetration testing, and vulnerability assessments to keep your website and systems safe. We also offer a <strong>free website performance &amp; security review</strong> - want to <a href='./contact.html'>request one</a>?",
  },
  {
    id: "pricing",
    keywords: ["price", "pricing", "cost", "how much", "quote", "budget", "rate", "fees"],
    reply:
      "Pricing depends on your project's scope and requirements, so we tailor every quote individually. The good news: we offer a <strong>free consultation</strong> to scope your project and give you an accurate estimate. Want to <a href='./contact.html'>get a free consultation</a>?",
  },
  {
    id: "contact",
    keywords: ["contact", "email", "reach", "phone", "number", "call", "talk to someone", "support"],
    reply: `You can reach us anytime by email at <a href="mailto:${COMPANY_INFO.email}">${COMPANY_INFO.email}</a> or on WhatsApp at <a href="${COMPANY_INFO.whatsappLink}" target="_blank" rel="noopener">${COMPANY_INFO.whatsappNumber}</a>. You can also use our <a href="./contact.html">Contact page</a>.`,
  },
  {
    id: "whatsapp",
    keywords: ["whatsapp", "whats app"],
    reply: `Message us on WhatsApp here: <a href="${COMPANY_INFO.whatsappLink}" target="_blank" rel="noopener">${COMPANY_INFO.whatsappNumber}</a>.`,
  },
  {
    id: "location",
    keywords: ["location", "address", "where are you", "based", "office", "uae", "country"],
    reply: `Husyn Technologies is based in ${COMPANY_INFO.location}, and we work with clients worldwide, fully remote-friendly.`,
  },
  {
    id: "hours",
    keywords: ["hours", "business hours", "open", "working hours", "available", "timing"],
    reply: `Our team is available ${COMPANY_INFO.hours}. You can also message us anytime on WhatsApp and we'll reply as soon as we're online.`,
  },
  {
    id: "portfolio",
    keywords: ["portfolio", "work", "examples", "projects", "clients", "case study"],
    reply: "Take a look at our recent project demos on the <a href='./portfolio.html'>Portfolio page</a>, including restaurant, real estate, and clinic websites.",
  },
  {
    id: "careers",
    keywords: ["career", "careers", "job", "jobs", "hiring", "vacancy", "work with you"],
    reply: "We'd love to hear from you! Check our open roles on the <a href='./careers.html'>Careers page</a>.",
  },
  {
    id: "consultation",
    keywords: ["consultation", "free review", "free consultation", "get started", "start a project"],
    reply: "We offer a free website performance & security review plus a free consultation for new projects. Head to our <a href='./contact.html'>Contact page</a> to get started.",
  },
  {
    id: "thanks",
    keywords: ["thank", "thanks", "thank you", "appreciate"],
    reply: "You're very welcome! Let us know if there's anything else you'd like to know. \uD83D\uDE0A",
  },
];

const QUICK_REPLIES = [
  { label: "Our services", message: "What services do you offer?" },
  { label: "Pricing", message: "How much does a project cost?" },
  { label: "Contact info", message: "How can I contact you?" },
  { label: "Business hours", message: "What are your business hours?" },
];

function getBotReply(message) {
  const normalized = message.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  FAQ_INTENTS.forEach((intent) => {
    const score = intent.keywords.reduce((acc, keyword) => {
      return normalized.includes(keyword) ? acc + keyword.length : acc;
    }, 0);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = intent;
    }
  });

  if (bestMatch) return bestMatch.reply;

  return `I don't have an exact answer for that, but our team can help directly! Email <a href="mailto:${COMPANY_INFO.email}">${COMPANY_INFO.email}</a> or message us on <a href="${COMPANY_INFO.whatsappLink}" target="_blank" rel="noopener">WhatsApp</a>, and we'll get back to you quickly.`;
}

function initChatWidget() {
  const chatWidgetToggle = document.getElementById("chatWidgetToggle");
  const chatWidgetPanel = document.getElementById("chatWidgetPanel");
  const chatWidgetClose = document.getElementById("chatWidgetClose");
  const chatWidgetForm = document.getElementById("chatWidgetForm");
  const chatWidgetInput = document.getElementById("chatWidgetInput");
  const chatWidgetBody = document.getElementById("chatWidgetBody");

  if (!chatWidgetToggle || !chatWidgetPanel || !chatWidgetClose || !chatWidgetForm || !chatWidgetInput || !chatWidgetBody) {
    return;
  }

  let quickRepliesEl = document.getElementById("chatWidgetQuickReplies");
  if (!quickRepliesEl) {
    quickRepliesEl = document.createElement("div");
    quickRepliesEl.id = "chatWidgetQuickReplies";
    quickRepliesEl.className = "chat-quick-replies";
    chatWidgetForm.parentElement.insertBefore(quickRepliesEl, chatWidgetForm);
  }

  function renderQuickReplies() {
    quickRepliesEl.innerHTML = "";
    QUICK_REPLIES.forEach((qr) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chat-quick-reply";
      chip.textContent = qr.label;
      chip.addEventListener("click", () => sendMessage(qr.message));
      quickRepliesEl.appendChild(chip);
    });
  }

  function appendMessage(text, sender) {
    const messageEl = document.createElement("div");
    messageEl.className = `chat-message ${sender}`;
    if (sender === "bot") {
      messageEl.innerHTML = text;
    } else {
      messageEl.textContent = text;
    }
    chatWidgetBody.appendChild(messageEl);
    chatWidgetBody.scrollTop = chatWidgetBody.scrollHeight;
  }

  function showTypingIndicator() {
    const typingEl = document.createElement("div");
    typingEl.className = "chat-typing";
    typingEl.id = "chatTypingIndicator";
    typingEl.innerHTML = "<span></span><span></span><span></span>";
    chatWidgetBody.appendChild(typingEl);
    chatWidgetBody.scrollTop = chatWidgetBody.scrollHeight;
    return typingEl;
  }

  function sendMessage(message) {
    const trimmed = message.trim();
    if (!trimmed) return;

    appendMessage(trimmed, "user");
    quickRepliesEl.innerHTML = "";
    chatWidgetInput.value = "";

    const typingEl = showTypingIndicator();
    const delay = 500 + Math.random() * 400;

    window.setTimeout(() => {
      typingEl.remove();
      const reply = getBotReply(trimmed);
      appendMessage(reply, "bot");
      renderQuickReplies();
    }, delay);
  }

  function toggleChatWidget(open) {
    if (open) {
      chatWidgetPanel.classList.add("open");
      chatWidgetPanel.setAttribute("aria-hidden", "false");
      chatWidgetToggle.classList.add("is-active");
      chatWidgetToggle.setAttribute("aria-expanded", "true");
      chatWidgetInput.focus();
    } else {
      chatWidgetPanel.classList.remove("open");
      chatWidgetPanel.setAttribute("aria-hidden", "true");
      chatWidgetToggle.classList.remove("is-active");
      chatWidgetToggle.setAttribute("aria-expanded", "false");
    }
  }

  chatWidgetToggle.addEventListener("click", () => {
    const isOpen = chatWidgetPanel.classList.contains("open");
    toggleChatWidget(!isOpen);
  });
  chatWidgetClose.addEventListener("click", () => toggleChatWidget(false));

  chatWidgetForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sendMessage(chatWidgetInput.value);
  });

  renderQuickReplies();
}

document.addEventListener("DOMContentLoaded", () => {
  initChatWidget();
  initScrollReveal();
  initMobileNavClose();
  initSimpleForms();
});

// Re-run mobile nav close + reveal binding once the Navbar component
// finishes injecting its markup (Navbar.js runs as a deferred script
// and builds #navbarNav dynamically after DOMContentLoaded in some cases).
window.addEventListener("load", () => {
  initMobileNavClose();
  initScrollReveal();
});

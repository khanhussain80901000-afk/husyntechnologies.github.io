const Data_URL = "./appData.json";
const videoSection = document.getElementById("videoSection");
const footer = document.getElementById("footer");
const postsSection = document.querySelectorAll("[data-posts-category]");

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

  function toggleChatWidget(open) {
    if (open) {
      chatWidgetPanel.classList.add("open");
      chatWidgetPanel.setAttribute("aria-hidden", "false");
      chatWidgetInput.focus();
    } else {
      chatWidgetPanel.classList.remove("open");
      chatWidgetPanel.setAttribute("aria-hidden", "true");
    }
  }

  chatWidgetToggle.addEventListener("click", () => toggleChatWidget(true));
  chatWidgetClose.addEventListener("click", () => toggleChatWidget(false));

  chatWidgetForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = chatWidgetInput.value.trim();
    if (!message) return;

    const userMessage = document.createElement("div");
    userMessage.className = "chat-message user";
    userMessage.textContent = message;
    chatWidgetBody.appendChild(userMessage);

    const botMessage = document.createElement("div");
    botMessage.className = "chat-message bot";
    botMessage.textContent = "Thanks for your message! We will get back to you soon.";
    chatWidgetBody.appendChild(botMessage);

    chatWidgetBody.scrollTop = chatWidgetBody.scrollHeight;
    chatWidgetInput.value = "";
  });
}

document.addEventListener("DOMContentLoaded", initChatWidget);

// document
//   .getElementById("applyFormSubmitBtn")
//   .addEventListener("click", function (event) {
//     event.preventDefault();
//   });

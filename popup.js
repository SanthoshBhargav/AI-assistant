document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs and content
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.remove("active"));
    document
      .querySelectorAll(".tab-content")
      .forEach((c) => c.classList.remove("active"));

    // Add active class to clicked tab and corresponding content
    tab.classList.add("active");
    const tabId = tab.getAttribute("data-tab");
    document.getElementById(`${tabId}-tab`).classList.add("active");
  });
});

// Load saved settings when popup opens
document.addEventListener("DOMContentLoaded", () => {
  // Load OpenAI settings
  chrome.storage.sync.get(["openaiApiKey", "openaiModel"], (data) => {
    if (data.openaiApiKey) {
      document.getElementById("openai-api-key").value = data.openaiApiKey;
      checkApiKey("openai", data.openaiApiKey);
    }
    if (data.openaiModel) {
      document.getElementById("openai-model").value = data.openaiModel;
    }
  });

  // Load DeepSeek settings
  chrome.storage.sync.get(["deepseekApiKey", "deepseekModel"], (data) => {
    if (data.deepseekApiKey) {
      document.getElementById("deepseek-api-key").value = data.deepseekApiKey;
      checkApiKey("deepseek", data.deepseekApiKey);
    }
    if (data.deepseekModel) {
      document.getElementById("deepseek-model").value = data.deepseekModel;
    }
  });

  // Load GROQ settings
  chrome.storage.sync.get(["groqApiKey", "groqModel"], (data) => {
    if (data.groqApiKey) {
      document.getElementById("groq-api-key").value = data.groqApiKey;
      checkApiKey("groq", data.groqApiKey);
    }
    if (data.groqModel) {
      document.getElementById("groq-model").value = data.groqModel;
    }
  });
});

// Save buttons functionality
document.getElementById("save-openai").addEventListener("click", () => {
  const apiKey = document.getElementById("openai-api-key").value.trim();
  const model = document.getElementById("openai-model").value;

  if (!apiKey) {
    showStatus("openai-status-message", "Please enter an API key", "error");
    return;
  }

  chrome.storage.sync.set(
    {
      openaiApiKey: apiKey,
      openaiModel: model,
    },
    () => {
      showStatus(
        "openai-status-message",
        "OpenAI settings saved successfully!",
        "success"
      );
      checkApiKey("openai", apiKey);
    }
  );
});

document.getElementById("save-deepseek").addEventListener("click", () => {
  const apiKey = document.getElementById("deepseek-api-key").value.trim();
  const model = document.getElementById("deepseek-model").value;

  if (!apiKey) {
    showStatus("deepseek-status-message", "Please enter an API key", "error");
    return;
  }

  chrome.storage.sync.set(
    {
      deepseekApiKey: apiKey,
      deepseekModel: model,
    },
    () => {
      showStatus(
        "deepseek-status-message",
        "DeepSeek settings saved successfully!",
        "success"
      );
      checkApiKey("deepseek", apiKey);
    }
  );
});

document.getElementById("save-groq").addEventListener("click", () => {
  const apiKey = document.getElementById("groq-api-key").value.trim();
  const model = document.getElementById("groq-model").value;

  if (!apiKey) {
    showStatus("groq-status-message", "Please enter an API key", "error");
    return;
  }

  chrome.storage.sync.set(
    {
      groqApiKey: apiKey,
      groqModel: model,
    },
    () => {
      showStatus(
        "groq-status-message",
        "GROQ settings saved successfully!",
        "success"
      );
      checkApiKey("groq", apiKey);
    }
  );
});

// Helper function to show status messages
function showStatus(elementId, message, type) {
  const element = document.getElementById(elementId);
  element.textContent = message;
  element.className = `status ${type}`;
  element.style.display = "block";

  // Hide the message after 3 seconds
  setTimeout(() => {
    element.style.display = "none";
  }, 3000);
}

// Function to check API key validity (basic format check)
function checkApiKey(service, apiKey) {
  const statusElement = document.getElementById(`${service}-status`);

  if (!apiKey) {
    statusElement.textContent = "No API key provided";
    statusElement.className = "api-status invalid";
    return;
  }

  // Basic validation patterns for each service
  const patterns = {
    openai: /^sk-[a-zA-Z0-9]{32,}$/,
    deepseek: /^sk-[a-zA-Z0-9]{32,}$/,
    groq: /^gsk_[a-zA-Z0-9]{32,}$/,
  };

  if (patterns[service].test(apiKey)) {
    statusElement.textContent = "API key format looks valid";
    statusElement.className = "api-status valid";
  } else {
    statusElement.textContent = "API key format appears invalid";
    statusElement.className = "api-status invalid";
  }
}

// Add event listeners for API key validation on input
document.getElementById("openai-api-key").addEventListener("input", (e) => {
  checkApiKey("openai", e.target.value.trim());
});

document.getElementById("deepseek-api-key").addEventListener("input", (e) => {
  checkApiKey("deepseek", e.target.value.trim());
});

document.getElementById("groq-api-key").addEventListener("input", (e) => {
  checkApiKey("groq", e.target.value.trim());
});

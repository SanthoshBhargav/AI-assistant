function addAskAIButton() {
  console.log("Adding AskAI button to LeetCode problem page...");
  if (document.getElementById("ask-ai-button")) return;

  const container = document.querySelector("div[data-track-load='description_content']") ||
                    document.querySelector(".problems_problem_content__Xm_eO");
  if (!container) return;
    console.log("container found, adding button...");
  const button = document.createElement("button");
  button.innerText = "AskAI";
  button.id = "ask-ai-button";
  button.style.cssText = "margin:10px;padding:8px 12px;background:#2563eb !important;color:#fff !important;border:none;border-radius:5px;cursor:pointer;";
  
  button.onclick = async () => {
    const questionText = document.querySelector("div[data-track-load='description_content']")?.innerText;
    if (!questionText) {
      alert("LeetCode problem not found.");
      return;
    }

    chrome.storage.sync.get(["groqApiKey", "groqModel"], async (result) => {
      const apiKey = result.groqApiKey;
      const model = result.groqModel || "llama-3.3-70b-versatile"; 
      if (!apiKey) {
        alert("GROQ API key not set. Please set it in the extension popup.");
        return;
      }

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: "system", content: "You are a coding assistant helping users with LeetCode problems." },
            { role: "user", content: `Can you help me understand this problem?\n\n${questionText}` }
          ]
        })
      });

      const data = await response.json();
      if (!response.ok) {
          console.error("Error from Groq API:", data);
          alert("Error fetching response from Groq : " + (data.error?.message || "Unknown error"));
          return;
      }
      const markDownReply = data.choices?.[0]?.message?.content ;
      // const reply = "This is a placeholder response from the AI. Replace this with actual API call logic.";
    //   alert(reply);
      const reply = markDownReply
                    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
                    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
                    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
                    .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>")
                    .replace(/\*(.*)\*/gim, "<i>$1</i>")
                    .replace(/~~(.*?)~~/gim, "<del>$1</del>")
                    .replace(/```([\s\S]*?)```/gim, "<pre><code>$1</code></pre>")
                    .replace(/`(.*?)`/gim, "<code>$1</code>")
                    .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img src='$2' alt='$1' />")
                    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
                    .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
                    .replace(/^(-{3,}|\*{3,})$/gim, "<hr />")
                    .replace(/^\* (.*)/gim, "<ul><li>$1</li></ul>")
                    .replace(/^- (.*)/gim, "<ul><li>$1</li></ul>")
                    .replace(/\n/gim, "<br />");


      const replyInnerContainer = document.createElement("div");
      const replyContainer = document.createElement("div");
      const backButton = document.createElement("button");
      backButton.innerText = "Back";
      backButton.style.cssText = "position: absolute; top: 10px; right: 10px; padding: 5px 10px; background: #f87171; color: #fff; border: none; border-radius: 5px; cursor: pointer; z-index: 1001;";
      backButton.onclick = () => {
        replyInnerContainer.remove();
      };
      replyContainer.innerHTML = reply;
      replyContainer.style.cssText = `
            padding: 20px;
            background-color: #2b2a2a;
            color: #f0f0f0;
            border-radius: 5px;
            margin: auto;
            width: calc(100% - 20px);
            height: calc(100% - 20px);
            max-height: 90vh;
            max-width: 90vw;
            overflow: auto;
            z-index: 1000;`;
      replyInnerContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;`;
      container.appendChild(replyInnerContainer);
      replyInnerContainer.appendChild(replyContainer);
      replyContainer.appendChild(backButton);
    });
  };

  container.prepend(button);
}

window.addEventListener("load", () => {
  setTimeout(addAskAIButton, 2000);
});

# 🧠 AI Assistant Extension

A powerful browser extension that integrates AI to assist users with solving coding problems on **LeetCode** and **GeeksforGeeks (GFG)**. The extension enables direct, real-time interaction with AI models to get help with understanding, debugging, and solving problems—all within the coding platform itself.

## 🚀 Features

- 🔍 **AI-Powered Coding Help**  
  Instantly get explanations, hints, or solutions for any LeetCode or GFG problem using AI.

- 🔐 **Multi-Provider Support**  
  Seamlessly switch between **OpenAI**, **DeepSeek**, and **Groq** using your own API keys. Secure input interface ensures your credentials remain private.

- 🧠 **Context-Aware Responses**  
  Uses **DOM parsing** to extract the problem content and send it to the AI, ensuring highly relevant responses.

- 🛠️ **Built with:**
  - JavaScript
  - Chrome Extension APIs (Manifest V3)
  - DOM manipulation

## 📦 Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/ai-assistant-extension.git
   ```

2. Open **Chrome** and go to:  
   `chrome://extensions/`

3. Enable **Developer mode** (top right corner).

4. Click on **Load unpacked** and select the extension's root folder.

5. You’ll see the AI Assistant Extension added to your browser.

## 🔧 Setup

- Click on the extension icon in the toolbar.
- Enter your preferred API key for **OpenAI**, **DeepSeek**, or **Groq** in the input field.
- You can now click the **"Ask AI"** button directly on LeetCode or GFG problem pages.

## 🛡️ Security Note

Your API keys are stored only in the local extension storage and are never shared externally.

## 📌 Use Cases

- Getting hints without revealing full solutions
- Explaining complex problem statements
- Learning alternative solution strategies

## 📚 Future Improvements

- Support for more coding platforms (e.g., Codeforces, HackerRank)
- Theme customization and chat history
- AI-powered test case generation

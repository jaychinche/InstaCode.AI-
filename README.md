# InstaCode.AI – Instant coding help via chat inside VS Code.

CodeMate.AI is a powerful Visual Studio Code extension that integrates a React-based chat interface with Gemini AI. It allows developers to generate or refactor code using natural language, and supports contextual awareness of the workspace, including file and image attachments via `@filename` syntax.

---

## 📦 Features

 React-powered chat UI inside VS Code WebView  
 AI-based code generation and refactoring (Gemini API)  
`@filename` support to attach and reference workspace files  
Supports markdown and syntax-highlighted code blocks  
Clean chat interface with user and AI message bubbles  
Seamless interaction with workspace files and context  

---

## 🛠️ Tech Stack

| Layer       | Technology                       |
|-------------|----------------------------------|
| Language    | TypeScript                       |
| Frontend    | React (inside VS Code WebView)   |
| Backend/API | Node.js                          |
| AI Model    | Gemini AI API                    |
| Extension   | VS Code Extension API            |

---

## 📂 Project Structure

```

CodeMate.AI/
├── media/                 # React app build for WebView
├── src/                   # Extension backend and messaging
│   ├── extension.ts       # VS Code entry point
│   └── utils/             # Helper functions
├── react-app/             # Source code for React chat interface
│   ├── components/
│   ├── App.tsx
│   └── index.tsx
├── package.json
├── tsconfig.json
└── README.md

````

---

## 🎥 Demo Video

👉 Watch the demo:  
[🔗 Drive Folder (Video)](https://drive.google.com/drive/folders/1foeDD5wyuE-GLMmGa2es2hp4KNo_28N_?usp=sharing)

---

## 🖼️ Screenshots

<!-- Insert screenshots below -->

### 💬 Chat Interface
<img width="1440" alt="Screenshot 2025-06-24 at 12 53 27 PM" src="https://github.com/user-attachments/assets/1ff32fb8-e87e-4299-a144-5bfd2fbbc693" />



### 📎 File Attachment with @filename

<img width="1440" alt="Screenshot 2025-06-24 at 12 53 34 PM" src="https://github.com/user-attachments/assets/6d65d03a-af07-4f17-99ff-1ae6cd2401b7" />

---

## 📥 Installation (Development)

1. Clone the repository:
   ```bash
   git clone https://github.com/jaychinche/CodeMate.AI.git
   cd CodeMate.AI
````

2. Install dependencies:

   ```bash
   npm install
   cd react-app && npm install && npm run build && cd ..
   ```

3. Launch in VS Code:

   * Press `F5` to open the extension in a new VS Code window (Extension Development Host).

---

## 🔐 API Setup

Create a `.env` file in the root with your Gemini AI key:

```env
GEMINI_API_KEY=your-gemini-api-key-here
```

---

## 🙋 About the Developer

* **👨‍💻 Name:** Jay Chinche
* **📱 Mobile:** +91 7558382230
* **📧 Email:** [chinchejay@gmail.com](mailto:chinchejay@gmail.com)
* **🌐 GitHub:** [github.com/jaychinche](https://github.com/jaychinche)






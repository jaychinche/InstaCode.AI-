// README for AI Chat Assistant VS Code Extension
# AI Chat Assistant VS Code Extension

A Visual Studio Code extension that provides a React-based AI chat assistant panel. The assistant supports:
- Markdown and syntax-highlighted code blocks
- File and image attachment via `@filename` mentions
- AI code generation using OpenAI API

## Features
- Open the chat panel: `Open AI Chat Assistant` from the Command Palette
- Attach files by typing `@filename` in your message
- Clean, minimal UI

## Setup
1. Install dependencies:
   ```sh
   npm install
   ```
2. Build the extension:
   ```sh
   npm run build
   ```
3. Set your OpenAI API key in `.vscode/settings.json`:
   ```json
   {
     "aiChat.openaiApiKey": "YOUR_OPENAI_API_KEY_HERE"
   }
   ```
4. Press `F5` to launch the extension in a new Extension Development Host window.

## Packaging
To package the extension for distribution:
```sh
npm run package
```

## Contact
Share your demo video and code as instructed in the assignment.

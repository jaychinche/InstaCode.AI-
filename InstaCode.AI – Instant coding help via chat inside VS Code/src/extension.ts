// Extension entry point
import * as vscode from 'vscode';
import * as path from 'path';
import { getNonce } from './getNonce';
import { GoogleGenAI } from "@google/genai";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('aiChat.openChat', () => {
      const panel = vscode.window.createWebviewPanel(
        'aiChat',
        'AI Chat Assistant',
        vscode.ViewColumn.Beside,
        {
          enableScripts: true,
          // Only allow webview to load resources from out/media (remove 'media')
          localResourceRoots: [
            vscode.Uri.joinPath(context.extensionUri, 'out', 'media')
          ]
        }
      );
      panel.webview.html = getWebviewContent(panel.webview, context, panel);
      panel.webview.onDidReceiveMessage(async (message) => {
        if (message.type === 'getFiles') {
          const files = await vscode.workspace.findFiles('**/*');
          panel.webview.postMessage({ type: 'files', files: files.map(f => f.fsPath) });
        } else if (message.type === 'readFile') {
          try {
            if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length === 0) {
              panel.webview.postMessage({ type: 'fileContent', path: message.path, content: 'No workspace open.' });
              return;
            }
            const workspaceRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;
            // Remove leading slash if present
            const relPath = message.path.replace(/^\/+/, '');
            const absPath = path.join(workspaceRoot, relPath);
            const uri = vscode.Uri.file(absPath);
            const content = (await vscode.workspace.fs.readFile(uri)).toString();
            panel.webview.postMessage({ type: 'fileContent', path: message.path, content });
          } catch (err) {
            panel.webview.postMessage({ type: 'fileContent', path: message.path, content: `File not found: ${message.path}` });
          }
        } else if (message.type === 'sendToAI') {
          // Use Gemini 2.5 model via @google/genai
          try {
            // If any attachments, prepend their content to the prompt
            let prompt = '';
            const lastMsg = message.messages[message.messages.length - 1];
            if (lastMsg && lastMsg.attachments && lastMsg.attachments.length > 0) {
              for (const att of lastMsg.attachments) {
                if (att.content) {
                  prompt += `Here is the content of ${att.filename}:\n-------------------------------\n${att.content}\n-------------------------------\n\n`;
                }
              }
              prompt += lastMsg.content;
            } else {
              prompt = message.messages.map((m: any) => m.content).join('\n');
            }
            const ai = new GoogleGenAI({ apiKey: "AIzaSyASZDTgxsvpYs9l0elkmKyv5bnAAqzjv64" });
            const response = await ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: prompt,
            });
            const aiText = response.text || 'No response from Gemini.';
            panel.webview.postMessage({ type: 'aiResponse', content: aiText });
          } catch (e) {
            panel.webview.postMessage({ type: 'aiResponse', content: 'Error contacting Gemini AI.' });
          }
        }
      });
    })
  );
}

export function deactivate() {}

function getWebviewContent(webview: vscode.Webview, context: vscode.ExtensionContext, panel: vscode.WebviewPanel): string {
  // Use 'out/media' instead of 'media' for built files
  const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'out', 'media', 'main.js'));
  const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'out', 'media', 'main.css'));
  const nonce = getNonce();
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}'; img-src ${webview.cspSource} data:;">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="${styleUri}" rel="stylesheet" />
      <title>AI Chat Assistant</title>
    </head>
    <body>
      <div id="root"></div>
      <script nonce="${nonce}" src="${scriptUri}"></script>
    </body>
    </html>
  `;
}

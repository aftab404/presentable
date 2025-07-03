# Presentable

A Chrome extension that automatically generates presentation slides from your browsing history using AI.

## 🚀 Features

- **Automatic History Tracking**: Records your browsing activity when enabled
- **AI-Powered Presentations**: Uses OpenAI to generate meaningful Marp presentations from your browsing patterns
- **Context Customization**: Add personal context to tailor the presentation content
- **Marp Integration**: Generates presentation-ready markdown using the Marp format
- **Easy Reset**: Clear history and start fresh anytime

## 🏗️ Architecture

The project consists of two main components:

### Frontend (Chrome Extension)
- **manifest.json**: Extension configuration and permissions
- **popup.html/css/js**: User interface for controlling the extension
- **content.js**: Content script for browser interaction

### Backend (Node.js Server)
- **server.js**: Express server with OpenAI integration
- REST API endpoint for presentation generation

## 📋 Prerequisites

- Node.js (v14 or higher)
- Chrome browser
- OpenAI API key

## 🛠️ Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3000
   ```

4. Start the server:
   ```bash
   node server.js
   ```

   The server will run on `http://localhost:3000`

### Chrome Extension Setup

1. Open Chrome and navigate to `chrome://extensions/`

2. Enable "Developer mode" in the top right corner

3. Click "Load unpacked" and select the `frontend` folder

4. The Presentable extension should now appear in your extensions list

## 🎯 Usage

### Recording Browsing History

1. Click on the Presentable extension icon in your Chrome toolbar
2. Click the **Start** button to begin recording your browsing activity
3. The indicator will turn green, showing that recording is active
4. Browse websites relevant to your research or work
5. Click **Stop** when you want to end the recording session

### Generating Presentations

1. Ensure your backend server is running (`http://localhost:3000`)
2. (Optional) Add context in the text area to customize your presentation
3. Click **Make Presentation** to generate your slides
4. The AI will analyze your browsing history and create a Marp presentation
5. The generated markdown will appear in the extension popup

### Managing Data

- Click **Reset** to clear all recorded history and generated presentations
- Your data is stored locally in Chrome's extension storage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Troubleshooting

### Common Issues

**Extension not working:**
- Ensure the backend server is running on `http://localhost:3000`
- Check that you have the required permissions enabled
- Verify your OpenAI API key is correctly set in the `.env` file

**Presentation generation fails:**
- Confirm your OpenAI API key is valid and has sufficient credits
- Check the browser console for error messages
- Ensure you have recorded some browsing history before generating

**CORS errors:**
- The backend includes CORS middleware, but ensure no firewall is blocking requests
- Try accessing `http://localhost:3000` directly to verify the server is running

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Open an issue on the project repository

---

**Built with ❤️ for researchers, students, and professionals who want to turn their browsing into beautiful presentations.** 
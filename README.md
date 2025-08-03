# Jinfeng He - Portfolio

A modern, interactive portfolio website showcasing Jinfeng's experience, projects, and skills with an advanced AI-powered chat assistant.

## Features

- **Interactive AI Chat Assistant**: Powered by RAG (Retrieval-Augmented Generation) technology using Google Gemini 2.5 Flash
- **Persona-Driven AI**: The AI speaks as Jinfeng himself, creating authentic conversations
- **Comprehensive Knowledge Base**: Detailed information about experience, projects, skills, and background
- **Modern UI/UX**: Manga-style panel layout with smooth animations
- **Responsive Design**: Works seamlessly across all devices
- **Professional Sections**: Experience, Projects, Skills, Resume, Contact, and About

## AI Assistant Features

The portfolio includes a sophisticated AI chat assistant with the following capabilities:

### RAG Technology
- **Semantic Search**: Intelligent retrieval of relevant information
- **Contextual Responses**: AI-generated answers based on knowledge base
- **Google Gemini 2.5 Flash Integration**: Latest language model for natural conversations
- **Persona-Driven**: AI speaks as Jinfeng in first person
- **Fallback System**: Reliable responses even when AI is unavailable

### Knowledge Areas
- Work experience (Montaura.tech, Vosyn.AI, Alibaba Group, USoustenir)
- Research projects (REBL, Clinical RAG System)
- Technical projects (Warehouse Management, Webtama)
- Technical skills and expertise
- Education and academic background
- Personal interests and background
- Contact information

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Google AI API key (optional, for enhanced AI responses)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GGCav/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup (Optional)**
   
   For enhanced AI responses, create a `.env.local` file in the root directory:
   ```env
   REACT_APP_GEMINI_API_KEY=your_google_ai_api_key_here
   ```
   
   To get a Google AI API key:
   1. Visit [Google AI Studio](https://aistudio.google.com/)
   2. Create a new project
   3. Generate an API key
   4. Add it to your `.env.local` file

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## AI Assistant Modes

### RAG + Gemini Mode (Default)
- Uses Google Gemini 2.5 Flash for intelligent, contextual responses
- Requires Google AI API key
- Provides the most sophisticated and natural conversations
- AI speaks as Jinfeng in first person

### Fallback Mode
- Uses keyword-based response system
- Works without any API keys
- Provides reliable, pre-programmed responses
- Also speaks as Jinfeng in first person

Toggle between modes using the "AI ON/OFF" button in the chat interface.

## Project Structure

```
portfolio/
├── public/
│   ├── knowledge-base.md          # Comprehensive knowledge base
│   ├── Jinfeng_He_Resume_073124.pdf
│   └── ...
├── src/
│   ├── components/
│   │   ├── Chatbox.js             # AI chat assistant
│   │   ├── About.js               # About section
│   │   ├── Experience.js          # Work experience
│   │   ├── Projects.js            # Project showcase
│   │   ├── Services.js            # Skills section
│   │   ├── Resume.js              # Resume display
│   │   └── Contact.js             # Contact information
│   ├── utils/
│   │   └── ragSystem.js           # RAG system implementation
│   ├── App.js                     # Main application
│   └── App.css                    # Styling
└── package.json
```

## Technologies Used

### Frontend
- **React.js**: Component-based UI framework
- **React Router**: Client-side routing
- **React Icons**: Icon library
- **CSS Grid**: Layout system

### AI & Backend
- **Google GenAI**: Latest Google AI SDK
- **Gemini 2.5 Flash**: Advanced language model
- **RAG System**: Retrieval-Augmented Generation
- **Semantic Search**: Intelligent information retrieval

### Development
- **Create React App**: Development environment
- **npm**: Package management
- **GitHub Pages**: Deployment platform

## Customization

### Adding New Information
1. Update `public/knowledge-base.md` with new information
2. The AI assistant will automatically use the updated knowledge base

### Modifying AI Responses
1. Edit `src/utils/ragSystem.js` to modify the knowledge chunks
2. Update the semantic search algorithm if needed
3. Customize the AI prompts for different response styles

### Styling Changes
1. Modify `src/App.css` for layout changes
2. Update component-specific styles in individual component files

## Deployment

The portfolio is configured for deployment on GitHub Pages:

```bash
npm run deploy
```

This will build the project and deploy it to the `gh-pages` branch.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

- **Email**: jeffreyhe406@gmail.com
- **LinkedIn**: [Jinfeng He](https://www.linkedin.com/in/jinfeng-he-142080302)
- **GitHub**: [GGCav](https://github.com/GGCav)

---

Built with ❤️ using React and advanced AI technology

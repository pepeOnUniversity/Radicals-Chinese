# Learn 214 Chinese Radicals 🇨🇳

A modern, interactive web application for learning the 214 traditional Chinese radicals. Built with vanilla HTML, CSS, JavaScript, and TailwindCSS for a fast, responsive experience.

![Screenshot of the app](https://via.placeholder.com/800x400?text=Learn+214+Chinese+Radicals)

## ✨ Features

- **📚 Complete Radical Library**: Browse all 214 traditional Chinese radicals
- **🖼️ Visual Learning**: High-quality SVG images for supported radicals
- **🔍 Smart Search**: Find radicals by character, name, meaning, or pinyin
- **🎯 Interactive Quiz**: Test your knowledge with randomized multiple-choice questions
- **🔊 Audio Pronunciation**: Listen to pinyin pronunciation using Web Speech API
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **⚡ Fast & Offline-Ready**: Client-side app with no server dependencies
- **🎨 Modern UI**: Clean, minimal design with smooth animations and hover effects
- **♿ Accessible**: Keyboard navigation and semantic HTML
- **🚀 Lazy Loading**: Optimized image loading for better performance

## 🚀 Quick Start

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (for CORS compliance when loading JSON)

### Installation

1. **Clone or download this repository**
   ```bash
   git clone <repository-url>
   cd chinese-radicals-app
   ```

2. **Serve the files locally**
   
   Choose one of these methods:

   **Option A: Using Python (if installed)**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Option B: Using Node.js (if installed)**
   ```bash
   npx http-server
   ```

   **Option C: Using PHP (if installed)**
   ```bash
   php -S localhost:8000
   ```

   **Option D: Using VS Code Live Server extension**
   - Install the "Live Server" extension
   - Right-click on `index.html` and select "Open with Live Server"

3. **Open your browser**
   Navigate to `http://localhost:8000` (or the port shown in your terminal)

## 📁 Project Structure

```
chinese-radicals-app/
├── index.html          # Main HTML file with all sections
├── styles.css          # Custom CSS styles (separated from HTML)
├── app.js              # JavaScript functionality
├── radicals.json       # Sample radical data (10 radicals)
├── README.md           # This file
└── favicon.ico         # (Generated inline as SVG)
```

## 🎮 How to Use

### Navigation
- **Home**: Landing page with app overview and features
- **Radicals**: Browse and search through all radicals
- **Quiz**: Test your knowledge with interactive quizzes

### Radicals Section
- **Browse**: Scroll through all available radicals
- **Search**: Type in the search box to filter by:
  - Hanzi character (一, 人, 水)
  - Name (Nhất, Nhân, Thủy)
  - Meaning (one, person, water)
  - Pinyin (yī, rén, shuǐ)
- **Details**: Click any radical card to see examples and pronunciation

### Quiz Section
- Take randomized quizzes with 10 questions each
- Get instant feedback on your answers
- See your final score with personalized messages
- Retry quizzes as many times as you want

### Keyboard Shortcuts
- `1`: Navigate to Home
- `2`: Navigate to Radicals
- `3`: Navigate to Quiz  
- `Escape`: Close modal dialogs

## 🔧 Customization

### Adding More Radicals

Edit `radicals.json` to add more radicals following this format:

```json
{
  "id": 11,
  "hanzi": "入",
  "name": "Nhập",
  "pinyin": "rù",
  "meaning": "enter",
  "examples": ["入", "内", "全", "八"],
  "image": "https://example.com/radical-image.svg"
}
```

**Note**: The `image` field is optional. If not provided, only the hanzi character will be displayed. Images should be:
- SVG format for best quality and scaling
- Hosted on reliable CDNs (like Wikimedia Commons)
- Approximately square aspect ratio
- Accessible via HTTPS

### Styling Changes

The app uses TailwindCSS for utility classes and a separate `styles.css` file for custom styles:

**Custom Styles (`styles.css`):**
- Gradient backgrounds and text effects
- Card hover animations and transitions
- Radical image styling and hover effects
- Quiz option states and colors
- Grid layout for radical cards

**TailwindCSS Classes:**
- Layout and spacing utilities
- Responsive design breakpoints
- Basic color and typography utilities

**To customize:**
- Edit `styles.css` for custom components and animations
- Modify TailwindCSS classes directly in the HTML for layout changes

### Adding New Features

The modular JavaScript structure makes it easy to add:
- More quiz types
- Difficulty levels
- Progress tracking
- Additional radical information

## 🌐 Deployment

### GitHub Pages

1. **Create a GitHub repository** and push your code
2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"
3. **Access your app** at `https://username.github.io/repository-name`

### Vercel

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```
   
   Or upload your project folder to [vercel.com](https://vercel.com)

3. **Your app will be live** at the provided URL

### Netlify

1. **Drag and drop** your project folder to [netlify.com/drop](https://netlify.com/drop)
2. **Or use Git**: Connect your GitHub repository at [netlify.com](https://netlify.com)
3. **Configure build settings** (not needed for static sites)
4. **Deploy** and get your live URL

### Other Static Hosting

This app works on any static hosting service:
- **Firebase Hosting**
- **Surge.sh**  
- **Cloudflare Pages**
- **AWS S3** (with static website hosting)

## 🔊 Browser Compatibility

### Web Speech API Support
The pronunciation feature uses the Web Speech API:
- ✅ **Chrome/Chromium**: Full support
- ✅ **Edge**: Full support  
- ✅ **Safari**: Supported (may require user interaction)
- ⚠️ **Firefox**: Limited support (may not work)

### General Compatibility
- Modern browsers (ES6+ support required)
- Mobile browsers (iOS Safari, Chrome Mobile, etc.)
- Progressive Web App features ready

## 🛠️ Development

### Local Development

1. **Make changes** to HTML, CSS, or JavaScript
2. **Refresh browser** to see updates
3. **Test on different devices** using browser dev tools

### Adding New Sections

To add a new section:

1. **Add HTML section** with `section-content` class
2. **Add navigation button** with `nav-btn` class
3. **Update `showSection()` function** in `app.js`
4. **Style as needed**

### Performance Tips

- The app loads quickly as it's entirely client-side
- Images are minimal (using emojis and SVG favicon)
- TailwindCSS is loaded from CDN for development
- Consider self-hosting TailwindCSS for production

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Ideas for Contributions
- Add all 214 radicals to the JSON file
- Implement stroke order animations
- Add difficulty levels to quizzes
- Create flashcard mode
- Add traditional/simplified character toggle
- Implement progress tracking with local storage

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Chinese Radical Data**: Based on the 214 traditional Kangxi radicals
- **Fonts**: Inter font family from Google Fonts
- **Icons**: Emoji characters for visual elements
- **Framework**: TailwindCSS for styling

## 📞 Support

If you encounter any issues:

1. **Check the browser console** for error messages
2. **Ensure you're serving the files** via HTTP (not file://)
3. **Verify JSON syntax** if you've modified `radicals.json`
4. **Test in different browsers** to isolate issues

For bugs and feature requests, please open an issue in the repository.

---

**Made with ❤️ for Chinese language learners worldwide**

*Start your journey to mastering Chinese characters today!*

# Temple Beth Shalom - Community Bulletin Board

A beautiful, responsive landing page for an Orthodox synagogue that serves as a local community bulletin board with comprehensive image management capabilities.

## ✨ Features

### 🏛️ Beautiful Orthodox Synagogue Design
- Respectful traditional design with modern aesthetics
- Professional typography and color scheme
- Orthodox-appropriate imagery and content
- Star of David and Jewish cultural elements

### 📢 Community Bulletin Board
- Add, edit, and delete announcements with priority levels
- Visual priority indicators (High, Medium, Low)
- Date sorting and formatting
- Responsive card layout with hover effects

### 📅 Events Calendar
- Full event management system
- Time and date scheduling
- Event descriptions and details
- Organized by month for easy viewing

### 🖼️ Image Gallery & Management
- Add new images with URLs
- Replace existing images
- Delete images with confirmation
- Image overlay with title and actions
- Lazy loading for performance

### ⚙️ Comprehensive Admin Panel
- Full content management system
- Data export functionality
- System statistics and information
- Clear all data with safety confirmations
- Tabbed interface for easy navigation

### 💾 Robust Persistent Storage
- Automatic fallback to in-memory storage
- Cross-browser compatibility
- Data persistence across sessions
- Automatic initialization with sample data
- Export functionality for data backup

### 📱 Fully Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions
- Collapsible navigation on mobile

### ♿ Accessibility Features
- High contrast mode support
- Reduced motion preferences
- Focus indicators and keyboard navigation
- Screen reader friendly markup
- Alt text for all images

### 🛠️ Technical Excellence
- React 18 with TypeScript
- Error boundaries and comprehensive error handling
- Loading states and performance monitoring
- Code splitting and lazy loading
- PWA ready architecture

## 🚀 Getting Started

### Option 1: Development Server (Recommended)

1. **Install Node.js** from [https://nodejs.org/](https://nodejs.org/) if you don't have it
2. **Open terminal/command prompt** in the project folder
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start development server**:
   ```bash
   npm run dev
   ```
5. **Open the URL shown** (usually http://localhost:5173)

### Option 2: Build and Serve Static Files

If you want a static build:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Serve the `dist` folder** with any web server

### Option 3: Quick HTTP Server

For immediate testing without npm:

1. **Use a simple HTTP server**:
   ```bash
   npx serve .
   ```
   or
   ```bash
   python -m http.server 8000
   ```

2. **Open http://localhost:8000**

## 🔧 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 📁 Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx      # Main navigation header
│   │   ├── Hero.tsx        # Welcome section
│   │   ├── BulletinBoard.tsx   # Announcements management
│   │   ├── EventsCalendar.tsx  # Events calendar
│   │   ├── ImageGallery.tsx    # Image gallery management
│   │   ├── ContactInfo.tsx     # Contact information
│   │   ├── AdminPanel.tsx      # Admin controls
│   │   ├── ErrorBoundary.tsx   # Error handling
│   │   └── LoadingSpinner.tsx  # Loading components
│   ├── hooks/               # Custom React hooks
│   │   └── usePersistentData.ts  # Persistent data management
│   ├── utils/              # Utility functions
│   │   ├── persistentStorage.ts # Storage implementation
│   │   ├── storage.ts      # Enhanced storage helpers
│   │   └── errors.ts       # Error handling utilities
│   ├── types.ts            # TypeScript type definitions
│   ├── App.tsx             # Main application component
│   └── index.tsx           # Application entry point
├── public/                 # Static assets
├── dist/                   # Build output
└── package.json           # Dependencies and scripts
```

## 🎯 Admin Panel

Click the gear icon (⚙️) in the header to access the admin panel where you can:

- **Announcements**: View, manage, and delete all community announcements
- **Events**: Oversee all upcoming events and calendar items
- **Images**: Browse and manage the gallery
- **Settings**: Export data for backup, clear all data, view system statistics

## 🖼️ Image Management

### Adding Images
1. Click "Add Image" in the Gallery section
2. Provide an image URL (from any hosting service)
3. Add descriptive alt text and title
4. Submit to add to the gallery

### Replacing Images
1. Click on any image to select it
2. Use the "Replace" button in the overlay
3. Provide new image URL and optional updates
4. Submit to replace the image

### Deleting Images
1. Click on any image
2. Use the "Delete" button in the overlay
3. Confirm deletion in the dialog

## 💾 Data Storage

All data is stored using a robust storage system with automatic fallbacks:

1. **Primary**: Browser's persistent storage API
2. **Fallback**: localStorage
3. **Final**: In-memory storage

### Data Types
- **announcements**: Array of announcement objects with priorities
- **events**: Array of event objects with dates and times
- **gallery_images**: Array of image objects with URLs and metadata

Data automatically persists across browser sessions and page refreshes.

## 🔧 Customization

The application is highly customizable:

- **Colors**: Modify CSS custom properties for theming
- **Content**: Update synagogue name, contact info, and content
- **Features**: Add more sections or integrate with external APIs
- **Styling**: Customize the Orthodox-appropriate design elements

## 🌐 Browser Compatibility

- **Chrome/Edge**: 85+
- **Firefox**: 79+
- **Safari**: 14+
- **Modern mobile browsers**: Full support

## 🛡️ Error Handling

The application includes comprehensive error handling:

- **Error Boundaries**: Prevent crashes with graceful fallbacks
- **Storage Fallbacks**: Multiple layers of data storage
- **Loading States**: Clear feedback during operations
- **Validation**: Input validation for all forms

## ⚡ Performance

- **Lazy Loading**: Components and images load on demand
- **Code Splitting**: Optimized bundle sizes
- **Efficient Re-renders**: React optimization techniques
- **Fast Loading**: Minimal initial bundle

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

---

**Note**: This is a complete, production-ready application that can be deployed immediately or further customized for specific synagogue needs.


import React, { useState, useEffect, Suspense } from 'react';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner, { LoadingOverlay } from './components/LoadingSpinner';
import { useAnnouncements, useEvents, useGalleryImages } from './hooks/usePersistentData';
import { handleError, safeAsync } from './utils/errors';
import { storageJSON } from './utils/storage';

// Dynamic imports for better performance
const Header = React.lazy(() => import('./components/Header'));
const Hero = React.lazy(() => import('./components/Hero'));
const BulletinBoard = React.lazy(() => import('./components/BulletinBoard'));
const EventsCalendar = React.lazy(() => import('./components/EventsCalendar'));
const ImageGallery = React.lazy(() => import('./components/ImageGallery'));
const ContactInfo = React.lazy(() => import('./components/ContactInfo'));
const AdminPanel = React.lazy(() => import('./components/AdminPanel'));

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [initializationError, setInitializationError] = useState<string | null>(null);

  // Use persistent data hooks
  const { 
    data: announcements, 
    loading: announcementsLoading, 
    error: announcementsError,
    replaceAll: setAnnouncements 
  } = useAnnouncements();

  const { 
    data: events, 
    loading: eventsLoading, 
    error: eventsError,
    replaceAll: setEvents 
  } = useEvents();

  const { 
    data: galleryImages, 
    loading: imagesLoading, 
    error: imagesError,
    replaceAll: setGalleryImages 
  } = useGalleryImages();

  // Initialize app with sample data
  useEffect(() => {
    const initializeApp = async () => {
      try {
        setInitializationError(null);
        
        // Check if we need to initialize with sample data
        const needsInitialization = await safeAsync(
          async () => {
            const storedAnnouncements = await storageJSON.get('announcements');
            const storedEvents = await storageJSON.get('events');
            const storedImages = await storageJSON.get('gallery_images');
            return !storedAnnouncements && !storedEvents && !storedImages;
          },
          false,
          'Check if app needs initialization'
        );

        if (needsInitialization) {
          // Sample data
          const sampleAnnouncements = [
            {
              id: '1',
              title: 'Shabbat Shalom!',
              content: 'Join us for services this Shabbat. Services begin at 9:00 AM followed by a delightful Kiddush lunch.',
              date: '2024-01-12',
              priority: 'high' as const
            },
            {
              id: '2', 
              title: 'Weekly Torah Study',
              content: 'Every Tuesday at 7:30 PM in the Main Sanctuary. All are welcome to study Parsha Vayikra.',
              date: '2024-01-15',
              priority: 'medium' as const
            },
            {
              id: '3',
              title: 'Community Seder Preparations',
              content: 'We are preparing for a beautiful community Passover Seder. Volunteers needed for setup and cooking.',
              date: '2024-01-20',
              priority: 'medium' as const
            }
          ];

          const sampleEvents = [
            {
              id: '1',
              title: 'Shabbat Services',
              date: '2024-01-13',
              time: '9:00 AM',
              description: 'Traditional Orthodox Shabbat morning services followed by Kiddush lunch.'
            },
            {
              id: '2',
              title: 'Torah Study',
              date: '2024-01-16',
              time: '7:30 PM',
              description: 'Weekly Torah study session focusing on the weekly portion.'
            },
            {
              id: '3',
              title: 'Purim Celebration',
              date: '2024-02-23',
              time: '6:00 PM',
              description: 'Community Purim celebration with Megillah reading and festive meal.'
            }
          ];

          const defaultGallery = [
            { 
              id: '1', 
              url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop', 
              alt: 'Synagogue Exterior', 
              title: 'Our Beautiful Synagogue' 
            },
            { 
              id: '2', 
              url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop', 
              alt: 'Torah Scroll', 
              title: 'Sacred Torah Scrolls' 
            },
            { 
              id: '3', 
              url: 'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=500&h=300&fit=crop', 
              alt: 'Prayer Service', 
              title: 'Community Prayer' 
            }
          ];

          // Initialize with sample data
          await Promise.all([
            setAnnouncements(sampleAnnouncements),
            setEvents(sampleEvents),
            setGalleryImages(defaultGallery)
          ]);
        }

        setAppReady(true);
      } catch (error) {
        handleError(error, 'App initialization failed');
        setInitializationError('Failed to initialize the application. Please refresh the page.');
        setAppReady(true); // Set to true so users can still interact
      }
    };

    initializeApp();
  }, [setAnnouncements, setEvents, setGalleryImages]);

  const isLoading = announcementsLoading || eventsLoading || imagesLoading;

  if (initializationError) {
    return (
      <div className="App">
        <div className="error-content">
          <h2>Initialization Error</h2>
          <p>{initializationError}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  if (!appReady) {
    return <LoadingOverlay message="Initializing Temple Beth Shalom..." />;
  }

  return (
    <ErrorBoundary>
      <div className="App">
        <Suspense fallback={<LoadingOverlay message="Loading components..." />}>
          <Header onAdminToggle={() => setShowAdmin(!showAdmin)} showAdmin={showAdmin} />
          <Hero />
          
          <main className="main-content">
            <Suspense fallback={<div className="loading-placeholder">Loading announcements...</div>}>
              <BulletinBoard 
                announcements={announcements} 
                onAnnouncementsChange={setAnnouncements}
              />
            </Suspense>
            
            <Suspense fallback={<div className="loading-placeholder">Loading events...</div>}>
              <EventsCalendar 
                events={events}
                onEventsChange={setEvents}
              />
            </Suspense>
            
            <Suspense fallback={<div className="loading-placeholder">Loading gallery...</div>}>
              <ImageGallery 
                images={galleryImages}
                onImagesChange={setGalleryImages}
              />
            </Suspense>
            
            <Suspense fallback={<div className="loading-placeholder">Loading contact info...</div>}>
              <ContactInfo />
            </Suspense>
          </main>
          
          {showAdmin && (
            <Suspense fallback={<LoadingOverlay message="Loading admin panel..." />}>
              <AdminPanel
                announcements={announcements}
                onAnnouncementsChange={setAnnouncements}
                images={galleryImages}
                onImagesChange={setGalleryImages}
                events={events}
                onEventsChange={setEvents}
              />
            </Suspense>
          )}
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;

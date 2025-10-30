
import React, { useState } from 'react';
import './AdminPanel.css';
import { Announcement, GalleryImage, Event } from '../types';
import { persistence } from '../utils/persistence';

interface AdminPanelProps {
  announcements: Announcement[];
  onAnnouncementsChange: (announcements: Announcement[]) => void;
  images: GalleryImage[];
  onImagesChange: (images: GalleryImage[]) => void;
  events: Event[];
  onEventsChange: (events: Event[]) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  announcements,
  onAnnouncementsChange,
  images,
  onImagesChange,
  events,
  onEventsChange
}) => {
  const [activeTab, setActiveTab] = useState<'announcements' | 'images' | 'events' | 'settings'>('announcements');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleDeleteAnnouncement = (id: string) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      const updated = announcements.filter(ann => ann.id !== id);
      onAnnouncementsChange(updated);
    }
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      const updated = events.filter(event => event.id !== id);
      onEventsChange(updated);
    }
  };

  const handleClearAllData = async () => {
    if (confirm('This will permanently delete ALL data. Are you absolutely sure?')) {
      try {
        await persistence.clear();
        onAnnouncementsChange([]);
        onImagesChange([]);
        onEventsChange([]);
        alert('All data has been cleared successfully.');
        setShowClearConfirm(false);
      } catch (error) {
        alert('Error clearing data: ' + error);
      }
    }
  };

  const exportData = () => {
    const data = {
      announcements,
      images,
      events,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `synagogue-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="admin-panel-overlay">
      <div className="admin-panel">
        <div className="admin-header">
          <h2>Admin Panel</h2>
          <div className="admin-tabs">
            <button 
              className={activeTab === 'announcements' ? 'active' : ''}
              onClick={() => setActiveTab('announcements')}
            >
              Announcements ({announcements.length})
            </button>
            <button 
              className={activeTab === 'events' ? 'active' : ''}
              onClick={() => setActiveTab('events')}
            >
              Events ({events.length})
            </button>
            <button 
              className={activeTab === 'images' ? 'active' : ''}
              onClick={() => setActiveTab('images')}
            >
              Images ({images.length})
            </button>
            <button 
              className={activeTab === 'settings' ? 'active' : ''}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </div>
        </div>

        <div className="admin-content">
          {activeTab === 'announcements' && (
            <div className="admin-section">
              <h3>Manage Announcements</h3>
              <div className="admin-list">
                {announcements.map(announcement => (
                  <div key={announcement.id} className="admin-item">
                    <div className="item-info">
                      <h4>{announcement.title}</h4>
                      <p>{announcement.content.substring(0, 100)}...</p>
                      <span className={`priority-badge ${announcement.priority}`}>
                        {announcement.priority}
                      </span>
                    </div>
                    <div className="item-actions">
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteAnnouncement(announcement.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="admin-section">
              <h3>Manage Events</h3>
              <div className="admin-list">
                {events.map(event => (
                  <div key={event.id} className="admin-item">
                    <div className="item-info">
                      <h4>{event.title}</h4>
                      <p>{event.description.substring(0, 100)}...</p>
                      <span className="event-meta">{event.date} at {event.time}</span>
                    </div>
                    <div className="item-actions">
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'images' && (
            <div className="admin-section">
              <h3>Manage Images</h3>
              <div className="admin-grid">
                {images.map(image => (
                  <div key={image.id} className="admin-image-card">
                    <img src={image.url} alt={image.alt} />
                    <div className="image-info">
                      <h4>{image.title}</h4>
                      <p>{image.alt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="admin-section">
              <h3>System Settings</h3>
              <div className="settings-grid">
                <div className="settings-card">
                  <h4>Data Export</h4>
                  <p>Export all data as a JSON file for backup purposes.</p>
                  <button onClick={exportData} className="export-btn">
                    Export Data
                  </button>
                </div>
                
                <div className="settings-card">
                  <h4>Data Management</h4>
                  <p>Clear all data from the system. This action cannot be undone.</p>
                  {!showClearConfirm ? (
                    <button 
                      onClick={() => setShowClearConfirm(true)}
                      className="danger-btn"
                    >
                      Clear All Data
                    </button>
                  ) : (
                    <div className="confirm-clear">
                      <p>Are you absolutely sure?</p>
                      <div className="confirm-actions">
                        <button 
                          onClick={() => setShowClearConfirm(false)}
                          className="cancel-btn"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={handleClearAllData}
                          className="confirm-clear-btn"
                        >
                          Yes, Clear Everything
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="settings-card">
                  <h4>System Information</h4>
                  <div className="system-stats">
                    <div className="stat">
                      <span className="stat-label">Total Announcements:</span>
                      <span className="stat-value">{announcements.length}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Total Events:</span>
                      <span className="stat-value">{events.length}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Total Images:</span>
                      <span className="stat-value">{images.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

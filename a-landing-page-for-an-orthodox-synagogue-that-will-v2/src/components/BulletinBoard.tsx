
import React, { useState } from 'react';
import './BulletinBoard.css';
import { Announcement } from '../types';
import { handleError, ValidationError } from '../utils/errors';

interface BulletinBoardProps {
  announcements: Announcement[];
  onAnnouncementsChange: (announcements: Announcement[]) => void;
}

const BulletinBoard: React.FC<BulletinBoardProps> = ({ announcements, onAnnouncementsChange }) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    date: '',
    priority: 'medium' as 'high' | 'medium' | 'low'
  });

  const validateForm = () => {
    if (!newAnnouncement.title.trim()) {
      throw new ValidationError('Title is required', 'title');
    }
    if (!newAnnouncement.content.trim()) {
      throw new ValidationError('Content is required', 'content');
    }
    if (!newAnnouncement.date) {
      throw new ValidationError('Date is required', 'date');
    }
    if (new Date(newAnnouncement.date) < new Date('2020-01-01')) {
      throw new ValidationError('Please select a valid date', 'date');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    try {
      setLoading(true);
      validateForm();

      const announcement: Announcement = {
        id: Date.now().toString(),
        title: newAnnouncement.title.trim(),
        content: newAnnouncement.content.trim(),
        date: newAnnouncement.date,
        priority: newAnnouncement.priority
      };

      const updated = [announcement, ...announcements];
      onAnnouncementsChange(updated);
      setNewAnnouncement({ title: '', content: '', date: '', priority: 'medium' });
      setShowForm(false);
    } catch (error) {
      handleError(error, 'Failed to add announcement');
      if (error instanceof ValidationError) {
        alert(error.message);
      } else {
        alert('Failed to add announcement. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewAnnouncement(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      handleError(error, 'Failed to format date');
      return dateString;
    }
  };

  const isFormValid = newAnnouncement.title.trim() && 
                     newAnnouncement.content.trim() && 
                     newAnnouncement.date;

  return (
    <section id="bulletin" className="bulletin-board">
      <div className="container">
        <div className="section-header">
          <h2>Community Bulletin Board</h2>
          <button 
            className="add-announcement-btn"
            onClick={() => setShowForm(!showForm)}
            disabled={loading}
          >
            {showForm ? 'Cancel' : loading ? 'Adding...' : 'Add Announcement'}
          </button>
        </div>

        {showForm && (
          <form className="announcement-form" onSubmit={handleSubmit}>
            <h3>Add New Announcement</h3>
            
            <div className="form-group">
              <label htmlFor="announcement-title">Title *</label>
              <input
                id="announcement-title"
                type="text"
                value={newAnnouncement.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter announcement title"
                required
                disabled={loading}
                maxLength={100}
              />
              <small className="form-hint">{newAnnouncement.title.length}/100 characters</small>
            </div>
            
            <div className="form-group">
              <label htmlFor="announcement-content">Content *</label>
              <textarea
                id="announcement-content"
                value={newAnnouncement.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Enter announcement details"
                rows={4}
                required
                disabled={loading}
                maxLength={1000}
              />
              <small className="form-hint">{newAnnouncement.content.length}/1000 characters</small>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="announcement-date">Date *</label>
                <input
                  id="announcement-date"
                  type="date"
                  value={newAnnouncement.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                  disabled={loading}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="announcement-priority">Priority</label>
                <select
                  id="announcement-priority"
                  value={newAnnouncement.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  disabled={loading}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            
            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={!isFormValid || loading}
              >
                {loading ? 'Posting...' : 'Post Announcement'}
              </button>
            </div>
          </form>
        )}

        <div className="announcements-list">
          {announcements.length === 0 ? (
            <div className="no-announcements">
              <p>No announcements yet. Be the first to share something with the community!</p>
            </div>
          ) : (
            announcements.map((announcement) => (
              <article 
                key={announcement.id} 
                className={`announcement-card ${getPriorityClass(announcement.priority)}`}
                role="article"
                aria-labelledby={`announcement-${announcement.id}-title`}
              >
                <div className="announcement-header">
                  <h3 
                    id={`announcement-${announcement.id}-title`}
                    className="announcement-title"
                  >
                    {announcement.title}
                  </h3>
                  <div className="announcement-meta">
                    <span className="announcement-date" aria-label="Announcement date">
                      {formatDate(announcement.date)}
                    </span>
                    <span 
                      className={`priority-badge ${announcement.priority}`}
                      aria-label={`Priority: ${announcement.priority}`}
                    >
                      {announcement.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
                <p className="announcement-content">{announcement.content}</p>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default BulletinBoard;

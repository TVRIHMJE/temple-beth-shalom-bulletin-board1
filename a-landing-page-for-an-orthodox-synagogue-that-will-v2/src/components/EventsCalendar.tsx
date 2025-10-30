
import React, { useState } from 'react';
import './EventsCalendar.css';
import { Event } from '../types';

interface EventsCalendarProps {
  events: Event[];
  onEventsChange: (events: Event[]) => void;
}

const EventsCalendar: React.FC<EventsCalendarProps> = ({ events, onEventsChange }) => {
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.description) {
      alert('Please fill in all required fields');
      return;
    }

    const event: Event = {
      id: Date.now().toString(),
      ...newEvent
    };

    const updated = [...events, event].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    onEventsChange(updated);
    setNewEvent({ title: '', date: '', time: '', description: '' });
    setShowForm(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatMonth = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long',
      year: 'numeric'
    });
  };

  // Group events by month
  const eventsByMonth = events.reduce((acc, event) => {
    const month = formatMonth(event.date);
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  return (
    <section id="events" className="events-calendar">
      <div className="container">
        <div className="section-header">
          <h2>Upcoming Events</h2>
          <button 
            className="add-event-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Add Event'}
          </button>
        </div>

        {showForm && (
          <form className="event-form" onSubmit={handleSubmit}>
            <h3>Add New Event</h3>
            <div className="form-group">
              <label>Event Title *</label>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                placeholder="Enter event title"
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Date *</label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Time *</label>
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Description *</label>
              <textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                placeholder="Enter event description"
                rows={3}
                required
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="submit-btn">Add Event</button>
            </div>
          </form>
        )}

        <div className="events-list">
          {events.length === 0 ? (
            <div className="no-events">
              <p>No upcoming events. Stay tuned for our next community gathering!</p>
            </div>
          ) : (
            Object.entries(eventsByMonth).map(([month, monthEvents]) => (
              <div key={month} className="month-group">
                <h3 className="month-header">{month}</h3>
                <div className="month-events">
                  {monthEvents.map((event) => (
                    <article key={event.id} className="event-card">
                      <div className="event-date">
                        <div className="event-day">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="event-weekday">
                          {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                      </div>
                      <div className="event-details">
                        <h4 className="event-title">{event.title}</h4>
                        <div className="event-time">
                          <span className="time-icon">🕐</span>
                          {event.time}
                        </div>
                        <p className="event-description">{event.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsCalendar;


import React, { useState } from 'react';
import './ImageGallery.css';
import { GalleryImage } from '../types';

interface ImageGalleryProps {
  images: GalleryImage[];
  onImagesChange: (images: GalleryImage[]) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImagesChange }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newImage, setNewImage] = useState({
    url: '',
    alt: '',
    title: ''
  });

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage.url || !newImage.alt || !newImage.title) {
      alert('Please fill in all required fields');
      return;
    }

    const image: GalleryImage = {
      id: Date.now().toString(),
      ...newImage
    };

    const updated = [image, ...images];
    onImagesChange(updated);
    setNewImage({ url: '', alt: '', title: '' });
    setShowAddForm(false);
  };

  const handleReplaceImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage || !newImage.url) {
      alert('Please provide an image URL');
      return;
    }

    const updated = images.map(img => 
      img.id === selectedImage.id 
        ? { ...img, url: newImage.url, alt: newImage.alt || img.alt, title: newImage.title || img.title }
        : img
    );
    
    onImagesChange(updated);
    setNewImage({ url: '', alt: '', title: '' });
    setSelectedImage(null);
  };

  const handleDeleteImage = (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      const updated = images.filter(img => img.id !== id);
      onImagesChange(updated);
    }
  };

  return (
    <section id="gallery" className="image-gallery">
      <div className="container">
        <div className="section-header">
          <h2>Community Gallery</h2>
          <button 
            className="add-image-btn"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Cancel' : 'Add Image'}
          </button>
        </div>

        {showAddForm && (
          <form className="image-form" onSubmit={handleAddImage}>
            <h3>Add New Image</h3>
            <div className="form-group">
              <label>Image URL *</label>
              <input
                type="url"
                value={newImage.url}
                onChange={(e) => setNewImage({...newImage, url: e.target.value})}
                placeholder="Enter image URL"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Alt Text *</label>
              <input
                type="text"
                value={newImage.alt}
                onChange={(e) => setNewImage({...newImage, alt: e.target.value})}
                placeholder="Describe the image"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={newImage.title}
                onChange={(e) => setNewImage({...newImage, title: e.target.value})}
                placeholder="Image title"
                required
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="submit-btn">Add Image</button>
            </div>
          </form>
        )}

        {selectedImage && (
          <form className="image-form" onSubmit={handleReplaceImage}>
            <h3>Replace Image: {selectedImage.title}</h3>
            <div className="form-group">
              <label>New Image URL *</label>
              <input
                type="url"
                value={newImage.url}
                onChange={(e) => setNewImage({...newImage, url: e.target.value})}
                placeholder="Enter new image URL"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Alt Text</label>
              <input
                type="text"
                value={newImage.alt}
                onChange={(e) => setNewImage({...newImage, alt: e.target.value})}
                placeholder="Update image description (optional)"
              />
            </div>
            
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={newImage.title}
                onChange={(e) => setNewImage({...newImage, title: e.target.value})}
                placeholder="Update image title (optional)"
              />
            </div>
            
            <div className="form-actions">
              <button type="button" onClick={() => setSelectedImage(null)} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="submit-btn">Replace Image</button>
            </div>
          </form>
        )}

        <div className="gallery-grid">
          {images.length === 0 ? (
            <div className="no-images">
              <p>No images in the gallery yet. Add some beautiful photos to showcase our community!</p>
            </div>
          ) : (
            images.map((image) => (
              <div key={image.id} className="gallery-item">
                <img 
                  src={image.url} 
                  alt={image.alt}
                  className="gallery-image"
                  onClick={() => setSelectedImage(image)}
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <h4 className="gallery-title">{image.title}</h4>
                  <div className="gallery-actions">
                    <button 
                      className="replace-btn"
                      onClick={() => setSelectedImage(image)}
                      title="Replace Image"
                    >
                      🔄
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteImage(image.id)}
                      title="Delete Image"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;

import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const NotificationIndicator = ({ className = "" }) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    // Simulate notification updates
    const updateNotifications = () => {
      const count = Math.floor(Math.random() * 5);
      setNotificationCount(count);
      setHasUnread(count > 0);
    };

    updateNotifications();
    const interval = setInterval(updateNotifications, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = () => {
    // Handle notification click - could open notification panel
    console.log('Notifications clicked');
    setHasUnread(false);
    setNotificationCount(0);
  };

  return (
    <button
      onClick={handleNotificationClick}
      className={`relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted transition-colors duration-200 min-w-[44px] min-h-[44px] ${className}`}
      aria-label={`Notifications ${hasUnread ? `(${notificationCount} unread)` : ''}`}
    >
      <Icon 
        name="Bell" 
        size={20} 
        className={`${hasUnread ? 'text-primary' : 'text-muted-foreground'}`} 
      />
      
      {hasUnread && notificationCount > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-accent rounded-full animate-pulse">
          {notificationCount > 9 ? '9+' : notificationCount}
        </span>
      )}
      
      {hasUnread && notificationCount === 0 && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></span>
      )}
    </button>
  );
};

export default NotificationIndicator;
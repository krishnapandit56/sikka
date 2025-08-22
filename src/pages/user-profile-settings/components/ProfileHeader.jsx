import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';


const ProfileHeader = ({ userProfile, onAvatarChange, currentLanguage }) => {
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  const content = {
    en: {
      editPhoto: 'Edit Photo',
      changeAvatar: 'Change Avatar',
      uploadNew: 'Upload New Photo',
      removePhoto: 'Remove Photo',
      member: 'Member',
      since: 'Since',
      verified: 'Verified',
      pending: 'Pending Verification'
    },
    hi: {
      editPhoto: 'फोटो संपादित करें',
      changeAvatar: 'अवतार बदलें',
      uploadNew: 'नई फोटो अपलोड करें',
      removePhoto: 'फोटो हटाएं',
      member: 'सदस्य',
      since: 'से',
      verified: 'सत्यापित',
      pending: 'सत्यापन लंबित'
    }
  };

  const handleAvatarUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onAvatarChange(e?.target?.result);
        setIsEditingAvatar(false);
      };
      reader?.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    onAvatarChange('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face');
    setIsEditingAvatar(false);
  };

  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 rounded-lg mb-6">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary-foreground/20">
            <Image
              src={userProfile?.avatar}
              alt={userProfile?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={() => setIsEditingAvatar(!isEditingAvatar)}
            className="absolute -bottom-1 -right-1 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center hover:bg-accent/90 transition-colors duration-200"
            aria-label={content?.[currentLanguage]?.editPhoto}
          >
            <Icon name="Camera" size={16} />
          </button>
          
          {isEditingAvatar && (
            <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-lg p-2 z-10 min-w-[200px]">
              <label className="flex items-center space-x-2 p-2 hover:bg-muted rounded cursor-pointer">
                <Icon name="Upload" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{content?.[currentLanguage]?.uploadNew}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleRemoveAvatar}
                className="flex items-center space-x-2 p-2 hover:bg-muted rounded w-full text-left"
              >
                <Icon name="Trash2" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{content?.[currentLanguage]?.removePhoto}</span>
              </button>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-1">{userProfile?.name}</h1>
          <div className="flex items-center space-x-4 text-sm opacity-90">
            <span>{content?.[currentLanguage]?.member} {content?.[currentLanguage]?.since} {userProfile?.memberSince}</span>
            <div className="flex items-center space-x-1">
              <Icon 
                name={userProfile?.isVerified ? "CheckCircle" : "Clock"} 
                size={16} 
                className={userProfile?.isVerified ? "text-success" : "text-warning"} 
              />
              <span>{userProfile?.isVerified ? content?.[currentLanguage]?.verified : content?.[currentLanguage]?.pending}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
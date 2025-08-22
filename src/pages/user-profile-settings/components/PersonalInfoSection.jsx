import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const PersonalInfoSection = ({ userProfile, onUpdateProfile, currentLanguage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name,
    mobile: userProfile?.mobile,
    email: userProfile?.email,
    language: userProfile?.language,
    dateOfBirth: userProfile?.dateOfBirth,
    occupation: userProfile?.occupation
  });
  const [isSaving, setIsSaving] = useState(false);

  const content = {
    en: {
      personalInfo: 'Personal Information',
      edit: 'Edit',
      save: 'Save Changes',
      cancel: 'Cancel',
      fullName: 'Full Name',
      mobileNumber: 'Mobile Number',
      emailAddress: 'Email Address',
      preferredLanguage: 'Preferred Language',
      dateOfBirth: 'Date of Birth',
      occupation: 'Occupation',
      saving: 'Saving...',
      saved: 'Profile updated successfully!'
    },
    hi: {
      personalInfo: 'व्यक्तिगत जानकारी',
      edit: 'संपादित करें',
      save: 'परिवर्तन सहेजें',
      cancel: 'रद्द करें',
      fullName: 'पूरा नाम',
      mobileNumber: 'मोबाइल नंबर',
      emailAddress: 'ईमेल पता',
      preferredLanguage: 'पसंदीदा भाषा',
      dateOfBirth: 'जन्म तिथि',
      occupation: 'व्यवसाय',
      saving: 'सहेज रहे हैं...',
      saved: 'प्रोफ़ाइल सफलतापूर्वक अपडेट हो गया!'
    }
  };

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'हिंदी (Hindi)' },
    { value: 'mr', label: 'मराठी (Marathi)' },
    { value: 'gu', label: 'ગુજરાતી (Gujarati)' }
  ];

  const occupationOptions = [
    { value: 'student', label: currentLanguage === 'en' ? 'Student' : 'छात्र' },
    { value: 'farmer', label: currentLanguage === 'en' ? 'Farmer' : 'किसान' },
    { value: 'business', label: currentLanguage === 'en' ? 'Business Owner' : 'व्यापारी' },
    { value: 'employee', label: currentLanguage === 'en' ? 'Employee' : 'कर्मचारी' },
    { value: 'homemaker', label: currentLanguage === 'en' ? 'Homemaker' : 'गृहिणी' },
    { value: 'other', label: currentLanguage === 'en' ? 'Other' : 'अन्य' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onUpdateProfile(formData);
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: userProfile?.name,
      mobile: userProfile?.mobile,
      email: userProfile?.email,
      language: userProfile?.language,
      dateOfBirth: userProfile?.dateOfBirth,
      occupation: userProfile?.occupation
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
          <Icon name="User" size={20} className="text-primary" />
          <span>{content?.[currentLanguage]?.personalInfo}</span>
        </h2>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            onClick={() => setIsEditing(true)}
          >
            {content?.[currentLanguage]?.edit}
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={content?.[currentLanguage]?.fullName}
          type="text"
          value={formData?.name}
          onChange={(e) => handleInputChange('name', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label={content?.[currentLanguage]?.mobileNumber}
          type="tel"
          value={formData?.mobile}
          onChange={(e) => handleInputChange('mobile', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label={content?.[currentLanguage]?.emailAddress}
          type="email"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Select
          label={content?.[currentLanguage]?.preferredLanguage}
          options={languageOptions}
          value={formData?.language}
          onChange={(value) => handleInputChange('language', value)}
          disabled={!isEditing}
        />

        <Input
          label={content?.[currentLanguage]?.dateOfBirth}
          type="date"
          value={formData?.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
          disabled={!isEditing}
        />

        <Select
          label={content?.[currentLanguage]?.occupation}
          options={occupationOptions}
          value={formData?.occupation}
          onChange={(value) => handleInputChange('occupation', value)}
          disabled={!isEditing}
        />
      </div>
      {isEditing && (
        <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isSaving}
          >
            {content?.[currentLanguage]?.cancel}
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            loading={isSaving}
            iconName="Save"
            iconPosition="left"
          >
            {isSaving ? content?.[currentLanguage]?.saving : content?.[currentLanguage]?.save}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoSection;
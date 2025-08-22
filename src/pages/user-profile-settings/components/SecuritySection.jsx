import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const SecuritySection = ({ userProfile, onUpdateSecurity, currentLanguage }) => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(userProfile?.security?.twoFactorEnabled);
  const [isSaving, setIsSaving] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const content = {
    en: {
      security: 'Security Settings',
      changePassword: 'Change Password',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm New Password',
      twoFactor: 'Two-Factor Authentication',
      twoFactorDesc: 'Add an extra layer of security to your account',
      trustedDevices: 'Trusted Devices',
      loginHistory: 'Login History',
      save: 'Save Changes',
      cancel: 'Cancel',
      saving: 'Saving...',
      enable: 'Enable',
      disable: 'Disable',
      view: 'View All',
      lastLogin: 'Last Login',
      device: 'Device',
      location: 'Location',
      passwordRequirements: 'Password must be at least 8 characters long'
    },
    hi: {
      security: 'सुरक्षा सेटिंग्स',
      changePassword: 'पासवर्ड बदलें',
      currentPassword: 'वर्तमान पासवर्ड',
      newPassword: 'नया पासवर्ड',
      confirmPassword: 'नया पासवर्ड पुष्टि करें',
      twoFactor: 'दो-कारक प्रमाणीकरण',
      twoFactorDesc: 'अपने खाते में सुरक्षा की एक अतिरिक्त परत जोड़ें',
      trustedDevices: 'विश्वसनीय उपकरण',
      loginHistory: 'लॉगिन इतिहास',
      save: 'परिवर्तन सहेजें',
      cancel: 'रद्द करें',
      saving: 'सहेज रहे हैं...',
      enable: 'सक्षम करें',
      disable: 'अक्षम करें',
      view: 'सभी देखें',
      lastLogin: 'अंतिम लॉगिन',
      device: 'उपकरण',
      location: 'स्थान',
      passwordRequirements: 'पासवर्ड कम से कम 8 अक्षर लंबा होना चाहिए'
    }
  };

  const trustedDevices = [
    {
      id: 1,
      name: "iPhone 12 Pro",
      lastUsed: "2025-08-22",
      location: "Mumbai, India",
      current: true
    },
    {
      id: 2,
      name: "Chrome on Windows",
      lastUsed: "2025-08-20",
      location: "Mumbai, India",
      current: false
    }
  ];

  const loginHistory = [
    {
      id: 1,
      device: "iPhone 12 Pro",
      location: "Mumbai, India",
      timestamp: "2025-08-22 07:30 AM",
      success: true
    },
    {
      id: 2,
      device: "Chrome Browser",
      location: "Mumbai, India",
      timestamp: "2025-08-21 09:15 PM",
      success: true
    },
    {
      id: 3,
      device: "Mobile App",
      location: "Pune, India",
      timestamp: "2025-08-20 02:45 PM",
      success: false
    }
  ];

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev?.[field]
    }));
  };

  const handleSavePassword = async () => {
    if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      return;
    }

    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onUpdateSecurity({
      passwordChanged: true,
      twoFactorEnabled
    });
    
    setIsSaving(false);
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleTwoFactorToggle = async (checked) => {
    setTwoFactorEnabled(checked);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onUpdateSecurity({
      twoFactorEnabled: checked
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Shield" size={20} className="text-primary" />
          <span>{content?.[currentLanguage]?.security}</span>
        </h2>
      </div>
      {/* Password Change Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-foreground">{content?.[currentLanguage]?.changePassword}</h3>
          {!isChangingPassword && (
            <Button
              variant="outline"
              size="sm"
              iconName="Key"
              iconPosition="left"
              onClick={() => setIsChangingPassword(true)}
            >
              {content?.[currentLanguage]?.changePassword}
            </Button>
          )}
        </div>

        {isChangingPassword && (
          <div className="space-y-4">
            <div className="relative">
              <Input
                label={content?.[currentLanguage]?.currentPassword}
                type={showPasswords?.current ? "text" : "password"}
                value={passwordData?.currentPassword}
                onChange={(e) => handlePasswordChange('currentPassword', e?.target?.value)}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
              >
                <Icon name={showPasswords?.current ? "EyeOff" : "Eye"} size={16} />
              </button>
            </div>

            <div className="relative">
              <Input
                label={content?.[currentLanguage]?.newPassword}
                type={showPasswords?.new ? "text" : "password"}
                value={passwordData?.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e?.target?.value)}
                description={content?.[currentLanguage]?.passwordRequirements}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
              >
                <Icon name={showPasswords?.new ? "EyeOff" : "Eye"} size={16} />
              </button>
            </div>

            <div className="relative">
              <Input
                label={content?.[currentLanguage]?.confirmPassword}
                type={showPasswords?.confirm ? "text" : "password"}
                value={passwordData?.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e?.target?.value)}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
              >
                <Icon name={showPasswords?.confirm ? "EyeOff" : "Eye"} size={16} />
              </button>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsChangingPassword(false)}
                disabled={isSaving}
              >
                {content?.[currentLanguage]?.cancel}
              </Button>
              <Button
                variant="default"
                onClick={handleSavePassword}
                loading={isSaving}
                iconName="Save"
                iconPosition="left"
              >
                {isSaving ? content?.[currentLanguage]?.saving : content?.[currentLanguage]?.save}
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Two-Factor Authentication */}
      <div className="mb-8 p-4 bg-muted rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-foreground mb-1">{content?.[currentLanguage]?.twoFactor}</h3>
            <p className="text-sm text-muted-foreground">{content?.[currentLanguage]?.twoFactorDesc}</p>
          </div>
          <Checkbox
            checked={twoFactorEnabled}
            onChange={(e) => handleTwoFactorToggle(e?.target?.checked)}
            label=""
          />
        </div>
      </div>
      {/* Trusted Devices */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-foreground">{content?.[currentLanguage]?.trustedDevices}</h3>
          <Button variant="ghost" size="sm">
            {content?.[currentLanguage]?.view}
          </Button>
        </div>
        <div className="space-y-3">
          {trustedDevices?.slice(0, 2)?.map((device) => (
            <div key={device?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name={device?.name?.includes('iPhone') ? 'Smartphone' : 'Monitor'} size={20} className="text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">{device?.name}</p>
                  <p className="text-sm text-muted-foreground">{device?.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">{content?.[currentLanguage]?.lastLogin}</p>
                <p className="text-sm font-medium text-foreground">{device?.lastUsed}</p>
                {device?.current && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-success/10 text-success">
                    Current
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Login History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-foreground">{content?.[currentLanguage]?.loginHistory}</h3>
          <Button variant="ghost" size="sm">
            {content?.[currentLanguage]?.view}
          </Button>
        </div>
        <div className="space-y-3">
          {loginHistory?.slice(0, 3)?.map((login) => (
            <div key={login?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={login?.success ? "CheckCircle" : "XCircle"} 
                  size={20} 
                  className={login?.success ? "text-success" : "text-error"} 
                />
                <div>
                  <p className="font-medium text-foreground">{login?.device}</p>
                  <p className="text-sm text-muted-foreground">{login?.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{login?.timestamp}</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                  login?.success 
                    ? 'bg-success/10 text-success' :'bg-error/10 text-error'
                }`}>
                  {login?.success ? 'Success' : 'Failed'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;
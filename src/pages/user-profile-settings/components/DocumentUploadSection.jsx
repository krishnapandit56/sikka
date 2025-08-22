import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const DocumentUploadSection = ({ userProfile, onUpdateDocuments, currentLanguage }) => {
  const [uploadingDoc, setUploadingDoc] = useState(null);
  const [documents, setDocuments] = useState(userProfile?.documents);

  const content = {
    en: {
      documents: 'KYC Documents',
      upload: 'Upload',
      reupload: 'Re-upload',
      view: 'View',
      verified: 'Verified',
      pending: 'Pending Review',
      rejected: 'Rejected',
      uploadNew: 'Upload New Document',
      takePhoto: 'Take Photo',
      chooseFile: 'Choose File',
      aadhaar: 'Aadhaar Card',
      pan: 'PAN Card',
      bankStatement: 'Bank Statement',
      addressProof: 'Address Proof',
      requirements: 'Document Requirements',
      aadhaarReq: 'Clear photo of both sides of Aadhaar card',
      panReq: 'Clear photo of PAN card with visible text',
      bankReq: 'Latest bank statement (PDF or image)',
      addressReq: 'Utility bill or rental agreement'
    },
    hi: {
      documents: 'केवाईसी दस्तावेज',
      upload: 'अपलोड करें',
      reupload: 'फिर से अपलोड करें',
      view: 'देखें',
      verified: 'सत्यापित',
      pending: 'समीक्षा लंबित',
      rejected: 'अस्वीकृत',
      uploadNew: 'नया दस्तावेज अपलोड करें',
      takePhoto: 'फोटो लें',
      chooseFile: 'फाइल चुनें',
      aadhaar: 'आधार कार्ड',
      pan: 'पैन कार्ड',
      bankStatement: 'बैंक स्टेटमेंट',
      addressProof: 'पता प्रमाण',
      requirements: 'दस्तावेज आवश्यकताएं',
      aadhaarReq: 'आधार कार्ड के दोनों तरफ की स्पष्ट तस्वीर',
      panReq: 'दिखाई देने वाले टेक्स्ट के साथ पैन कार्ड की स्पष्ट तस्वीर',
      bankReq: 'नवीनतम बैंक स्टेटमेंट (पीडीएफ या इमेज)',
      addressReq: 'उपयोगिता बिल या किराया समझौता'
    }
  };

  const documentTypes = [
    {
      key: 'aadhaar',
      title: content?.[currentLanguage]?.aadhaar,
      requirement: content?.[currentLanguage]?.aadhaarReq,
      icon: 'CreditCard',
      required: true
    },
    {
      key: 'pan',
      title: content?.[currentLanguage]?.pan,
      requirement: content?.[currentLanguage]?.panReq,
      icon: 'FileText',
      required: true
    },
    {
      key: 'bankStatement',
      title: content?.[currentLanguage]?.bankStatement,
      requirement: content?.[currentLanguage]?.bankReq,
      icon: 'Building',
      required: false
    },
    {
      key: 'addressProof',
      title: content?.[currentLanguage]?.addressProof,
      requirement: content?.[currentLanguage]?.addressReq,
      icon: 'Home',
      required: false
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success';
      case 'pending': return 'text-warning';
      case 'rejected': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'rejected': return 'XCircle';
      default: return 'Upload';
    }
  };

  const handleFileUpload = async (docType, file) => {
    setUploadingDoc(docType);
    
    // Simulate file upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const updatedDocuments = {
        ...documents,
        [docType]: {
          ...documents?.[docType],
          url: e?.target?.result,
          status: 'pending',
          uploadedAt: new Date()?.toISOString()
        }
      };
      
      setDocuments(updatedDocuments);
      onUpdateDocuments(updatedDocuments);
      setUploadingDoc(null);
    };
    reader?.readAsDataURL(file);
  };

  const handleCameraCapture = async (docType) => {
    // Simulate camera capture
    setUploadingDoc(docType);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock captured image
    const mockCapturedImage = "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop";
    
    const updatedDocuments = {
      ...documents,
      [docType]: {
        ...documents?.[docType],
        url: mockCapturedImage,
        status: 'pending',
        uploadedAt: new Date()?.toISOString()
      }
    };
    
    setDocuments(updatedDocuments);
    onUpdateDocuments(updatedDocuments);
    setUploadingDoc(null);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
          <Icon name="FileText" size={20} className="text-primary" />
          <span>{content?.[currentLanguage]?.documents}</span>
        </h2>
      </div>
      {/* Document Requirements */}
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <h3 className="font-medium text-foreground mb-3">{content?.[currentLanguage]?.requirements}</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {documentTypes?.map((doc) => (
            <li key={doc?.key} className="flex items-start space-x-2">
              <Icon name={doc?.icon} size={16} className="text-primary mt-0.5" />
              <span><strong>{doc?.title}:</strong> {doc?.requirement}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Document Upload Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documentTypes?.map((docType) => {
          const doc = documents?.[docType?.key];
          const isUploading = uploadingDoc === docType?.key;
          
          return (
            <div key={docType?.key} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Icon name={docType?.icon} size={20} className="text-primary" />
                  <h3 className="font-medium text-foreground">{docType?.title}</h3>
                  {docType?.required && (
                    <span className="text-xs text-error">*</span>
                  )}
                </div>
                
                {doc?.status && (
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={getStatusIcon(doc?.status)} 
                      size={16} 
                      className={getStatusColor(doc?.status)} 
                    />
                    <span className={`text-sm ${getStatusColor(doc?.status)}`}>
                      {content?.[currentLanguage]?.[doc?.status]}
                    </span>
                  </div>
                )}
              </div>
              {/* Document Preview */}
              {doc?.url && (
                <div className="mb-4">
                  <div className="w-full h-32 bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={doc?.url}
                      alt={docType?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Uploaded: {new Date(doc.uploadedAt)?.toLocaleDateString()}
                  </p>
                </div>
              )}
              {/* Upload Actions */}
              <div className="space-y-2">
                {isUploading ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm text-muted-foreground">Uploading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <label className="flex-1">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Upload"
                        iconPosition="left"
                        fullWidth
                        asChild
                      >
                        <span>{doc?.url ? content?.[currentLanguage]?.reupload : content?.[currentLanguage]?.upload}</span>
                      </Button>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => {
                          const file = e?.target?.files?.[0];
                          if (file) handleFileUpload(docType?.key, file);
                        }}
                        className="hidden"
                      />
                    </label>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Camera"
                      onClick={() => handleCameraCapture(docType?.key)}
                      className="px-3"
                      aria-label={content?.[currentLanguage]?.takePhoto}
                    />
                    
                    {doc?.url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => window.open(doc?.url, '_blank')}
                        className="px-3"
                        aria-label={content?.[currentLanguage]?.view}
                      />
                    )}
                  </div>
                )}
              </div>
              {/* Rejection Reason */}
              {doc?.status === 'rejected' && (
                <div className="mt-3 p-3 bg-error/10 border border-error/20 rounded-lg">
                  <p className="text-sm text-error">
                    {currentLanguage === 'en' ?'Document rejected: Please ensure the image is clear and all text is visible.' :'दस्तावेज अस्वीकृत: कृपया सुनिश्चित करें कि छवि स्पष्ट है और सभी टेक्स्ट दिखाई दे रहा है।'
                    }
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Verification Status */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">
              {currentLanguage === 'en' ? 'Verification Process' : 'सत्यापन प्रक्रिया'}
            </p>
            <p className="text-xs text-muted-foreground">
              {currentLanguage === 'en' ?'Documents are typically reviewed within 24-48 hours. You will receive a notification once verification is complete.' :'दस्तावेजों की समीक्षा आमतौर पर 24-48 घंटों के भीतर की जाती है। सत्यापन पूरा होने पर आपको एक सूचना मिलेगी।'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadSection;
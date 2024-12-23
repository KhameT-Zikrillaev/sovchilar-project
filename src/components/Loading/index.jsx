import React from 'react';
import './styles.css';
import { useTranslation } from 'react-i18next'
const Loading = ({ type = 'default', size = 'medium', color = 'rose', overlay = false }) => {
  const { t } = useTranslation(); 
  const getSize = () => {
    switch (size) {
      case 'small':
        return 'w-6 h-6';
      case 'large':
        return 'w-16 h-16';
      default:
        return 'w-10 h-10';
    }
  };

  const getColor = () => {
    switch (color) {
      case 'rose':
        return 'text-rose-500';
      case 'blue':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const renderLoader = () => {
    switch (type) {
      case 'pulse':
        return (
          <div className={`loading-pulse ${getSize()} ${getColor()}`}></div>
        );
      case 'dots':
        return (
          <div className="flex space-x-2">
            <div className={`loading-dot ${getColor()}`}></div>
            <div className={`loading-dot ${getColor()}`} style={{ animationDelay: '0.2s' }}></div>
            <div className={`loading-dot ${getColor()}`} style={{ animationDelay: '0.4s' }}></div>
          </div>
        );
      default:
        return (
          <div className={`loading-spinner ${getSize()} ${getColor()}`}>
            <div className="loading-spinner-inner"></div>
          </div>
        );
    }
  };

  const content = (
    <div className="text-center">
      {renderLoader()}
      {overlay && <p className="mt-4 text-gray-600 font-medium">{t('loading.text')}</p>}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm z-50">
        {content}
      </div>
    );
  }

  return content;
};

export default Loading;

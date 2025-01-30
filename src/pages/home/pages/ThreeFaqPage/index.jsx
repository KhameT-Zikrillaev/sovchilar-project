import React, { useState } from 'react'
import { faqData, pageContent } from './services/faq'
import { useTranslation } from 'react-i18next'
import Modal from '../../../../components/videoModal'

export default function ThreeFaqPage() {
  const [activeIndex, setActiveIndex] = useState(null);
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const formatAnswer = (text) => {
    if (!text) return '';

    // Сначала обрабатываем ссылки
    const processLinks = (str) => {
      const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
      let lastIndex = 0;
      const results = [];
      let match;

      while ((match = linkPattern.exec(str)) !== null) {
        // Добавляем текст до ссылки
        if (match.index > lastIndex) {
          results.push(str.slice(lastIndex, match.index));
        }

        // Добавляем ссылку как React элемент
        results.push(
          <a
            key={`link-${match.index}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-500 hover:text-rose-700 underline cursor-pointer"
          >
            {match[1]}
          </a>
        );

        lastIndex = match.index + match[0].length;
      }

      // Добавляем оставшийся текст
      if (lastIndex < str.length) {
        results.push(str.slice(lastIndex));
      }

      return results;
    };

    // Затем обрабатываем выделенный текст
    const processHighlights = (content) => {
      if (typeof content !== 'string') return content;

      const parts = content.split(/~([^~]+)~/);
      return parts.map((part, index) => {
        if (index % 2 === 1) {
          return (
            <span key={`highlight-${index}`} className="text-rose-500 font-semibold">
              {part}
            </span>
          );
        }
        return part;
      });
    };

    // Применяем обе обработки последовательно
    const withLinks = processLinks(text);
    return withLinks.map((part, index) => {
      if (React.isValidElement(part)) return part;
      return processHighlights(part);
    });
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-center font-bold text-[24px]  md:text-[30px]   lg:text-[40px] mb-4 bg-gradient-to-r from-rose-700 to-rose-600 text-transparent bg-clip-text">
          {t(pageContent.titleKey)}
        </h2>
        <p className="text-center mb-12 text-gray-600 text-lg">{t(pageContent.descriptionKey)}</p>
        
        <div className="space-y-6">
          {faqData.map((item, index) => (
            <div 
              key={item.id} 
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 ${
                item.color === 'red' ? 'border-red-500' : 'border-blue-500'
              }`}
            >
              <button
                className="w-full text-left p-6 focus:outline-none group"
                onClick={() => handleClick(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className={`text-xl font-semibold text-gray-800 group-hover:text-${item.color}-600 transition-colors duration-300`}>
                    {t(item.questionKey)}
                  </h3>
                  <div className={`p-2 rounded-full bg-gray-50 group-hover:bg-${item.color}-50 transition-all duration-300 ${
                    activeIndex === index ? `bg-${item.color}-50` : ''
                  }`}>
                    <svg
                      className={`w-6 h-6 transition-transform duration-300 text-${item.color}-500 ${
                        activeIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>
              
              <div className={`transition-all duration-500 ease-in-out ${
                activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 text-lg leading-relaxed mb-4">
                    {formatAnswer(t(item.answerKey))}
                  </p>
                  {index === 0 && (
                    <button
                      onClick={handleOpenModal}
                      className="bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition-colors duration-300"
                    >
                      {t('faq.addAccount.answer')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ"
      />
    </div>
  )
}

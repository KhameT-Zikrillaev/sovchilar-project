import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.png'
const SiteLoading = () => {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        {/* Основной контейнер */}
        <div className="relative">
          {/* Анимированные линии */}
          <div className="absolute -inset-1">
            <div className="w-full h-full bg-gradient-to-r from-yellow-600 via-pink-600 to-purple-600 opacity-75 blur-lg animate-pulse" />
          </div>

          {/* Основное содержимое */}
          <div className="relative bg-black p-8 rounded-xl border border-white/10">
            {/* Логотип */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                {/* <div className="w-24 h-24 rounded-full bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 animate-[spin_4s_linear_infinite]">
                  <div className="absolute inset-1 bg-black rounded-full flex items-center justify-center">
                    <span className="text-4xl transform transition-all">💒</span>
                  </div>
                </div> */}

              <img className='w-24 h-24' src={logo} alt="" />


                {/* Блики */}
                <div className="absolute -inset-2">
                  <div className="w-full h-full bg-gradient-to-r from-yellow-500/20 via-pink-500/20 to-purple-500/20 blur-xl animate-pulse" />
                </div>
              </div>
            </div>

            {/* Название */}
            <div className="text-center mb-8">
              <span className="font-['Tangerine'] text-6xl bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">
                Sovchilar.net
              </span>
            </div>

            {/* Прогресс бар */}
            <div className="relative h-1 bg-white/10 rounded-full overflow-hidden mb-2">
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Процент */}
            <div className="text-center text-white/50 text-sm font-mono">
              {progress}%
            </div>

            {/* Декоративные элементы */}
            <div className="absolute -inset-px bg-gradient-to-r from-yellow-500/50 via-pink-500/50 to-purple-500/50 rounded-xl animate-pulse" style={{ maskImage: 'radial-gradient(circle at 50% 0%, transparent 30%, black 70%)' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteLoading;

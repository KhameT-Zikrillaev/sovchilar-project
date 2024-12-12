import { useState, useRef, useEffect } from 'react';

const useCard = ({
  dragEnabled = false,
  parallaxEnabled = false,
  hoverEffects = true,
  clickEffect = true,
} = {}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const initialPosition = useRef({ x: 0, y: 0 });
  const mousePosition = useRef({ x: 0, y: 0 });

  // Эффект параллакса
  const handleParallax = (e) => {
    if (!parallaxEnabled || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = (mouseY / rect.height) * 20;
    const rotateY = -(mouseX / rect.width) * 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  // Обработка перетаскивания
  const handleDragStart = (e) => {
    if (!dragEnabled) return;
    setIsDragging(true);
    initialPosition.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleDragMove = (e) => {
    if (!isDragging || !dragEnabled) return;
    const newX = e.clientX - initialPosition.current.x;
    const newY = e.clientY - initialPosition.current.y;
    setPosition({ x: newX, y: newY });
  };

  const handleDragEnd = () => {
    if (!dragEnabled) return;
    setIsDragging(false);
  };

  // Эффекты при наведении
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (cardRef.current && hoverEffects) {
      cardRef.current.style.transform = 'translateY(-10px)';
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = 'none';
      if (parallaxEnabled) {
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      }
    }
  };

  // Эффект при клике
  const handleClick = () => {
    if (!clickEffect) return;
    if (cardRef.current) {
      cardRef.current.style.transform = 'scale(0.95)';
      setTimeout(() => {
        cardRef.current.style.transform = isHovered ? 'translateY(-10px)' : 'none';
      }, 150);
    }
  };

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    if (parallaxEnabled) {
      window.addEventListener('mousemove', handleParallax);
    }

    return () => {
      if (parallaxEnabled) {
        window.removeEventListener('mousemove', handleParallax);
      }
    };
  }, [parallaxEnabled]);

  const cardStyle = {
    cursor: dragEnabled ? (isDragging ? 'grabbing' : 'grab') : 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    position: dragEnabled ? 'relative' : 'static',
    left: dragEnabled ? `${position.x}px` : undefined,
    top: dragEnabled ? `${position.y}px` : undefined,
    userSelect: 'none',
  };

  const handlers = {
    onMouseDown: dragEnabled ? handleDragStart : undefined,
    onMouseMove: dragEnabled ? handleDragMove : undefined,
    onMouseUp: dragEnabled ? handleDragEnd : undefined,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
  };

  return {
    cardRef,
    isHovered,
    isDragging,
    cardStyle,
    handlers,
  };
};

export default useCard;

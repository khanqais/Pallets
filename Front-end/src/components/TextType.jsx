// TextType.jsx
import React, { useState, useEffect } from 'react';

const TextType = ({ 
  text = [], 
  typingSpeed = 75, 
  pauseDuration = 1500, 
  showCursor = true, 
  cursorCharacter = "|",
  className = "",
  cursorClassName = ""
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursorState, setShowCursorState] = useState(true);

  useEffect(() => {
    if (text.length === 0) return;

    const currentText = text[currentIndex];
    
    if (isTyping) {
      if (currentCharIndex < currentText.length) {
        const timer = setTimeout(() => {
          setDisplayText(currentText.slice(0, currentCharIndex + 1));
          setCurrentCharIndex(prev => prev + 1);
        }, typingSpeed);
        
        return () => clearTimeout(timer);
      } else {
        // Finished typing current text
        const pauseTimer = setTimeout(() => {
          setIsTyping(false);
          setCurrentCharIndex(0);
        }, pauseDuration);
        
        return () => clearTimeout(pauseTimer);
      }
    } else {
      // Start erasing
      if (displayText.length > 0) {
        const eraseTimer = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
        }, typingSpeed / 2);
        
        return () => clearTimeout(eraseTimer);
      } else {
        // Move to next text
        setCurrentIndex(prev => (prev + 1) % text.length);
        setIsTyping(true);
      }
    }
  }, [currentCharIndex, currentIndex, isTyping, text, typingSpeed, pauseDuration, displayText]);

  // Cursor blinking effect
  useEffect(() => {
    if (showCursor) {
      const cursorTimer = setInterval(() => {
        setShowCursorState(prev => !prev);
      }, 530);
      
      return () => clearInterval(cursorTimer);
    }
  }, [showCursor]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span className={`${cursorClassName} ${showCursorState ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
          {cursorCharacter}
        </span>
      )}
    </span>
  );
};

export default TextType;

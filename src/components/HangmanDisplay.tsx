import React from 'react';
import { MAX_MISTAKES } from '../utils/gameConstants';

import gallowsImg from '../assets/images/gallows.svg';
import headImg from '../assets/images/head.svg';
import bodyImg from '../assets/images/body.svg';
import armImg from '../assets/images/arm.svg';
import legImg from '../assets/images/leg.svg';

import styles from './HangmanDisplay.module.css';

interface HangmanDisplayProps {
  wrongGuesses: number;
}

const HangmanDisplay: React.FC<HangmanDisplayProps> = ({ wrongGuesses }) => {
  const progress = (wrongGuesses / MAX_MISTAKES) * 100;
  
  return (
    <div className={styles.container}>
      <div className={styles.hangmanContainer}>
        <img 
          src={gallowsImg} 
          alt="Gallows"
          className={styles.gallows}
        />
        
        {wrongGuesses >= 1 && (
          <img 
            src={headImg}
            alt="Head"
            className={styles.head}
          />
        )}
        
        {wrongGuesses >= 2 && (
          <img 
            src={bodyImg}
            alt="Body"
            className={styles.body}
          />
        )}
        
        {wrongGuesses >= 3 && (
          <img 
            src={armImg}
            alt="Left Arm"
            className={styles.leftArm}
          />
        )}
        
        {wrongGuesses >= 4 && (
          <img 
            src={armImg}
            alt="Right Arm"
            className={styles.rightArm}
          />
        )}
        
        {wrongGuesses >= 5 && (
          <img 
            src={legImg}
            alt="Left Leg"
            className={styles.leftLeg}
          />
        )}
        
        {wrongGuesses >= 6 && (
          <img 
            src={legImg}
            alt="Right Leg"
            className={styles.rightLeg}
          />
        )}
      </div>
      
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className={styles.attemptsText}>
        {MAX_MISTAKES - wrongGuesses} attempts remaining
      </p>
    </div>
  );
};

export default HangmanDisplay;
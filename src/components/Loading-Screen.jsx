import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

function Loading_Screen({ onComplete }) {
  const container = useRef();
  const textRef = useRef();
  const dotRefs = [useRef(), useRef(), useRef()];

  useGSAP(() => {
    const tl = gsap.timeline();
   
    tl.from(textRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 1.5,
        ease: "power1.out",
        
      });
  
      // Animate dots with a more interesting pattern
      dotRefs.forEach((dotRef, index) => {
        tl.to(dotRef.current, {
          opacity: 1,
          scale: 1.2,
          duration: 0.4,
          ease: "back.out(1.7)",
          onComplete: () => {
            // Add a pulsing effect to each dot
            gsap.to(dotRef.current, {
              scale: 1.4,
              duration: 0.5,
              repeat: -1,
              yoyo: true,
              ease: "power1.inOut",
              delay: index * 0.1
            });
          }
        }, "-=0.2"); // Slight overlap with previous animation
      });
  
      // Add a subtle background pulse
      gsap.to(container.current, {
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

    // Fade out with a smooth transition
    gsap.to(container.current, {
      opacity: 0,
      duration: 1.5,
      delay: 2,
      ease: "power2.inOut",
      onUpdate: function() {
        if (this.progress() >= 0.9) {
          onComplete?.();
          tl.kill();
        }
      }
    });
  }, []);

  return (
    <div ref={container} className="h-screen w-full bg-black flex items-center justify-center">
      <div className="text-white text-[80px] font-bold flex items-center space-x-2 text-shadow-indigo-50 leading-20 tracking-wide" style={{ fontFamily: "pricedown" }}>
        <span ref={textRef} className="tracking-wider">Rockstar Studio</span>
        <span ref={dotRefs[0]} className="text-white" style={{ opacity: 0 }}>.</span>
        <span ref={dotRefs[1]} className="text-white" style={{ opacity: 0 }}>.</span>
        <span ref={dotRefs[2]} className="text-white" style={{ opacity: 0 }}>.</span>
      </div>
    </div>
  );
}

export default Loading_Screen;

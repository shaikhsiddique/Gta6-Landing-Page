import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useState, useRef, useEffect } from "react";

function App() {
  const [showContent, setShowContent] = useState(false);
  const mainRef = useRef(null);

  // Initial animation
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 15,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "expo.inOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (tl.progress() >= 0.9) {
          document.querySelector(".svg")?.remove();
          setShowContent(true);
          tl.kill();
        }
      },
    });
  });

  // Mousemove handler after content is shown
  useEffect(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-0.7",
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.5,
      rotate: 0,
      duration: 2,
      delay: "-.9",
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.15,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 1,
      bottom: "-25%",
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1.2,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    if (showContent && mainRef.current) {
      const handleMouseMove = (e) => {
        const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
        gsap.to(".imagesdiv .text", {
          x: `${xMove * 0.4}%`,
        });
        gsap.to(".sky", {
          x: `${xMove}%`,
        });
        gsap.to(".bg", {
          x: `${xMove * 0.3}%`,
        });
      };

      const mainEl = mainRef.current;
      mainEl.addEventListener("mousemove", handleMouseMove);

      // Cleanup
      return () => {
        mainEl.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [showContent]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {showContent && (
        <div ref={mainRef} className="main w-full rotate-[-10deg] scale-[1.7]">
          <div className="landing w-full h-screen bg-black relative ">
            <div className="navbar w-full py-10 px-10 absolute top-0 left-0 z-[10]">
              <div className="logo flex gap-7">
                <div className="lines flex flex-col gap-[5px]">
                  <div className="line w-15 h-2 bg-white"></div>
                  <div className="line w-8 h-2 bg-white"></div>
                  <div className="line w-5 h-2 bg-white"></div>
                </div>
                <h3 className="text-4xl -mt-[8px] leading-none text-white">
                  Rockstar
                </h3>
              </div>
            </div>
            <div className="gta-logo absolute z-30 -top-[27%] -right-32">
              <img className="w-full h-full scale-[0.2]" src="logo18.png" alt="" />
            </div>

            <div className="imagesdiv w-full h-screen bg-black relative overflow-hidden">
              <img
                className="sky scale-[2] rotate-[-20deg]  w-full h-full object-cover absolute top-0 left-0"
                src="./sky.png"
                alt=""
              />
              <img
                className="bg scale-[2] w-full h-full object-cover absolute top-0 -left-5"
                src="./bg.png"
                alt=""
              />

              <div className="text text-white flex flex-col gap-3 absolute top-20 left-1/2 -translate-x-1/2 scale-[1.8] rotate-[-15deg]">
                <h1 className="text-[7rem] leading-none -ml-40">grand</h1>
                <h1 className="text-[7rem] leading-none ml-20">theft</h1>
                <h1 className="text-[7rem] leading-none -ml-40">auto</h1>
              </div>

              <img
                className="absolute character -bottom-[25%] left-1/2 -translate-x-1/2 w-[35%] scale-[3.2] rotate-[-22deg]"
                src="./girlbg.png"
                alt=""
              />
            </div>

            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-4 items-center">
                <i className="text-4xl ri-arrow-down-line cursor-pointer"></i>
                <h3 className="text-xl font-[Helvetica_Now_Display] cursor-pointer">
                  Scroll Down
                </h3>
              </div>
              <img
                className="absolute h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="./ps5.png"
                alt=""
              />
            </div>
          </div>
          <div className="w-full h-screen bg-black px-10 flex items-center justify-center">
            <div className="cntnr w-full h-[80%] flex text-white">
              <div className="leftImg w-1/2 h-full flex relative">
                <img
                  className="absolute scale-[0.7] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="./imag.png"
                  alt=""
                />
              </div>
              <div className="rightCon w-[30%] py-20 ">
                <h1 className="text-5xl">Still Running,</h1>
                <h1 className="text-5xl">Not Hunting</h1>
                <p className="mt-5 text-sm font-[Helvetica_Now_Display]">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Distinctio possimus, asperiores nam, omnis inventore nesciunt
                  a architecto eveniet saepe, ducimus necessitatibus at
                  voluptate.
                </p>
                <p className="mt-2 text-sm font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  eius illum fugit eligendi nesciunt quia similique velit
                  excepturi soluta tenetur illo repellat consectetur laborum
                  eveniet eaque, dicta, hic quisquam? Ex cupiditate ipsa nostrum
                  autem sapiente.
                </p>
                <p className="mt-5 text-sm font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  eius illum fugit eligendi nesciunt quia similique velit
                  excepturi soluta tenetur illo repellat consectetur laborum
                  eveniet eaque, dicta, hic quisquam? Ex cupiditate ipsa nostrum
                  autem sapiente.
                </p>
                <button className="bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300 p-7 text-black mt-6 text-4xl">
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;

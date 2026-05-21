import { useState, useEffect } from "react";
import CompanyBgImg from "@/images/company/company_bg.png";
import CompanyBg03Img from "@/images/company/company_bg_03.png";
import CvcHelmetImg from "@/images/products/cvc_helmet.svg";
import "./Collapse.css";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Avoid window access during SSR
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    // Set initial value
    setIsMobile(mediaQuery.matches);
    // Listen for changes
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

const Collapse = () => {
  const [visible, setVisible] = useState(0);
  const cardProps = [
    { index: 0, flex: 9, bgFlag: true },
    { index: 1, flex: 1, bgFlag: false },
    { index: 2, flex: 1, bgFlag: false },
    { index: 3, flex: 1, bgFlag: false },
  ];
  const isMobile = useIsMobile();
  const handleClick = (index: number) => {
    setVisible(index);
    cardProps[index].flex = 9;
    cardProps.forEach((card) => {
      if (card.index !== index) {
        card.flex = 1;
      }
    });
  };

  const isActive = (index: number) => isMobile || visible === index;

  return (
    <div className="product-card-container flex rounded-lg w-full overflow-hidden">
      <div
        className={`product-card bg-[#14375f] ${cardProps[0].flex} ${isActive(cardProps[0].index) ? "hidden border-highlight" : ""}`}
        style={{ backgroundImage: `${isActive(cardProps[0].index) ? `url(${CompanyBgImg.src})` : "none"}` }}
        onClick={() => handleClick(0)}
      >
        <div className={`heading-h3 product-label-vertical ${isActive(cardProps[0].index) ? "hidden" : ""}`}>Body Armors</div>
        <div className="product-content">
          <div className={`heading-h3 flex justify-end product-label-vertical  ${!isActive(cardProps[0].index) ? "hidden" : ""}`}>Body Armors</div>
          <div className={`product-description ${!isActive(cardProps[0].index) ? "hidden" : ""}`}>
            <p className="text-white text-lg leading-relaxed mb-4">
              Our Body Armors provide cutting-edge protection across three main categories, ensuring comprehensive safety for law enforcement,
              military, and security personnel. Whether you're facing bullets, knives, spikes, or a combination of both, we offer the flexibility to
              tailor your protection.
            </p>
            <button className="text-white font-bold flex gap-2 items-center hover:underline">
              Explore Body Armors
              <span>→</span>
            </button>
          </div>
        </div>
        <div className={`w-full flex justify-end ${!isActive(cardProps[0].index) ? "hidden" : ""}`}>
          <img src={CvcHelmetImg.src} alt="CVC Helmet" className="w-1/2" />
        </div>
      </div>

      <div
        className={`product-card bg-[#2465ae] ${cardProps[1].flex} ${isActive(cardProps[1].index) ? "hidden border-highlight" : ""}`}
        // style={{ backgroundImage: `${isActive(cardProps[1].index) ? `url(${CompanyBgImg.src})` : "none"}` }}
        onClick={() => handleClick(cardProps[1].index)}
      >
        <div className={`heading-h3 product-label-vertical ${isActive(cardProps[1].index) ? "hidden" : ""}`}>Ballistic Plates</div>
        <div className="product-content">
          <div className={`heading-h3 flex justify-end product-label-vertical  ${!isActive(cardProps[1].index) ? "hidden" : ""}`}>
            Ballistic Plates
          </div>
          <div className={`product-description ${!isActive(cardProps[1].index) ? "hidden" : ""}`}>
            <p className="text-white text-lg leading-relaxed mb-4">
              Our Body Armors provide cutting-edge protection across three main categories, ensuring comprehensive safety for law enforcement,
              military, and security personnel. Whether you're facing bullets, knives, spikes, or a combination of both, we offer the flexibility to
              tailor your protection.
            </p>
            <button className="text-white font-bold flex gap-2 items-center hover:underline">
              Explore Body Armors
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`product-card bg-[#90b9e7] ${cardProps[2].flex} ${isActive(cardProps[2].index) ? "hidden border-highlight" : ""}`}
        onClick={() => handleClick(cardProps[2].index)}
      >
        <div className={`heading-h3 product-label-vertical ${isActive(cardProps[2].index) ? "hidden" : ""}`}>Ballistic Plates</div>
        <div className="product-content">
          <div className={`heading-h3 flex justify-end product-label-vertical ${!isActive(cardProps[2].index) ? "hidden" : ""}`}>
            Ballistic Plates
          </div>
          <div className={`product-description ${!isActive(cardProps[2].index) ? "hidden" : ""}`}>
            <p className="text-white text-lg leading-relaxed mb-4">
              Our Body Armors provide cutting-edge protection across three main categories, ensuring comprehensive safety for law enforcement,
              military, and security personnel. Whether you're facing bullets, knives, spikes, or a combination of both, we offer the flexibility to
              tailor your protection.
            </p>
            <button className="text-white font-bold flex gap-2 items-center hover:underline">
              Explore Body Armors
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`product-card bg-[#194577] ${cardProps[3].flex} ${isActive(cardProps[3].index) ? "hidden border-highlight" : ""}`}
        onClick={() => handleClick(cardProps[3].index)}
      >
        <div className={`heading-h3 product-label-vertical ${isActive(cardProps[3].index) ? "hidden" : ""}`}>Other Ballistic Solutions</div>
        <div className="product-content">
          <div className={`heading-h3 flex justify-end product-label-vertical ${!isActive(cardProps[3].index) ? "hidden" : ""}`}>
            Other Ballistic Solutions
          </div>
          <div className={`product-description ${!isActive(cardProps[3].index) ? "hidden" : ""}`}>
            <p className="text-white text-lg leading-relaxed mb-4">
              Our Body Armors provide cutting-edge protection across three main categories, ensuring comprehensive safety for law enforcement,
              military, and security personnel. Whether you're facing bullets, knives, spikes, or a combination of both, we offer the flexibility to
              tailor your protection.
            </p>
            <button className="text-white font-bold flex gap-2 items-center hover:underline">
              Explore Body Armors
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collapse;

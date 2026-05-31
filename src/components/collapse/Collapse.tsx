import { useState, useEffect } from "react";
import "./Collapse.css";

function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

type CardData = {
  label: string;
  description: string;
  buttonText: string;
  bgColor: string;
  bgImage?: string;
  bgImageMobile?: string;
  productImage?: string;
};
interface CollapseProps {
  cards: CardData[];
}

const Collapse: React.FC<CollapseProps> = ({ cards }) => {
  const [visible, setVisible] = useState(0);
  const isMobile = useIsMobile();

  const isActive = (index: number) => isMobile || visible === index;

  return (
    <div className="product-card-container flex rounded-lg w-full overflow-hidden">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`product-card ${card.bgColor} ${isActive(index) ? "border-highlight is-active-card" : ""}`}
          style={{
            backgroundImage: isActive(index) && card.bgImage ? `url(${isMobile && card.bgImageMobile ? card.bgImageMobile : card.bgImage})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={() => setVisible(index)}
        >
          <div className={`heading-h3 product-label-vertical ${isActive(index) ? "hidden" : ""}`}>{card.label}</div>
          <div className="product-content">
            <div className={`heading-h3 product-label-vertical ${!isActive(index) ? "hidden" : ""}`}>{card.label}</div>
            <div className="product-description">
              <p className="text-white body-text mb-4" dangerouslySetInnerHTML={{ __html: card.description }} />
              <button className="text-white font-bold flex gap-2 items-center hover:underline">
                {card.buttonText}
                <span>→</span>
              </button>
            </div>
          </div>
          {card.productImage && !isMobile && (
            <div className="product-img">
              <img src={card.productImage} alt={card.label} loading="lazy" decoding="async" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Collapse;

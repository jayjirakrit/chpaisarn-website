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
  link?: string;
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
          style={
            isActive(index) && card.bgImage
              ? {
                  backgroundImage: `url(${isMobile && card.bgImageMobile ? card.bgImageMobile : card.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {} // no inline style when inactive – let CSS handle the background
          }
          onClick={() => setVisible(index)}
        >
          <div className={`product-label-h3 product-label-vertical ${isActive(index) ? "hidden" : ""}`}>{card.label}</div>
          <div className="product-content">
            <div className={`product-label-h3 product-label-vertical ${!isActive(index) ? "hidden" : ""}`}>{card.label}</div>
            <div className="product-description">
              <p className="text-white body-text mb-4" dangerouslySetInnerHTML={{ __html: card.description }} />
              <button className="text-white font-bold flex gap-2 items-center hover:underline">
                <a href={card.link}>
                  {card.buttonText}
                  <span> → </span>
                </a>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Collapse;

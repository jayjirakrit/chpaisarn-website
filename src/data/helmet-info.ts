const helmetImages = import.meta.glob("../assets/products/helmet/*.png", { eager: true, import: "default" }) as Record<string, string>;

export const helmetInfos = [
  {
    slug: "fast",
    name: "Fast Helmet",
    productName: "Fast Helmet",
    productsImg: [
      helmetImages["../assets/products/helmet/helmet_new_fast.png"],
      helmetImages["../assets/products/helmet/helmet_new_fast_02.png"],
      helmetImages["../assets/products/helmet/helmet_new_fast_03.png"],
      helmetImages["../assets/products/helmet/helmet_new_fast_04.png"],
    ],
    level: "NIJ LEVEL IIIA",
    colors: [
      { color: "Black", hex: "#3B3B3B" },
      { color: "Green", hex: "#4B5320" },
    ],
    sizes: ["S", "M", "L", "XL"],
    productDesc:
      "Engineered for elite tactical operations, Fast Helmet combines advanced aramid composites with aerospace-grade ergonomic design. Offering unparalleled NIJ Level IIIA protection while maintaining a remarkably low profile and weight.",
    pidTitle: "Structural Integrity & Design",
    pidDesc:
      "Fast Helmet is manufactured using a proprietary blend of high-tensile aramid fibers and advanced resin matrices. This composition undergoes a rigorously controlled high-pressure molding process, ensuring zero delamination under extreme ballistic stress. The result is a shell that consistently outperforms standard military specifications for backface deformation and fragmentation resistance. <br /><br /> Internally, the suspension system leverages aerospace biomechanics. The multi-point harness integrates energy-absorbing memory foam pads that not only mitigate blunt force trauma but provide sustained comfort during extended deployment. Every component, from the modular side rails to the front shroud, is subjected to strict tolerance checks.",
    specTitle: "Technical Specifications",
    tableContent: [
      { label: "PRODUCT TYPE", value: "Advanced Combat Helmet (ACH) Profile" },
      { label: "MATERIAL", value: "Aramid Fiber" },
      { label: "PROTECTION LEVEL", value: "NIJ 0106.01 Level IIIA (9mm & .44 Mag)" },
      { label: "HELMET SHAPE", value: "Fast" },
      { label: "WEIGHT", value: "Shell: < 1.40 kg<br />Total with accessories: < 1.50 kg" },
      { label: "THICKNESS", value: "8.0 mm (± 0.2mm tolerance)" },
      { label: "CERTIFICATIONS", value: "ISO 9001:2015, NIJ Certified Laboratory Tested" },
    ],
    highlightTitle: "Product Highlights",
    highlightItems: [
      "Compatible with communication headsets / hearing protection",
      "Side rails for mounting accessories",
      "NVG / night vision mount compatible",
      "Adjustable head strap retention system",
      "Removable, washable interior impact-absorbing padding",
    ],
  },
  {
    slug: "ballistic-i",
    name: "Ballistic I Helmet",
    productName: "Ballistic I Helmet",
    productsImg: [
      helmetImages["../assets/products/helmet/helmet_south.png"],
      helmetImages["../assets/products/helmet/helmet_south_02.png"],
      helmetImages["../assets/products/helmet/helmet_south_03.png"],
      helmetImages["../assets/products/helmet/helmet_south_04.png"],
    ],
    level: "NIJ LEVEL IIIA",
    colors: [
      { color: "Black", hex: "#3B3B3B" },
      { color: "Green", hex: "#4B5320" },
    ],
    sizes: ["S", "M"],
    productDesc:
      "Engineered for elite tactical operations, Ballistic I Helmet combines advanced ceramic composites with aerospace-grade ergonomic design. Offering unparalleled NIJ Level IIIA protection while maintaining a remarkably low profile and weight.",
    pidTitle: "Structural Integrity & Design",
    pidDesc:
      "Ballistic I Helmet is manufactured using a proprietary blend of high-tensile aramid fibers and advanced resin matrices. This composition undergoes a rigorously controlled high-pressure molding process, ensuring zero delamination under extreme ballistic stress. The result is a shell that consistently outperforms standard military specifications for backface deformation and fragmentation resistance. <br /><br /> Internally, the suspension system leverages aerospace biomechanics. The multi-point harness integrates energy-absorbing memory foam pads that not only mitigate blunt force trauma but provide sustained comfort during extended deployment. Every component, from the modular side rails to the front shroud, is subjected to strict tolerance checks.",
    specTitle: "Technical Specifications",
    tableContent: [
      { label: "PRODUCT TYPE", value: "Advanced Combat Helmet (ACH) Profile" },
      { label: "MATERIAL", value: "Aramid Fiber" },
      { label: "PROTECTION LEVEL", value: "NIJ 0106.01 Level IIIA (9mm)" },
      { label: "HELMET SHAPE", value: "Military Helmet (round shape, open front design with visor)" },
      { label: "WEIGHT", value: "Shell: < 1.35 kg<br />Total with accessories: < 1.50 kg" },
      { label: "THICKNESS", value: "8.0 mm (± 0.2mm tolerance)" },
      { label: "CERTIFICATIONS", value: "ISO 9001:2015, NIJ Certified Laboratory Tested" },
    ],
    highlightTitle: "Product Highlights",
    highlightItems: [
      "Short front visor reduces glare and visual interference",
      "Side helmet edges provide coverage around the ear area",
      "Adjustable head strap retention system",
      "Removable, washable interior impact-absorbing padding",
      "Rear reflective strip for position marking",
    ],
  },
  {
    slug: "fast-cer",
    name: "Fast Ceramic Helmet",
    productName: "Fast Ceramic Helmet",
    productsImg: [
      helmetImages["../assets/products/helmet/helmet_fast_rif.png"],
      helmetImages["../assets/products/helmet/helmet_fast_rif_02.png"],
      helmetImages["../assets/products/helmet/helmet_fast_rif_03.png"],
      helmetImages["../assets/products/helmet/helmet_fast_rif_04.png"],
    ],
    level: "NIJ LEVEL Level IV-",
    colors: [
      { color: "Black", hex: "#3B3B3B" },
      { color: "Green", hex: "#4B5320" },
    ],
    sizes: ["S", "M", "L", "XL"],
    productDesc:
      "Engineered for elite tactical operations, Fast Ceramic Helmet combines advanced ceramic composites with aerospace-grade ergonomic design. Offering unparalleled NIJ Level IIIA protection while maintaining a remarkably low profile and weight.",
    pidTitle: "Structural Integrity & Design",
    pidDesc:
      "Fast Ceramic Helmet is manufactured using a proprietary blend of high-tensile aramid fibers and advanced resin matrices. This composition undergoes a rigorously controlled high-pressure molding process, ensuring zero delamination under extreme ballistic stress. The result is a shell that consistently outperforms standard military specifications for backface deformation and fragmentation resistance. <br /><br /> Internally, the suspension system leverages aerospace biomechanics. The multi-point harness integrates energy-absorbing memory foam pads that not only mitigate blunt force trauma but provide sustained comfort during extended deployment. Every component, from the modular side rails to the front shroud, is subjected to strict tolerance checks.",
    specTitle: "Technical Specifications",
    tableContent: [
      { label: "PRODUCT TYPE", value: "Advanced Combat Helmet (ACH) Profile" },
      { label: "MATERIAL", value: "Aramid Fiber" },
      { label: "PROTECTION LEVEL", value: "NIJ 0106.01 Level III (7.62x51 mm NATO FMJ, 7.62x39 mm MSC (AK))" },
      { label: "HELMET SHAPE", value: "Fast" },
      { label: "WEIGHT", value: "< 1.85 kg" },
      { label: "THICKNESS", value: "8.0 mm (± 0.2mm tolerance)" },
      { label: "CERTIFICATIONS", value: "ISO 9001:2015, NIJ Certified Laboratory Tested" },
    ],
    highlightTitle: "Product Highlights",
    highlightItems: [
      "Compatible with communication headsets / hearing protection",
      "Side rails for mounting accessories",
      "NVG / night vision mount compatible",
      "Adjustable head strap retention system",
      "Removable, washable interior impact-absorbing padding",
      "Compatible with supplemental armor plate inserts for added localized protection",
    ],
  },
  {
    slug: "fast-iii",
    name: "Fast III Helmet",
    productName: "Fast III Helmet",
    productsImg: [
      helmetImages["../assets/products/helmet/helmet_fast_green.png"],
      helmetImages["../assets/products/helmet/helmet_fast_green_02.png"],
      helmetImages["../assets/products/helmet/helmet_fast_green_03.png"],
      helmetImages["../assets/products/helmet/helmet_fast_green_04.png"],
    ],
    level: "NIJ LEVEL III",
    colors: [
      { color: "Black", hex: "#3B3B3B" },
      { color: "Green", hex: "#4B5320" },
    ],
    sizes: ["S", "M", "L", "XL"],
    productDesc:
      "Engineered for elite tactical operations, Fast Level III Helmet combines advanced ceramic composites with aerospace-grade ergonomic design. Offering unparalleled NIJ Level IIIA protection while maintaining a remarkably low profile and weight.",
    pidTitle: "Structural Integrity & Design",
    pidDesc:
      "Fast Level III Helmet is manufactured using a proprietary blend of high-tensile aramid fibers and advanced resin matrices. This composition undergoes a rigorously controlled high-pressure molding process, ensuring zero delamination under extreme ballistic stress. The result is a shell that consistently outperforms standard military specifications for backface deformation and fragmentation resistance. <br /><br /> Internally, the suspension system leverages aerospace biomechanics. The multi-point harness integrates energy-absorbing memory foam pads that not only mitigate blunt force trauma but provide sustained comfort during extended deployment. Every component, from the modular side rails to the front shroud, is subjected to strict tolerance checks.",
    specTitle: "Technical Specifications",
    tableContent: [
      { label: "PRODUCT TYPE", value: "Advanced Combat Helmet (ACH) Profile" },
      { label: "MATERIAL", value: "Aramid Fiber" },
      { label: "PROTECTION LEVEL", value: "NIJ 0106.01 Level III (7.62x51 mm NATO FMJ, 7.62x39 mm MSC (AK))" },
      { label: "HELMET SHAPE", value: "Fast" },
      { label: "WEIGHT", value: "< 1.85 kg" },
      { label: "THICKNESS", value: "8.0 mm (± 0.2mm tolerance)" },
      { label: "CERTIFICATIONS", value: "ISO 9001:2015, NIJ Certified Laboratory Tested" },
    ],
    highlightTitle: "Product Highlights",
    highlightItems: [
      "Compatible with communication headsets / hearing protection",
      "Side rails for mounting accessories",
      "NVG / night vision mount compatible",
      "Adjustable head strap retention system",
      "Removable, washable interior impact-absorbing padding",
      "Hook & Loop panels for patches / name tape and Infrared (IR) tape",
    ],
  }
];

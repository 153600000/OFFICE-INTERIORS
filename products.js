// Authentic refurbished office furniture catalog modeled from Toqri & Office Interiors
const PRODUCTS_DATA = [
  {
    id: "prod-1",
    title: "Solid Wood Top – Height Adjustable Desk T13-23D",
    subtitle: "120 x 60 CM Rubberwood Top | 3 Memory Presets | Dual/Single Motor 3-Stage | 80kg Load",
    brand: "Toqri / Office Interiors",
    category: "desks",
    price: 26500,
    originalPrice: 32000,
    rating: 5.0,
    reviewCount: 38,
    condition: "Brand New / Certified",
    stock: "In Stock (Pan-India Dispatch)",
    image: "https://toqri.com/wp-content/uploads/2023/10/WhatsApp-Image-2025-11-21-at-11.05.56-AM-300x300.jpeg",
    description: "Upgrade your productivity and ergonomics with this motorized height-adjustable standing desk. Features a premium natural solid wood rubberwood top, ultra-quiet motor, anti-collision sensor, and a digital LED controller with 3 memory presets ranging from 62cm to 128cm.",
    specs: {
      "Dimensions": "120 cm x 60 cm",
      "Height Range": "62 cm – 128 cm",
      "Load Capacity": "80 KG",
      "Mechanism": "3-Stage Motorized with 3 Memory Presets",
      "Warranty": "2 Years On Motor & Electronics"
    },
    isDealOfWeek: true,
    badge: "17% OFF"
  },
  {
    id: "prod-2",
    title: "Used Herman Miller Aeron Chairs Classic Fit",
    subtitle: "Graphite Frame | Pellicle Mesh | Tilt Limiter | Forward Angle | Adjustable Arms",
    brand: "Herman Miller",
    category: "chairs",
    price: 48380,
    originalPrice: 125000,
    rating: 4.9,
    reviewCount: 84,
    condition: "Refurbished - Grade A",
    stock: "Limited Stock Available",
    image: "https://toqri.com/wp-content/uploads/2023/10/Aeron3-3-300x300.webp",
    description: "The gold standard of ergonomic seating. Refurbished Herman Miller Aeron Classic featuring responsive Pellicle mesh, kinematic tilt limiter with forward tilt mechanism, lumbar support, and fully adjustable vinyl armrests. Thoroughly sanitized and serviced.",
    specs: {
      "Size": "Size B (Medium, fits 85% of users)",
      "Material": "Pellicle Breathable Suspension Mesh",
      "Ergonomics": "Forward Tilt & Tilt Limiter, Posture Lumbar",
      "Base": "5-Star Heavy Duty Nylon with Smooth Casters",
      "Condition": "Inspected, lubricated, 100% functional"
    },
    badge: "61% OFF",
    isFeatured: true
  },
  {
    id: "prod-3",
    title: "Used Herman Miller Aeron Chairs Posturefit",
    subtitle: "Ergonomic Lumbar Posturefit Support | Full Recline Lock | Premium Refurbished",
    brand: "Herman Miller",
    category: "chairs",
    price: 51920,
    originalPrice: 125000,
    rating: 5.0,
    reviewCount: 62,
    condition: "Refurbished - Grade A+",
    stock: "In Stock",
    image: "https://toqri.com/wp-content/uploads/2026/08/2-300x300.jpeg",
    description: "Genuine Herman Miller Aeron with the proprietary PostureFit sacral stabilization kit. Stabilizes the base of the spine for healthy, upright alignment during 10+ hours of continuous daily desk work.",
    specs: {
      "Support": "Sacral PostureFit System with Tension Dial",
      "Size": "Size B",
      "Armrests": "3D Adjustable (Height & Pivot)",
      "Mechanism": "Harmonic Tilt Mechanism"
    },
    badge: "58% OFF",
    isFeatured: true
  },
  {
    id: "prod-4",
    title: "Used Herman Miller Mirra 2 Chair – Green / Slate",
    subtitle: "Butterfly Back | Harmonic 2 Tilt | Ultra-Responsive Ergonomic Work Chair",
    brand: "Herman Miller",
    category: "chairs",
    price: 30000,
    originalPrice: 110000,
    rating: 4.8,
    reviewCount: 45,
    condition: "Refurbished - Grade A",
    stock: "In Stock",
    image: "https://toqri.com/wp-content/uploads/2023/10/WhatsApp-Image-2026-04-21-at-9.37.12-PM-300x300.jpeg",
    description: "Mirra 2 moves with you, at one with your body. When you sit, Mirra 2 adapts to you instantly. Features hybrid structure of a polymer spine and responsive mesh back in an elegant green/slate accent.",
    specs: {
      "Backrest": "Butterfly Suspension Back",
      "Tilt": "Harmonic 2 Tilt with multi-position lock",
      "Seat Edge": "FlexFront adjustable seat depth",
      "Origin": "Authentic Refurbished Corporate Inventory"
    },
    badge: "73% OFF",
    isFeatured: true
  },
  {
    id: "prod-5",
    title: "Used Herman Miller Mirra 1 Chairs",
    subtitle: "Triflex Ergonomic Polymer Back | Fully Adjustable Armrests",
    brand: "Herman Miller",
    category: "chairs",
    price: 25000,
    originalPrice: 110000,
    rating: 4.7,
    reviewCount: 29,
    condition: "Refurbished - Grade A",
    stock: "In Stock",
    image: "https://toqri.com/wp-content/uploads/2025/04/herman-miller-mira-1024x1024-1-300x300.webp",
    description: "A stalwart of corporate ergonomics. Mirra 1 features durable polymer Triflex back that distributes weight and vents heat effectively, paired with Herman Miller tilt mechanism.",
    specs: {
      "Backrest": "Engineered Polymer Triflex",
      "Controls": "Pneumatic cylinder, tilt lock, tension dial",
      "Warranty": "1-Year Office Interiors Warranty"
    },
    badge: "77% OFF"
  },
  {
    id: "prod-6",
    title: "Used Haworth Aloha Easy Task Chair",
    subtitle: "3D Mesh Back | Synchronized Tilt | Height Adjustable Arms | Modern Minimalist",
    brand: "Haworth",
    category: "chairs",
    price: 6000,
    originalPrice: 32000,
    rating: 4.8,
    reviewCount: 51,
    condition: "Refurbished - Like New",
    stock: "Ready to Dispatch",
    image: "https://toqri.com/wp-content/uploads/2025/05/Aloha-300x300.jpeg",
    description: "Incredible value for remote and office workspaces. The Haworth Aloha delivers clean aesthetic lines with synchronized recline ergonomics and high-density breathable mesh.",
    specs: {
      "Brand": "Haworth International",
      "Mechanism": "Synchronized Recline & Auto-Tension",
      "Seat Cushion": "High-resilience contoured foam",
      "Footprint": "Compact 5-star swivel base"
    },
    badge: "81% OFF",
    isFeatured: true
  },
  {
    id: "prod-7",
    title: "Used Freedom Headrest Chair by Humanscale",
    subtitle: "Self-Adjusting Recline | Dynamic Articulating Headrest | Counterbalance Ergonomics",
    brand: "Humanscale",
    category: "chairs",
    price: 32000,
    originalPrice: 140000,
    rating: 5.0,
    reviewCount: 19,
    condition: "Refurbished - Grade A",
    stock: "Only 3 Units Left",
    image: "https://toqri.com/wp-content/uploads/2026/07/freedom-300x300.png",
    description: "Designed by Niels Diffrient, the Humanscale Freedom redefines task seating by eliminating complex manual knobs and levers. Utilizes the sitter’s body weight and laws of physics for effortless recline.",
    specs: {
      "Headrest": "Dynamically conforms to neck cervical angle during recline",
      "Recline": "Weight-sensitive intelligent counterbalance",
      "Armrests": "Synchronous height adjustment"
    },
    badge: "77% OFF",
    isFeatured: true
  },
  {
    id: "prod-8",
    title: "Used Herman Miller Celle Chair",
    subtitle: "Cellular Polymer Suspension | Durable & Washable Ergonomic Workhorse",
    brand: "Herman Miller",
    category: "chairs",
    price: 17000,
    originalPrice: 90000,
    rating: 4.6,
    reviewCount: 17,
    condition: "Refurbished - Grade A",
    stock: "In Stock",
    image: "https://toqri.com/wp-content/uploads/2025/05/celle-4-300x300.jpeg",
    description: "Celle’s Cellular Suspension system features pliable polymer cells interconnected with flexible loops that flex and support each section of your back while offering extreme durability.",
    specs: {
      "Design": "Jerome Caruso for Herman Miller",
      "Back": "Cellular Suspension Matrix",
      "Base": "Reinforced 5-prong nylon star base"
    },
    badge: "81% OFF"
  },
  {
    id: "prod-9",
    title: "Used Aeron Size B Classic Chair with Headrest",
    subtitle: "Includes Premium Ergonomic Mesh Headrest + Posture Support Kit",
    brand: "Herman Miller",
    category: "chairs",
    price: 62880,
    originalPrice: 155000,
    rating: 5.0,
    reviewCount: 42,
    condition: "Refurbished - Grade A+ with New Headrest",
    stock: "In Stock",
    image: "https://toqri.com/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-06-at-8.02.45-AM-300x300.jpeg",
    description: "The complete executive package. Refurbished Herman Miller Aeron Size B bundled with a color-matched custom ergonomic headrest for full neck, cervical, and spinal alignment during extended work days.",
    specs: {
      "Add-on": "Pre-installed Custom Aeron Mesh Headrest",
      "Adjustments": "Tilt Tension, Forward Tilt, Lumbar Pad, 3-Axis Arms",
      "Grade": "Triple-Inspected Grade A+"
    },
    badge: "59% OFF"
  },
  {
    id: "prod-10",
    title: "New toqri / Office Interiors Electric Height Adjustable Desk T13-23D",
    subtitle: "Black/White Matte Frame | 120 x 60 CM Top | Sit Stand Range 62-128cm",
    brand: "Office Interiors",
    category: "desks",
    price: 21500,
    originalPrice: 28000,
    rating: 4.9,
    reviewCount: 33,
    condition: "Brand New Box Packed",
    stock: "Fast Dispatch",
    image: "https://toqri.com/wp-content/uploads/2025/05/New-toqri-Brand-–-Height-adjustable-Desk-T13-23D-Single-Motor-3-Stage-1-300x300.jpg",
    description: "Engineered for home offices and collaborative workspaces. Smooth, silent electronic motorized elevation with digital touch screen controls, child lock, and USB charging integration.",
    specs: {
      "Speed": "25 mm/s Smooth Lift",
      "Noise Level": "Less than 50 dB (Whisper Quiet)",
      "Presets": "3 Memory Height Profiles",
      "Frame": "Heavy-Gauge Cold Rolled Steel"
    },
    badge: "23% OFF"
  },
  {
    id: "prod-11",
    title: "Used Kaidi USA Electric Height Adjustable Tables",
    subtitle: "Heavy Duty Dual Motor Lift Columns | Commercial Grade Workstation Frame",
    brand: "Kaidi USA",
    category: "desks",
    price: 26500,
    originalPrice: 75000,
    rating: 4.8,
    reviewCount: 22,
    condition: "Refurbished - Commercial Grade",
    stock: "In Stock",
    image: "https://toqri.com/wp-content/uploads/2025/05/Used-Kaidi-USA-Electric-tables-3-300x300.webp",
    description: "Heavy-duty commercial motorized workstation built with American Kaidi dual actuators. Capable of supporting massive multi-monitor audio-visual setups without wobbling at full extension.",
    specs: {
      "Motors": "Dual High-Torque Kaidi Motors",
      "Lift Capacity": "120 KG",
      "Stability": "Reinforced crossbar-free leg geometry"
    },
    badge: "65% OFF"
  },
  {
    id: "prod-12",
    title: "Used Haworth Metal Pedestal Drawer",
    subtitle: "3-Tier Locking Mobile Storage | Heavy Steel Construction | Castor Wheels",
    brand: "Haworth",
    category: "storage",
    price: 4000,
    originalPrice: 22000,
    rating: 4.8,
    reviewCount: 67,
    condition: "Refurbished - Clean & Key Tested",
    stock: "In Stock (Bulk Available)",
    image: "https://toqri.com/wp-content/uploads/2025/04/hardworth-metal-pedestal-drawer-1024x1024-1-300x300.webp",
    description: "Durable Haworth steel mobile pedestal. Includes central locking system with original key, ball-bearing slide rails for silky smooth opening, and stationery divider tray.",
    specs: {
      "Drawers": "2 Utility Drawers + 1 File Drawer (A4/Legal)",
      "Lock": "Centralized Key Lock with master cylinder",
      "Finish": "Scratch-resistant powder coated steel",
      "Mobility": "5 heavy-duty castors (anti-tilt 5th wheel)"
    },
    badge: "82% OFF",
    isFeatured: true
  },
  {
    id: "prod-13",
    title: "Used Featherlite Metal Pedestal Dual Door With 2 Locks",
    subtitle: "Compact Office Storage Cabinet with Dual Compartments & Individual Locks",
    brand: "Featherlite",
    category: "storage",
    price: 3000,
    originalPrice: 7500,
    rating: 4.7,
    reviewCount: 14,
    condition: "Refurbished - Like New",
    stock: "In Stock",
    image: "https://toqri.com/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-02-at-12.21.07-PM-300x300.jpeg",
    description: "Compact dual-door lockable under-desk unit by Featherlite. Perfect for shared desks, secure equipment storage, or organizing office accessories safely.",
    specs: {
      "Brand": "Featherlite",
      "Material": "Cold Rolled Steel with Epoxy Powder Coating",
      "Locking": "Twin keys for independent doors"
    }
  },
  {
    id: "prod-14",
    title: "Used Featherlite Contact MB Chair With Multi Lock",
    subtitle: "Breathable Mesh Mid-Back | Synchro Tilt Mechanism | Padded Waterfall Seat",
    brand: "Featherlite",
    category: "chairs",
    price: 4500,
    originalPrice: 12000,
    rating: 4.6,
    reviewCount: 40,
    condition: "Refurbished - Grade A",
    stock: "Bulk Quantity Available",
    image: "https://toqri.com/wp-content/uploads/2025/08/WhatsApp-Image-2025-07-23-at-5.58.33-AM-300x300.jpeg",
    description: "The classic workhorse of top tech startups and IT campuses across India. Featherlite Contact features synchronized tilting with multiple locking positions and lumbar contouring.",
    specs: {
      "Back": "Korean high-tensile mesh",
      "Base": "Glass-filled nylon 5-prong base",
      "Mechanism": "Multi-lock synchro tilt"
    },
    badge: "63% OFF"
  },
  {
    id: "prod-15",
    title: "Used Optima Ergonomic Chair",
    subtitle: "Full Mesh High Back | Multi-Directional Arms | Integrated Lumbar Support",
    brand: "Optima",
    category: "chairs",
    price: 12000,
    originalPrice: 25000,
    rating: 4.7,
    reviewCount: 18,
    condition: "Refurbished - Grade A",
    stock: "In Stock",
    image: "https://toqri.com/wp-content/uploads/2025/05/optima-300x300.png",
    description: "Premium high back ergonomic task chair with ventilated mesh back and contoured seat. Provides supportive posture alignment throughout long study and programming sessions.",
    specs: {
      "Backrest": "High Back with Headrest Integration",
      "Arms": "Height & Depth Adjustable",
      "Gas Lift": "Class-4 BIFMA Certified Gas Cylinder"
    },
    badge: "52% OFF"
  },
  {
    id: "prod-16",
    title: "Headrest for Herman Miller Aeron Chair",
    subtitle: "Color Matched Mesh | Forward/Backward & Height Adjustable | Carbon Graphite",
    brand: "Herman Miller Compatible",
    category: "accessories",
    price: 14500,
    originalPrice: 16500,
    rating: 4.9,
    reviewCount: 76,
    condition: "Brand New Accessory",
    stock: "In Stock",
    image: "https://toqri.com/wp-content/uploads/2025/07/ASH_Amazon_Classic-300x300.jpg",
    description: "Specially engineered custom headrest designed to seamlessly match the color, weave, and curves of the Herman Miller Aeron (Classic & Remastered). Snaps on in under 2 minutes with zero drilling.",
    specs: {
      "Compatibility": "Aeron Size A, B, and C (Classic & Remastered)",
      "Adjustment": "3-Way Tilt, Angle, and Vertical height",
      "Install": "Allen Key included, mounts to top frame"
    },
    badge: "12% OFF",
    isFeatured: true
  },
  {
    id: "prod-17",
    title: "Classic Aeron Arm Pads Replacement Set (Pair)",
    subtitle: "Fits All Sizes A, B, C | Soft Touch Durable Polyurethane Vinyl",
    brand: "Herman Miller Compatible",
    category: "accessories",
    price: 2400,
    originalPrice: 4800,
    rating: 4.9,
    reviewCount: 112,
    condition: "Brand New Replacement Part",
    stock: "In Stock",
    image: "https://toqri.com/wp-content/uploads/2026/08/arm-pads-300x300.png",
    description: "Revitalize your Herman Miller Aeron chair with brand new, plush arm pads. High density molded foam core enveloped in resilient black polyurethane. Exact OEM screw hole spacing.",
    specs: {
      "Package": "1 Pair (Left + Right Armpads)",
      "Compatibility": "All Herman Miller Classic Aeron Chairs",
      "Material": "Soft PU Foam Leatherette"
    },
    badge: "50% OFF"
  },
  {
    id: "prod-18",
    title: "Arm Pads for Steelcase Leap V2 Chair – Pair",
    subtitle: "Original OEM Spec Flexible Contoured Arm Cap Replacements",
    brand: "Steelcase Compatible",
    category: "accessories",
    price: 2800,
    originalPrice: 5500,
    rating: 4.8,
    reviewCount: 35,
    condition: "Brand New Replacement Part",
    stock: "In Stock",
    image: "https://toqri.com/wp-content/uploads/2026/08/Leap-v2-pad-300x300.png",
    description: "Direct snap-on replacement armrest caps for the Steelcase Leap V2 office chair. Restores factory comfort if your existing pads are cracked, peeling, or sticky.",
    specs: {
      "Compatibility": "Steelcase Leap V2",
      "Contents": "Left and Right pads with clip guides"
    },
    badge: "49% OFF"
  },
  {
    id: "prod-19",
    title: "Herman Miller Aeron PostureFit Kit Replacement Part – Size B",
    subtitle: "Genuine Lumbar Posturefit Retrofit Kit with Back Pad & Dial Cable",
    brand: "Herman Miller",
    category: "accessories",
    price: 6500,
    originalPrice: 12000,
    rating: 4.9,
    reviewCount: 28,
    condition: "Brand New OEM Fit",
    stock: "In Stock",
    image: "https://toqri.com/wp-content/uploads/2026/08/Posture-fit-1-300x300.png",
    description: "Retrofit or replace the PostureFit mechanism on your Classic Herman Miller Aeron Size B. Promotes natural forward pelvic rotation to prevent slouching.",
    specs: {
      "Included": "Spine Wishbone Bracket, Butterfly Pad, Cable Tensioner, Adjustment Knob",
      "Size": "Size B"
    },
    badge: "46% OFF"
  },
  {
    id: "prod-20",
    title: "Herman Miller Lumbar Support Pad – Size B",
    subtitle: "Two-Sided Adjustable Firm/Soft Classic Lumbar Support Bar",
    brand: "Herman Miller",
    category: "accessories",
    price: 2900,
    originalPrice: 6000,
    rating: 4.8,
    reviewCount: 64,
    condition: "Brand New Replacement Part",
    stock: "In Stock",
    image: "https://toqri.com/wp-content/uploads/2026/08/Lumbar-300x300.png",
    description: "Classic horizontal slide-in lumbar pad for Herman Miller Aeron Size B. Features reversible thicknesses (thicker on one side, thinner on the other) for custom lower back curvature.",
    specs: {
      "Fit": "Slides onto rear spine tracks of Aeron Size B",
      "Dual Cushioning": "Rotate 180 degrees for firm vs extra support"
    },
    badge: "52% OFF"
  },
  {
    id: "prod-21",
    title: "Replacement Part Herman Miller Mirra 2 Arm Pads",
    subtitle: "Soft-Touch Ergonomic Arm Caps for Mirra 2 Office Chairs (Pair)",
    brand: "Herman Miller Compatible",
    category: "accessories",
    price: 2600,
    originalPrice: 5200,
    rating: 4.7,
    reviewCount: 21,
    condition: "Brand New Replacement Part",
    stock: "In Stock",
    image: "https://toqri.com/wp-content/uploads/2026/08/M2-pads-300x300.jpg",
    description: "Direct replacement arm caps for Herman Miller Mirra 2 chairs. Restores seamless ergonomic elbow cushioning with easy bolt-on installation.",
    specs: {
      "Compatibility": "Herman Miller Mirra 2 Chairs",
      "Color": "Graphite Black"
    },
    badge: "50% OFF"
  },
  {
    id: "prod-22",
    title: "Armrest Pads Replacement for Herman Miller Mirra 1 Office Chair",
    subtitle: "Ergonomic Office Chair Armrest Replacement Caps (Black Pair)",
    brand: "Herman Miller Compatible",
    category: "accessories",
    price: 2500,
    originalPrice: 5000,
    rating: 4.7,
    reviewCount: 30,
    condition: "Brand New Replacement Part",
    stock: "In Stock",
    image: "https://toqri.com/wp-content/uploads/2026/08/M1-pads-300x300.png",
    description: "Premium replacement caps tailored for the first-generation Herman Miller Mirra chair. Heavy-duty material resistant to skin oils and wear.",
    specs: {
      "Compatibility": "Herman Miller Mirra 1",
      "Material": "Polyurethane Foam Core"
    },
    badge: "50% OFF"
  }
];

// Top Brands
const BRANDS_DATA = [
  { name: "Herman Miller", count: "12+ Items", logo: "https://toqri.com/wp-content/uploads/2025/04/Haworth-1.png", badge: "Global Icon" },
  { name: "Steelcase", count: "8+ Items", logo: "https://toqri.com/wp-content/uploads/2025/04/Knoll-1.png", badge: "Ergonomic Leader" },
  { name: "Haworth", count: "6+ Items", logo: "https://toqri.com/wp-content/uploads/2025/04/Haworth-1.png", badge: "Sustainable Tech" },
  { name: "Humanscale", count: "5+ Items", logo: "https://toqri.com/wp-content/uploads/2025/04/Humanscale-1.png", badge: "Minimalist Bio-Mechanics" },
  { name: "Featherlite", count: "10+ Items", logo: "https://toqri.com/wp-content/uploads/2025/04/Knoll-1.png", badge: "India's Best Value" },
  { name: "Knoll", count: "4+ Items", logo: "https://toqri.com/wp-content/uploads/2025/04/Knoll-1.png", badge: "Modernist Heritage" }
];

// Customer Reviews (Modeled from Toqri Google Verified Reviews)
const REVIEWS_DATA = [
  {
    name: "Arunachalam S.",
    role: "Senior Engineering Manager, Bengaluru",
    stars: 5,
    date: "2 days ago",
    text: "Ordered a refurbished Herman Miller Aeron Size B with posture fit. Arrived in pristine, like-new condition! The mesh tension is factory tight, cylinder is brand new, and delivery was completed in 48 hours. Saved over ₹75,000 compared to brand new!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
  },
  {
    name: "Dr. Rohini Mehta",
    role: "Physiotherapist & Spine Consultant",
    stars: 5,
    date: "1 week ago",
    text: "As a postural consultant, I constantly recommend patients buy refurbished tier-1 ergonomic chairs instead of cheap imported office chairs. Office Interiors / Toqri provides authentic Herman Miller and Haworth at accessible pricing.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80"
  },
  {
    name: "Karthik Venkat",
    role: "Founder, Fintech Startup (Hyderabad)",
    stars: 5,
    date: "2 weeks ago",
    text: "We furnished our entire 45-person workstation area with Kaidi electric standing desks and Haworth Aloha chairs. The team handled door-to-door freight, installation, and gave us GST invoices with a 1-year warranty. Fantastic service!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
  },
  {
    name: "Pooja Deshmukh",
    role: "UI/UX Designer, Mumbai",
    stars: 5,
    date: "3 weeks ago",
    text: "The Mirra 2 chair in Green looks incredible in my studio. The ordering over WhatsApp was super smooth; they sent me high-res video inspection of the actual chair before shipping. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
  }
];

// Blog Posts
const BLOG_DATA = [
  {
    title: "Buy a Premium Ergonomic Chair Today: Why Refurbished Beats Cheap New",
    category: "Ergonomics & Health",
    date: "May 2026",
    summary: "Discover why a refurbished Herman Miller Aeron or Steelcase Leap outlasts and outperforms new low-cost foam chairs by over a decade.",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1580481077195-c990264175a2?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Saved a Million on Infra Costs: The Startup Guide to Office Liquidation",
    category: "Corporate Buying",
    date: "April 2026",
    summary: "How modern tech firms and agile workspaces optimize their capital expenditure by 60-80% through certified pre-loved asset acquisition.",
    readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80"
  },
  {
    title: "Circular Economy and United Nations' Sustainable Development Goals (SDGs)",
    category: "Sustainability",
    date: "March 2026",
    summary: "How every repurposed ergonomic chair diverts 35kg of carbon emissions and prevents toxic plastic & metal landfills.",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRODUCTS_DATA, BRANDS_DATA, REVIEWS_DATA, BLOG_DATA };
}

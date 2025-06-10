export interface TeamMember {
  id: number;
  name: string;
  title: string;
  image: string;
  bio: string;
  linkedin?: string;
  email?: string;
  achievements: string[];
  personalNote?: string;
  category: 'founder' | 'team';
  order: number;
}

export const teamData: TeamMember[] = [
  {
    id: 1,
    name: "Vasant Rao",
    title: "Managing Partner",
    image: "/founder-1.png",
    bio: "Vasant oversees venture partnerships, fundraising, and overall operations at Shastra VC, while also leading the firm's investments in DeepTech, FrontierTech, Enterprise SaaS, and the Creator Ecosystem. Before Shastra, Vasant was a serial entrepreneur with successful exits from Autoninja (acquired by ICICI Lombard) and Bumper.com, and also played key roles at Prisma Global. Over the years, he has worn many hats—founder, consultant, and angel investor—bringing a versatile perspective to venture building.",
    linkedin: "https://www.linkedin.com/in/vasantrao02/",
    email: "vasant@shastra.vc",
    achievements: [
      // "Serial entrepreneur with successful exits",
      // "Founded Autoninja (acquired by ICICI Lombard)",
      // "Co-founded Bumper.com",
      // "Key roles at Prisma Global",
      // "Lancaster University Management School alumnus"
    ],
    personalNote: "A die-hard Manchester United fan and fantasy football enthusiast, Vasant's passions extend well beyond venture if there's a classic stout in hand.",
    category: 'founder',
    order: 1
  },
  {
    id: 2,
    name: "Avijeet Alagathi",
    title: "Managing Partner",
    image: "/founder-2.png",
    bio: "Avi oversees portfolio management, investor relations, and overall operations at Shastra VC, while also driving the firm's investments across FinTech, HealthTech, and SMB SaaS. He leads Shastra's pre-seed and seed-stage investments with a sharp eye for scalable innovation. Avi brings a rich mix of experience as both an investor and operator—having worked as an Investment Analyst at Goldman Sachs and later founding and leading product and business at BYG. He has also led new product initiatives at KredX and ABI Health, where he honed his skills in product strategy and financial management for startups.",
    linkedin: "https://www.linkedin.com/in/avialagathi",
    email: "avi@shastra.vc",
    achievements: [
      // "Investment Analyst at Goldman Sachs",
      // "Founder and product leader at BYG",
      // "Led product initiatives at KredX and ABI Health",
      // "College of Engineering, Pune and IIM Kozhikode graduate",
      // "Investment Committee Member of IIM Kozhikode Alumni Angel Fund (IIMKAF)"
    ],
    personalNote: "Just like Vasant, Avi enjoys his fair share of fantasy football. As a newly minted dad, he's currently learning the tricks of the trade to keep his son smiling!",
    category: 'founder',
    order: 2
  },
  {
    id: 6,
    name: "Shachi Jalote",
    title: "Analyst",
    image: "/founder-6.png",
    bio: "Shachi Jalote is an Analyst at Shastra VC. She joined the firm in 2025, driven by a growing interest in deeptech and AI, and a desire to work closely with startups building new and impactful technologies. Her interest in venture capital began during her tenure at Beyond Next Ventures, shortly after graduating from IIT Kharagpur with an Integrated MSc in Economics. Before joining Shastra, she worked as a consultant at Arthur D. Little, focusing on projects with clients in Saudi Arabia.",
    linkedin: "https://www.linkedin.com/in/shachi-jalote/",
    email: "shachi@shastra.vc",
    achievements: [
      // "IIT Kharagpur graduate with Integrated MSc in Economics",
      // "Former consultant at Arthur D. Little",
      // "Experience at Beyond Next Ventures",
      // "Specialized in deeptech and AI ventures",
      // "Client experience in Saudi Arabia markets"
    ],
    personalNote: "While in college, she also interned with companies like American Express, the World Bank, and ISB, where she gained experience in data analytics and machine learning. Outside of work, Shachi enjoys staying active—whether it's playing badminton, going to the gym, or heading out for a hike. She's also a trained Kathak dancer and loves spending time in calm, offbeat places that help her disconnect and recharge.",
    category: 'team',
    order: 6
  },
  {
    id: 5,
    name: "Pratiti Chakraborty",
    title: "Compliance and Portfolio Management",
    image: "/founder-5.png",
    bio: "Pratiti manages Shastra VC's internal and external compliance, investor relations, and portfolio management. She plays a pivotal role in facilitating communication between startup founders, fund partners, and investors, ensuring smooth collaboration and growth across the board. A graduate in Finance and a post-graduate in Mass Communication from Symbiosis Institute of Media and Communication (SIMC, Pune), Pratiti began her career in journalism as a Senior News Producer and financial content writer at CNBC-TV18 (CNN-IBN).",
    linkedin: "https://www.linkedin.com/in/pratiti-chakraborty-5596387/",
    email: "pratiti@shastra.vc",
    achievements: [
      // "Graduate in Finance and post-graduate in Mass Communication",
      // "Symbiosis Institute of Media and Communication (SIMC, Pune) alumna",
      // "Former Senior News Producer at CNBC-TV18",
      // "Financial content writer experience",
      // "Expertise in compliance and portfolio management"
    ],
    personalNote: "After her stint in media, she transitioned into the startup ecosystem, where she has spent the last eight years working closely with founders across functions such as finance, growth, legal, compliance, and investor relations. Her journey has included impactful roles at companies like Zilingo and Fortunexus, where she deepened her expertise in startup operations and supporting entrepreneurial vision. When she's not at work, Pratiti is doting on her child. As a committed mompreneur, her two greatest passions are supporting founders with her strategic acumen and providing her daughter with a nurturing, holistic growth environment.",
    category: 'team',
    order: 5
  },
  {
    id: 4,
    name: "Jivesh Madan",
    title: "Vice President",
    image: "/founder-4.png",
    bio: "Jivesh is a Vice President at Shastra VC, where he plays a key role in driving investments and portfolio growth across emerging technology sectors. An alumnus of IIT Delhi, he began his career as an Investment Associate and quickly rose through the ranks owing to his sharp analytical acumen and cross-sector expertise. Prior to Shastra, Jivesh worked as a Consultant with Nomura (NRI) Consulting, where he led and supported projects across India, Japan, Korea, and the US, advising clients on market entry strategies, competitive analysis, market assessments, and due diligence.",
    linkedin: "https://www.linkedin.com/in/jiveshmadan",
    email: "jivesh@shastra.vc",
    achievements: [
      // "IIT Delhi alumnus",
      // "Former Consultant at Nomura (NRI) Consulting",
      // "Cross-sector expertise across India, Japan, Korea, and the US",
      // "Experience with Mastercard Advisors",
      // "Visiting Scholar at ETH Zurich, Switzerland"
    ],
    personalNote: "Earlier in his career, he was an Associate Consultant with Mastercard Advisors, working with clients in the banking and payments industry. Jivesh has also spent time as a Visiting Scholar at ETH Zurich, Switzerland, experiences that broadened his global perspective on innovation and emerging markets. A Formula 1 fanatic and a devoted pet lover, Jivesh is always up for an adventure—whether it's discovering new destinations or diving into extreme sports.",
    category: 'team',
    order: 4
  },
  {
    id: 3,
    name: "Ashish Nayak",
    title: "Founding Partner",
    image: "/founder-3.png",
    bio: "Ashis drives portfolio management and ecosystem partnerships at Shastra VC, while also leading the firm's investments across Marketplaces, B2B Commerce, ClimateTech, and Enterprise/SMB SaaS. An alumnus of NIT Calicut and IIM Bangalore, Ashis began his career with global technology leaders like Intel and NetApp, and later held leadership positions at companies like Birla. He went on to co-found Autoninja, a SaaS startup that was successfully acquired by ICICI Lombard, marking a significant milestone in his entrepreneurial journey.",
    linkedin: "https://www.linkedin.com/in/ashis-nayak-31b6a91/",
    email: "ashis@shastra.vc",
    achievements: [
      // "NIT Calicut and IIM Bangalore alumnus",
      // "Former leadership roles at Intel and NetApp",
      // "Co-founder of Autoninja (acquired by ICICI Lombard)",
      // "Experience at Birla",
      // "Expertise in B2B Commerce and ClimateTech"
    ],
    personalNote: "Yet another passionate Manchester United fan at Shastra, Ashis is also an avid follower of Indian politics.",
    category: 'team',
    order: 3
  }
];

export const getFounders = () => teamData.filter(member => member.category === 'founder');
export const getTeamMembers = () => teamData.filter(member => member.category === 'team');
export const getAllTeamMembers = () => teamData.sort((a, b) => a.order - b.order);
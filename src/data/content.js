// All page copy, taken from https://smicee.com/. Edit text here, not in the components.

export const nav = {
  links: [
    { label: 'Home', href: '#home' },
    {
      label: 'Features',
      children: [
        'HR Management',
        'Project / Task Management',
        'Sales Management',
        'Finance / Accounts Management',
        'Client Management',
        'Administrative & Operational Management',
        'Vendor Management',
      ].map((label) => ({ label, href: '#features' })),
    },
    {
      label: 'Portfolio',
      children: [
        { label: 'CatchLab', href: 'https://catchlab.xyz/' },
        { label: 'Catch Digital', href: 'https://catchdigital.xyz/' },
        { label: 'Catch Bangladesh', href: 'https://catchbangladesh.com' },
        { label: 'Skill Master', href: 'https://skillmaster.academy' },
        { label: 'Travel Foring', href: '#portfolio' },
        { label: 'BitFlex', href: 'https://bitflex.xyz/' },
        { label: 'PixelTag', href: 'https://pixeltag.net/' },
      ],
    },
    { label: 'Contact', href: '#contact' },
  ],
  cta: { label: 'Get Started', href: '#contact' },
}

export const hero = {
  eyebrow: 'Smart Office',
  title: 'Manage Everything',
  tagline: 'Streamline. Simplify. Succeed.',
  text: 'From tasks to facilities, master it all!',
  primary: { label: 'Find Now', href: '#features' },
  secondary: { label: 'See how it works', href: '#platform' },
}

export const portfolio = {
  label: 'Our portfolio',
  items: [
    { name: 'CatchLab', href: 'https://catchlab.xyz/' },
    { name: 'Catch Digital', href: 'https://catchdigital.xyz/' },
    { name: 'Catch Bangladesh', href: 'https://catchbangladesh.com' },
    { name: 'Skill Master', href: 'https://skillmaster.academy' },
    { name: 'Travel Foring', href: null },
    { name: 'BitFlex', href: 'https://bitflex.xyz/' },
    { name: 'PixelTag', href: 'https://pixeltag.net/' },
  ],
}

// "How Can We Help Your Company?"
export const platform = {
  eyebrow: 'The platform',
  title: 'How Can We Help Your Company?',
  blocks: [
    {
      title: 'A Fully Integrated System',
      text: '',
      cta: 'Learn More',
      lead: true,
      tone: 'primary',
    },
    { title: 'Multiple Platform', text: 'Manage everything from one unified interface.', tone: 'amber' },
    { title: 'Seamless Collaboration', text: 'Connects employees, tools, and resources in one hub.', tone: 'cyan' },
    {
      title: 'CRM Export Workflows',
      text: 'Supports lead conversion, customer support, and sales workflows.',
      tone: 'magenta',
    },
    { title: 'Automated Reports', text: 'Generates tailored insights.', tone: 'green' },
  ],
}

// The seven feature modules from the Features menu
export const modules = {
  eyebrow: 'Features',
  title: 'HR, projects, sales, finance, clients, operations and vendors',
  items: [
    'HR Management',
    'Project / Task Management',
    'Sales Management',
    'Finance / Accounts Management',
    'Client Management',
    'Administrative & Operational Management',
    'Vendor Management',
  ],
}

export const showcase = [
  {
    eyebrow: 'Automation',
    title: 'Accelerate Your Business With Our Seamless Automation Tools',
    text: 'Streamline your processes and scale your business with an automation tool.',
    cta: 'See More',
    image: '/images/Accelerate.jpg',
    alt: 'Total revenue bar chart',
  },
  {
    eyebrow: 'Monitoring',
    title: 'Experience With Live Performance Monitoring System',
    text: 'Real-time insights to improve accountability and transparency.',
    cta: 'See More',
    image: '/images/ARss.jpg',
    alt: 'Earnings and statistics panel',
  },
]

export const leads = {
  eyebrow: 'Leads',
  title: 'Features to Help Your Leads Simplify',
  items: [
    { title: 'Lead Conversion', image: '/images/EXP.jpg', alt: 'Overview line chart' },
    { title: 'Structured Reports', image: '/images/SR.jpg', alt: 'Structured report preview' },
    { title: 'Dashboard', image: '/images/DB.jpg', alt: 'Dashboard preview' },
  ],
}

export const stats = {
  eyebrow: 'By the numbers',
  title: 'Build a Client Database and Seize New Potential',
  items: [
    { value: 1200, label: 'Company Projects', icon: '/images/A.png' },
    { value: 120, label: 'Happy Customers', icon: '/images/B.png' },
    { value: 13, label: 'Award Winning', icon: '/images/C.png' },
    { value: 100, label: 'Satisfaction Rate', icon: '/images/D.png', suffix: '%' },
  ],
}

export const automation = {
  eyebrow: 'Security',
  title: 'Create Automated Scenarios to Secure Your Business',
  cta: 'See More',
}

export const cta = {
  title: 'Get Started Today and See What We Can Do For You',
  text: 'Get in touch-SMICEE!',
  placeholder: 'Your email address',
  button: 'Subscribe',
}

export const footer = {
  tagline: 'Seamless solution for Smart Offices. Powering productivity, Unleashing potential in smarter world.',
  columns: [
    { title: 'Resources', links: ['Services', 'Platform', 'About Us'] },
    { title: 'Company', links: ['Team', 'Mission'] },
    { title: 'Contact Us', links: ['Location', 'Support'] },
  ],
  social: ['Facebook', 'Instagram', 'Twitter'],
  copyright: 'SMICEE. All rights reserved.',
}

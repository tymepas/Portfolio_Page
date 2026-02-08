export const portfolioData = {
  hero: {
    name: "Garvit Mathur",
    title: "Data Analyst | Python • SQL • Power BI",
    tagline: "Turning data into insights that drive decisions",
    description: "4+ years transforming complex data into actionable insights. Specialized in Python, SQL, Power BI, and Generative AI.",
    metrics: [
      { value: "100+", label: "Projects Delivered" },
      { value: "95%", label: "On-Time Delivery" },
      { value: "4+", label: "Years Experience" },
      { value: "20%", label: "Efficiency Gains" }
    ],
    contact: {
      email: "garvit542@gmail.com",
      phone: "+91 8826074436",
      location: "New Delhi, India",
      github: "https://github.com/tymepas",
      linkedin: "https://www.linkedin.com/in/garvitai/",
      twitter: "https://twitter.com/garvit5421"
    }
  },
  
  about: {
    summary: "I am a data-driven professional with 4+ years of experience in project management and analytics within the market research industry, now transitioning into Data Science and AI. My career journey has given me the ability to bridge business needs with technical solutions, ensuring that insights are both accurate and actionable.",
    highlights: [
      "Built end-to-end data cleaning pipelines and interactive dashboards across healthcare, HR, and electoral analytics domains",
      "Managed 100+ global projects with 95% on-time delivery, reducing costs by 15% and improving workflow efficiency by 20%",
      "Developed expertise in Generative AI and LLM evaluation, measuring outputs against rigorous quality rubrics",
      "Created interactive dashboard for India General Election 2024 with advanced DAX modeling and geospatial analysis"
    ]
  },
  
  skills: {
    technical: [
      { name: "Python", level: 90, category: "Programming" },
      { name: "SQL", level: 88, category: "Programming" },
      { name: "Power BI", level: 92, category: "Visualization" },
      { name: "Tableau", level: 85, category: "Visualization" },
      { name: "Excel", level: 95, category: "Visualization" },
      { name: "DAX", level: 88, category: "Visualization" }
    ],
    dataScience: [
      { name: "Data Cleaning", level: 95 },
      { name: "EDA", level: 90 },
      { name: "Statistical Analysis", level: 85 },
      { name: "Machine Learning", level: 82 },
      { name: "ETL Development", level: 88 },
      { name: "Feature Engineering", level: 85 }
    ],
    aiTools: [
      { name: "Generative AI", level: 85 },
      { name: "LLM Evaluation", level: 88 },
      { name: "Prompt Engineering", level: 90 },
      { name: "NLP", level: 80 }
    ],
    tools: [
      "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn",
      "Git/GitHub", "JIRA", "Confluence", "Jupyter", "VS Code"
    ],
    domains: [
      "Healthcare Analytics", "HR Analytics", "Finance", 
      "Retail Analytics", "Market Research", "Electoral Analytics"
    ]
  },
  
  experience: [
    {
      id: 1,
      title: "Project Manager",
      company: "NS Matrix Services Pvt. Ltd.",
      location: "New Delhi, India",
      period: "January 2024 - Present",
      type: "Full-time",
      description: "Leading end-to-end market research projects with focus on data quality and analytics.",
      achievements: [
        "Managed 100+ market research projects, delivering 95% on-time performance against client SLAs",
        "Led coordination across 10 teams managing a global online panel of 50,000+ participants",
        "Performed EDA and statistical analyses for 20+ global clients",
        "Reduced project costs by 15% via sampling redesign and vendor negotiations",
        "Improved workflow throughput by 20% through automation with Excel/JIRA"
      ]
    },
    {
      id: 2,
      title: "Data Analyst Intern",
      company: "Access Million",
      location: "Remote",
      period: "February 2025 - September 2025",
      type: "Internship",
      description: "Building analytics solutions and dashboards for campaign optimization.",
      achievements: [
        "Built interactive Power BI and Excel dashboards to track campaign reach and conversion",
        "Wrote SQL for ETL tasks on 120,000-row datasets, improving data quality",
        "Automated weekly reporting, reducing manual preparation time by 25%",
        "Conducted EDA and produced visualizations that refined campaign targeting"
      ]
    },
    {
      id: 3,
      title: "Associate Project Manager",
      company: "Toluna",
      location: "Gurgaon, India",
      period: "July 2023 - December 2023",
      type: "Full-time",
      description: "Supported execution of market research projects with focus on data quality.",
      achievements: [
        "Supported execution of market research projects with sampling operations",
        "Coordinated cross-functional teams for smooth project handover",
        "Improved client satisfaction through project scope alignment",
        "Maintained project trackers and weekly status reports"
      ]
    },
    {
      id: 4,
      title: "Associate Project Manager",
      company: "NS Matrix Services Pvt. Ltd.",
      location: "New Delhi, India",
      period: "May 2021 - July 2023",
      type: "Full-time",
      description: "Coordinated projects with focus on delivery efficiency and quality.",
      achievements: [
        "Improved delivery efficiency by 20% by coordinating with 15 vendors",
        "Created and maintained project schedules improving on-time completion rates",
        "Supported documentation of project processes for compliance",
        "Participated in risk identification and issue resolution"
      ]
    }
  ],
  
  featuredProjects: [
    {
      id: 1,
      title: "Generative AI Projects",
      description: "End-to-end GenAI learning covering LLM fundamentals, embeddings, prompt engineering, transformers, vector databases, and RAG implementation.",
      image: "/api/placeholder/600/400",
      category: "GenAI",
      tech: ["Python", "LLMs", "RAG", "Embeddings", "Transformers"],
      github: "https://github.com/tymepas/GenAI_Projects",
      highlights: ["LLM fundamentals", "Vector databases", "RAG implementation"],
      featured: true
    },
    {
      id: 2,
      title: "Customer Churn Prediction",
      description: "End-to-end ML project with EDA, feature engineering, Logistic Regression and Random Forest, including ROC/PR analysis and decision-threshold tuning.",
      image: "/api/placeholder/600/400",
      category: "Machine Learning",
      tech: ["Python", "Scikit-learn", "Pandas", "ML"],
      github: "https://github.com/tymepas/DS-Customer-Churn-Prediction",
      highlights: ["Feature engineering", "Model evaluation", "ROC analysis"],
      featured: true
    },
    {
      id: 3,
      title: "Power BI Projects Portfolio",
      description: "Comprehensive Power BI portfolio showcasing data cleaning, modeling, DAX calculations, geospatial analysis, and interactive dashboard design.",
      image: "/api/placeholder/600/400",
      category: "Visualization",
      tech: ["Power BI", "DAX", "SQL", "Data Modeling"],
      github: "https://github.com/tymepas/-Power-BI-Projects-Portfolio",
      highlights: ["DAX calculations", "Geospatial analysis", "Interactive dashboards"],
      featured: true
    },
    {
      id: 4,
      title: "LLM Output Evaluation",
      description: "Freelance project evaluating LLM outputs using 10-criterion rubric for clarity, relevance, accuracy, and engagement to improve AI quality.",
      image: "/api/placeholder/600/400",
      category: "GenAI",
      tech: ["Python", "LLM Evaluation", "Prompt Engineering"],
      github: "#",
      highlights: ["Quality assessment", "Prompt optimization", "Comparative analysis"],
      featured: true
    }
  ],
  
  allProjects: [
    {
      id: 5,
      title: "Python Data Cleaning & Visualization",
      description: "Real-world Python projects focused on data cleaning, EDA, and visualization across HR, Healthcare domains. Improved data accuracy by 20%.",
      category: "Visualization",
      tech: ["Python", "Pandas", "Matplotlib", "Seaborn"],
      github: "https://github.com/tymepas/Python-Data-Cleaning-and-Visualization",
      date: "2025"
    },
    {
      id: 17,
      title: "Power BI Dashboard Portfolio",
      description: "Interactive Power BI dashboards with data modeling, DAX calculations, geospatial analysis, and advanced visualizations.",
      category: "Visualization",
      tech: ["Power BI", "DAX", "Data Modeling", "SQL"],
      github: "https://github.com/tymepas/-Power-BI-Projects-Portfolio",
      date: "2025"
    },
    {
      id: 6,
      title: "Car Price Prediction",
      description: "ML project predicting used car prices with EDA, feature engineering, and linear regression modeling.",
      category: "Machine Learning",
      tech: ["Python", "Scikit-learn", "Pandas"],
      github: "https://github.com/tymepas/DS-Car-Price-Prediction",
      date: "2026"
    },
    {
      id: 7,
      title: "Oil Spill Classification",
      description: "ML project detecting oil spills using Random Forest with class imbalance handling and feature importance analysis.",
      category: "Machine Learning",
      tech: ["Python", "Random Forest", "Scikit-learn"],
      github: "https://github.com/tymepas/DS-Oil-Spill-Classification",
      date: "2026"
    },
    {
      id: 8,
      title: "Medical Cost Prediction",
      description: "Supervised ML project predicting medical insurance charges comparing Linear Regression and Random Forest models.",
      category: "Machine Learning",
      tech: ["Python", "ML", "Pandas"],
      github: "https://github.com/tymepas/DS-Medical-Cost-Prediction",
      date: "2026"
    },
    {
      id: 9,
      title: "House Price Prediction",
      description: "Predictive modeling using Linear Regression & Random Forest with EDA and feature importance analysis.",
      category: "Machine Learning",
      tech: ["Python", "Scikit-learn", "EDA"],
      github: "https://github.com/tymepas/DS-House-Price-Prediction",
      date: "2026"
    },
    {
      id: 10,
      title: "Time Series Forecasting",
      description: "End-to-end time series analysis of daily product sales using decomposition techniques, rolling statistics, and ARIMA.",
      category: "Data Analytics",
      tech: ["Python", "Time Series", "ARIMA"],
      github: "https://github.com/tymepas/DS-Quantity-TimeSeries-Forecasting",
      date: "2026"
    },
    {
      id: 11,
      title: "Online Retail Customer Analysis",
      description: "Customer analysis using RFM segmentation to identify high-value buyers and support marketing strategies.",
      category: "Data Analytics",
      tech: ["Python", "RFM Analysis", "Segmentation"],
      github: "https://github.com/tymepas/DA-Online-Retail-Customer-Analysis",
      date: "2026"
    },
    {
      id: 12,
      title: "Credit Card Fraud Detection",
      description: "ML project detecting fraud on highly imbalanced data with EDA, preprocessing, and ROC-AUC evaluation.",
      category: "Machine Learning",
      tech: ["Python", "ML", "Imbalanced Data"],
      github: "https://github.com/tymepas/DS-Credit-Card-Fraud-Detection",
      date: "2025"
    },
    {
      id: 13,
      title: "Netflix Data Analysis",
      description: "EDA of Netflix titles dataset focusing on content trends, genres, countries and audience maturity.",
      category: "Data Analytics",
      tech: ["Python", "Pandas", "Visualization"],
      github: "https://github.com/tymepas/netflix-data-cleaning-analysis-visualization",
      date: "2026"
    },
    {
      id: 14,
      title: "Music Tours Dataset Cleaning",
      description: "Cleaned messy Kaggle dataset standardizing columns, removing noise, converting currency, parsing date ranges.",
      category: "Data Analytics",
      tech: ["Python", "Pandas", "Feature Engineering"],
      github: "https://github.com/tymepas/Music-Tours-Dataset-Data-Cleaning-Feature-Engineering",
      date: "2026"
    },
    {
      id: 15,
      title: "Diabetes Risk Analysis",
      description: "Analysis of patient health data to predict 10-year heart disease risk using analytics and ML.",
      category: "Data Analytics",
      tech: ["Python", "Healthcare", "Predictive Analytics"],
      github: "https://github.com/tymepas/DA-Diabetes-Risk-Analysis",
      date: "2026"
    },
    {
      id: 16,
      title: "GenAI 30 Days Challenge",
      description: "30-day hands-on journey exploring GenAI concepts, tools, and applications in Python, NLP, and agentic AI.",
      category: "GenAI",
      tech: ["Python", "GenAI", "NLP", "Agentic AI"],
      github: "https://github.com/tymepas/GenAI_30days",
      date: "2025"
    }
  ],
  
  certifications: [
    {
      id: 1,
      title: "Master's in Data Science",
      issuer: "NASSCOM",
      date: "September 2025",
      badge: "Gold",
      credentialId: "#"
    },
    {
      id: 2,
      title: "Data Science with GenAI (Master's Program)",
      issuer: "TopMentor",
      date: "August 2025",
      credentialId: "#"
    },
    {
      id: 3,
      title: "Australia Data Analytics Job Simulation",
      issuer: "Deloitte (Forage)",
      date: "July 2025",
      credentialId: "#"
    },
    {
      id: 4,
      title: "Data Science Specialization",
      issuer: "Coursera",
      date: "2024",
      credentialId: "#"
    },
    {
      id: 5,
      title: "Python Program",
      issuer: "HackerRank",
      date: "2024",
      credentialId: "#"
    },
    {
      id: 6,
      title: "Build a Face Recognition Application using Python",
      issuer: "Coursera",
      date: "2023",
      credentialId: "#"
    }
  ],
  
  education: [
    {
      id: 1,
      degree: "Master of Computer Applications (MCA)",
      institution: "Bhai Parmanand Institute of Business Studies",
      location: "New Delhi, India",
      period: "2018 - 2021",
      field: "Computer and Information Sciences"
    },
    {
      id: 2,
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Sikkim Manipal University - Distance Education",
      location: "New Delhi, India",
      period: "2014 - 2017",
      field: "Web Designing and Development"
    }
  ]
};

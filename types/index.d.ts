interface Job {
  title: string;
  description: string;
  location: string;
  requiredSkills: string[];
}

interface Tip {
  type: "good" | "improve";
  tip: string;
  explanation?: string;
}

interface Feedback {
  overallScore: number;
  ATS: {
    score: number;
    tips: Tip[];
  };
  toneAndStyle: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
  content: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
  structure: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
  skills: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
}

interface Resume {
  id: string;
  companyName: string;
  jobTitle: string;
  imagePath: string;
  resumePath: string;
  feedback: Feedback;
}

interface FSItem {
  id: string;
  name: string;
  path: string;
  type: string;
  size?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface PuterUser {
  username: string;
  email?: string;
  uid: string;
}

interface KVItem {
  key: string;
  value: string;
}

interface ChatMessage {
  role: string;
  content: any;
}

interface AIResponse {
  message: {
    content: string | { text: string }[];
  };
}

interface PuterChatOptions {
  model?: string;
  max_tokens?: number;
  temperature?: number;
}
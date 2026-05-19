const mockUsers = [
  { id: 1, nickname: 'Alex', type: 'international', language: 'English', interests: ['K-Pop', 'Food'] },
  { id: 2, nickname: '민수', type: 'korean', language: 'Korean', interests: ['Language Exchange', 'Travel'] },
  { id: 3, nickname: 'Sarah', type: 'international', language: 'English', interests: ['History', 'Cafe'] },
];

let currentUser = null;

let mockPosts = [
  {
    id: 1,
    author: '민수',
    category: 'Q&A',
    title: 'Welcome to our university!',
    content: 'If you have any questions about campus life, feel free to ask here. I am happy to help!',
    timestamp: '2023-10-25 10:00',
    comments: [
      { author: 'Alex', content: 'Thank you! Where is the best place to eat around campus?', timestamp: '2023-10-25 10:15' }
    ]
  },
  {
    id: 2,
    author: 'Sarah',
    category: 'Info',
    title: 'Course Registration Help',
    content: 'When does the course registration start for next semester? I am a bit confused by the system.',
    timestamp: '2023-10-26 09:30',
    comments: []
  }
];

let mockSchoolInfo = [
  {
    id: 1,
    author: 'Admin',
    category: 'Registration',
    title: 'Spring Course Registration Guide / 봄학기 수강신청 안내',
    content: 'Registration starts on Nov 15th at 10:00 AM. Please check the university portal. / 수강신청은 11월 15일 오전 10시에 시작됩니다.',
    timestamp: '2023-11-01 09:00',
    comments: []
  },
  {
    id: 2,
    author: 'Admin',
    category: 'Admin',
    title: 'Dormitory Application Extended / 기숙사 신청 연장',
    content: 'The deadline for dormitory application is extended to Nov 20th. / 기숙사 신청 기한이 11월 20일까지로 연장되었습니다.',
    timestamp: '2023-11-05 14:00',
    comments: []
  }
];

const englishGuides = [
  {
    category: 'Daily Life',
    phrases: [
      { en: 'Do you want to grab lunch together?', ko: '같이 점심 먹을래?' },
      { en: 'Sure! Where should we go?', ko: '좋아! 어디로 갈까?' }
    ]
  },
  {
    category: 'Campus Info',
    phrases: [
      { en: 'When does course registration start?', ko: '수강신청은 언제 시작하나요?' },
      { en: 'Where is the administration office?', ko: '행정실은 어디에 있나요?' }
    ]
  }
];

const privacyRules = [
  'Do not share personal ID numbers or passwords.',
  'Meet in public places for the first time.',
  'Use the report button if someone makes you uncomfortable.',
  'Be respectful and kind to each other.'
];

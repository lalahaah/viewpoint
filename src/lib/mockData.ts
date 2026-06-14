export interface ActiveChannel {
  id: string
  name: string
  category: string
  tags: string[]
  channelType: "ACTIVE"
  subscriberCount: number
  avgViews: number
  uploadFrequency: string
  adPrices: {
    integrated: number
    shorts: number
  }
  portfolioImages: string[]
  description: string
}

export interface UpcomingChannel {
  id: string
  name: string
  category: string
  tags: string[]
  channelType: "UPCOMING"
  fundingGoal: number
  fundingCurrent: number
  earlyBirdDeadline: string
  adPrices: {
    earlyBird: number
  }
  portfolioImages: string[]
  description: string
}

export type Channel = ActiveChannel | UpcomingChannel

export const channels: Channel[] = [
  {
    id: "ch-1",
    name: "테크웨이브 TechWave",
    category: "테크",
    tags: ["스마트폰", "IT리뷰", "전자기기"],
    channelType: "ACTIVE",
    subscriberCount: 450000,
    avgViews: 120000,
    uploadFrequency: "주 2회",
    adPrices: {
      integrated: 3500000,
      shorts: 1200000,
    },
    portfolioImages: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=600",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600",
    ],
    description: "최신 스마트 기기와 혁신 IT 제품들을 가장 신속하고 객관적으로 리뷰하는 테크 전문 채널입니다.",
  },
  {
    id: "ch-2",
    name: "뷰티 크러쉬 Beauty Crush",
    category: "뷰티",
    tags: ["메이크업", "스킨케어", "데일리룩"],
    channelType: "ACTIVE",
    subscriberCount: 280000,
    avgViews: 85000,
    uploadFrequency: "주 1회",
    adPrices: {
      integrated: 2800000,
      shorts: 950000,
    },
    portfolioImages: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600",
    ],
    description: "초보자도 따라 하기 쉬운 일상 뷰티 메이크업 꿀팁과 성분 분석 리뷰를 전해드립니다.",
  },
  {
    id: "ch-3",
    name: "겜블러 플레이 Gambler Play",
    category: "게임",
    tags: ["신작게임", "스팀", "라이브방송"],
    channelType: "ACTIVE",
    subscriberCount: 620000,
    avgViews: 200000,
    uploadFrequency: "주 3회",
    adPrices: {
      integrated: 5000000,
      shorts: 1800000,
    },
    portfolioImages: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600",
    ],
    description: "장르를 가리지 않는 종합 게임 리뷰 및 트렌디한 인디 게임 소개 채널입니다.",
  },
  {
    id: "ch-4",
    name: "도쿄 한달살기 Tokyo Live",
    category: "여행",
    tags: ["일본여행", "브이로그", "도쿄맛집"],
    channelType: "ACTIVE",
    subscriberCount: 150000,
    avgViews: 50000,
    uploadFrequency: "주 1회",
    adPrices: {
      integrated: 1500000,
      shorts: 600000,
    },
    portfolioImages: [
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=600",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600",
      "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?q=80&w=600",
    ],
    description: "도쿄를 중심으로 한 감각적이고 세련된 아시아 여행 브이로그입니다.",
  },
  {
    id: "ch-5",
    name: "자취생 레시피 Easy Meal",
    category: "푸드",
    tags: ["간단요리", "가성비", "쿡방"],
    channelType: "ACTIVE",
    subscriberCount: 390000,
    avgViews: 110000,
    uploadFrequency: "주 2회",
    adPrices: {
      integrated: 3000000,
      shorts: 1100000,
    },
    portfolioImages: [
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600",
      "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=600",
    ],
    description: "요리 초보도 10분 만에 뚝딱 완성하는 가성비 최고의 레시피를 소개합니다.",
  },
  {
    id: "ch-6",
    name: "어반 무드 Urban Mood",
    category: "라이프",
    tags: ["인테리어", "룸투어", "라이프스타일"],
    channelType: "ACTIVE",
    subscriberCount: 190000,
    avgViews: 60000,
    uploadFrequency: "격주 1회",
    adPrices: {
      integrated: 2200000,
      shorts: 800000,
    },
    portfolioImages: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=600",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600",
    ],
    description: "감성적인 인테리어 팁과 일상의 소중함을 채우는 미니멀 라이프 스타일 브이로그입니다.",
  },
  {
    id: "ch-7",
    name: "캠핑 에세이 Camping Essay",
    category: "여행",
    tags: ["차박", "백패킹", "ASMR"],
    channelType: "ACTIVE",
    subscriberCount: 120000,
    avgViews: 45000,
    uploadFrequency: "주 1회",
    adPrices: {
      integrated: 1400000,
      shorts: 500000,
    },
    portfolioImages: [
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=600",
      "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?q=80&w=600",
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=600",
    ],
    description: "바쁜 일상을 벗어나 자연 속 힐링을 선사하는 고화질 캠핑 에세이 채널입니다.",
  },
  {
    id: "ch-8",
    name: "피트니스 가이드 Fit Guide",
    category: "라이프",
    tags: ["홈트레이닝", "헬스", "다이어트식단"],
    channelType: "ACTIVE",
    subscriberCount: 520000,
    avgViews: 150000,
    uploadFrequency: "주 3회",
    adPrices: {
      integrated: 4000000,
      shorts: 1500000,
    },
    portfolioImages: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600",
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600",
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=600",
    ],
    description: "직장인과 현대인을 위한 바른 자세 운동 루틴 및 다이어트 해법을 제시합니다.",
  },
  {
    id: "ch-9",
    name: "프로젝트 X 코딩방 (Project X)",
    category: "테크",
    tags: ["코딩", "개발자", "스타트업"],
    channelType: "UPCOMING",
    fundingGoal: 5000000,
    fundingCurrent: 1250000,
    earlyBirdDeadline: "2026-07-15T23:59:59Z",
    adPrices: {
      earlyBird: 1000000,
    },
    portfolioImages: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600",
    ],
    description: "개발자의 생생한 스타트업 도전기 및 실전 코딩 노하우를 제공하는 신규 채널입니다.",
  },
  {
    id: "ch-10",
    name: "미식 메이트 Gourmet Mate",
    category: "푸드",
    tags: ["파인다이닝", "술안주맛집", "서울레스토랑"],
    channelType: "UPCOMING",
    fundingGoal: 4000000,
    fundingCurrent: 2800000,
    earlyBirdDeadline: "2026-07-10T23:59:59Z",
    adPrices: {
      earlyBird: 800000,
    },
    portfolioImages: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600",
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600",
    ],
    description: "미식가들을 위한 감각적이고 깊이 있는 숨은 맛집 발굴 가이드 채널입니다.",
  },
  {
    id: "ch-11",
    name: "글로벌 홈 스위트 홈 Global Home",
    category: "라이프",
    tags: ["미국살이", "이민브이로그", "인테리어"],
    channelType: "UPCOMING",
    fundingGoal: 3000000,
    fundingCurrent: 1500000,
    earlyBirdDeadline: "2026-07-20T23:59:59Z",
    adPrices: {
      earlyBird: 600000,
    },
    portfolioImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=600",
    ],
    description: "미국 캘리포니아에서의 일상과 감성적인 홈 하우스 라이프를 기록합니다.",
  },
  {
    id: "ch-12",
    name: "아트 갤러리 투어 Art Walk",
    category: "뷰티",
    tags: ["전시회", "현대미술", "도슨트"],
    channelType: "UPCOMING",
    fundingGoal: 3500000,
    fundingCurrent: 700000,
    earlyBirdDeadline: "2026-08-01T23:59:59Z",
    adPrices: {
      earlyBird: 700000,
    },
    portfolioImages: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600",
      "https://images.unsplash.com/photo-1580136579312-94651dfd596d?q=80&w=600",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600",
    ],
    description: "전국 미술관 및 현대 미술 전시를 친절한 도슨트 해설과 함께 투어합니다.",
  },
]

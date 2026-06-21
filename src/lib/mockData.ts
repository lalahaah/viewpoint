export interface AdPriceDetail {
  price: number | null
  period: number | null
  description: string
}

export interface AdPrices {
  integrated: AdPriceDetail
  review: AdPriceDetail
  mention: AdPriceDetail
  shorts: AdPriceDetail
  community: AdPriceDetail
  earlyBird: AdPriceDetail
  package: AdPriceDetail
}

export interface SponsorCase {
  brandName: string
  logoUrl?: string
  videoThumbUrl?: string
  videoUrl?: string
  adType: string
  year: number
}

export interface BaseChannel {
  id: string
  name: string
  category: string
  tags: string[]
  description: string
  youtubeUrl: string
  thumbnailUrl?: string
  status: "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED"
  
  subscriberCount: number
  avgViews: number
  totalVideos: number
  recentMonthViews: number
  subscriberGrowth: number
  engagementRate: number
  uploadFrequency: string
  youtubeVerified: boolean

  audienceGender: { male: number; female: number }
  audienceAge: { [key: string]: number }
  audienceCountry: { [key: string]: number }
  audienceDevice: { mobile: number; desktop: number; tablet: number }

  adPrices: AdPrices
  sponsorCases: SponsorCase[]
  mediaKitUrl?: string
  portfolioImages: string[]
}

export interface ActiveChannel extends BaseChannel {
  channelType: "ACTIVE"
}

export interface UpcomingChannel extends BaseChannel {
  channelType: "UPCOMING"
  fundingGoal: number
  fundingCurrent: number
  earlyBirdDeadline: string
}

export type Channel = ActiveChannel | UpcomingChannel

export const channels: Channel[] = [
  {
    id: "ch-1",
    name: "테크웨이브 TechWave",
    category: "테크",
    tags: ["스마트폰", "IT리뷰", "전자기기"],
    channelType: "ACTIVE",
    status: "APPROVED",
    youtubeUrl: "https://www.youtube.com/@techwave_review",
    subscriberCount: 450000,
    avgViews: 120000,
    totalVideos: 342,
    recentMonthViews: 3200000,
    subscriberGrowth: 12000,
    engagementRate: 4.8,
    uploadFrequency: "주 2회",
    youtubeVerified: true,
    mediaKitUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    audienceGender: { male: 82, female: 18 },
    audienceAge: { "13-17": 3, "18-24": 35, "25-34": 42, "35-44": 15, "45+": 5 },
    audienceCountry: { KR: 92, US: 4, JP: 2, other: 2 },
    audienceDevice: { mobile: 68, desktop: 28, tablet: 4 },
    adPrices: {
      integrated: { price: 3500000, period: 14, description: "영상 내 60-90초 브랜드 광고 삽입" },
      review: { price: 6000000, period: 21, description: "영상 전체 제품 리뷰" },
      mention: { price: 1500000, period: 7, description: "영상 초반/후반 15-30초 언급" },
      shorts: { price: 1800000, period: 5, description: "60초 이내 쇼츠 단독 제작" },
      community: { price: 500000, period: 2, description: "유튜브 커뮤니티탭 홍보" },
      earlyBird: { price: null, period: null, description: "오픈 예정 전용 사전 협찬" },
      package: { price: null, period: null, description: "2개 이상 유형 묶음 (협의)" }
    },
    sponsorCases: [
      { brandName: "삼성전자", videoUrl: "https://youtube.com/watch?v=example1", adType: "integrated", year: 2024 },
      { brandName: "로지텍", videoUrl: "https://youtube.com/watch?v=example2", adType: "review", year: 2023 }
    ],
    portfolioImages: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=600",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600",
    ],
    description: "최신 스마트 기기와 혁신 IT 제품들을 가장 신속하고 객관적으로 리뷰하는 테크 전문 채널입니다."
  },
  {
    id: "ch-2",
    name: "뷰티 크러쉬 Beauty Crush",
    category: "뷰티",
    tags: ["메이크업", "스킨케어", "데일리룩"],
    channelType: "ACTIVE",
    status: "APPROVED",
    youtubeUrl: "https://www.youtube.com/@beauty_crush",
    subscriberCount: 280000,
    avgViews: 85000,
    totalVideos: 215,
    recentMonthViews: 1800000,
    subscriberGrowth: 8000,
    engagementRate: 6.2,
    uploadFrequency: "주 1회",
    youtubeVerified: true,
    mediaKitUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    audienceGender: { male: 12, female: 88 },
    audienceAge: { "13-17": 10, "18-24": 52, "25-34": 28, "35-44": 8, "45+": 2 },
    audienceCountry: { KR: 85, JP: 8, US: 3, other: 4 },
    audienceDevice: { mobile: 88, desktop: 8, tablet: 4 },
    adPrices: {
      integrated: { price: 2800000, period: 14, description: "영상 내 60-90초 브랜드 광고 삽입" },
      review: { price: 4800000, period: 21, description: "영상 전체 제품 리뷰" },
      mention: { price: 1200000, period: 7, description: "영상 초반/후반 15-30초 언급" },
      shorts: { price: 1500000, period: 5, description: "60초 이내 쇼츠 단독 제작" },
      community: { price: 400000, period: 2, description: "유튜브 커뮤니티탭 홍보" },
      earlyBird: { price: null, period: null, description: "오픈 예정 전용 사전 협찬" },
      package: { price: null, period: null, description: "2개 이상 유형 묶음 (협의)" }
    },
    sponsorCases: [
      { brandName: "올리브영", videoUrl: "https://youtube.com/watch?v=example3", adType: "review", year: 2024 },
      { brandName: "아모레퍼시픽", videoUrl: "https://youtube.com/watch?v=example4", adType: "integrated", year: 2024 }
    ],
    portfolioImages: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600",
    ],
    description: "초보자도 따라 하기 쉬운 일상 뷰티 메이크업 꿀팁과 성분 분석 리뷰를 전해드립니다."
  },
  {
    id: "ch-3",
    name: "겜블러 플레이 Gambler Play",
    category: "게임",
    tags: ["신작게임", "스팀", "라이브방송"],
    channelType: "ACTIVE",
    status: "APPROVED",
    youtubeUrl: "https://www.youtube.com/@gambler_play",
    subscriberCount: 620000,
    avgViews: 200000,
    totalVideos: 984,
    recentMonthViews: 8500000,
    subscriberGrowth: 25000,
    engagementRate: 3.5,
    uploadFrequency: "주 3회",
    youtubeVerified: true,
    mediaKitUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    audienceGender: { male: 91, female: 9 },
    audienceAge: { "13-17": 15, "18-24": 48, "25-34": 27, "35-44": 8, "45+": 2 },
    audienceCountry: { KR: 95, US: 2, other: 3 },
    audienceDevice: { mobile: 55, desktop: 42, tablet: 3 },
    adPrices: {
      integrated: { price: 5000000, period: 14, description: "영상 내 60-90초 브랜드 광고 삽입" },
      review: { price: 8000000, period: 21, description: "영상 전체 제품 리뷰" },
      mention: { price: 2000000, period: 7, description: "영상 초반/후반 15-30초 언급" },
      shorts: { price: 2500000, period: 5, description: "60초 이내 쇼츠 단독 제작" },
      community: { price: 800000, period: 2, description: "유튜브 커뮤니티탭 홍보" },
      earlyBird: { price: null, period: null, description: "오픈 예정 전용 사전 협찬" },
      package: { price: null, period: null, description: "2개 이상 유형 묶음 (협의)" }
    },
    sponsorCases: [
      { brandName: "넥슨", videoUrl: "https://youtube.com/watch?v=example5", adType: "integrated", year: 2024 },
      { brandName: "넷마블", videoUrl: "https://youtube.com/watch?v=example6", adType: "mention", year: 2023 }
    ],
    portfolioImages: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600",
    ],
    description: "장르를 가리지 않는 종합 게임 리뷰 및 트렌디한 인디 게임 소개 채널입니다."
  },
  {
    id: "ch-4",
    name: "도쿄 한달살기 Tokyo Live",
    category: "여행",
    tags: ["일본여행", "브이로그", "도쿄맛집"],
    channelType: "ACTIVE",
    status: "APPROVED",
    youtubeUrl: "https://www.youtube.com/@tokyo_live_vlog",
    subscriberCount: 150000,
    avgViews: 50000,
    totalVideos: 98,
    recentMonthViews: 900000,
    subscriberGrowth: 4500,
    engagementRate: 5.5,
    uploadFrequency: "주 1회",
    youtubeVerified: true,
    mediaKitUrl: "",
    audienceGender: { male: 42, female: 58 },
    audienceAge: { "13-17": 5, "18-24": 30, "25-34": 45, "35-44": 15, "45+": 5 },
    audienceCountry: { KR: 88, JP: 8, other: 4 },
    audienceDevice: { mobile: 80, desktop: 14, tablet: 6 },
    adPrices: {
      integrated: { price: 1500000, period: 14, description: "영상 내 60-90초 브랜드 광고 삽입" },
      review: { price: 2800000, period: 21, description: "영상 전체 제품 리뷰" },
      mention: { price: 700000, period: 7, description: "영상 초반/후반 15-30초 언급" },
      shorts: { price: 800000, period: 5, description: "60초 이내 쇼츠 단독 제작" },
      community: { price: 250000, period: 2, description: "유튜브 커뮤니티탭 홍보" },
      earlyBird: { price: null, period: null, description: "오픈 예정 전용 사전 협찬" },
      package: { price: null, period: null, description: "2개 이상 유형 묶음 (협의)" }
    },
    sponsorCases: [
      { brandName: "트리플", videoUrl: "https://youtube.com/watch?v=example7", adType: "integrated", year: 2024 }
    ],
    portfolioImages: [
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=600",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600",
      "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?q=80&w=600",
    ],
    description: "도쿄를 중심으로 한 감각적이고 세련된 아시아 여행 브이로그입니다."
  },
  {
    id: "ch-5",
    name: "자취생 레시피 Easy Meal",
    category: "푸드",
    tags: ["간단요리", "가성비", "쿡방"],
    channelType: "ACTIVE",
    status: "APPROVED",
    youtubeUrl: "https://www.youtube.com/@easy_meal_recipe",
    subscriberCount: 390000,
    avgViews: 110000,
    totalVideos: 412,
    recentMonthViews: 3800000,
    subscriberGrowth: 15000,
    engagementRate: 5.1,
    uploadFrequency: "주 2회",
    youtubeVerified: true,
    mediaKitUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    audienceGender: { male: 48, female: 52 },
    audienceAge: { "13-17": 5, "18-24": 42, "25-34": 38, "35-44": 10, "45+": 5 },
    audienceCountry: { KR: 96, other: 4 },
    audienceDevice: { mobile: 85, desktop: 10, tablet: 5 },
    adPrices: {
      integrated: { price: 3000000, period: 14, description: "영상 내 60-90초 브랜드 광고 삽입" },
      review: { price: 5000000, period: 21, description: "영상 전체 제품 리뷰" },
      mention: { price: 1200000, period: 7, description: "영상 초반/후반 15-30초 언급" },
      shorts: { price: 1500000, period: 5, description: "60초 이내 쇼츠 단독 제작" },
      community: { price: 450000, period: 2, description: "유튜브 커뮤니티탭 홍보" },
      earlyBird: { price: null, period: null, description: "오픈 예정 전용 사전 협찬" },
      package: { price: null, period: null, description: "2개 이상 유형 묶음 (협의)" }
    },
    sponsorCases: [
      { brandName: "CJ제일제당", videoUrl: "https://youtube.com/watch?v=example8", adType: "integrated", year: 2024 },
      { brandName: "오뚜기", videoUrl: "https://youtube.com/watch?v=example9", adType: "shorts", year: 2023 }
    ],
    portfolioImages: [
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600",
      "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=600",
    ],
    description: "요리 초보도 10분 만에 뚝딱 완성하는 가성비 최고의 레시피를 소개합니다."
  },
  {
    id: "ch-6",
    name: "어반 무드 Urban Mood",
    category: "라이프",
    tags: ["인테리어", "룸투어", "라이프스타일"],
    channelType: "ACTIVE",
    status: "APPROVED",
    youtubeUrl: "https://www.youtube.com/@urban_mood_life",
    subscriberCount: 190000,
    avgViews: 60000,
    totalVideos: 124,
    recentMonthViews: 1100000,
    subscriberGrowth: 5000,
    engagementRate: 5.8,
    uploadFrequency: "격주 1회",
    youtubeVerified: true,
    mediaKitUrl: "",
    audienceGender: { male: 30, female: 70 },
    audienceAge: { "13-17": 2, "18-24": 28, "25-34": 48, "35-44": 18, "45+": 4 },
    audienceCountry: { KR: 90, other: 10 },
    audienceDevice: { mobile: 78, desktop: 16, tablet: 6 },
    adPrices: {
      integrated: { price: 2200000, period: 14, description: "영상 내 60-90초 브랜드 광고 삽입" },
      review: { price: 3800000, period: 21, description: "영상 전체 제품 리뷰" },
      mention: { price: 900000, period: 7, description: "영상 초반/후반 15-30초 언급" },
      shorts: { price: 1000000, period: 5, description: "60초 이내 쇼츠 단독 제작" },
      community: { price: 300000, period: 2, description: "유튜브 커뮤니티탭 홍보" },
      earlyBird: { price: null, period: null, description: "오픈 예정 전용 사전 협찬" },
      package: { price: null, period: null, description: "2개 이상 유형 묶음 (협의)" }
    },
    sponsorCases: [
      { brandName: "이케아", videoUrl: "https://youtube.com/watch?v=example10", adType: "integrated", year: 2024 }
    ],
    portfolioImages: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=600",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600",
    ],
    description: "감성적인 인테리어 팁과 일상의 소중함을 채우는 미니멀 라이프 스타일 브이로그입니다."
  },
  {
    id: "ch-7",
    name: "캠핑 에세이 Camping Essay",
    category: "여행",
    tags: ["차박", "백패킹", "ASMR"],
    channelType: "ACTIVE",
    status: "APPROVED",
    youtubeUrl: "https://www.youtube.com/@camping_essay",
    subscriberCount: 120000,
    avgViews: 45000,
    totalVideos: 102,
    recentMonthViews: 750000,
    subscriberGrowth: 3000,
    engagementRate: 4.5,
    uploadFrequency: "주 1회",
    youtubeVerified: true,
    mediaKitUrl: "",
    audienceGender: { male: 60, female: 40 },
    audienceAge: { "13-17": 1, "18-24": 20, "25-34": 45, "35-44": 28, "45+": 6 },
    audienceCountry: { KR: 94, other: 6 },
    audienceDevice: { mobile: 70, desktop: 24, tablet: 6 },
    adPrices: {
      integrated: { price: 1400000, period: 14, description: "영상 내 60-90초 브랜드 광고 삽입" },
      review: { price: 2500000, period: 21, description: "영상 전체 제품 리뷰" },
      mention: { price: 600000, period: 7, description: "영상 초반/후반 15-30초 언급" },
      shorts: { price: 800000, period: 5, description: "60초 이내 쇼츠 단독 제작" },
      community: { price: 200000, period: 2, description: "유튜브 커뮤니티탭 홍보" },
      earlyBird: { price: null, period: null, description: "오픈 예정 전용 사전 협찬" },
      package: { price: null, period: null, description: "2개 이상 유형 묶음 (협의)" }
    },
    sponsorCases: [
      { brandName: "콜맨", videoUrl: "https://youtube.com/watch?v=example11", adType: "review", year: 2023 }
    ],
    portfolioImages: [
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=600",
      "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?q=80&w=600",
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=600",
    ],
    description: "바쁜 일상을 벗어나 자연 속 힐링을 선사하는 고화질 캠핑 에세이 채널입니다."
  },
  {
    id: "ch-8",
    name: "피트니스 가이드 Fit Guide",
    category: "라이프",
    tags: ["홈트레이닝", "헬스", "다이어트식단"],
    channelType: "ACTIVE",
    status: "APPROVED",
    youtubeUrl: "https://www.youtube.com/@fitness_fit_guide",
    subscriberCount: 520000,
    avgViews: 150000,
    totalVideos: 380,
    recentMonthViews: 4500000,
    subscriberGrowth: 28000,
    engagementRate: 5.0,
    uploadFrequency: "주 3회",
    youtubeVerified: true,
    mediaKitUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    audienceGender: { male: 55, female: 45 },
    audienceAge: { "13-17": 5, "18-24": 38, "25-34": 35, "35-44": 15, "45+": 7 },
    audienceCountry: { KR: 91, other: 9 },
    audienceDevice: { mobile: 84, desktop: 12, tablet: 4 },
    adPrices: {
      integrated: { price: 4000000, period: 14, description: "영상 내 60-90초 브랜드 광고 삽입" },
      review: { price: 7000000, period: 21, description: "영상 전체 제품 리뷰" },
      mention: { price: 1800000, period: 7, description: "영상 초반/후반 15-30초 언급" },
      shorts: { price: 2000000, period: 5, description: "60초 이내 쇼츠 단독 제작" },
      community: { price: 600000, period: 2, description: "유튜브 커뮤니티탭 홍보" },
      earlyBird: { price: null, period: null, description: "오픈 예정 전용 사전 협찬" },
      package: { price: null, period: null, description: "2개 이상 유형 묶음 (협의)" }
    },
    sponsorCases: [
      { brandName: "마이프로틴", videoUrl: "https://youtube.com/watch?v=example12", adType: "integrated", year: 2024 }
    ],
    portfolioImages: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600",
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600",
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=600",
    ],
    description: "직장인과 현대인을 위한 바른 자세 운동 루틴 및 다이어트 해법을 제시합니다."
  },
  {
    id: "ch-9",
    name: "프로젝트 X 코딩방 (Project X)",
    category: "테크",
    tags: ["코딩", "개발자", "스타트업"],
    channelType: "UPCOMING",
    status: "APPROVED",
    youtubeUrl: "https://www.youtube.com/@project_x_coding",
    subscriberCount: 0,
    avgViews: 0,
    totalVideos: 0,
    recentMonthViews: 0,
    subscriberGrowth: 0,
    engagementRate: 0,
    uploadFrequency: "주 2회 (예정)",
    youtubeVerified: false,
    mediaKitUrl: "",
    audienceGender: { male: 85, female: 15 },
    audienceAge: { "13-17": 2, "18-24": 45, "25-34": 43, "35-44": 8, "45+": 2 },
    audienceCountry: { KR: 95, other: 5 },
    audienceDevice: { mobile: 60, desktop: 36, tablet: 4 },
    adPrices: {
      integrated: { price: 1500000, period: 14, description: "영상 내 60-90초 브랜드 광고 삽입" },
      review: { price: 2500000, period: 21, description: "영상 전체 제품 리뷰" },
      mention: { price: 600000, period: 7, description: "영상 초반/후반 15-30초 언급" },
      shorts: { price: 700000, period: 5, description: "60초 이내 쇼츠 단독 제작" },
      community: { price: 200000, period: 2, description: "유튜브 커뮤니티탭 홍보" },
      earlyBird: { price: 1000000, period: 30, description: "UPCOMING 채널 사전 협찬 선점 가격" },
      package: { price: null, period: null, description: "2개 이상 유형 묶음 (협의)" }
    },
    sponsorCases: [],
    fundingGoal: 5000000,
    fundingCurrent: 1250000,
    earlyBirdDeadline: "2026-07-15T23:59:59Z",
    portfolioImages: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600",
    ],
    description: "개발자의 생생한 스타트업 도전기 및 실전 코딩 노하우를 제공하는 신규 채널입니다."
  },
  {
    id: "ch-10",
    name: "미식 메이트 Gourmet Mate",
    category: "푸드",
    tags: ["파인다이닝", "술안주맛집", "서울레스토랑"],
    channelType: "UPCOMING",
    status: "APPROVED",
    youtubeUrl: "https://www.youtube.com/@gourmet_mate",
    subscriberCount: 0,
    avgViews: 0,
    totalVideos: 0,
    recentMonthViews: 0,
    subscriberGrowth: 0,
    engagementRate: 0,
    uploadFrequency: "주 1회 (예정)",
    youtubeVerified: false,
    mediaKitUrl: "",
    audienceGender: { male: 38, female: 62 },
    audienceAge: { "13-17": 4, "18-24": 32, "25-34": 48, "35-44": 12, "45+": 4 },
    audienceCountry: { KR: 93, other: 7 },
    audienceDevice: { mobile: 88, desktop: 8, tablet: 4 },
    adPrices: {
      integrated: { price: 1200000, period: 14, description: "영상 내 60-90초 브랜드 광고 삽입" },
      review: { price: 2000000, period: 21, description: "영상 전체 제품 리뷰" },
      mention: { price: 500000, period: 7, description: "영상 초반/후반 15-30초 언급" },
      shorts: { price: 600000, period: 5, description: "60초 이내 쇼츠 단독 제작" },
      community: { price: 150000, period: 2, description: "유튜브 커뮤니티탭 홍보" },
      earlyBird: { price: 800000, period: 30, description: "UPCOMING 채널 사전 협찬 선점 가격" },
      package: { price: null, period: null, description: "2개 이상 유형 묶음 (협의)" }
    },
    sponsorCases: [],
    fundingGoal: 4000000,
    fundingCurrent: 2800000,
    earlyBirdDeadline: "2026-07-10T23:59:59Z",
    portfolioImages: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600",
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600",
    ],
    description: "미식가들을 위한 감각적이고 깊이 있는 숨은 맛집 발굴 가이드 채널입니다."
  },
  {
    id: "ch-11",
    name: "글로벌 홈 스위트 홈 Global Home",
    category: "라이프",
    tags: ["미국살이", "이민브이로그", "인테리어"],
    channelType: "UPCOMING",
    status: "APPROVED",
    youtubeUrl: "https://www.youtube.com/@global_home_life",
    subscriberCount: 0,
    avgViews: 0,
    totalVideos: 0,
    recentMonthViews: 0,
    subscriberGrowth: 0,
    engagementRate: 0,
    uploadFrequency: "격주 1회 (예정)",
    youtubeVerified: false,
    mediaKitUrl: "",
    audienceGender: { male: 25, female: 75 },
    audienceAge: { "13-17": 2, "18-24": 20, "25-34": 50, "35-44": 20, "45+": 8 },
    audienceCountry: { KR: 82, US: 12, other: 6 },
    audienceDevice: { mobile: 74, desktop: 20, tablet: 6 },
    adPrices: {
      integrated: { price: 1000000, period: 14, description: "영상 내 60-90초 브랜드 광고 삽입" },
      review: { price: 1800000, period: 21, description: "영상 전체 제품 리뷰" },
      mention: { price: 400000, period: 7, description: "영상 초반/후반 15-30초 언급" },
      shorts: { price: 500000, period: 5, description: "60초 이내 쇼츠 단독 제작" },
      community: { price: 150000, period: 2, description: "유튜브 커뮤니티탭 홍보" },
      earlyBird: { price: 600000, period: 30, description: "UPCOMING 채널 사전 협찬 선점 가격" },
      package: { price: null, period: null, description: "2개 이상 유형 묶음 (협의)" }
    },
    sponsorCases: [],
    fundingGoal: 3000000,
    fundingCurrent: 1500000,
    earlyBirdDeadline: "2026-07-20T23:59:59Z",
    portfolioImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=600",
    ],
    description: "미국 캘리포니아에서의 일상과 감성적인 홈 하우스 라이프를 기록합니다."
  },
  {
    id: "ch-12",
    name: "아트 갤러리 투어 Art Walk",
    category: "뷰티",
    tags: ["전시회", "현대미술", "도슨트"],
    channelType: "UPCOMING",
    status: "APPROVED",
    youtubeUrl: "https://www.youtube.com/@art_walk_gallery",
    subscriberCount: 0,
    avgViews: 0,
    totalVideos: 0,
    recentMonthViews: 0,
    subscriberGrowth: 0,
    engagementRate: 0,
    uploadFrequency: "주 1회 (예정)",
    youtubeVerified: false,
    mediaKitUrl: "",
    audienceGender: { male: 35, female: 65 },
    audienceAge: { "13-17": 5, "18-24": 35, "25-34": 40, "35-44": 15, "45+": 5 },
    audienceCountry: { KR: 90, other: 10 },
    audienceDevice: { mobile: 82, desktop: 12, tablet: 6 },
    adPrices: {
      integrated: { price: 1200000, period: 14, description: "영상 내 60-90초 브랜드 광고 삽입" },
      review: { price: 2000000, period: 21, description: "영상 전체 제품 리뷰" },
      mention: { price: 500000, period: 7, description: "영상 초반/후반 15-30초 언급" },
      shorts: { price: 600000, period: 5, description: "60초 이내 쇼츠 단독 제작" },
      community: { price: 150000, period: 2, description: "유튜브 커뮤니티탭 홍보" },
      earlyBird: { price: 700000, period: 30, description: "UPCOMING 채널 사전 협찬 선점 가격" },
      package: { price: null, period: null, description: "2개 이상 유형 묶음 (협의)" }
    },
    sponsorCases: [],
    fundingGoal: 3500000,
    fundingCurrent: 700000,
    earlyBirdDeadline: "2026-08-01T23:59:59Z",
    portfolioImages: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600",
      "https://images.unsplash.com/photo-1580136579312-94651dfd596d?q=80&w=600",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600",
    ],
    description: "전국 미술관 및 현대 미술 전시를 친절한 도슨트 해설과 함께 투어합니다."
  },
]

export interface CreatorDashboardMock {
  stats: {
    totalChannels: number
    totalBriefs: number
    monthlyEarnings: number
    totalViews: number
  }
  recentBriefs: Array<{
    id: string
    brandName: string
    adType: string
    budget: number
    status: "SENT" | "VIEWED" | "ACCEPTED" | "REJECTED" | "CANCELLED" | "COMPLETED"
    createdAt: string
  }>
  earnings: Array<{
    id: string
    date: string
    sponsor: string
    amount: number
    fee: number
    netAmount: number
    status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED"
  }>
}

export const creatorDashboardMock: CreatorDashboardMock = {
  stats: {
    totalChannels: 2,
    totalBriefs: 8,
    monthlyEarnings: 4500000,
    totalViews: 5000000
  },
  recentBriefs: [
    { id: "b-1", brandName: "삼성전자", adType: "integrated", budget: 3500000, status: "SENT", createdAt: "2026-06-20T10:00:00Z" },
    { id: "b-2", brandName: "올리브영", adType: "review", budget: 4800000, status: "ACCEPTED", createdAt: "2026-06-18T14:30:00Z" },
    { id: "b-3", brandName: "로지텍", adType: "mention", budget: 1500000, status: "REJECTED", createdAt: "2026-06-15T09:00:00Z" },
    { id: "b-4", brandName: "넷마블", adType: "shorts", budget: 2500000, status: "COMPLETED", createdAt: "2026-06-10T11:00:00Z" }
  ],
  earnings: [
    { id: "e-1", date: "2026-06-20", sponsor: "올리브영", amount: 4800000, fee: 480000, netAmount: 4320000, status: "COMPLETED" },
    { id: "e-2", date: "2026-06-15", sponsor: "로지텍", amount: 1500000, fee: 150000, netAmount: 1350000, status: "PENDING" },
    { id: "e-3", date: "2026-06-10", sponsor: "넷마블", amount: 2500000, fee: 250000, netAmount: 2250000, status: "COMPLETED" }
  ]
}


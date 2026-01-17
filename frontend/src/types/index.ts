// Category 엔티티 대응
export interface Category {
    id: number;
    name: string;
  }

  //StudyPostResponseDto 대응
  export interface StudyPost {
    id: number;
    title: string;
    content: string;
    categoryName: string;
    categoryId: number;
  }

  export interface StudyPostRequest {
    title: string;
    content: string;
    categoryId?: number | null;
  }

  export interface CoffeeLogDetailResponse {
    id: number;
    name: string;
    country?: string;
    region?: string;
    variety?: string;
    processing?: string;
    roastingPoint?: string;
    moodColors: string;
    flavorNotes?: string;
    comment?: string;
    createDate: string;
  }

  export interface CoffeeLogSummaryResponse {
    id: number;
    name: string;
    moodColors: string;
    flavorNotes?: string;
  }

  export interface CoffeeLogRequest {
    name: string;
    country?: string;
    region?: string;
    variety?: string;
    processing?: string;
    roastingPoint?: string;
    moodColors: string;
    flavorNotes?: string;
    comment?: string;
  }
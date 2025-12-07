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
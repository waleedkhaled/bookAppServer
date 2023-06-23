export interface BookParams {
    id: string;
    title: string;
    author: String;
    publicationYear: number;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface getBookParams {
    id: string;
  }

  
  export interface addBookParams {
    title: string;
    author: string;
    publicationYear: number;
  }
  
  export interface updateBookParams {
    id: string;
    updatedFields: {
    title?: string;
    author?: string;
    publicationYear?: number;
    };
  }
  
  export interface deleteBookParams {
    id: string;
  }
  
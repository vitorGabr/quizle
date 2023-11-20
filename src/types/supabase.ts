export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      words: {
        Row: {
          created_at: string | null;
          date: string;
          id: number;
          word: string;
        };
        Insert: {
          created_at?: string | null;
          date: string;
          id?: number;
          word: string;
        };
        Update: {
          created_at?: string | null;
          date?: string;
          id?: number;
          word?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

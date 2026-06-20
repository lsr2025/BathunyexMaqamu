// Shared data types for Nokulunga's Journey to MammaLand.

export interface MessageToMommy {
  id: string;
  name: string;
  relationship: string | null;
  message: string;
  created_at: string;
}

export interface LetterToBaby {
  id: string;
  name: string;
  letter: string;
  created_at: string;
}

export type LooksLike = "Mommy" | "Daddy" | "Both";

export interface Prediction {
  id: string;
  guest_name: string;
  arrival_date: string | null;
  weight: string | null;
  looks_like: LooksLike | null;
  first_word: string | null;
  future_career: string | null;
  special_wish: string | null;
  created_at: string;
}

export interface PhotoMemory {
  id: string;
  uploader_name: string | null;
  caption: string | null;
  file_path: string;
  public_url: string;
  media_type: "image" | "video";
  created_at: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export interface KeepsakeData {
  messages: MessageToMommy[];
  letters: LetterToBaby[];
  predictions: Prediction[];
  photos: PhotoMemory[];
  guestbook: GuestbookEntry[];
}

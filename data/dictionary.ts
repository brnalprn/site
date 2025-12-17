// A simple key-value store for the search functionality
export interface DictionaryEntry {
  text: string;
  author: string;
}

export const searchData: Record<string, DictionaryEntry> = {
  "bizde bir birdir": { text: "iki ise ikidir", author: "admin" },
  "merhaba": { text: "Selam! Size nasıl yardımcı olabilirim?", author: "admin" },
  "react": { text: "Kullanıcı arayüzleri oluşturmak için kullanılan bir JavaScript kütüphanesi.", author: "admin" },
  "tailwind": { text: "Hızlı UI geliştirme için kullanılan utility-first CSS framework'ü.", author: "admin" },
  "openai": { text: "Yapay zeka araştırma ve dağıtım şirketi.", author: "admin" }
};
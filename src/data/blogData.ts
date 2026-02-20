export interface BlogPost {
  id: number;
  title: string;
  description: string;
  content: string;
  createdAt: string;
  image: string;
}

interface SheetResponse {
  range: string;
  majorDimension: string;
  values: string[][];
}

const SHEET_API_URL = 
  "https://sheets.googleapis.com/v4/spreadsheets/15E7USHGwcvn9Kin2ZxLU57rqnk0V1X88vaVkWTRBrdg/values/blogs?key=AIzaSyCWTVBMgpwsQFzxtltRQXTlka4FeMmA1-g";

/**
 * Fetch blog posts from Google Sheets
 */
export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch(SHEET_API_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
    }
    
    const data: SheetResponse = await response.json();
    
    // Skip header row (first row) and transform data
    const posts = data.values.slice(1).map((row) => {
      return {
        id: parseInt(row[0], 10),
        title: row[1] || "",
        description: row[2] || "",
        content: row[3] || "",
        createdAt: row[4] || "",
        image: row[5] || "",
      };
    });
    
    return posts;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    // Return empty array on error
    return [];
  }
};

// Fallback data for development or if API fails
export const fallbackBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Understanding JVM Garbage Collection",
    description:
      "A deep dive into how the JVM manages memory, different GC algorithms, and tuning strategies for production systems.",
    content: "Content loading from Google Sheets...",
    createdAt: "2025-01-15",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
  }
];

export interface SkillCategory {
  category: string;
  skills: string[];
}

interface SheetResponse {
  range: string;
  majorDimension: string;
  values: string[][];
}

interface SheetRow {
  id: string;
  name: string;
  parent_id: string | null;
}

const SHEET_API_URL = 
  "https://sheets.googleapis.com/v4/spreadsheets/15E7USHGwcvn9Kin2ZxLU57rqnk0V1X88vaVkWTRBrdg/values/commons?key=AIzaSyCWTVBMgpwsQFzxtltRQXTlka4FeMmA1-g";

/**
 * Fetch skills/commons data from Google Sheets
 * Expected format: Each row has [id, name, parent_id]
 * - Categories have no parent_id (null or empty)
 * - Skills have parent_id pointing to their category
 */
export const fetchSkills = async (): Promise<SkillCategory[]> => {
  try {
    const response = await fetch(SHEET_API_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch skills: ${response.statusText}`);
    }
    
    const data: SheetResponse = await response.json();
    
    // Parse rows into structured data
    const rows: SheetRow[] = data.values.slice(1).map((row) => ({
      id: row[0] || "",
      name: row[1] || "",
      parent_id: row[2] || null,
    }));
    
    // Separate categories (no parent_id) and skills (have parent_id)
    const categoriesMap = new Map<string, string>();
    const skillsByParent = new Map<string, string[]>();
    
    rows.forEach((row) => {
      if (!row.parent_id) {
        // This is a category
        categoriesMap.set(row.id, row.name);
      } else {
        // This is a skill
        if (!skillsByParent.has(row.parent_id)) {
          skillsByParent.set(row.parent_id, []);
        }
        skillsByParent.get(row.parent_id)!.push(row.name);
      }
    });
    
    // Build final category structure
    const categories: SkillCategory[] = Array.from(categoriesMap.entries())
      .map(([id, categoryName]) => ({
        category: categoryName,
        skills: skillsByParent.get(id) || [],
      }))
      .filter((cat) => cat.skills.length > 0); // Only include categories with skills
    
    console.log("Fetched skills:", categories);
    
    return categories;
  } catch (error) {
    console.error("Error fetching skills:", error);
    // Return fallback data on error
    return fallbackSkills;
  }
};

// Fallback data for development or if API fails
export const fallbackSkills: SkillCategory[] = [
  {
    category: "Backend",
    skills: ["Java", "Spring Boot", "REST API", "JPA / Hibernate"],
  },
  {
    category: "Database",
    skills: ["PostgreSQL", "MySQL"],
  },
  {
    category: "DevOps",
    skills: ["Docker", "Linux", "Nginx"],
  },
];

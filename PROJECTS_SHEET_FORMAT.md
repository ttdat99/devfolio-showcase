# Projects Data - Google Sheets Format

This document describes the expected format for the Projects data in Google Sheets.

## Sheet Configuration

- **Sheet Name:** `projects`
- **API URL:** Already configured in `src/data/projectsData.ts`

## Column Structure

The Google Sheet should have the following columns in this exact order:

| Column | Field Name       | Type    | Required | Description                                      | Example                           |
|--------|------------------|---------|----------|--------------------------------------------------|-----------------------------------|
| A      | id               | String  | Yes      | Unique identifier (kebab-case)                   | `ecommerce-rest-api`              |
| B      | title            | String  | Yes      | Project title                                    | `E-commerce REST API`             |
| C      | description      | String  | Yes      | Short description (for cards)                    | `A fully-featured REST API...`    |
| D      | fullDescription  | String  | No       | Full description (for detail page)               | `A comprehensive RESTful API...`  |
| E      | stack            | String  | Yes      | Tech stack (comma-separated)                     | `Java, Spring Boot, PostgreSQL`   |
| F      | from             | String  | Yes      | Start date (YYYY-MM format)                      | `2024-10`                         |
| G      | to               | String  | Yes      | End date (YYYY-MM or "Present")                  | `Present` or `2024-12`            |
| H      | githubUrl        | String  | No       | GitHub repository URL                            | `https://github.com/user/repo`    |
| I      | demoUrl          | String  | No       | Live demo URL                                    | `https://demo.example.com`        |
| J      | customer         | String  | No       | Customer/Client name                             | `TechCorp Solutions`              |
| K      | teamSize         | Number  | No       | Number of team members                           | `5`                               |

## Example Data

### Header Row (Row 1)
```
id | title | description | fullDescription | stack | from | to | githubUrl | demoUrl | customer | teamSize
```

### Data Row Example (Row 2)
```
ecommerce-rest-api | E-commerce REST API | A fully-featured REST API for an e-commerce platform | A comprehensive RESTful API built for a modern e-commerce platform... | Java, Spring Boot, PostgreSQL, Redis, Docker | 2024-10 | Present | https://github.com | https://demo.example.com | TechCorp Solutions | 5
```

## Important Notes

1. **Header Row**: Row 1 should contain column headers (they will be skipped during data processing)

2. **Stack Format**: The `stack` column should contain comma-separated values. They will be automatically split into an array.
   - ✅ Correct: `Java, Spring Boot, PostgreSQL`
   - ❌ Wrong: `["Java", "Spring Boot"]`

3. **Date Format**: 
   - Use `YYYY-MM` format (e.g., `2024-10`)
   - Use exactly `Present` (case-sensitive) for ongoing projects

4. **Optional Fields**: 
   - `fullDescription` defaults to `description` if empty
   - `githubUrl`, `demoUrl`, `customer`, `teamSize` can be left empty

5. **ID Format**: Use lowercase with hyphens (kebab-case):
   - ✅ Correct: `jwt-authentication-system`
   - ❌ Wrong: `JWT Authentication System`

## Fallback Data

If the API fails to fetch, the application will use fallback data from `src/data/projectsData.ts`. Make sure to keep this in sync with your Google Sheet data.

## Testing

1. Add your data to the Google Sheet
2. Make sure the sheet is publicly accessible (Anyone with the link can view)
3. The data will be cached for 5 minutes
4. Refresh the page to see changes

## Troubleshooting

- **Projects not showing**: Check browser console for errors
- **403 Error**: Verify the Google Sheet is publicly accessible
- **Wrong data**: Check column order matches exactly
- **Missing projects**: Ensure no empty rows between data rows

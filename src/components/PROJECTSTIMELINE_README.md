# ProjectsTimeline Component

A reusable, animated vertical timeline component for displaying projects with a clean, modern design.

## Features

✅ **Vertical Timeline Layout** - Clean, easy-to-follow chronological display  
✅ **Newest First** - Automatically sorts projects by date (most recent at top)  
✅ **Smooth Animations** - Fade + slide up effects using Framer Motion  
✅ **Responsive Design** - Works beautifully on mobile, tablet, and desktop  
✅ **Dark Mode Compatible** - Uses Tailwind CSS theme variables  
✅ **Minimal Design** - Clean UI with subtle hover effects  
✅ **No External Libraries** - Built with React, TailwindCSS, and Framer Motion  
✅ **Fully Typed** - Complete TypeScript support  

## Installation

The component is already integrated into your project. It uses these dependencies:

```bash
# Already included in your project
- react (18+)
- framer-motion
- lucide-react
- tailwindcss
```

## Basic Usage

```tsx
import ProjectsTimeline from "@/components/ProjectsTimeline";
import { fallbackProjects } from "@/data/projectsData";

function MyPage() {
  return (
    <ProjectsTimeline 
      projects={fallbackProjects}
    />
  );
}
```

## Advanced Usage

```tsx
import { useNavigate } from "react-router-dom";
import ProjectsTimeline from "@/components/ProjectsTimeline";

function MyProjectsPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  return (
    <ProjectsTimeline
      projects={projects}
      onProjectClick={(project) => navigate(`/projects/${project.id}`)}
      showGithubButton={true}
      showDemoButton={true}
      className="my-custom-class"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `projects` | `Project[]` | **required** | Array of project objects to display |
| `onProjectClick` | `(project: Project) => void` | `undefined` | Callback when a project card is clicked |
| `showGithubButton` | `boolean` | `true` | Show/hide GitHub repository links |
| `showDemoButton` | `boolean` | `true` | Show/hide demo/live preview links |
| `className` | `string` | `""` | Additional CSS classes for the container |

## Project Data Structure

The component expects projects with this structure:

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  stack: string;              // Comma-separated tech stack
  from: string;               // Format: "YYYY-MM" (e.g., "2024-10")
  to: string | "Present";     // Format: "YYYY-MM" or "Present"
  githubUrl?: string;
  demoUrl?: string;
  customer?: string;
  teamSize?: number;
}
```

### Example Project

```typescript
{
  id: "ecommerce-rest-api",
  title: "E-commerce REST API",
  description: "A fully-featured REST API for an e-commerce platform...",
  stack: "Java, Spring Boot, PostgreSQL, Redis, Docker",
  from: "2024-10",
  to: "Present",
  githubUrl: "https://github.com/username/project",
  demoUrl: "https://demo.example.com",
  customer: "TechCorp Solutions",
  teamSize: 5
}
```

## Features Breakdown

### Date Display
- Shows date ranges in a clean format (e.g., "Oct 2024 - Present")
- Automatically calculates and displays project duration
- Supports ongoing projects with "Present" as end date

### Timeline Visual
- Vertical line connecting all projects
- Animated dots with pulse effect
- Gradient effects for visual depth

### Project Cards
- Hover animations (scale + lift effect)
- Tech stack badges
- Optional customer and team size information
- Click handling for navigation

### Responsive Behavior
- **Mobile**: Compact single-column layout
- **Desktop**: Larger timeline dots and spacing

## Animations

All animations use Framer Motion:

1. **Initial Load**: Fade in + slide up from below
2. **Scroll Animation**: Triggers when item enters viewport
3. **Hover**: Scale up + lift effect
4. **Timeline Dots**: Continuous pulse animation

Animation delays are staggered (150ms between items) for a cascading effect.

## Customization

### Styling
The component uses Tailwind CSS utility classes and CSS variables for theming:

```css
/* Customize colors in your Tailwind config */
--primary: /* Your primary color */
--border: /* Border color */
--card: /* Card background */
--muted-foreground: /* Secondary text */
```

### Animation Speed
Modify the animation durations in the component:

```tsx
transition={{ 
  duration: 0.6,      // Change fade/slide duration
  delay: index * 0.15 // Change stagger delay
}}
```

### Timeline Style
Adjust the timeline line in the `TimelineItem` component:

```tsx
<div className="absolute left-[11px] ... w-[2px] bg-gradient-to-b from-border ..." />
```

## Examples

See [ProjectsTimelineExample.tsx](./ProjectsTimelineExample.tsx) for a complete integration example with:
- Data fetching using React Query
- Loading states
- Internationalization support
- Click navigation

## Dark Mode

The component automatically adapts to dark mode using Tailwind's color system:
- `bg-card` - Card backgrounds
- `text-foreground` - Primary text
- `text-muted-foreground` - Secondary text
- `border-border` - Border colors

No additional configuration needed!

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Uses `whileInView` for viewport-based animations (only animates when visible)
- `viewport={{ once: true }}` prevents re-animation on scroll
- Optimized for 60fps animations

## License

Part of your devfolio-showcase project.

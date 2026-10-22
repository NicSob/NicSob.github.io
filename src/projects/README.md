# Project Posts

This directory contains markdown files for detailed project writeups displayed on the portfolio.

## How to Add a New Project Post

### 1. Create the Markdown Content

Use `template.md` as a starting point for your new project post.

### 2. Add to ProjectPost.jsx

Open `src/components/ProjectPost.jsx` and add your project to the `projectPosts` object:

```javascript
const projectPosts = {
  // Existing posts...

  'your-project-slug': {
    title: 'Your Project Title',
    date: 'YYYY-MM-DD',
    tags: ['tag1', 'tag2', 'tag3'],
    content: `
      Your markdown content here...
    `,
  },
}
```

### 3. Add to Projects.jsx

Open `src/components/Projects.jsx` and add your project to the `featuredProjects` array:

```javascript
const featuredProjects = [
  // Existing projects...

  {
    id: 'your-project-slug', // Must match the key in projectPosts
    title: 'Your Project Title',
    year: '2025',
    description: 'Brief description for the card view.',
    tags: ['tag1', 'tag2', 'tag3'],
    featured: true,
    hasPost: true, // Set to true if you have a detailed writeup
  },
]
```

## Markdown Features Supported

- **Headers** (h2, h3, h4)
- **Code blocks** with syntax highlighting
- **Inline code**
- **Tables**
- **Lists** (ordered and unordered)
- **Blockquotes**
- **Bold** and *italic* text
- **Links**

### Code Block Languages

Supported languages for syntax highlighting:
- javascript, typescript
- python
- java
- c, cpp
- rust
- go
- bash, shell
- json, yaml
- html, css
- sql
- And many more...

## File Structure

```
src/projects/
├── README.md          # This file
└── template.md        # Template for new posts
```

## Tips

1. Keep slugs URL-friendly (lowercase, hyphens instead of spaces)
2. Use consistent date format (YYYY-MM-DD)
3. Add relevant tags for better organization
4. Include code examples with proper syntax highlighting
5. Add screenshots or diagrams where helpful

# Dark/Light Theme Implementation Guide

## Overview
Your MERN project now has a dark/light theme system. The theme is managed through a React Context and uses Tailwind CSS classes with CSS variables.

## How It Works

### 1. **Theme Context** (`src/context/ThemeContext.jsx`)
- Manages the dark mode state
- Persists theme preference to localStorage
- Respects system preferences on first load
- Applies the `dark` class to the root HTML element

### 2. **Custom Hook** (`src/hooks/useTheme.js`)
- Provides easy access to theme state and toggle function
- Usage: `const { isDarkMode, toggleTheme } = useTheme();`

### 3. **CSS Variables** (in `src/index.css`)
Available variables for light and dark modes:
- `--bg-primary`: Background color
- `--bg-secondary`: Secondary background
- `--text-primary`: Main text color
- `--text-secondary`: Secondary text color
- `--border-color`: Border colors
- `--shadow-sm`: Small shadow
- `--shadow-md`: Medium shadow

### 4. **Tailwind CSS Classes**
Use Tailwind's `dark:` prefix to style dark mode:
```jsx
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  Content
</div>
```

## How to Add Dark Theme to Your Components

### Using Tailwind Classes (Recommended)
```jsx
import { useTheme } from '../hooks/useTheme';

const MyComponent = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6">
      <h1 className="text-gray-800 dark:text-gray-100">My Heading</h1>
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};
```

### Using CSS Variables
```css
.my-element {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}
```

## Common Dark Mode Patterns

### Text Colors
```jsx
<p className="text-gray-700 dark:text-gray-300">Light gray text</p>
<p className="text-gray-800 dark:text-gray-100">Dark gray text</p>
```

### Background Colors
```jsx
<div className="bg-white dark:bg-gray-900">Main background</div>
<div className="bg-gray-50 dark:bg-gray-800">Secondary background</div>
```

### Borders
```jsx
<div className="border border-gray-200 dark:border-gray-700">Bordered box</div>
```

### Shadows
```jsx
<div className="shadow-lg dark:shadow-lg shadow-gray-300 dark:shadow-gray-950">Elevated box</div>
```

## Features Already Implemented

✅ **Header Component**
- Theme toggle button visible on desktop and mobile
- Dark mode styling applied to all header sections
- Responsive design maintained

✅ **Core Setup**
- Theme context provider in main.jsx
- LocalStorage persistence
- System preference detection
- Smooth transitions between themes

## To Use in Other Components

1. Import the hook:
   ```jsx
   import { useTheme } from '../hooks/useTheme';
   ```

2. Get theme state in your component:
   ```jsx
   const { isDarkMode, toggleTheme } = useTheme();
   ```

3. Apply dark mode classes to your JSX elements using Tailwind's `dark:` prefix

## LocalStorage
- Theme preference is saved automatically
- Key: `theme` (values: 'dark' or 'light')
- Restores on page reload

## Next Steps
Apply the dark mode classes to these components:
- Footer.jsx
- ProductCard.jsx
- ProductPage.jsx
- Contact.jsx
- Home.jsx
- All other components

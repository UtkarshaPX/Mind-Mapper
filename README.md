# Mind Mapper

A beautiful, interactive mind map builder with a flower-like arrangement where all connection lines start from the central note. This frontend-only web application is built using HTML, Tailwind CSS, and JavaScript.

## Features

- **Beautiful Flower Pattern Layout**: Notes are arranged in a flower-like pattern around a central note
- **Dotted Connection Lines**: All connections radiate from the central note with elegant dotted lines
- **Drag and Drop**: Easily reposition notes with smooth drag-and-drop functionality
- **Editable Content**: Click on any note to edit its content
- **Note Types**: Choose from different note types (idea, task, question, note, important)
- **Customizable Emojis**: Add emojis to your notes for visual cues
- **Multiple Workspaces**: Create and manage multiple mind map workspaces
- **Inspiration Feature**: Get random inspirational quotes to spark creativity
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

No special prerequisites are needed. This is a frontend-only application that runs in any modern web browser.

### Installation

1. Clone the repository:
   \`\`\`
   git clone https://github.com/yourusername/cute-mind-map-builder.git
   \`\`\`

2. Open `index.html` in your web browser.

That's it! No build process or server setup required.

## Usage

### Creating Your First Mind Map

1. **Login/Signup**: Use the demo login or signup (no actual authentication is implemented)
2. **Central Note**: Each mind map starts with a central note
3. **Add Notes**: Click the "+" button to add new notes that connect to the central note
4. **Edit Content**: Click on any note's content to edit it
5. **Change Note Type**: Click on the note type button to change between idea, task, question, etc.
6. **Drag Notes**: Drag notes to reposition them (connection lines will follow)
7. **Delete Notes**: Click the "X" button on a note to delete it

### Working with Workspaces

1. **Create Workspace**: Click "New Workspace" to create a new mind map
2. **Switch Workspaces**: Use the "Workspaces" button to view and switch between your mind maps
3. **Organize Ideas**: Use different workspaces for different projects or topics

## Customization

### Styling

The application uses Tailwind CSS for styling. You can customize the appearance by modifying the Tailwind configuration in `tailwind.config.js` or by adding custom CSS in the `<style>` section of `index.html`.

### Colors

The default color scheme uses pastel colors:
- Pink: `#FFD6E0`
- Blue: `#C8E7FF`
- Mint: `#C8F7D6`
- Lavender: `#E2D6FF`
- Yellow: `#FFF3C8`

You can modify these colors in the Tailwind configuration.

### Layout

The flower pattern layout can be customized by modifying the following parameters in the `findFlowerPosition` function:
- `numPetals`: Number of notes in the first ring
- `ringSpacing`: Distance between rings
- `maxRings`: Maximum number of rings

### Key Components

1. **Note Management**:
   - Creating, editing, and deleting notes
   - Positioning notes in a flower pattern
   - Maintaining connections between notes

2. **Connection System**:
   - Dotted lines connecting notes to the central note
   - Dynamic updating of connections when notes are moved
   - Gradient styling for visual appeal

3. **Workspace Management**:
   - Creating and switching between workspaces
   - Storing workspace data in memory (no persistence)

4. **UI Components**:
   - Note type selector
   - Emoji picker
   - Workspace panels
   - Inspiration popup

## Limitations

- **No Data Persistence**: This is a frontend-only demo, so data is not saved between sessions
- **Limited Export Options**: Currently no way to export or save mind maps
- **No Collaboration**: Single-user application with no sharing capabilities

## Future Enhancements

- **Data Persistence**: Add local storage or backend integration
- **Export Options**: Export as image, PDF, or JSON
- **Collaboration**: Real-time collaboration features
- **More Layouts**: Additional layout options beyond the flower pattern
- **Themes**: Dark mode and additional color themes
- **Nested Notes**: Support for hierarchical note structures

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Tailwind CSS for the styling framework
- Font Awesome for icons
- Google Fonts for typography

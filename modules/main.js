import { initializeTools } from './tools.js';
import { initializeHome } from './home.js';
import { initializeEditor } from './editor.js';
import { initializeGames } from './games.js';

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
  initializeTools();
  initializeHome();
  initializeEditor();
  initializeGames();
});
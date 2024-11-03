export function initializeHome() {
  // Update system stats periodically
  function updateStats() {
    const cpuStat = document.querySelector('.stat-card:first-child .stat-fill');
    const ramStat = document.querySelector('.stat-card:last-child .stat-fill');
    
    if (cpuStat && ramStat) {
      // Simulate random usage for demo
      const cpuUsage = Math.floor(Math.random() * 100);
      const ramUsage = Math.floor(Math.random() * 100);
      
      cpuStat.style.width = `${cpuUsage}%`;
      ramStat.style.width = `${ramUsage}%`;
      
      cpuStat.parentElement.nextElementSibling.textContent = `${cpuUsage}%`;
      ramStat.parentElement.nextElementSibling.textContent = `${ramUsage}%`;
    }
  }

  // Update stats every 2 seconds
  setInterval(updateStats, 2000);
  updateStats(); // Initial update

  // Quick access tiles
  document.querySelectorAll('.quick-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      const tool = tile.querySelector('span').textContent.toLowerCase().replace(' ', '');
      const toolBtn = document.querySelector(`[data-tool="${tool}"]`);
      if (toolBtn) {
        toolBtn.click();
      }
    });
  });
}
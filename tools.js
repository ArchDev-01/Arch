export function initializeTools() {
  const tools = {
    current: 'home',
    switch(toolId) {
      document.querySelectorAll('.tool-container').forEach(container => {
        container.classList.remove('active');
      });
      document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      
      const tool = document.getElementById(toolId);
      const btn = document.querySelector(`[data-tool="${toolId}"]`);
      
      if (tool && btn) {
        tool.classList.add('active');
        btn.classList.add('active');
        this.current = toolId;
      }
    }
  };

  // Tool switching
  document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      tools.switch(btn.dataset.tool);
    });
  });

  // Tab management
  const tabBar = document.querySelector('.tab-bar');
  const newTabBtn = document.querySelector('.new-tab');

  newTabBtn?.addEventListener('click', () => {
    const tab = document.createElement('div');
    tab.className = 'tab';
    tab.innerHTML = `
      <i class="fas fa-globe"></i>
      <span>New Tab</span>
      <button class="tab-close"><i class="fas fa-times"></i></button>
    `;
    
    tabBar.insertBefore(tab, newTabBtn);
    
    const closeBtn = tab.querySelector('.tab-close');
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      tab.remove();
    });
  });
}
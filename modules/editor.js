export function initializeEditor() {
  const codeEditor = document.querySelector('.code-editor');
  const editorPreview = document.querySelector('.editor-preview');
  const languageSelect = document.querySelector('.language-select');
  const runBtn = document.querySelector('.run-btn');

  if (!codeEditor || !editorPreview) return;

  function updatePreview() {
    const code = codeEditor.value;
    const language = languageSelect.value;

    if (language === 'html') {
      editorPreview.innerHTML = code;
    } else if (language === 'css') {
      const style = document.createElement('style');
      style.textContent = code;
      editorPreview.innerHTML = '';
      editorPreview.appendChild(style);
    } else if (language === 'javascript') {
      try {
        const result = eval(code);
        editorPreview.textContent = result;
      } catch (error) {
        editorPreview.textContent = error.message;
      }
    }
  }

  codeEditor.addEventListener('input', () => {
    if (languageSelect.value === 'html') {
      updatePreview();
    }
  });

  languageSelect.addEventListener('change', updatePreview);
  runBtn.addEventListener('click', updatePreview);
}
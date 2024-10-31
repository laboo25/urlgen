document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generateButton').addEventListener('click', generateUrls);
    document.getElementById('downloadButton').addEventListener('click', downloadUrls);
  });
  
  function generateUrls() {
    const baseUrl = document.getElementById('baseUrl').value;
    const startNumber = parseInt(document.getElementById('startNumber').value, 10);
    const endNumber = parseInt(document.getElementById('endNumber').value, 10);
    const outputArea = document.getElementById('output');
    const previews = document.getElementById('imagePreviews');
  
    outputArea.value = '';
    previews.innerHTML = '';
  
    if (!baseUrl.includes('{count}') || isNaN(startNumber) || isNaN(endNumber) || startNumber < 0 || endNumber < startNumber) {
      alert('Please ensure the base URL contains "{count}" and that all fields are valid.');
      return;
    }
  
    const urls = [];
    for (let i = startNumber; i <= endNumber; i++) {
      const dynamicNumber = String(i).padStart(5, '0');
      const url = baseUrl.replace('{count}', dynamicNumber);
      urls.push(url);
      outputArea.value += url + '\n';
  
      // Create image preview
      const img = document.createElement('img');
      img.src = url;
      img.alt = `Image ${dynamicNumber}`;
      img.onerror = () => {
        img.alt = 'Failed to load image';
        img.style.opacity = '0.5';
      };
      previews.appendChild(img);
    }
  }
  
  function downloadUrls() {
    const urls = document.getElementById('output').value;
    if (!urls) {
      alert('No URLs to download. Please generate URLs first.');
      return;
    }
  
    const blob = new Blob([urls], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'urls.txt';
    a.click();
    URL.revokeObjectURL(url);
  }
  
document.querySelectorAll('.post-content img').forEach((img) => {
  if (img.closest('a')) return;
  const a = document.createElement('a');
  a.href = img.currentSrc || img.src;
  a.target = '_blank';
  a.rel = 'noopener';
  a.className = 'img-original';
  img.replaceWith(a);
  a.appendChild(img);
});

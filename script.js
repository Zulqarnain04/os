function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

window.onload = function () {
  initBitmap();
  initLinked();
  initGrouping();
  initCounting(); // ✅ NEW
  showSection('bitmap');
};



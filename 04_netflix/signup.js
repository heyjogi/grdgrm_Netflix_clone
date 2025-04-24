function scrollThumbnails(direction) {
    const container = document.querySelector('.thumbnail-list');
    const scrollAmount = 300;
    container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  }
  
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const currentItem = button.parentElement;
      const allItems = document.querySelectorAll('.faq-item');
      allItems.forEach(item => {
        if (item !== currentItem) {
          item.classList.remove('active');
        }
      });
      currentItem.classList.toggle('active');
    });
  });
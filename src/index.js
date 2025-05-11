function typewriterTitle(text, speed, stopAt = 1) {
  let i = 0;
  let deleting = false;
  let titleElement = document.title;

  function write() {
    if (i < text.length) {
      document.title = text.substring(0, i + 1);
      i++;
      setTimeout(write, speed);
    } else {
      setTimeout(deleteText, 1000);  
    }
  }

  function deleteText() {
    if (i > stopAt) {  
      document.title = text.substring(0, i - 1);
      i--;
      setTimeout(deleteText, speed);
    } else {
      setTimeout(write, 1000);  
    }
  }

  write(); 
}

(function() {
  const navLinks = document.querySelectorAll('.j-nav-element');
  const allViews = document.querySelectorAll('.j-screen');
  
  let currentView = 1;
  let currentTranslation = 0;

  const translateScreensForwards = () => {
    currentTranslation =  currentTranslation - 100;
    currentView++;
    allViews.forEach(view => view.style.transform = `translateX(${currentTranslation}%)`);
  }
    

    const translateScreensBackwards = () => {
      currentTranslation = currentTranslation + 100;
      currentView--;
      allViews.forEach(view => view.style.transform = `translateX(${currentTranslation}%)`);
    } 
      

  function changeScreen(e) {
    e.preventDefault();
    
    
    const clickedLinkNumber = Number(this.dataset.link);

    while(clickedLinkNumber !== currentView) {
      clickedLinkNumber > currentView
        ? translateScreensForwards()
        : translateScreensBackwards();
    }

  }

  navLinks.forEach(link => link.addEventListener('click', changeScreen));

}())

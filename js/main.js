(function() {
  const navLinks = document.querySelectorAll('.j-nav-element');
  const allViews = document.querySelectorAll('.j-screen');
  
  let currentView = 0;
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
      

  function changeUrl(urlId) {
    console.log(history);
    history.pushState(
      {
        currentPageId: urlId
    
      },
      'Domingo ' + urlId,
      '/test'+ urlId
    );
  }

  function changeScreen(e) {
    e.preventDefault();
    
    
    const clickedLinkNumber = Number(this.dataset.link);

    if (clickedLinkNumber !== currentView) {
      changeUrl(clickedLinkNumber);
    }
      while (clickedLinkNumber !== currentView) {
        clickedLinkNumber > currentView
          ? translateScreensForwards()
          : translateScreensBackwards();
      }
    

  }

  navLinks.forEach(link => link.addEventListener('click', changeScreen));
  window.onpopstate = (e) => console.log('pop');
}())

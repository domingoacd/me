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
      

  function changeUrl(urlId, urlName) {
    console.log(history);
    history.pushState(
      {
        currentPageId: urlId
    
      },
      'Domingo ' + urlId,
      '/'+ urlName
    );
  }

  function changeScreen(e) {
    e.preventDefault();
    
    
    const clickedLinkNumber = Number(this.dataset.link);
    const urlName = this.dataset.url;

    if (clickedLinkNumber !== currentView) {
      changeUrl(clickedLinkNumber, urlName);
    }
      while (clickedLinkNumber !== currentView) {
        clickedLinkNumber > currentView
          ? translateScreensForwards()
          : translateScreensBackwards();
      }
    

  }

  function handleInitialRoute(e) {
    const route = window.location.pathname;

    console.log(route);
  }

  navLinks.forEach(link => link.addEventListener('click', changeScreen));
  window.onpopstate = (e) => console.log('pop');
  window.addEventListener('load', handleInitialRoute);
}())

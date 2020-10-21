(function() {
  const navLinks = document.querySelectorAll('.j-nav-element');
  const allViews = document.querySelectorAll('.j-screen');
  const ROUTES = [
    "home",
    "aboutme",
    "projects",
    "contact"
  ];
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

  function showSpecificScreen(screenToShow) {

    for (let i = 0; i < navLinks.length; i++) {
      const viewId = navLinks[i].dataset.url;
      if (viewId != screenToShow) {
        translateScreensForwards();
      } else {
        break;
      }
    }
  }

  function goToSpecificRoute(e) {
    const route = window.location.pathname.split('/')[1];
    console.log('pop')
    if (ROUTES.some(baseRoute => baseRoute == route)) {
      showSpecificScreen(route);
    }
  }

  navLinks.forEach(link => link.addEventListener('click', changeScreen));
  window.addEventListener('popstate', goToSpecificRoute);
  window.addEventListener('load', goToSpecificRoute);
}())

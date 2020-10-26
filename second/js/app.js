(function() {
  const menuLinks = document.querySelectorAll('.j-anchor');
  const contentSections = document.querySelectorAll('.j-content');
  const mainMenu = document.getElementById('main-menu');

  let sectionsTopPosition = null;
  
  function changeView(e) {

    const clickedAnchor = this;
    const anchorId = clickedAnchor.dataset.link;
    const mainMenuSameAnchor = document.querySelector(`.main-menu .j-anchor[data-link="${anchorId}"]`);     

    menuLinks.forEach(link => link.classList.remove('active'));
    mainMenuSameAnchor.classList.add('active');
  }

  function sectionIsOnScreen(section) {
    //console.log(window.pageYOffset);
    console.log(section.getBoundingClientRect().top);
    return false;
  }

  function toggleMainMenu(e) {
    const firstSection = contentSections[0];
    
    if (window.pageYOffset > firstSection.getBoundingClientRect().height / 2) {
      mainMenu.classList.add('show', 'visible');
    } else {
      mainMenu.classList.remove('show');
      setTimeout(() => {
        mainMenu.classList.remove('visible');
      }, 500);
    }
    
  }
  function setSectionsTopPosition() {
    // contentSections
  }

  setSectionsTopPosition();
  menuLinks.forEach(link => link.addEventListener('click', changeView));
  window.addEventListener('scroll', toggleMainMenu);
})();
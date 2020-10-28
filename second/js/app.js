(function() {
  const menuLinks = Array.from(document.querySelectorAll('.j-anchor'));
  const contentSections = Array.from(document.querySelectorAll('.j-content'));
  const mainMenu = document.getElementById('main-menu');



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

  const removeActiveClassFromAnchor = (anchor) => anchor.classList.remove('active');

  function detectCurrentSection() {
    
    contentSections.reverse().forEach(section => {
      
      if (
        section.id != 'home' &
        section.getBoundingClientRect().top >= 0 &&
        section.getBoundingClientRect().top < window.innerHeight - 300
      ) {
        
        section.classList.add('show');
        menuLinks.forEach(removeActiveClassFromAnchor);
        menuLinks.find(link => link.dataset.link == section.id).classList.add('active');
      }
    });
    
  }
  
  const pageIsScrolledAlready = () => window.pageYOffset > 150;

  function showSections(e) {
    contentSections[0].classList.add('show');
    if(pageIsScrolledAlready()) {
      contentSections.forEach(section => section.classList.add('show'));
    }
    
  }

  //menuLinks.forEach(link => link.addEventListener('click', changeView));
  window.addEventListener('scroll', toggleMainMenu);
  window.addEventListener('scroll', detectCurrentSection);
  window.addEventListener('load', showSections);
})();
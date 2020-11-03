(function() {
  const menuLinks = Array.from(document.querySelectorAll('.j-anchor'));
  const contentSections = Array.from(document.querySelectorAll('.j-content'));
  const mainMenu = document.getElementById('main-menu');
  const contactForm = document.querySelector('.contact-form');
  const inputs = {
    'name': 'entry.1793054211',
    'email': 'entry.1002230681',
    'message': 'entry.1233878156'
  };
  
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

  function showModal(modalToShow) {
    const submitModal = document.querySelector('.j-modal');
    const contentToShow = submitModal.querySelector(`.modal__content.${modalToShow}`);

    submitModal.classList.add('display');
    contentToShow.classList.add('show');

    setTimeout(() => {
      submitModal.classList.remove('display');
    }, 2500);

    setTimeout(() => {
      contentToShow.classList.remove('show');
    }, 2700);
  }

  function submitFormData(e) {
    e.preventDefault();

    const url = "https://docs.google.com/forms/d/e/1FAIpQLScL7x7IDeC5WilG5Wewhd9zDr3ZJ1WH521ZA0ZyCpMq-AzXyQ/formResponse?"
    const nameData = document.getElementById(inputs.name).value;
    const emailData = document.getElementById(inputs.email).value;
    const messageData = document.getElementById(inputs.message).value;
    const submitButton = document.querySelector('form button[type="submit"]');
    const submitModal = document.querySelector('.j-modal');

    submitButton.disabled = true;
    fetch(
      `${url}${inputs.name}=${nameData}&${inputs.email}=${emailData}&${inputs.message}=${messageData}`,
      {
        mode: 'no-cors'
      }
    )
    .then(res => {
      console.log(res)
      submitButton.disabled = false;
      submitModal
      submitModal.querySelector('.modal__content.success').classList.add('show');

      showModal('success');
    })
    .catch(err => {
      showModal('error');
    });


    console.log(`${url}${inputs.name}=${nameData}&${inputs.email}=${emailData}&${inputs.message}=${messageData}`);
    //debugger;
  }

  contactForm.addEventListener('submit', submitFormData);
  window.addEventListener('scroll', toggleMainMenu);
  window.addEventListener('scroll', detectCurrentSection);
  window.addEventListener('load', showSections);
})();
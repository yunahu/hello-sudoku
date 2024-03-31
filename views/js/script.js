// IIFE
(() => {

// setup active nav link visual effects
const setActiveNavlink = (name) => {
   let navlinks = document.querySelectorAll('.nav-link');
   navlinks.forEach(link => {
      link.innerText.toLowerCase().includes(name) ?
         link.parentNode.classList.add('active') : link.parentNode.classList.remove('active');
   });
};

// switch section function
const toSection = (text) => {
   let sections = document.querySelectorAll('section');
   sections.forEach(section => {
      section.setAttribute('style', 'display: none !important');
         /** Used setAttribute cuz need to overwrite important */
   });

   let dest = text.toLowerCase();
   if (dest.includes("dashboard")) {
      dest = "dashboard";  /** corresponding id */
      setActiveNavlink('dashboard');

   } else if (dest.includes("daily")) {
      dest = "gamePane";
      setActiveNavlink('daily');

   } else if (dest.includes("select")) {
      dest = "selectLevel";
      setActiveNavlink('select');

   } else if (dest.includes("register")) {
      dest = "register";

   } else if (dest.includes("admin")) {
      dest = "admin";
      setActiveNavlink('admin');

   } else if (dest.includes("entry") || dest.includes("log out")) {
      dest = "entry";

   } else {
      dest = "login";
   }

   // hide nav menu if under vw 1200px
   if (window.innerWidth < 1200) {
      document.getElementById('navList').classList.remove("show");
   }
   document.getElementById(dest).setAttribute('style', 'display: flex !important');
};


// TODO: login function
const loginWith = (dummy) => {
   // Append login functions here


   toSection('dashboard');
}


// TODO: register function
const registerWith = (dummy) => {
   // Append login functions here


   loginWith('auto login with new username & password');
}

// TODO: admin functions
const adminControl = (cmd) => {
   switch (cmd) {
      case 'role':
         alert('Change role of users and update database');
         break;

      case 'export':
         alert('Export user data as json(or whatever) format');
         break;

      case 'delete':
         alert('Delete user from database & logout');
         break;

      default:;
   }
}


// TODO: connect game id with grid cells
const fillGrid = () => {
   const ROW_NUM = 5, COL_NUM = 5; /** 5x5 grid */
   let levelsGrid = document.querySelectorAll('.levelsGrid');
   levelsGrid.forEach(grid => {
      for (let r = ROW_NUM; r >= 0; r--) {
         let row = document.createElement('div');
         row.classList.add('col-12', 'row', 'm-auto', 'p-0');

         for (let c = COL_NUM; c > 0; c--) {
            let levelNum = r * ROW_NUM + c;
            let col = document.createElement('div');
            col.classList.add('col', 'p-0');
            let lvlLink = document.createElement('a');
            lvlLink.innerHTML = `&nbsp;${levelNum}&nbsp;`;

            // TODO: redirecting features goes here
            lvlLink.onclick = () => {
               let difficulty = grid.id.toLowerCase();
               if (difficulty.includes('easy')) {
                  difficulty = 1;
               } else if (difficulty.includes('medium')) {
                  difficulty = 2;
               } else if (difficulty.includes('hard')) {
                  difficulty = 3;
               }

               alert(`Go To Level ${difficulty} - ${levelNum}`);
            };

            col.append(lvlLink);
            row.prepend(col);
         }

         grid.prepend(row);
      }

   });
}


// collection of setup statements that needs to be run onload
const setup = () => {
   // setup event listeners for links for section switch
   let sectionLinks = document.querySelectorAll('.sectionLink');
   sectionLinks.forEach(link => {
      link.onclick = () => {
         toSection(link.innerText);
      }
   });

   // prevent form button from submitting onclick
   let modalTrigger = document.querySelector('#registerBtn');
   modalTrigger.onclick = (evt) => {
      evt.preventDefault();
   };

   // login & register event handlers
   let registerBtn = document.querySelector('#continueRegister');
   registerBtn.onclick = (evt) => {
      evt.preventDefault();
      registerWith('dummy data');
   };

   let loginBtn = document.querySelector('#loginBtn');
   loginBtn.onclick = (evt) => {
      evt.preventDefault();
      loginWith('dummy data');
   };

   // Toggle admin search result display & button transform
   let resultToggle = document.querySelector('#toggleResult');
   resultToggle.onclick = () => {
      let status = resultToggle.ariaExpanded;
      /** aria-expanded value is string, NOT boolean */
      if (status == "true") {
         resultToggle.style.cssText = 'background-color: var(--bs-white); color: var(--bs-success); margin-top: 0;';
         resultToggle.innerText = "Hide Result";

      } else if (status == "false") {
         resultToggle.style.cssText = 'background-color: var(--bs-success); color: var(--bs-white); margin-top: 20vh;';
         resultToggle.innerText = "Display Result";
      }
   }

   // Event Listeners for admin user control buttons
   let changeRole = document.getElementById('changeRole');
   changeRole.onclick = () => {adminControl('role')};
   let exportData = document.getElementById('exportData');
   exportData.onclick = () => {adminControl('export')};
   let deleteUser = document.getElementById('deleteUser');
   deleteUser.onclick = () => {adminControl('delete')};

   // Fill the select levels grids
   fillGrid();
};


window.onload = () => {

   setup();
   toSection('entry');
};

})();
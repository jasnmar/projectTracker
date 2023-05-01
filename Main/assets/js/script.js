let projectObject = [
    { name:"project 1",  type:"project type 1", duedate:"07/01/71"},
    { name:"project 2",  type:"project type 2", duedate:"07/01/91"},
]

if($(document).ready()) {
    console.log("Document Ready");
    setDate();
    createCard();
    getProjectList();
    buildTable(projectObject);
}
function getProjectList() {
  const ls = JSON.parse(localStorage.getItem("projects"));
  if(ls) {
    projectObject = ls;
  }
}

function setDate() {
    const dateEl = $('#date-time');
    dateEl.text(dayjs().format('MMM D, YYYY [at] HH:mm:ss a'));
    console.log(dateEl);
  }

var intervalId = window.setInterval(function(){
setDate();
//TODO: Set this to 1 second at the end.
}, 5000);

function createCard(){
    const cardEl = $("#card");
    const cardDiv = document.createElement('div');
    cardDiv.classList.add("card", "d-flex", "container-fluid");
    const cardBody = document.createElement('div');
    cardBody.classList.add("card-body");
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add("card-title");
    cardTitle.innerHTML= "Card title";
    const cardInstructions = document.createElement('p');
    cardInstructions.classList.add("card-text");
    cardInstructions.innerHTML = "Texty text text texty very texty";
    const cardButton = document.createElement('button');
    cardButton.classList.add("btn","btn-primary");
    cardButton.id = "create-project";
    cardButton.innerHTML = "Create Project";
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardInstructions);
    cardBody.appendChild(cardButton);
    cardDiv.appendChild(cardBody);
    cardEl.append(cardDiv);

    cardButton.addEventListener("click", createProject);

//   <div class="card" style="width: 18rem;">
//   <div class="card-body">
//     <h5 class="card-title">Card title</h5>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <a href="#" class="btn btn-primary">Go somewhere</a>
//   </div>
// </div>

}


function createProject(e) {
  console.log(e.target);
  let myModal = new bootstrap.Modal(document.getElementById('myModal'));
  $( "#datepicker" ).datepicker();
  myModal.toggle();
  const saveButton = document.getElementById("modal-save");
  console.log(saveButton);
  saveButton.addEventListener("click", function () {
    console.log("Save Button Click");
    console.log(myModal);
    const inputForm = $("#input-form");
    console.log(inputForm);
    const projectName = $("#projectName");
    const projectType = $("#pType");
    const projectDate = $("datepicker");
    console.log(projectName.val());
    console.log(projectType.val())
    console.log(projectDate.val());
    const nProject = {
      name:projectName.val(),
      type:projectType.val(), 
      duedate:projectDate.val()
    }
    let projectList = JSON.parse(localStorage.getItem("projects"));
    if (projectList){
      projectList.push(nProject)
    } else {
      projectList = [nProject];
    }
    console.log(projectList);
    localStorage.setItem("projects", JSON.stringify(projectList));
    buildTable(projectList);
    myModal.toggle();
    
  });

  // if(document.getElementById('#myModal')) {
  //   let myModal = new bootstrap.Modal(document.getElementById('myModal'));
  // } else {
  //   const modalHTML = [
  //     '<div class="modal" tabindex="-1">',
  //     '  <div class="modal-dialog">',
  //     '    <div class="modal-content">',
  //     '      <div class="modal-header">',
  //     '        <h5 class="modal-title">Modal title</h5>',
  //     '        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>',
  //     '      </div>',
  //     '      <div class="modal-body">',
  //     '          <p>Modal body text goes here.</p>',
  //     '      </div>',
  //     '      <div class="modal-footer">',
  //     '         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>',
  //     '         <button type="button" class="btn btn-primary">Save changes</button>',
  //     '      </div>',
  //     '    </div>',
  //     ' </div>',
  //     '</div>'
  //   ].join('');
  //   const bdy = document.getElementById('body');
  //   const mDiv = document.createElement('div');
  //   mDiv.id = "myModal";
  //   mDiv.innerHTML = modalHTML;
  //   bdy.appendChild(mDiv);
  //   let myModal = new bootstrap.Modal(document.getElementById('myModal'));
  //   mDiv.addEventListener('shown.bs.modal', function () {
  //     myInput.focus()
  //   })
  //}

 

 

}


function buildTable(object) {
    let keys = [];
    for(i=0;i<object.length;i++){
        console.log(object[i]);
        console.log(Object.keys(object[i]));
        keys = Object.keys(object[i]);
    }
    const tableEl = document.getElementById("table");
    tableEl.innerHTML = "";
    
    const dataTable = document.createElement('table')
    tableEl.appendChild(dataTable);
    dataTable.classList.add("table");
    const tHead = document.createElement('thead');
    dataTable.appendChild(tHead);
    const tRow = document.createElement('tr');
    tHead.appendChild(tRow);
    for(i=0;i<keys.length;i++) {
        const thEl = document.createElement('th');
        thEl.setAttribute("scope","col");
        thEl.innerHTML = keys[i];
        tRow.appendChild(thEl);
    }
    const tBody = document.createElement('tbody');
    dataTable.appendChild(tBody);
    for(i=0;i<object.length;i++) {
        const dtRow = document.createElement('tr');
        const c1 = document.createElement('td');
        c1.innerHTML = object[i].name;
        const c2 = document.createElement('td');
        c2.innerHTML = object[i].type;
        const c3 = document.createElement('td');
        c3.innerHTML = object[i].duedate;
        dtRow.appendChild(c1);
        dtRow.appendChild(c2);
        dtRow.appendChild(c3);
        tBody.appendChild(dtRow);

    }
    

}
/* <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table> */



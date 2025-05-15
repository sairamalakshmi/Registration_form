let UserForm=document.getElementById("user-form");

const retriveEntries=()=>{
  let entries=localStorage.getItem("user-entries");
  if(entries){
  entries=JSON.parse(entries);
}else{
  entries=[];
}
return entries;
};
let userentries=retriveEntries();

const displayEntries=()=>{
  const entries=retriveEntries();

  const tableEntries=entries.map((entry)=>{
    const namecell=`<td>${entry.name}</td>`;
    const emailcell=`<td>${entry.email}</td>`;
    const passwordcell=`<td>${entry.password}</td>`;
    const dobcell=`<td>${entry.dob}</td>`;
    const termcell=`<td>${entry.acceptedTermsandconditions}</td>`;

    const row=`<tr>${namecell}${emailcell}${passwordcell}${dobcell}${termcell}</tr>`;
    return row;
  }).join("\n");

  const table=`<table border="1"><tr>
  <th>Name</th>
  <th>Email</th>
  <th>Password</th>
  <th>Dob</th>
  <th>Accepted Terms?</th>
  </tr>${tableEntries}</table>`;

  let details=document.getElementById("user-entries");
  details.innerHTML=table;
};

const saveUserForm =(event)=>{
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob =document.getElementById("dob").value;

    const acceptedTermsandconditions =document.getElementById("terms").checked;

    const entry={
        name,
        email,
        password,
        dob,
        acceptedTermsandconditions

    }

    userentries.push(entry);
    localStorage.setItem("user-entries",JSON.stringify(userentries));
    displayEntries();
};

//DOB validations
const dobinput=document.getElementById("dob");
dobinput.addEventListener("change",()=>{
  const dob=new Date(dobinput.value);
  const today=new Date();
  const age=today.getFullYear()-dob.getFullYear();
  const month=today.getMonth()-dob.getMonth();
  const day=today.getDate()-dob.getDate();

  let actualage=age;
  if(month<0 || (month===0 && day<0)){
    actualage--;
  }
  if(actualage<18 || actualage>55){
    dobinput.setCustomValidity("Age must be between 18 and 55");
    dobinput.reportValidity();
  }
  else{
    dobinput.setCustomValidity("");
  }
});



//Form validations
const emailinput=document.getElementById('email');
  emailinput.addEventListener('input', () => validate(emailinput));

  const submit=document.getElementById('submit');
  submit.addEventListener('click',() => validate(emailinput))

  function validate(element){
    if(element.validity.typeMismatch){
      element.setCustomValidity("The Email is not in the righ format!!!");
      element.reportValidity();
    }
    else{
      element.setCustomValidity("");
    }
  }

  UserForm.addEventListener("submit",saveUserForm);
displayEntries();

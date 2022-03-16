import { Employee } from "./Employee.js";
import { Pet } from "./Pet.js";
import { Shelter } from "./Shelter.js";

export class WebShop{
    constructor()
    {
        this.mainDiv = null;
        this.sheltersList =[];
        this.employeesList=[];
        this.petsList = [];
        this.loggedEmp=null;
    }
    paintLoginForm(host)
    {
        this.clearForm(host);

        this.mainDiv = document.createElement("div");
        this.mainDiv.className = "mainDiv";
        host.appendChild(this.mainDiv);

        var loginFormDiv = document.createElement("div");
        loginFormDiv.className = "loginForm";
        this.mainDiv.appendChild(loginFormDiv); 
        
        let imageContainer = document.createElement("img");
        imageContainer.src = "imgs/title.png";
        imageContainer.className = "item-image-size";
        imageContainer.classList.add("titleImg");
        this.mainDiv.appendChild(imageContainer);

        var usernameLabel = document.createElement("label");
        usernameLabel.innerHTML = "username";
        usernameLabel.classList="loginLbl";
        loginFormDiv.appendChild(usernameLabel);

        var usernameTxtBox = document.createElement("input");
        usernameTxtBox.type = "text";
        usernameTxtBox.classList="login";
        loginFormDiv.appendChild(usernameTxtBox);

        var passwordLabel = document.createElement("label");
        passwordLabel.innerHTML = "password";
        passwordLabel.classList="loginLbl";
        loginFormDiv.appendChild(passwordLabel);

        var passwordTxtBox = document.createElement("input");
        passwordTxtBox.type = "password";
        passwordTxtBox.classList="login";
        loginFormDiv.appendChild(passwordTxtBox);

        let btnSubmit = document.createElement("button");
        btnSubmit.onclick=(ev) => this.submit(usernameTxtBox.value,passwordTxtBox.value);
        btnSubmit.innerHTML = "Log in";
        btnSubmit.classList= "btnSubmit" ;
        loginFormDiv.appendChild(btnSubmit);
    }
    async submit(user, pass)
    {
        if (!user || !pass)
           alert("Please insert username and password!")
        else
        if (user=="admin" && pass == "admin")
            {
               this.paintShopsPage(document.body);
            }
        else
        {
               this.paintClientPage(document.body,user,pass);
        }
    }
    paintAdminPage(host)
    {
        this.clearForm(host);
        this.mainDiv = document.createElement("div");
        this.mainDiv.className = "mainDiv2";
        host.appendChild(this.mainDiv);

        let adminDiv = document.createElement("div");
        adminDiv.className = "adminDiv";
        this.mainDiv.appendChild(adminDiv);

        let imageContainer = document.createElement("img");
        imageContainer.src = "imgs/title.png";
        imageContainer.className = "item-image-size";
        imageContainer.classList.add("titleImg");
        adminDiv.appendChild(imageContainer);

        var divMenu = document.createElement("div");
        divMenu.className="adminDivMenu";
        adminDiv.appendChild(divMenu);

        let btnLogout = document.createElement("button");
        btnLogout.onclick=(ev) => this.paintLoginForm(host);
        btnLogout.className="btnLogout";
        btnLogout.innerHTML = "Logout";
        divMenu.appendChild(btnLogout);

        let btnShops = document.createElement("button");
        btnShops.className="btnMenu";
        btnShops.onclick=(ev) => this.paintShopsPage(host);
        btnShops.innerHTML = "Shops";
        divMenu.appendChild(btnShops);

        let btnEmployees = document.createElement("button");
        btnEmployees.className="btnMenu";
        btnEmployees.onclick=(ev) => this.paintEmployeePage(host);
        btnEmployees.innerHTML = "Employees";
        divMenu.appendChild(btnEmployees);
    }
    async paintEmployeePage(host)
    {   
        this.employeesList=[];
        await fetch("https://localhost:5001/Employee/GetEmployees",
        {
            method: "GET"
        }).then(s=>{
            if(s.ok)
            {
                s.json().then(data  =>
                    {
                        let num=0;
                        data.forEach( el=> {
                            let emp = new Employee(num++,el.idEmployee,el.fullName,el.username,el.password,el.shelterID,el.shelterName);
                            this.employeesList.push(emp);
                        });
                    }).then(()=>{
                        this.paintAdminPage(host);
        let adminDiv = document.querySelector(".adminDiv");
            
        var workersLabel = document.createElement("label");
        workersLabel.innerHTML = "EMPLOYEES";
        workersLabel.className="lblWorkers";
        adminDiv.appendChild(workersLabel);


        var divForTableAndForm = document.createElement("div");
        divForTableAndForm.className="divForTableAndForm";
        adminDiv.appendChild(divForTableAndForm);
  
        var divTable = document.createElement("div");
        divTable.className="divTable";
        divForTableAndForm.appendChild(divTable);

        var tableForEmployees = document.createElement("table");
        tableForEmployees.className ="tabEmployees";
        divTable.appendChild(tableForEmployees);       
        
        var thEmployees = document.createElement("thead");
        tableForEmployees.appendChild(thEmployees);

        var trEmployees = document.createElement("tr");
        thEmployees.appendChild(trEmployees);

        var tbBodyEmployees = document.createElement("tbody");
        tbBodyEmployees.className="tbEmployeesData"
        tableForEmployees.appendChild(tbBodyEmployees);

        let th;
        var headers = ["Number","Full Name","Username","Password","Shop Name","Delete"];
        headers.forEach(el=>
            {
                th=document.createElement("th")
                th.innerHTML = el;
                trEmployees.appendChild(th);
            })
        
        let hostForTable = document.querySelector(".tbEmployeesData");
        this.employeesList.forEach(emp => {
            emp.paint(hostForTable);
        });

        let btnDel = document.querySelectorAll(".btnDel");
        let temp=0;
        btnDel.forEach(btn => { 
            let classa = "delEmp" + temp;
            btn.classList.add(classa);
            btn.onclick=(ev) =>this.Delete(btn.classList);
            temp++;
           });
        

        var divFormEmployeeAdd = document.createElement("div");
        divFormEmployeeAdd.className="divFormEmployeeAdd";
        divForTableAndForm.appendChild(divFormEmployeeAdd);

        var lblFullName = document.createElement("label");
        lblFullName.innerHTML="Full Name";
        lblFullName.classList="login";
        divFormEmployeeAdd.appendChild(lblFullName);

        var tbFullName = document.createElement("input");
        divFormEmployeeAdd.appendChild(tbFullName);

        
        var lblUsername = document.createElement("label");
        lblUsername.innerHTML="Username";
        lblUsername.classList="login";
        divFormEmployeeAdd.appendChild(lblUsername);

        var tbUsername = document.createElement("input");
        divFormEmployeeAdd.appendChild(tbUsername);


        var lblPassword = document.createElement("label");
        lblPassword.innerHTML="Password";
        lblPassword.classList="login";
        divFormEmployeeAdd.appendChild(lblPassword);

        var tbPassword = document.createElement("input");
        divFormEmployeeAdd.appendChild(tbPassword);


        var lblShopName = document.createElement("label");
        lblShopName.innerHTML="Shop Name";
        lblShopName.classList="login";
        divFormEmployeeAdd.appendChild(lblShopName);

        var tbShopName = document.createElement("input");
        divFormEmployeeAdd.appendChild(tbShopName);

        var btnAddEmployee = document.createElement("button");
        btnAddEmployee.innerHTML = "ADD";
        btnAddEmployee.className="btnSubmit";
        btnAddEmployee.onclick= ev => this.addEmployee(tbFullName.value,tbUsername.value,tbPassword.value,tbShopName.value);
        divFormEmployeeAdd.appendChild(btnAddEmployee);


                    })
            }
        });
        
    }
    async paintShopsPage(host)
    {
        this.sheltersList=[];
        
        await fetch("https://localhost:5001/Shelter/GetShelters",
         {
             method: "GET"
         }).then(s=>{
             if(s.ok)
             {
                 s.json().then(data  =>
                     {
                         let num=0;
                         data.forEach( el=> {
                             let sh = new Shelter(num++,el.idShelter,el.name,el.address);
                             this.sheltersList.push(sh);
                         });
                     }).then(()=>{ 
                         this.paintAdminPage(host);
                         let adminDiv = document.querySelector(".adminDiv");
                 
                         var workersLabel = document.createElement("label");
                         workersLabel.innerHTML = "SHOPS";
                         workersLabel.className="lblWorkers";
                         adminDiv.appendChild(workersLabel);
                 
                         var divForTableAndForm = document.createElement("div");
                         divForTableAndForm.className="divForTableAndForm";
                         adminDiv.appendChild(divForTableAndForm);
                 
                 
                 
                         var divTable = document.createElement("div");
                         divTable.className="divTable";
                         divForTableAndForm.appendChild(divTable);
                         
                 
                         var tableForEmployees = document.createElement("table");
                         tableForEmployees.className ="tabEmployees";
                         divTable.appendChild(tableForEmployees);
                 
                         
                         var thEmployees = document.createElement("thead");
                         tableForEmployees.appendChild(thEmployees);
                 
                         var trEmployees = document.createElement("tr");
                         thEmployees.appendChild(trEmployees);
                 
                         var tbBodyEmployees = document.createElement("tbody");
                         tbBodyEmployees.className="tbShopsData"
                         tableForEmployees.appendChild(tbBodyEmployees);
                 
                         let th;
                         var headers = ["Number","Name","Address","Delete"];
                         headers.forEach(el=>
                             {
                                 th=document.createElement("th")
                                 th.innerHTML = el;
                                 trEmployees.appendChild(th);
                             })
                 
                         let hostForTable = document.querySelector(".tbShopsData");
                         this.sheltersList.forEach(sh => {
                             sh.paint(hostForTable);
                         });
                         
                         let btnDel = document.querySelectorAll(".btnDel");
                         let temp=0;
                         btnDel.forEach(btn => { 
                             let classa = "delShop" + temp;
                             btn.classList.add(classa);
                             btn.onclick=(ev) =>this.Delete(btn.classList);
                             temp++;
                            });
                         
                         var divFormEmployeeAdd = document.createElement("div");
                         divFormEmployeeAdd.className="divFormEmployeeAdd";
                         divForTableAndForm.appendChild(divFormEmployeeAdd);
                 
                         var lblFullName = document.createElement("label");
                         lblFullName.innerHTML="Shop Name";
                         lblFullName.classList="login";
                         divFormEmployeeAdd.appendChild(lblFullName);
                 
                         var tbFullName = document.createElement("input");
                         divFormEmployeeAdd.appendChild(tbFullName);
                 
                         
                         var lblUsername = document.createElement("label");
                         lblUsername.innerHTML="Address";
                         lblUsername.classList="login";
                         divFormEmployeeAdd.appendChild(lblUsername);
                 
                         var tbUsername = document.createElement("input");
                         divFormEmployeeAdd.appendChild(tbUsername);
                 
                         var btnAddEmployee = document.createElement("button");
                         btnAddEmployee.innerHTML = "ADD";
                         btnAddEmployee.className="btnSubmit";
                         btnAddEmployee.onclick= ev => this.addShop(tbFullName.value,tbUsername.value);
                         divFormEmployeeAdd.appendChild(btnAddEmployee);})
             }
         })
    }

    async Delete(classes)
    {
        if (confirm("Are you sure you want to delete this item?") != true)
            return;
        let temparray= classes[1].split(/([0-9]+)/);
        let elid;
        if (temparray[0].includes("delShop"))
        {
            this.sheltersList.forEach(el=> {
                if (el.num == temparray[1])
                    elid=el.id;
                    
            });
            
             await fetch('https://localhost:5001/Shelter/DeleteShelter/' + elid, {
                        method: 'DELETE',
              }).then(s=>{
                if(s.ok)
                    {
                        console.log("SHOP DELETED");
                        this.paintShopsPage(document.body);
                    }
             }) 
        }
        if(temparray[0].includes("delEmp"))
        {
            this.employeesList.forEach(el=> {
                if (el.number == temparray[1])
                    elid=el.id;
             });
             await fetch('https://localhost:5001/Employee/DeleteEmployee/' + elid, {
                method: 'DELETE',
             }).then(s=>{
        if(s.ok)
            {
                console.log("EMPLOYEE DELETED");
                this.paintEmployeePage(document.body);
            }
     }) 
        }
    }
 
    async paintClientPage(host,user,pass)
    {
        await  fetch("https://localhost:5001/Employee/GetEmployee/"+user+"/"+pass,
            {
                method: "GET"
            }).then(s=>{
                if(s.ok)
                {
                    s.json().then(data =>  
                        {
                            let emp = new Employee(0,data.idEmployee,data.fullName,data.username,data.password,data.shelterID,data.shelterName);
                            this.loggedEmp=emp;

                                        this.clearForm(host);

                                        this.mainDiv = document.createElement("div");
                                        this.mainDiv.className = "mainDiv2";
                                        host.appendChild(this.mainDiv);
                                        
                                        let adminDiv = document.createElement("div");
                                        adminDiv.className = "adminDiv";
                                        this.mainDiv.appendChild(adminDiv);

                                        let imageContainer = document.createElement("img");
                                        imageContainer.src = "imgs/title.png";
                                        imageContainer.className = "item-image-size";
                                        imageContainer.classList.add("titleImg");
                                        adminDiv.appendChild(imageContainer);

                                        let divel = document.createElement("div");
                                        divel.className ="adminDiv";
                                        divel.classList.add("divEl");
                                        this.mainDiv.appendChild(divel);

                                        var divFind = document.createElement("div");
                                        divFind.className="divFind";
                                        adminDiv.appendChild(divFind);

                                        var btnFind = document.createElement("button");
                                        btnFind.className="btnFind";
                                        btnFind.innerHTML="Search";
                                        btnFind.onclick=(ev) => {
                                            this.search(tbSearch.value);
                                            tbSearch.className="tbSearch";
                                            tbSearch.value="Type here   .   .   .";
                                        }
                                        divFind.appendChild(btnFind);
                                        
                                        var tbSearch = document.createElement("input");
                                        tbSearch.className="tbSearch";
                                        tbSearch.value="Type here   .   .   .";
                                        tbSearch.onclick=(ev) => {
                                            tbSearch.value="";
                                            tbSearch.className="tbSearchAfter";
                                        }
                                        divFind.appendChild(tbSearch);

                                        var lblName = document.createElement("h2");
                                        lblName.innerHTML=emp.fullname;
                                        divFind.appendChild(lblName);

                                        var divMenu = document.createElement("div");
                                        divMenu.className="adminDivMenu";
                                        adminDiv.appendChild(divMenu);

                                        let btnLogout = document.createElement("button");
                                        btnLogout.onclick=(ev) => this.paintLoginForm(host);
                                        btnLogout.className="btnLogout";
                                        btnLogout.innerHTML = "Logout";
                                        divMenu.appendChild(btnLogout);


                                        let se = document.createElement("select")
                                        divMenu.appendChild(se);
                        
                                        let opList;
                                        let op = ["Dog","Cat","Small Animals","Birds","Fish","Reptile"];
                                        op.forEach(el=>
                                            {
                                                opList=document.createElement('option');
                                                opList.innerHTML = el;
                                                opList.value=el;
                                                se.appendChild(opList);
                                            })
                                        se.className="btnMenu";
                                        se.classList.add("selectPet");
                                        se.onchange=(ev)=>{
                    
                                        let el = se.options[se.selectedIndex].value;
                                        this.getPetsData(divel,el);
                                        }

                                        let lbl = document.createElement("label");
                                        lbl.className="lblWorkers";
                                        adminDiv.appendChild(lbl);

                                        let divElements = document.createElement("div");
                                        divElements.className="divElements";
                                        divel.appendChild(divElements);

                                        let el = se.options[se.selectedIndex].value;
                                        this.getPetsData(divel,el);
                                        
                        })
                }
            else
                confirm("Invalid credentials!");
                }); 
    } 
    async getPetsData(host,pageType)
    {
        this.petsList=[];
        let shid = this.loggedEmp.shelterId;
        await fetch("https://localhost:5001/Shelter/GetShelter/"+shid+"/"+pageType,
        {
            method: "GET"
        }).then(s=>{
            if(s.ok)
            {
                s.json().then(data  =>
                    {
                        data.forEach(el=>
                            {
                                let pet = new Pet(el.idPet,el.type,el.age,el.color,el.petDetailedURL,el.petName,el.breed,el.sex,el.size,el.price,el.description,el.imgURL,shid);
                                this.petsList.push(pet);
                            }
                        
                        )}
                ).then(()=>
                {
                    let divElements1=host.querySelector(".divElements");
                if (divElements1!=null)
                {
                    host.removeChild(divElements1);
                }
                    let divElements = document.createElement("div");
                    divElements.className="divElements";
                    host.appendChild(divElements);
            
                    let formAddPet = document.createElement("div");
                    formAddPet.className="formAdd";
                    divElements.appendChild(formAddPet);
                    /////////////////////////////////
                    let titles=["Pet Name: ","Type: ","Age: ","Color: ","Breed: ","Sex: ","Size: ","Desc: ","Wiki: ","Img Url: ","Price: "];
                    
                    titles.forEach(el=>{
                        var lbl= document.createElement("label");
                        lbl.innerHTML=el;
                        formAddPet.appendChild(lbl);
            
                        if (el=="Sex: ")
                        {
                            let se = document.createElement("select")
                            formAddPet.appendChild(se);
                            se.className="seSex";
                            let opList;
                            let op = ["M","F"];
                            op.forEach(el=>
                                {
                                    opList=document.createElement('option');
                                    opList.innerHTML = el;
                                    opList.value=el;
                                    se.appendChild(opList);
                                })
                        }
                        else
                        if(el== "Type: ")
                        {
                            let se = document.createElement("select")
                            formAddPet.appendChild(se);
                            se.className="seType";
                            let opList;
                            let op = ["Dog","Cat","Small Animals","Birds","Fish","Reptile"];
                            op.forEach(el=>
                                {
                                    opList=document.createElement('option');
                                    opList.innerHTML = el;
                                    opList.value=el;
                                    se.appendChild(opList);
                                })
                        }
                        else
                        if(el=="Age: ")
                        {
                            let se = document.createElement("select")
                            formAddPet.appendChild(se);
                            se.className="seAge";
                            let opList;
                            let op = ["Newborn","Young","Middle Age","Old"];
                            op.forEach(el=>
                                {
                                    opList=document.createElement('option');
                                    opList.innerHTML = el;
                                    opList.value=el;
                                    se.appendChild(opList);
                                })
                        }
                        else
                        if(el == "Size: ")
                        {
                            let se = document.createElement("select")
                            formAddPet.appendChild(se);
                            se.className="seSize";
                            let opList;
                            let op = ["Tiny","Small","Middle","Big","Very Big"];
                            op.forEach(el=>
                                {
                                    opList=document.createElement('option');
                                    opList.innerHTML = el;
                                    opList.value=el;
                                    se.appendChild(opList);
                                })
                        }
                        else
                        if(el=="Price: ")
                        {
                            var tb = document.createElement("input");
                            tb.type="number";
                            formAddPet.appendChild(tb);
                            tb.className="tbAdd";
                        }
                        else
                        {
                        
                            var tb = document.createElement("input");
                            formAddPet.appendChild(tb);
                            tb.className="tbAdd";
                        }
                       
                    })
        
                    var btnAdd = document.createElement("button");
                    btnAdd.innerHTML = "ADD";
                    btnAdd.className="btnAdd";
                    btnAdd.onclick= ev => this.addPet();
                    formAddPet.appendChild(btnAdd);
            
                    let lbl = document.querySelector(".lblWorkers");
                    lbl.innerHTML="PETS";
                    
                    let temp=0;
                     this.petsList.forEach(el=>{
                        el.paint(temp);
                        let btnDelPet = document.querySelector(".delP"+temp);
                        let btnChangePet = document.querySelector(".cngP"+temp);
                        temp++;
                        btnDelPet.onclick=ev=>{
                            this.delPet(el.id,el.type);
                        }
                        btnChangePet.onclick=ev=>{
                            this.changePet(el.id,el.h3ToTbList,btnChangePet,el.imgURL,el.divText);
                        }
                    })
            })}
                        })
    }
    async changePet(id,h3ToTbList,btn,imgURL,divText)
    {
        let temp=0;
        h3ToTbList.forEach(el=>{
            let elValue = el.innerHTML;
            let div = el.parentNode;
            el.remove();
            if (temp==1)
            {
                let se = document.createElement("select")
                div.appendChild(se);
                se.className="seType1";
                let opList;
                let op = ["Dog","Cat","Small Animals","Birds","Fish","Reptile"];
                op.forEach(el=>
                    {
                        opList=document.createElement('option');
                        opList.innerHTML = el;
                        opList.value=el;
                        se.appendChild(opList);
                    })
                se.value=elValue;
            }
            else
            if (temp==2)
            {
                
                let se = document.createElement("select")
                div.appendChild(se);
                se.className="seAge1";
                let opList;
                let op = ["Newborn","Young","Middle Age","Old"];
                op.forEach(el=>
                    {
                        opList=document.createElement('option');
                        opList.innerHTML = el;
                        opList.value=el;
                        se.appendChild(opList);
                    })
                se.value=elValue;
            }
            else
            if (temp==5)
            {
                let se = document.createElement("select")
                div.appendChild(se);
                            se.className="seSex1";
                            let opList;
                            let op = ["M","F"];
                            op.forEach(el=>
                                {
                                    opList=document.createElement('option');
                                    opList.innerHTML = el;
                                    opList.value=el;
                                    se.appendChild(opList);
                                })
                se.value=elValue;
            }
            else
            if(temp==6)
            {
                let se = document.createElement("select")
                div.appendChild(se);
                se.className="seSize1";
                let opList;
                let op = ["Tiny","Small","Middle","Big","Very Big"];
                op.forEach(el=>
                    {
                        opList=document.createElement('option');
                        opList.innerHTML = el;
                        opList.value=el;
                        se.appendChild(opList);
                    })
                se.value=elValue;
            }
            else
            if(temp==9)
            {
                var tb = document.createElement("input");
                tb.type="number";
                div.appendChild(tb);
                elValue=elValue.split(" ");
                tb.value=elValue[0];
                tb.className="input2";
                tb.classList.add("in2");
            }
            else{
            var tb = document.createElement("input");
            tb.className="input2";
            tb.value=elValue;
            tb.classList.add("in2");
            div.appendChild(tb);
            }
            temp++;
            
        })
        let div =document.createElement("div");
        div.className="div0";
        divText.appendChild(div);
        
        let lbl = document.createElement("h3");
        lbl.innerHTML="Img Url";
        div.appendChild(lbl);

        var tb = document.createElement("input");
        tb.className="input2";
        tb.value=imgURL;
        tb.classList.add("in2");
        div.appendChild(tb);
        btn.innerHTML="Save";
        let tba =document.querySelectorAll(".in2");

        btn.onclick=ev=>{ this.updatePets(id,tba);
           
        } 
}
async updatePets(id,tb)
{
    let se0 =document.querySelector(".seType1");
    let el0 = se0.options[se0.selectedIndex].value;
            
    let se1 =document.querySelector(".seSex1");
    let el1= se1.options[se1.selectedIndex].value;

    let se2 =document.querySelector(".seAge1");
    let el2 = se2.options[se2.selectedIndex].value;

    let se3 =document.querySelector(".seSize1");
    let el3 = se3.options[se3.selectedIndex].value;

    let divel=document.querySelector(".divEl");

    if(el0=="" || el2==""|| tb[1].value==""|| tb[4].value==""|| tb[0].value==""|| el1==""|| tb[2].value==""|| el3==""|| tb[3].value==""|| tb[5].value==""||tb[6].value=="")
    { 
     confirm("Please insert data!");
        return;
    }
await fetch("https://localhost:5001/Pet/ChangePet/"+id+"/"+el0+"/"+el2+"/"+tb[1].value+"/"+tb[4].value+"/"+tb[0].value+"/"+el1+"/"+tb[2].value+"/"+el3+"/"+tb[3].value+"/"+tb[6].value+"/"+tb[5].value,
{
    method: "PUT"
}).then(s=>{
    if (s.ok)
    { 
        s.json().then(el =>
        {
            let pet; 
            this.petsList.forEach(p=>
                {
                    if (p.id==id)
                        pet=p;
                }
            )
            pet = new Pet(el.idPet,el.type,el.age,el.color,el.petDetailedURL,el.petName,el.breed,el.sex,el.size,el.price,el.description,el.imgURL);
            let se =document.querySelector(".selectPet");
            se.value=el0;
            console.log("UPDATED");
            this.getPetsData(divel,el0);
        })}
        else
        {
            console.log(s);
            
        }
       
})
}
    async delPet(id,type)
    {
            let divel=document.querySelector(".divEl");
            await fetch("https://localhost:5001/Pet/DeletePet/"+id,
            {
                method: "DELETE"
            }
            ).then(s=>{
                if(s.ok)
                {
                    console.log("PET DELETED");
                    this.getPetsData(divel,type);
                }
            })
    }
    async addPet()
    {
        let se0 =document.querySelector(".seType");
        let el0 = se0.options[se0.selectedIndex].value;
                   
        let se1 =document.querySelector(".seSex");
        let el1= se1.options[se1.selectedIndex].value;
    
        let se2 =document.querySelector(".seAge");
        let el2 = se2.options[se2.selectedIndex].value;
    
        let se3 =document.querySelector(".seSize");
        let el3 = se3.options[se3.selectedIndex].value;
    
        let tb =document.querySelectorAll(".tbAdd");
        let divel=document.querySelector(".divEl");
        let shid = this.loggedEmp.shelterId;

        if(el0=="" || el2==""|| tb[1].value==""|| tb[4].value==""|| tb[0].value==""|| el1==""|| tb[2].value==""|| el3==""|| tb[3].value==""|| tb[5].value==""|| tb[6].value=="")
       { 
        confirm("Please insert data!");
           return;
       }

        
        await fetch("https://localhost:5001/Shelter/AddPet/"+shid+"/"+el0+"/"+el2+"/"+tb[1].value+"/"+tb[4].value+"/"+tb[0].value+"/"+el1+"/"+tb[2].value+"/"+el3+"/"+tb[3].value+"/"+tb[5].value+"/"+tb[6].value,
        {
            method: "PUT"
        }).then(s=>{
            if (s.ok)
            {
                s.json().then(el =>
                    {
                        let pet = new Pet(el.idPet,el.type,el.age,el.color,el.petDetailedURL,el.petName,el.breed,el.sex,el.size,el.price,el.description,el.imgURL,shid);
                        this.petsList.push(pet);
                        let se =document.querySelector(".selectPet");
                        se.value=el0;
                        console.log("CREATED");
                        this.getPetsData(divel,el0);
                    })
            }
            else
            confirm("There is already that pet in shop!");
        })

    
    } 
    search(value)
    {
        if (this.petsList.length==0)
        {
            return;
        }
        let host = document.querySelector(".divEl")
        let divElements1=host.querySelector(".divElements");
        if (divElements1!=null)
        {
            host.removeChild(divElements1);
        }
            let divElements = document.createElement("div");
            divElements.className="divElements";
            host.appendChild(divElements);
    
            let formAddPet = document.createElement("div");
            formAddPet.className="formAdd";
            divElements.appendChild(formAddPet);
            /////////////////////////////////
            let titles=["Pet Name: ","Type: ","Age: ","Color: ","Breed: ","Sex: ","Size: ","Desc: ","Wiki: ","Img Url: ","Price: "];
            
            titles.forEach(el=>{
                var lbl= document.createElement("label");
                lbl.innerHTML=el;
                formAddPet.appendChild(lbl);
    
                if (el=="Sex: ")
                {
                    let se = document.createElement("select")
                    formAddPet.appendChild(se);
                    se.className="seSex";
                    let opList;
                    let op = ["M","F"];
                    op.forEach(el=>
                        {
                            opList=document.createElement('option');
                            opList.innerHTML = el;
                            opList.value=el;
                            se.appendChild(opList);
                        })
                }
                else
                if(el== "Type: ")
                {
                    let se = document.createElement("select")
                    formAddPet.appendChild(se);
                    se.className="seType";
                    let opList;
                    let op = ["Dog","Cat","Small Animals","Birds","Fish","Reptile"];
                    op.forEach(el=>
                        {
                            opList=document.createElement('option');
                            opList.innerHTML = el;
                            opList.value=el;
                            se.appendChild(opList);
                        })
                }
                else
                if(el=="Age: ")
                {
                    let se = document.createElement("select")
                    formAddPet.appendChild(se);
                    se.className="seAge";
                    let opList;
                    let op = ["Newborn","Young","Middle Age","Old"];
                    op.forEach(el=>
                        {
                            opList=document.createElement('option');
                            opList.innerHTML = el;
                            opList.value=el;
                            se.appendChild(opList);
                        })
                }
                else
                if(el == "Size: ")
                {
                    let se = document.createElement("select")
                    formAddPet.appendChild(se);
                    se.className="seSize";
                    let opList;
                    let op = ["Tiny","Small","Middle","Big","Very Big"];
                    op.forEach(el=>
                        {
                            opList=document.createElement('option');
                            opList.innerHTML = el;
                            opList.value=el;
                            se.appendChild(opList);
                        })
                }
                else
                if(el=="Price: ")
                {
                    var tb = document.createElement("input");
                    tb.type="number";
                    formAddPet.appendChild(tb);
                    tb.className="tbAdd";
                }
                else{
                    var tb = document.createElement("input");
                    formAddPet.appendChild(tb);
                    tb.className="tbAdd";
                }
               
            })

            var btnAdd = document.createElement("button");
            btnAdd.innerHTML = "ADD";
            btnAdd.className="btnAdd";
            btnAdd.onclick= ev => this.addPet();
            formAddPet.appendChild(btnAdd);
    
            let lbl = document.querySelector(".lblWorkers");
            lbl.innerHTML="PETS";
            value=value.toLowerCase();
             this.petsList.forEach(el=>{
                if(el.type.toLowerCase().includes(value))
                    el.paint();
                else
                if(el.petName.toLowerCase().includes(value))
                    el.paint();
                else
                if(el.color.toLowerCase().includes(value))
                    el.paint(); 
                else
                if(el.age.toLowerCase().includes(value))
                    el.paint();   
                else
                if(el.breed.toLowerCase().includes(value))
                    el.paint();
                else
                if(el.size.toLowerCase().includes(value))
                    el.paint();
                else
                return;
        })

}
    
    async addEmployee(fullName,username,password,shopname)
    {
        if (fullName==""|| username=="" || password=="" || shopname=="")
            {
                confirm("Please insert data!");
                return;
            }
        let shid;
        this.sheltersList.forEach(el=>{

            if(el.name == shopname)
                shid=el.id;
        });
        if (shid ==null)
        {
            confirm("There is no shop with that name!");
                return;
        }
        await fetch('https://localhost:5001/Shelter/AddEmployee/' + shid + '/'+ fullName +'/'+ username +'/'+ password, {
                        method: 'PUT',
              }).then(s=>{
                if(s.ok)
                    {
                        s.json().then(data =>
                            {
                                    let num = this.employeesList.length;
                                    let emp = new Employee(num,data.idEmployee,data.fullName,data.username,data.password,data.shelterID,data.shelterName);
                                    this.employeesList.push(emp);
                                    console.log("CREATED");
                                    this.paintEmployeePage(document.body);
                            })
                    }
                else
                confirm("Username is already taken!");
                })     
    }
    async addShop(name,address)
    {
        if (name==""|| address=="")
            {
                confirm("Please insert data!");
                return;
            }
        await fetch('https://localhost:5001/Shelter/AddShelter/' + name + '/'+ address, {
                        method: 'POST',
              }).then(s=>{
                if(s.ok)
                    {
                        s.json().then(data =>
                            {
                                    let num = this.sheltersList.length;
                                    let sh = new Shelter(num,data.idShelter,data.name,data.address);
                                    this.sheltersList.push(sh);
                                    console.log("CREATED");
                                    this.paintShopsPage(document.body);
                            })
                    }
                else
                confirm("You already have shelter on that address!");
                })     
    }
    clearForm(host)
    {
        if (this.mainDiv!=null)
            {
                host.removeChild(this.mainDiv);
                this.mainDiv=null;
            }
    }
}
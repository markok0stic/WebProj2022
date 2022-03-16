export class Shelter{
    constructor(num,id,name,address,employeesList)
    {
        this.num=num;
        this.id = id;
        this.name = name;
        this.address=address;
        this.employeesList=employeesList;
    }
    paint(host)
    {
        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el1 = document.createElement("td");
        el1.innerHTML = this.num;
        tr.appendChild(el1);

        var el2 = document.createElement("td");
        el2.innerHTML = this.name;
        tr.appendChild(el2);

        var el3 = document.createElement("td");
        el3.innerHTML = this.address;
        tr.appendChild(el3);
        
        var btnDel = document.createElement("button");
        btnDel.className="btnDel";
        btnDel.innerHTML="Delete";
        tr.appendChild(btnDel);
    }

}
export class Employee {
    constructor(number,id,fullname,username,password,shelterId,shelterName)
    {
        this.number = number;
        this.id = id;
        this.fullname= fullname;
        this.username = username;
        this.password=password;
        this.shelterId=shelterId;
        this.shelterName=shelterName;
    }

    paint(host)
    {
        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el1 = document.createElement("td");
        el1.innerHTML = this.number;
        tr.appendChild(el1);

        var el1 = document.createElement("td");
        el1.innerHTML = this.fullname;
        tr.appendChild(el1);

        var el2 = document.createElement("td");
        el2.innerHTML = this.username;
        tr.appendChild(el2);

        var el3 = document.createElement("td");
        el3.innerHTML = this.password;
        tr.appendChild(el3);

        var el4 = document.createElement("td");
        el4.innerHTML = this.shelterName;
        tr.appendChild(el4);

        var btnDel = document.createElement("button");
        btnDel.className="btnDel";
        btnDel.innerHTML="Delete";
        tr.appendChild(btnDel);
        
    }
    delEmployee()
    {
        //to do
    }
}
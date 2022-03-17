import { WebShop } from "./webShop.js";

export class Pet {
    constructor(id,type,age,color,petDetailedURL,petName,breed,sex,size,price,description,imgURL,shid)
    {
        this.id=id;
        this.type=type;
        this.age=age;
        this.color=color;
        this.petDetailedURL=petDetailedURL;
        this.petName=petName;
        this.breed=breed;
        this.sex=sex;
        this.size=size;
        this.price=price;
        this.description=description;
        this.imgURL=imgURL;
        this.shid=shid;
        let h3ToTbList=[];
        let divText=null;
    }
    paint(temp)
    {
        let host = document.querySelector(".divEl")
        let divElements=host.querySelector(".divElements");
        var divBlock = document.createElement("div");
        divBlock.className="divBlock";
        divElements.appendChild(divBlock);

        let img = document.createElement('img');
        img.className="images";
        img.src = "petimgs/"+this.imgURL;
        divBlock.appendChild(img);
        let fixedel = [];
        fixedel.push(this.petName);
        fixedel.push(this.type);
        fixedel.push(this.age);
        fixedel.push(this.color);
        fixedel.push(this.breed);
        fixedel.push(this.sex);
        fixedel.push(this.size);
        fixedel.push(this.description);
        fixedel.push(this.petDetailedURL);
        fixedel.push(this.price);
         let divText = document.createElement("div");
         divText.className="divText";
        divBlock.appendChild(divText);
        let titles1=["Pet Name: ","Type: ","Age: ","Color: ","Breed: ","Sex: ","Size: ","Desc: ","Wiki: ","Price: "];
        let num=0;
        titles1.forEach(el =>{
            let div = document.createElement("div");
            div.className="div0";
            divText.appendChild(div);

            let lbl = document.createElement("h3");
            lbl.innerHTML=el;
            div.appendChild(lbl);

            let text = document.createElement("h3");
            text.classList.add("convettotb"+temp);
            text.innerHTML=fixedel[num++];
            div.appendChild(text);
            if(el=="Price: ")
                text.innerHTML+=" €";
        })
        this.divText=divText;
        this.h3ToTbList=[];
        this.h3ToTbList=document.querySelectorAll(".convettotb"+temp);

        let btnChange = document.createElement("button");
        btnChange.className="btnDelPet";
        btnChange.classList.add("cngP"+temp);
        btnChange.innerHTML="Change";
        divBlock.appendChild(btnChange);

        let btnDel = document.createElement("button");
        btnDel.className="btnDelPet";
        btnDel.classList.add("delP"+temp);
        btnDel.innerHTML="Delete";
        divBlock.appendChild(btnDel);
    }
}

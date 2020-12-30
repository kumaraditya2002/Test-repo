var sp=document.getElementById('sPrice');
var tbody=document.getElementById('tbody');
var heading=document.getElementById('heading');
var ab=document.getElementById('ab');
var s1=document.getElementById('s1');
var sl=document.getElementById('sl');
var s2=document.getElementById('s2');
var s3=document.getElementById('s3');
var buy=document.getElementById('buy');
var sell=document.getElementById('sell');
var tot=document.getElementById('total');

showData();

ab.addEventListener('click',(e)=>{
    e.preventDefault();
    let index = s1.value;
    let lot = sl.value;
    let lotVal = +sl.value;
    let ratio = s2.value;
    let stPrice = +sp.value;
    let bu = +buy.value;
    let sel = +sell.value;
    let price;
    if(s1.value === "NIFTY")
        price = ((sel-bu)*(lotVal)*75).toFixed(2);
    else if(s1.value === "BANK NIFTY")
        price = ((sel-bu)*(lotVal)*25).toFixed(2);
    let data = localStorage.getItem('notes');
    if(data == null)
        dataObj = [];
    else
        dataObj = JSON.parse(data);
    let myObj = {
        date : new Date().toISOString().slice(0, 10),
        index : index,
        lot : lot,
        ratio : ratio,
        strikePrice : stPrice,
        buy : bu,
        sell : sel,
        price : price
    }   
    if(bu!=0 && sel!=0 && stPrice!=0)
    {
        dataObj.push(myObj);
        localStorage.setItem("notes", JSON.stringify(dataObj));
        buy.value="";
        sell.value="";
        sp.value="";
        showData();
    }
});


function showData(){
    let s=0;
    let data = localStorage.getItem("notes");
    if(data===null)
    {
        dataObj = [];
        tbody.innerHTML="<tr><td>Nothing to show</td></tr>";
    }
    else{
        dataObj = JSON.parse(data);
    }
    let html="";
    dataObj.forEach((element,index) => {
        s += +element.price;
        if(+element.price < 0)
        {
            html += `<tr id="${index+1}" style="background-color:rgb(245, 165, 165);">
                    <td>${index+1}</td>
                    <td>${element.date}</td>
                    <td>${element.index}</td>
                    <td>${element.lot}</td>
                    <td>${element.ratio}</td>
                    <td>${element.strikePrice}</td>
                    <td>${element.buy}</td>
                    <td>${element.sell}</td>
                    <td>${element.price}</td>
                    <td><button class="btn btn-outline-danger" id="${index}" onclick="deleteEntry(this.id)"><i class="fa fa-trash"></i></button></td>
                </tr>`
        }
        else if(+element.price>=0)
        {
            html += `<tr id="${index+1}" style="background-color: rgb(178, 241, 178);">
                        <td>${index+1}</td>
                        <td>${element.date}</td>
                        <td>${element.index}</td>
                        <td>${element.lot}</td>
                        <td>${element.ratio}</td>
                        <td>${element.strikePrice}</td>
                        <td>${element.buy}</td>
                        <td>${element.sell}</td>
                        <td>${element.price}</td>
                        <td><button class="btn btn-outline-danger" id="${index}" onclick="deleteEntry(this.id)"><i class="fa fa-trash"></i></button></td>
                    </tr>`
        }
    });
    if(s>0)
    {
        tot.innerText=`Total P&L : ${s}`;
        tot.style.backgroundColor = "green";
    }
    else if(s<=0)
    {
        tot.innerText=`Total P&L : ${s}`;
        tot.style.backgroundColor = "red";
    }
    tbody.innerHTML = html;
}

function deleteEntry(index){
    let data = localStorage.getItem('notes');
    if(data == null)
        dataObj = [];
    else
        dataObj = JSON.parse(data);
    dataObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(dataObj));
    showData();
}

s3.addEventListener('input',(e)=>{
    e.preventDefault();
    let month = +s3.value; 
    let data = localStorage.getItem('notes');
    if(data == null)
        dataObj = [];
    else
        dataObj = JSON.parse(data);
    let sum = 0 ;
    for(let i=0 ; i<dataObj.length ; i++)
    {
        let m = +dataObj[i].date.split("-")[1];
        if(month===0)
        {
            document.getElementById(i+1).style.display = "table-row";
            sum += +dataObj[i]["price"]; 
        }
        else if(month !== m)
            document.getElementById(i+1).style.display = "none";
        else
        {
            document.getElementById(i+1).style.display = "table-row";
            sum += +dataObj[i]["price"];
        }
    }
    if(sum>0)
    {
        tot.innerText=`Total P&L : ${sum}`;
        tot.style.backgroundColor = "green";
    }
    else if(sum<=0)
    {
        tot.innerText=`Total P&L : ${sum}`;
        tot.style.backgroundColor = "red";
    }
});




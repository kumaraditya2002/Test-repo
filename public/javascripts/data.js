var p=document.getElementById('price');
var tbody=document.getElementById('tbody');
var search=document.getElementById('search');
var heading=document.getElementById('heading');
var ab=document.getElementById('ab');
var rb=document.getElementById('rb');
var s1=document.getElementById('s1');
var s2=document.getElementById('s2');
var s3=document.getElementById('s3');
showData();

ab.addEventListener('click',(e)=>{
    e.preventDefault();
    let index = s1.value;
    let ratio = s2.value;
    let price = p.value;
    let data = localStorage.getItem('notes');
    if(data == null)
        dataObj = [];
    else
        dataObj = JSON.parse(data);
    let myObj = {
        date : new Date().toISOString().slice(0, 10),
        index : index,
        ratio : ratio,
        price : price
    }   
    if(price != "")
    {
        dataObj.push(myObj);
        localStorage.setItem("notes", JSON.stringify(dataObj));
        price.value="";
        showData();
    }
});


function showData(){
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
        html += `<tr id="${index+1}">
                    <td>${index+1}</td>
                    <td>${element.date}</td>
                    <td>${element.index}</td>
                    <td>${element.ratio}</td>
                    <td>${element.price}</td>
                    <td><i class="fa fa-trash" id="${index}" onclick="deleteEntry(this.id)"></i></td>
                </tr>`
    });
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

search.addEventListener('click',(e)=>{
    e.preventDefault();
    let month = +s3.value; 
    let data = localStorage.getItem('notes');
    if(data == null)
        dataObj = [];
    else
        dataObj = JSON.parse(data);
    for(let i=0 ; i<dataObj.length ; i++)
    {
        let m = +dataObj[i].date.split("-")[1];
        if(month===0)
            location.reload();
        else if(month !== m)
            document.getElementById(i+1).style.display = "none";
        else
        {
            document.getElementById(i+1).style.display = "table-row";
            
        }
    }
})

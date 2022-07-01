$(  function() {
    // api url
    // header("Access-Control-Allow-Origin: *");
    const api_url = 
        "http://localhost:9040/";

    console.log(api_url);
    // Defining async function
    // let userId =  await sessionStorage.getItem("userId");
    // console.log('userId');
    // console.log(userId);
    
    //pakai
    async function getapi() {
        let userId =  await sessionStorage.getItem("userId");
        console.log('userId');
        console.log(userId);
        await fetch("http://localhost:9040/user/"+userId+"/tracker",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
            }).then(async(response) => {
            var data = await response.json();
            console.log(data);
            console.log('yesas');
            if (response) {
                if(response.status==200){
                    console.log(data[0]['id']);
                    sessionStorage.setItem("taskId", data[0]['id']);
                    document.getElementById("divUl").style.display="block";
                    document.getElementById("noData").style.display="none";
                    var ul = document.getElementById("listStart");
                    bmiVal=document.getElementById('bmiVal');
                    weightVal=document.getElementById('weightVal');
                    heightVal=document.getElementById('heightVal');
                    bmiVal.innerHTML = data[0]['bmi'];
                    weightVal.innerHTML = data[0]['weight'];
                    heightVal.innerHTML = data[0]['height'];

                    
                    return data;
                }

            
                
            }
            
            throw new Error('Something went wrong');
            })
            .catch((error) => {
                var popupform=document.getElementById('myForm');
                console.log('yes');
                popupform.style.display='block';


                console.log('error');
                console.log(error);
                document.getElementById("divUl").style.display="none";
                document.getElementById("button1").style.display="none";
                document.getElementById("button2").style.display="none";
                document.getElementById("noData").style.display="block";
            // return window.location.href = "trackerlist.html";
            });
    }
    // Calling that async function
    
    // getapi();
    hideloader();
    // Function to hide the loader
    async function hideloader() {
        console.log("typeof data");
        var data=await getapi();
        console.log(typeof(data));

        
    }
    // Function to define innerHTML for HTML table
    function show(data) {
        let tab = 
            `<tr>
            <th>Name</th>
            <th>Office</th>
            <th>Position</th>
            <th>Salary</th>
            </tr>`;
        
        // Loop to access all rows 
        for (let r of data.list) {
            tab += `<tr> 
        <td>${r.name} </td>
        <td>${r.office}</td>
        <td>${r.position}</td> 
        <td>${r.salary}</td>          
    </tr>`;
        }
        // Setting innerHTML as tab variable
        document.getElementById("employees").innerHTML = tab;
    }

    window.addButton=async function (){
        console.log("Yes");
    }
});
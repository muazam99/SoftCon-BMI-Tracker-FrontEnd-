$(  function() {
    window.openForm=function() {
        document.getElementById("myFormEdit").style.display = "block";
      }
      
      window.closeForm=function() {
        document.getElementById("myFormEdit").style.display = "none";
      } 
});

(  function($) {
    'use strict';
    $( function() {
        window.openForm=function() {
            document.getElementById("myFormEdit").style.display = "block";
            document.getElementById('editWeight2').value=document.getElementById('weightVal').innerHTML;
            document.getElementById('editHeight2').value=document.getElementById('heightVal').innerHTML;
          }
          
          window.closeForm=function() {
            document.getElementById("myFormEdit").style.display = "none";
          } 

        var taskId;
        var todoListItem = $('.todo-list');

        //pakai
        window.editClicked=async function() {
            let userId =  await sessionStorage.getItem("userId");
            // console.log('userId');
            // console.log(userId);
            // console.log('Editttt');
            // console.log(taskId);
            // var templi=document.getElementById('li'+taskId).className;
            // console.log(templi);

            await fetch("http://localhost:9040/user/trackerinsert",{
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    "bmi": (editWeight.value/(editHeight.value*editHeight.value)).toFixed(2),
                    "weight": editWeight.value,
                    "height": editHeight.value,
                    "userId": userId
                  })
                }).then(async(response) => {
                  // var data = await response.json();
              
                  if (response) {
                    var data = await response.json();
                      if(response.status==201){
                          window.alert("Insert Health Successful")
                          console.log(data);
                          // $(this).removeAttr('checked');
                      }
                      
                  }
                  
                  // throw new Error('Something went wrong');
                })
                .catch((error) => {
                  console.log(error);
                });
            closeForm();
            window.location.href = "trackerlist.html";
        }

        //pakai
        window.editInfo=async function() {
            let userId =  await sessionStorage.getItem("userId");
            let taskId =  await sessionStorage.getItem("taskId");
            

            await fetch("http://localhost:9040/trackerupdate",{
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    "id": taskId,
                    "bmi": (editWeight2.value/(editHeight2.value*editHeight2.value)).toFixed(2),
                    "weight": editWeight2.value,
                    "height": editHeight2.value,
                    "userId": userId
                  })
                }).then(async(response) => {
                  // var data = await response.json();
              
                  if (response) {
                    var data = await response.json();
                      if(response.status==201){
                          window.alert("Insert Health Successful")
                          console.log(data);
                          // $(this).removeAttr('checked');
                      }
                      
                  }
                  
                  // throw new Error('Something went wrong');
                })
                .catch((error) => {
                  console.log(error);
                });
            closeForm();
            window.location.href = "trackerlist.html";
        }

        todoListItem.on('click', '.edit', async function() {
            openForm();
            console.log('taskId');
            console.log(this.id);
            taskId=this.id;
            var text = $("#label"+$(this).attr('id')).contents().filter(function() {
                return this.nodeType == Node.TEXT_NODE;
              }).text();
            var editTaskName=document.getElementById("editTaskName");
            editTaskName.value = text; 

            
            
            
        });

        //pakai
        window.deleteData=async function(){
          let taskId =  await sessionStorage.getItem("taskId");
          await fetch("http://localhost:9040/trackerdelete/"+taskId,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
          }).then((response) => {
            // var data = await response.json();
        
            if (response) {
                if(response.status==200){
                    window.alert("Delete Health Successful")
                }
                
            }
            
            // throw new Error('Something went wrong');
          })
          .catch((error) => {
            console.log(error);
          });
          window.location.href = "trackerlist.html";
        }
  
    });
  })(jQuery);
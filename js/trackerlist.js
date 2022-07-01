(  function($) {
    'use strict';
    $( function() {
      var todoListItem = $('.todo-list');
      var todoListInput = $('.todo-list-input');
      $('.todo-list-add-btn').on("click", async function(event) {
        event.preventDefault();
  
        var item = $(this).prevAll('.todo-list-input').val();
  
        if (item) {
          let userId =  await sessionStorage.getItem("userId");
          console.log('userIdInsert');
          console.log(userId);
          await fetch("http://localhost:9040/user/taskinsert",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "taskName": item,
              "taskDescription": "-",
              "taskCondition": "Not Done",
              "userId": userId
            })
          }).then(async(response) => {
            var data = await response.json();
        
            if (response) {
                if(response.status==201){
                  console.log("data[0]");
                  console.log(data);
                  window.alert("Insert Task Successful")
                  todoListItem.append("<li id='li"+data['id']+"'><div class='form-check'><label class='form-check-label' id='label"+data['id']+"'><input class='checkbox' type='checkbox' id='"+data['id']+"'/>" + item + "<i class='input-helper'></i></label></div><i class='remove mdi mdi-close-circle-outline' id='"+data['id']+"'></i><input type='image' id='"+data['id']+"' class='edit' style='height:20px;width:16.6px;' src='images/icons8-edit-24.png' /></li>");
                  todoListInput.val("");
                  window.location.href = "trackerlist.html";


                  console.log(data[0]['id']);
                  document.getElementById("divUl").style.display="block";
                  document.getElementById("noData").style.display="none";
                  var ul = document.getElementById("listStart");
                  data.forEach(element => {
                      console.log(typeof(element['bmi']));
                      console.log(element['bmi']);
                      var li = document.createElement("li");
                      li.setAttribute('id','li'+element['id']);
                      var div1 = document.createElement("div");
                      div1.classList.add("form-check");
                      

                      var label1 = document.createElement("label");
                      label1.classList.add("form-check-label");
                      label1.setAttribute('id','label'+element['id']);
          
                      var input1 = document.createElement("input");
                      input1.classList.add("checkbox");
                      input1.type = "checkbox";
                      input1.setAttribute('id',element['id']);
                      if(element['taskCondition']=="Done"){
                          input1.checked=true;
                          li.classList.add("completed");
                      }
          
                      
                      var temp = document.createTextNode(element['bmi']);
          
                      // var i1 = document.createElement("i");
                      // i1.classList.add("input-helper");
          
                      // var itag = document.createElement("i");
                      // itag.classList.add("remove");
                      // itag.classList.add("mdi");
                      // itag.classList.add("mdi-close-circle-outline");
                      // itag.setAttribute('id',element['id']);

                      //<input type='image' id='' style='height:20px;width:16.6px;' src='images/icons8-edit-24.png' />
                      var input2 = document.createElement("input");
                      input2.type="image";
                      input2.setAttribute('id',element['id']);
                      input2.style.cssText="height:20px;width:16.6px;";
                      input2.src="images/icons8-edit-24.png";
                      input2.classList.add("edit");
                      
          
                      div1.appendChild(label1);
                      label1.appendChild(input1);
                      label1.appendChild(temp);
                      // label1.appendChild(i1);
                      li.appendChild(div1);
                      // li.appendChild(itag);
                      li.appendChild(input2);
          
                  
                      ul.appendChild(li);
                  });
                  return data;

                  
                }

                
                
            }
            
            // throw new Error('Something went wrong');
          })
          .catch((error) => {
            console.log(error);
            // document.getElementById("errorText").style.display="block";
            // return window.location.href = "trackerlist.html";
          });
          
        }
  
      });
  
      todoListItem.on('change', '.checkbox', async function() {
        let userId =  await sessionStorage.getItem("userId");
        console.log('userIdPut');
        console.log(userId);
        var text = $("#label"+$(this).attr('id')).contents().filter(function() {
          return this.nodeType == Node.TEXT_NODE;
        }).text();
        console.log(text);

        if ($(this).attr('checked')) {
          await fetch("http://localhost:9040/taskupdate",{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "id":this.id,
              "taskName": text,
              "taskDescription": "-",
              "taskCondition": "Not Done",
              "userId": userId
            })
          }).then((response) => {
            // var data = await response.json();
        
            if (response) {
                if(response.status==200){
                    window.alert("Update Task Successful")
                    $(this).removeAttr('checked');
                }
                
            }
            
            // throw new Error('Something went wrong');
          })
          .catch((error) => {
            console.log(error);
          });
          // $(this).removeAttr('checked');
        } else {
          await fetch("http://localhost:9040/taskupdate",{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "id":this.id,
              "taskName": text,
              "taskDescription": "-",
              "taskCondition": "Done",
              "userId": userId
            })
          }).then((response) => {
            // var data = await response.json();
        
            if (response) {
                if(response.status==200){
                    window.alert("Update Task Successful")
                    $(this).attr('checked', 'checked');
                }
                
            }
            
            // throw new Error('Something went wrong');
          })
          .catch((error) => {
            console.log(error);
          });
          // $(this).attr('checked', 'checked');
        }
  
        $(this).closest("li").toggleClass('completed');
  
      });
  
      todoListItem.on('click', '.remove', async function() {
        console.log('taskId');
        console.log(this.id);
        await fetch("http://localhost:9040/trackerdelete/"+this.id,{
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
        }).then((response) => {
          // var data = await response.json();
      
          if (response) {
              if(response.status==200){
                  window.alert("Delete Health Successful")
                  $(this).parent().remove();
              }
              
          }
          
          // throw new Error('Something went wrong');
        })
        .catch((error) => {
          console.log(error);
        });
        
        
      });
  
    });
  })(jQuery);
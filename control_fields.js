function check_field(){
    let error_list = []
    let all_form_input = document.querySelectorAll('.form_control_check input');
    let all_form_select = document.querySelectorAll('.form_control_check select');
    let all_form_textarea = document.querySelectorAll('.form_control_check textarea');


    
    for(let item of all_form_input){
        let item_required = item.getAttribute('required');
        let item_type = item.getAttribute('type');

        if(item_required != null){
            if(item_type == 'text'){
                if(item.value.length == 0){
                    //get label for push to error list
                    let rel_label = findLableForControl(item).innerText;
                    let result_label = rel_label.replace("*", "");
                    error_list.push(result_label);

                    //add class empty to field
                    item.classList.add('empty')
                }
                else{
                    item.classList.remove('empty')
                }
            }
            else if(item_type == 'file'){
                if(item.files[0] == undefined){
                    //get label for push to error list
                    let rel_label = findLableForControl(item).innerText;
                    let result_label = rel_label.replace("*", "");
                    error_list.push(result_label);

                }

            }
        }
    }

    for(let item of all_form_textarea){
        let item_required = item.getAttribute('required');
        if(item_required != null){
            if(item.value.length == 0){
                
                //get label for push to error list
                let rel_label = findLableForControl(item).innerText;
                let result_label = rel_label.replace("*", "");
                error_list.push(result_label);

                //add class empty to field
                item.classList.add('empty')
            }
            else{
                item.classList.remove('empty')
            }
        }
        
        
    }
    return error_list;
}


function findLableForControl(el) {
    var idVal = el.id;
    labels = document.querySelectorAll('.form_control_check label');
    for( var i = 0; i < labels.length; i++ ) {
       if (labels[i].htmlFor == idVal)
            return labels[i];
    }
 }

function check_checkbox(label,number,name){
    let error_list =[]
    let all_form_input_checkbox = document.getElementsByName(name);
    let count = 0;
    for (let item of all_form_input_checkbox){
        if(item.checked){
            count ++;
        }
    }
    if(count < number){
        error_list.push(label)
    }
    return error_list;
}

function check_radio(label,name){
    let error_list =[]
    let all_form_input_radio = document.getElementsByName(name);
    let checked = false;
    for (let item of all_form_input_radio){
        if(item.checked){
            checked = true;
        }
    }
    if(!checked){
        error_list.push(label)
    }
    return error_list;
}

function error_list(arr){
    
    let errorItems = '';
    document.getElementsByClassName("alert-items").innerHTML = '';

    for (let item of arr)
    {
        errorItems += item + '، ';
    }
    let errorText = '';
    if (arr.length > 1)
    {
        errorText += '' +
        '<span class="alert-items">' + errorItems + '</span>' +
        'به درستی تکمیل نشده اند. ' +
        'برای اطلاعات بیشتر به راهنمای روبروی هر فیلد ' +
        '(' +
        '<i class="fas fa-info-circle"></i>' +
        ') ' +
        'مراجعه نمائید.'
    }
    else {
        errorItems = errorItems.substr(0, errorItems.length - 2) + ' ';
        errorText += '' +
        '<span class="alert-items">' + errorItems + '</span>' +
        'به درستی تکمیل نشده است. ' +
        'برای اطلاعات بیشتر به راهنمای روبروی فیلد ' +
        ' (' +
        '<i class="fas fa-info-circle"></i>' +
        ') ' +
        'مراجعه نمائید.'
    }

    document.getElementsByClassName("error-text").innerHTML = errorText;
    document.getElementsByClassName("error-message").classList.remove('front')
}
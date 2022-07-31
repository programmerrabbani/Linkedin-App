
// alert notify
const alertNotify = (sms) => {
    return alert(sms);
}

// Create Post and store LS Data
const addLsData = (type, formData) => {
    //read ls data
    const readLsData = localStorage.getItem(type);
    //add ls data
    let Alldata = [];
    
    if (readLsData) {
        Alldata = JSON.parse(readLsData);
    }
    //form data add ls data
    Alldata.push(formData);

    //post data add on ls
    localStorage.setItem(type, JSON.stringify(Alldata));
    
}

// read ls data
const readLsData = (type) => {
    return JSON.parse(localStorage.getItem(type));
}

//update ls data
const updateLsData = (type,updateForm) => {
    localStorage.setItem(type, JSON.stringify(updateForm));
}
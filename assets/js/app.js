document.title = ' Linkedin App ';


// pop box call
const popbtn        = document.querySelector('.postbtn');
const postPopBox    = document.querySelector('#postPopBox');
const eidtPopBox    = document.querySelector('#eidtPopBox');
const closeBtn      = document.querySelector('.closeBtn');
const closeBtnedit  = document.querySelector('.closeBtneidt');
popbtn.onclick = () => {
    postPopBox.style.display = "block"
}
closeBtn.onclick = () => {
     postPopBox.style.display = "none";
}

closeBtnedit.onclick = () => {
     eidtPopBox.style.display = "none";
}

// get element
const postForm = document.querySelector('#postForm');
const editForm = document.querySelector('#editForm');

//form submit
postForm.onsubmit = (e) => {
    //form default
    e.preventDefault();

    //get form data
    const form_val = new FormData(e.target);
    const formData = Object.fromEntries(form_val.entries());
    const {bgPhoto,name,userContent,userPhoto} = Object.fromEntries(form_val.entries());

    // check data
    if ( !name || !userPhoto ) {
        alertNotify('Must not be empty Field !!');
    } else {
        
        //make the random id
        const id = Math.floor(Math.random() * 1000) + '_' + Date.now();

        //make data
        const dataObj = { ...formData, id };

        //date store to ls
        addLsData('linkedin', dataObj);

        //data reset
        e.target.reset();

        //show data
        displayData();

        //pop box close
        postPopBox.style.display = "none";
        
    }
   
}

// show all data
const allPosts = document.querySelector('#allPosts');

const displayData = () => {
    //read ls data
    const allData = readLsData('linkedin');

    //store val ls data
    let store = [];

    //no has data
    if (!allData || allData == 0) {
        store = '';
    }
    // data has
    if (allData) {
        allData.reverse().map((item) => {
            store += `<div class="post">
          <div class="post__header">
            <img
              src="${item.userPhoto}"
              class="material-icons sidebar__topAvatar"
              alt=""
            />
            <div class="post__info">
              <h2>${item.name}</h2>
              <p>${item.jobtitle}</p>
            </div>
          </div>

          <div class="post__body">
            <p>
              ${item.userContent}
              <img
              src="${item.bgPhoto}"
              class="bgimgcoderjibon"
              alt=""
            />
            </p>
          </div>

          <div class="feed__inputOptions">
            <div class="inputOption">
              <i style="color: gray" class="material-icons"> thumb_up </i>
              <h4>Like</h4>
            </div>
            <div class="inputOption">
              <i style="color: gray" class="material-icons"> comment </i>
              <h4>Comment</h4>
            </div>
            <div editLsData="${item.id}" class="inputOption">
              <i style="color: gray" class="material-icons">edit</i>
              <h4>Edit</h4>
            </div>
            <div delateLsData="${item.id}" class="inputOption">
              <i style="color: gray" class="material-icons">delete </i>
              <h4>Delate</h4>
            </div>
          </div>
        </div>`;
        }); 
    }

    //data show display
    allPosts.innerHTML = store;

}

//show data
displayData();

//edit and delate item
allPosts.onclick = (e) => {
    
    // edit ls data
    if (e.target.hasAttribute('editLsData')) {
        const id = e.target.getAttribute('editLsData');
        //form data block
        eidtPopBox.style.display = "block";
        //read ls data
        const allData = readLsData('linkedin');
        //find single data
        const singleData = allData.find(item => item.id == id);
        //show edit data
        editForm.innerHTML = `<div class="popbody">
            <div>
              <label for="">Name</label>
              <input name="name" value="${singleData.name}" type="text" />
              <input name="id" value="${singleData.id}" type="hidden" />
            </div>
            <div>
              <label for="">Job Title</label>
              <input value="${singleData.jobtitle}" name="jobtitle" type="text" />
            </div>
            <div>
              <label for="">UserPhoto</label>
              <input value="${singleData.userPhoto}" name="userPhoto" type="text" />
            </div>

            <div>
              <label for="">BG image</label>
              <input value="${singleData.bgPhoto}" name="bgPhoto" type="text" />
            </div>
            <div>
              <label for="">Content</label>
              <textarea name="userContent" cols="30" rows="10">${singleData.userContent}</textarea>
            </div>
            <div>
              <input class="submitBtn" type="submit" value="Edit Post" />
            </div>
          </div>`;
    }

    // delateLsData
    if (e.target.hasAttribute('delateLsData')) {

        const id = e.target.getAttribute('delateLsData');

        if (confirm('Are you want to delate!!') == true) {
             //read ls data
            const allData = readLsData('linkedin');

            //find index
            const index = allData.findIndex(item => item.id == id);
            
            //remove item
            allData.splice(index, 1);

            //update ls data
            updateLsData('linkedin', allData);

            //show data
            displayData();

        }
       
    }
   
}

// edit data update
editForm.onsubmit = (e) => {
    e.preventDefault();

    //get form data
    const form_val = new FormData(e.target);
    const { bgPhoto, name, userContent, userPhoto, id, jobtitle } = Object.fromEntries(form_val.entries());
    
    //read ls data
    let allData = readLsData('linkedin');
    //find single data
    const index = allData.findIndex(item => item.id == id);
    //change data
    allData[index] = { bgPhoto, name, userContent, userPhoto, id, jobtitle };

    //update ls data
    updateLsData('linkedin', allData);

    //show data
    displayData();

    //edit form none
    eidtPopBox.style.display = "none";
}


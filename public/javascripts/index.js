(($)=> {
const navbarBurger = $('.navbar-burger')
const navbarMenu = $('.navbar-menu')
const modal = $('.modal')
const closeModal = $("[aria-label='close']")

const addUserButton = $('.add-user')
const saveNewUserButton = $('#save-new-user')
const editUserButton =$('.edit-user')
const saveEditedUserButton = $('#save-edited-user')
const deleteUserButton =$('.delete-user')

navbarBurger.on('click', function () {
  navbarBurger.toggleClass('is-active');  
  navbarMenu.toggleClass('is-active')
});

addUserButton.on('click', function () {
  const newUserForm = $('#new-user')
  newUserForm.slideToggle(500)
})

saveNewUserButton.on('click', function(e) {
  const newUserForm = $('#new-user')
  const data = extractUserData(newUserForm)

  $.ajax({
    type: "POST",
    url: "/users",
    data: data,
    dataType: "json",
    success: function (response) {
      location.reload()
    },
    error: function (err) {
      location.reload()
    },
  })
})

function extractUserData(form) {
  let newUser = {}

  form.find('input').not('[type=checkbox]').map( function () {
    const input = $(this)
    newUser[input.attr('name')] = input.val()
  })

  newUser['access'] = []
  form.find('[type=checkbox]').map( function () {
    const input = $(this)
    if(input.is(':checked')) newUser['access'].push(input.val())
  })
  return newUser
}

function generateUserForm(user){
  saveEditedUserButton.attr('data-user-id', `${user['_id']}`)
  return `
    <div class="column box is-three-fifths is-offset-one-fifth" >
                    
        <form id='edited-user-form' action="/users" method="PATCH" >
          <div class="field">
            <div class="control">
              <input type="text" name="username" placeholder="username" class="input control" value=${user.username}>
            </div>
          </div>
    <!-- end username field -->

          <div class="field">
            <div class="control">
              <input type="text" name="password" placeholder="password" class="input control" placeholder='password'}>
            </div>
          </div>
    <!-- end password field -->

          <div class="field">
            <div class="control">
              <input type="text" name="email" placeholder="email" class="input control" value=${user.email}>
            </div>
          </div>
    <!-- end email field -->

          <div class="field">
            <div class="control">
              <input type="text" name="mobile" placeholder="mobile" class="input control" value=${user.mobile}>
            </div>
          </div>
    <!-- end mobile field --> 

          <div class="field">
            <p> select what permissions this user will have: </p>
              <div class="control">
                <lable class="checkbox mx-2">
                  <input type="checkbox" name="access" value="add" ${user['access'].indexOf('add') !== -1? "checked": ''}>
                  add
                </lable>
                <lable class="checkbox mx-2">
                  <input type="checkbox" name="access" value="edit" ${user['access'].indexOf('edit') !== -1? "checked": ''}>
                  edit
                </lable>
                <lable class="checkbox mx-2">
                  <input type="checkbox" name="access" value="delete" ${user['access'].indexOf('delete') !== -1? "checked": ''}>
                  delete
                </lable>
            </div>
          </div>
    <!-- end access field -->

        </form>
    </div>
    <!-- end columns -->
  `
}

editUserButton.on('click', function(){
  const modalTitle = $('.modal-card-title')
  const modalBody = $('.modal-card-body')

  let user
  const userId = $(this).attr('data-user-id')
  
  $.ajax({
    type: 'GET',
    url: `/users/${userId}`,
    dataType: "json",
    success: function (response) {
      // console.log('success =====> ', response)
      user = response
      modal.toggleClass('is-active')
      modalTitle.text('Edit')
      modalBody.html(generateUserForm(user))

    },
    error: function (err) {
      console.log('error =====> ', err)
    },
  });
})

saveEditedUserButton.on('click', function(e) {
  const userId = $(this).attr('data-user-id')
  const editedUserForm = $('#edited-user-form')
  const data =extractUserData(editedUserForm)
  if(data.password.trim() === '') delete data.password
  console.log(userId, data)
  
  $.ajax({
    type: "PATCH",
    url: `/users/${userId}`,
    data,
    dataType: "json",
    success: function (response) {
     console.log('success ======>>', response) 
     location.reload()
    },
    error: function (err) {
     console.log('error ======>>', err) 
    },
  });
  

})


deleteUserButton.on('click', function(e){
  const userId = $(this).attr('data-user-id')
  console.log(userId);
  $.ajax({
    type: "DELETE",
    url: `/users/${userId}`,
    success: function (response) {
      location.reload()
    },
    error : function (err) {
      location.reload()
    }
  });
})

closeModal.on('click', function() {modal.toggleClass('is-active')})

$(document).on('click', function(e) {
  if(e.target.className.includes('modal-background')) modal.toggleClass('is-active')
})

})(jQuery) 


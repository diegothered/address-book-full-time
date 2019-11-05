//business logic for AddressBook object

function AddressBook () {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId =
function () {
  this.currentId += 1
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i<this.contacts.length; i++){
   if (this.contacts[i]){
     if (this.contacts[i].id == id){
       return this.contacts[i];
     }
   }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i<this.contacts.length; i++){
    if (this.contacts[i]){
      if (this.contacts[i].id == id){
      delete this.contacts[i];
      return true
      }
    }
  };
  return false;
}

//business logic for Contact object
function Contact (firstName, lastName, phoneNumber, address, emailWork, emailPersonal) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.address = address,
  this.emailWork = emailWork,
  this.emailPersonal = emailPersonal
}


Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
}


//user interface logic
var addressBook = new AddressBook ();//this is unusual--it's a global variable. Normally, we'd avoid. But this exercise needs to mimic a database.

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};//best practice to exclude this from the code that has our event listener.

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".address").html(contact.address);
  $(".email-work").html(contact.emailWork);
  $(".email-personal").html(contact.emailPersonal);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + + contact.id + ">Delete</button>");
}

function attachContactListeners(){
  $("ul#contacts").on("click", "li", function(){
    showContact(this.id);
  });
    $("#buttons").on("click", ".deleteButton", function(){
      addressBook.deleteContact(this.id);
      $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
  };


$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedAddress= $("input#new-address").val();
    var inputtedEmailWork = $("input#new-email-work").val();
    var inputtedEmailPersonal = $("input#new-email-personal").val();


    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-address").val("");
    $("input#new-email-work").val("");
    $("input#new-email-personal").val("");

    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedAddress, [inputtedEmailWork + inputtedEmailPersonal]); //built array within an arguements. Issue arises when in the DOM by having both email on one line. 
    addressBook.addContact(newContact);
    console.log(addressBook.contacts);
    displayContactDetails(addressBook);
  })
})

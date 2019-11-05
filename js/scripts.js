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
function Contact (firstName, lastName, phoneNumber) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber
}

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
}


//user interface logic
var addressBook = new AddressBook ();//this is unusual--it's a global variable. Normally, we'd avoid. But this exercise needs to mimic a database.

$(document).ready(function (){
  $("form#new-contact").submit(function(event){
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-inputtedPhoneNumber").val();
    var newContact = new Contact (inputtedFirstName, inputted LastName, inputtedPhoneNUmber);
      addressBook.addContact(newContact);
      console.log(addressBook.contacts);
  })
})

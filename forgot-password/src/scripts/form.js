class MockServer {
  constructor() { } 

  static emailValidation(email) {
    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
  }
}

const form = document.getElementById('form');

form.addEventListener('submit', e => {
  e.preventDefault();
  validateForm();
});

function validateForm() {
  validateInputCollection('username');
  validateInputCollection('password');
}

function validateInputCollection(id, isEqual = false) {
  const input = document.getElementById(id);
  const input2 = document.getElementById(`${id}2`);
  const label = document.getElementById(`${id}${isEqual ? '2' : ''}-label`);
  const text = document.getElementById(`${id}${isEqual ? '2' : ''}-text`);
  const collection = [input, label, text];
  if (input2 !== undefined) { collection.push(input2); }
  collection.forEach((element) => {
    if (!isEqual) {
      handleAuthenticationValue(input.value, id, element);
    } else {
      handleAuthenticationValue(input.value, `${id}2`, element, true ,input2.value);
    }
  });
}

function handleAuthenticationValue(value, type, element, isEqual = false, element2Value = '') { 
  const elementErrorClass = 'form--error';
  let isValidValue = false;
  
  if (!isEqual) {
     if (type === 'email') {
      isValidValue = MockServer.emailValidation(value);
    } else if (type === 'username' || type === 'password') {
      isValidValue = value !== '';
    }
  } 
  
  if (element) {
    if (!isValidValue) {
      element.classList.add(elementErrorClass);
    } else {
      element.classList.remove(elementErrorClass);
    }  
  }
}





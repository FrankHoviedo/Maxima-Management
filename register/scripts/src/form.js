const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');

const expressions = {
	user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	password: /^.{4,16}$/, // 4 a 12 digitos.
	address: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const areas = {
  user: false,
  password: false,
  address: false
}

const validateForm = (e) => {
	switch (e.target.name) {
		case "user":	
			validateArea(expressions.user, e.target, 'user');
		break;
		case "password":
			validateArea(expressions.password, e.target, 'keyword');
			//validatePassword(); aplicar solo si se quiere validar simultaneamente las contraseñas
		break;
		case "confirm-keyword":
			validatePassword();
		break;
		case "address":
			validateArea(expressions.address, e.target, 'address');
		break;
	}
}

const validateArea = (expression, input, area) => {
  if(expression.test(input.value)) {
    document.getElementById(`${area}`).classList.remove('form-input--error');
    document.querySelector(`#group-${area} .form-text`).classList.remove('active');
    areas[area] = true;
  }else {
    document.getElementById(`${area}`).classList.add('form-input--error');
    document.querySelector(`#group-${area} .form-text`).classList.add('active');
    areas[area] = false;
  }
}

const validatePassword = () => {
	const inputKeyword = document.getElementById('keyword');
	const inputConfirmkeyword = document.getElementById('confirm-keyword');

	if(inputKeyword.value !== inputConfirmkeyword.value) {
		document.getElementById(`confirm-keyword`).classList.add('form-input--error');
    document.querySelector(`#group-confirm-keyword .form-text`).classList.add('active');
	  areas['password'] = false;
  }else {
		document.getElementById(`confirm-keyword`).classList.remove('form-input--error');
    document.querySelector(`#group-confirm-keyword .form-text`).classList.remove('active');
    areas['password'] = true;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validateForm);
	input.addEventListener('blur', validateForm);
});

form.addEventListener('submit', (e) => {
	e.preventDefault();

  if (areas.user && areas.address && areas.password) {
    form.reset();
    document.getElementById('form-success').classList.add('active');
    document.getElementById('success-icon').classList.add('active');
    setTimeout(() => {
      document.getElementById('form-success').classList.remove('active');
      document.getElementById('success-icon').classList.remove('active');
    }, 5000);
  }else {
    document.getElementById('form-error').classList.add('active');
    document.getElementById('error-icon').classList.add('active');
    setTimeout(() => {
      document.getElementById('form-error').classList.remove('active');
      document.getElementById('error-icon').classList.remove('active');
    }, 5000);
  }
});



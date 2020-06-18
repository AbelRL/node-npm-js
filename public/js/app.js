/**
 * Código JS de lado del cliente
 */

/*
fetch('http://localhost:3000/weather?address=comas').then((response) => {
	response.json().then((data) => {
		if (data.error) return console.log(data.error);
		console.log(data.forecast);
		console.log(data.location);
	});
});
*/
const weatherForm = document.querySelector('form');
const search = weatherForm[0];
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherForm.addEventListener('submit', (e) => {
	//previene que el navegador no se actualize cada vez q se da clic al boton submit
	e.preventDefault();
	const location = search.value;
	if (location.length === 0)
		return (messageOne.textContent = 'Input a valid location');
	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';
	fetch(`/weather?address=${location}`).then((response) => {
		response.json().then((data) => {
			if (data.error) return (messageOne.textContent = `${data.error}`);
			messageOne.textContent = data.location;
			messageTwo.textContent = data.forecast;
		});
	});
});

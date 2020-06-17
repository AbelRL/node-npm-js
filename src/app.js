const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
//revisar npm handlebars

const app = express();
//usar hbs para handlebears, indicando la ruta de la carpeta donde están las plantillas
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views')); //el nombre de nuestra carpeta es ../views
//los partials, son partes de una página web, pueden ser incluso elementos específicos (o partes) que se pueden reutilizar en otras páginas del proyecto
hbs.registerPartials(path.join(__dirname, '../templates/partials'));
//servir páginas web estáticas
app.use(express.static(path.join(__dirname, '../public')));
//renderizar contenido dinámico, desde la carpeta view
app.get('', (req, res) =>
	res.render('index', { title: 'Weather', name: '@AbelRL' })
);
app.get('/about', (req, res) =>
	res.render('about', { title: 'About Me', name: '@AbelRL' })
);
app.get('/help', (req, res) =>
	res.render('help', { title: 'Help', helpText: 'Be helpfull here.' })
);
//obtener ubicación y condiciones climáticas.
app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send(error);
	}
	//asignamos valores por defecto "= {}" para que la desestructuración no rompa el código
	geocode(req.query.address, (error, { lat, lon, location } = {}) => {
		if (error) return res.send({ error });
		forecast(lat, lon, (error, forecastData) => {
			if (error) return res.send({ error });
			res.send({
				forecast: forecastData,
				location,
				address: req.query.address,
			});
		});
	});
});
app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({ error: 'You must provide a search term.' });
	}
	console.log(req.query.search);
	res.send({ proucts: [] });
});
//manejando páginas 404; '*' para todas las rutas que no se han establecido,
app.get('/help/*', (req, res) =>
	res.render('404', {
		title: '404',
		name: 'AbelRL',
		errorMessage: 'Article not found.',
	})
);
app.get('*', (req, res) =>
	res.render('404', {
		title: '404',
		name: 'AbelRL',
		errorMessage: 'Page not found.',
	})
);
app.listen(3000, () => console.log('Server is up'));

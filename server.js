const http = require('http')
const fs = require('fs')
const url = require('url')

var mime_types = {
    'js': 'text/javascript',
    'html': 'text/html',
    'css': 'text/css',
    'jpg': 'image/jpg',
    'scss' : 'text/scss',
    'gif': 'image/gif',
    'png': 'image/png',
    'ttf': 'text/ttf',
    'woff2':'font/woff2'
};

const url_index = "index.html";
const url_cliente = "portfolio.html";
const url_contacto = "contact.html";
const url_nosotros = "about.html";
const url_servicios = "services.html";
const url_gracias = "gracias.html"


http.createServer(function(request, response)
{
	var path_nombre;

	switch(url.parse(request.url).pathname)
	{
		case '/':
			path_nombre = url_index
			break
		case '/clientes':
			path_nombre = url_cliente
			break
		case '/contacto':
			path_nombre = url_contacto
			break
		case '/nosotros':
			path_nombre = url_nosotros
			break
		case '/servicios':
			path_nombre = url_servicios
            break
        case '/gracias':
			path_nombre = url_gracias
			break
		default:
			path_nombre =  url.parse(request.url).pathname;
	}

	var ruta_archivo = 'content/' + path_nombre;
    fs.exists(ruta_archivo, function(existe) {
        if (existe) {
            fs.readFile(ruta_archivo, function(error, contenido_archivo) {
                if (error) {
                    response.writeHead(500, 'text/plain');
                    response.end('Error interno.');
                } else {
                    var extension = ruta_archivo.split('.').pop();
                    //console.log(extension)
                    var mime_type = mime_types[extension];
                    response.writeHead(200, {'Content-Type': mime_type});
                    response.end(contenido_archivo);
                }
            });
        }else {
          response.writeHead(404, 'text/plain');
          const page_404 = fs.readFileSync('content/index.html');
          response.end(page_404);
        }
    });

}).listen(9091, function(){console.log("Ejecutandose en el servidor 9091")});
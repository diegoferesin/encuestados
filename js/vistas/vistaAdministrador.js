/*  * Vista administrador */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
};

VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
    this.configuracionDeBotones();
  },

  construirElementoPregunta: function(pregunta) {
    var contexto = this;
    var nuevoItem;
    //completar
    item = document.createElement('li');
    item.id = pregunta.id;
    item.classList = 'list-group-item';
    item.innerHTML = pregunta.textoPregunta;
    nuevoItem = $(item);
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    var auxItem = $('.d-flex');
    var titulo = auxItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    auxItem.find('small').text(
      pregunta.cantidadPorRespuesta.map(function(resp) {
        return ' ' + resp.textoRespuesta;
      })
    );
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i = 0; i < preguntas.length; ++i) {
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function() {
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      contexto.controlador.agregarPregunta();
      contexto.limpiarFormulario();
    });

    //asociar el resto de los botones a eventos
    e.botonBorrarPregunta.click(function() {
      contexto.controlador.borrarPregunta();
    });
    e.borrarTodo.click(function() {
      contexto.controlador.borrarTodo();
    });
    e.botonEditarPregunta.click(function() {
      contexto.controlador.editarPregunta();
      contexto.limpiarFormulario();
    });
  },

  limpiarFormulario: function() {
    $('.form-group.answer.has-feedback.has-success').remove();
  }
};

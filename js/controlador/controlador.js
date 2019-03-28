/* * Controlador */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function() {
    var value = $('#pregunta').val();
    var respuestas = [];
    $('[name="option[]"]').each(function() {
      var respuesta = $(this).val();
      //Completar el agregado de una respuesta
      // pusheandola al arreglo de respuestas
      if (respuesta !== '') {
        respuestas.push({ textoRespuesta: respuesta, cantidad: 0 });
      }
    });
    this.modelo.agregarPregunta(value, respuestas);
  },

  agregarVotos: function() {
    var contexto = this;
    $('#preguntas')
      .find('div')
      .each(function() {
        var nombrePregunta = $(this).attr('name');
        var id = $(this).attr('id');
        id = parseInt(id);
        var pregunta = contexto.modelo.obtenerPregunta(id);
        var respuestaSeleccionada = $('input[name=' + id + ']:checked').val();
        $('input[name=' + id + ']').prop('checked', false);
        if (contexto.validarDatos(respuestaSeleccionada, null)) {
          contexto.modelo.agregarVoto(pregunta, respuestaSeleccionada);
        }
      });
  },

  borrarPregunta: function() {
    var preguntaABorrar = $('#lista')
      .find('li.active')
      .attr('id');
    if (this.validarDatos(preguntaABorrar, null)) {
      this.modelo.borrarPregunta(preguntaABorrar);
    }
  },

  borrarTodo: function() {
    this.modelo.borrarTodo();
  },

  editarPregunta: function() {
    var preguntaAEditar = $('#lista')
      .find('li.active')
      .attr('id');
    preguntaAEditar = parseInt(preguntaAEditar);
    if (this.validarDatos(preguntaAEditar, null)) {
      var texto = prompt('Ingrese el título para editar');
      if (this.validarDatos(texto, 'input')) {
        this.modelo.editarPregunta(preguntaAEditar, texto);
      }
    }
  },

  validarDatos: function(valor, opcion) {
    if (valor !== undefined && valor !== ' ') {
      return true;
    } else {
      if (opcion === 'Input') {
        alert('Debe completar el campo.');
      } else {
        alert('Seleccione una pregunta');
      }
    }
  }
};

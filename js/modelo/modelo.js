/* * Modelo */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  this.preguntaAgregada = new Evento(this);
};

Modelo.prototype = {
  obtenerUltimoId: function() {
    return this.ultimoId;
  },

  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {
      textoPregunta: nombre,
      id: id,
      cantidadPorRespuesta: respuestas
    };
    this.preguntas.push(nuevaPregunta);
    this.guardar();
  },

  borrarPregunta: function(idABorrar) {
    this.preguntas = this.preguntas.filter(function(item) {
      return item.id != idABorrar;
    });
    this.guardar();
  },

  editarPregunta: function(idAModificar, Nuevonombre) {
    var preguntaAModificar = this.obtenerPregunta(idAModificar);
    preguntaAModificar.textoPregunta = Nuevonombre;
    this.guardar();
  },

  borrarTodo: function() {
    this.preguntas = [];
    this.guardar();
  },

  agregarVoto: function(pregunta, respuestaSeleccionada) {
    this.preguntas.forEach(element => {
      if (element.id === pregunta.id) {
        for (
          var index = 0;
          index < element.cantidadPorRespuesta.length;
          index++
        ) {
          if (
            element.cantidadPorRespuesta[index].textoRespuesta ===
            respuestaSeleccionada
          ) {
            element.cantidadPorRespuesta[index].cantidad++;
          }
        }
      }
    });
    this.guardar();
  },

  obtenerPregunta: function(idABuscar) {
    for (var index = 0; index < this.preguntas.length; index++) {
      if (this.preguntas[index].id === idABuscar) {
        return this.preguntas[index];
      }
    }
  },

  guardar: function() {
    localStorage.removeItem('array');
    localStorage.setItem('array', JSON.stringify(this.preguntas));
    this.ultimoId++;
    this.preguntaAgregada.notificar();
  },

  recuperarDatos: function() {
    var datos = localStorage.getItem('array');
    if (datos !== null) {
      datos = JSON.parse(datos);
      this.preguntas = datos;
      this.ultimoId = this.preguntas[this.preguntas.length - 1].id;
      this.preguntaAgregada.notificar();
    }
  }
};

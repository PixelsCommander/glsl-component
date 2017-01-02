require('document-register-element');
var glslCanvas = require('glslCanvas');

var GlslComponent = function() {};
GlslComponent.prototype = Object.create(HTMLCanvasElement.prototype)
GlslComponent.prototype.createdCallback = function createdCallback() {

  const shadowRoot = this.attachShadow({mode: 'closed'});
  const canvas = document.createElement('canvas');
  shadowRoot.appendChild(canvas);

  this.style.width = '100%';
  this.style.height = '100%';
  this.style.display = 'block';

  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  // Default Context
  var options = {};

  var innerHTML = this.innerHTML.replace(/&lt;br&gt;/g,"");
  innerHTML = innerHTML.replace(/<br>/g,"");
  innerHTML = innerHTML.replace(/&nbsp;/g,"");
  innerHTML = innerHTML.replace(/&lt;/g,"<");
  innerHTML = innerHTML.replace(/&gt;/g,">");
  innerHTML = innerHTML.replace(/&amp;/g,"&");

  options.fragmentString = innerHTML || EMPTY_FRAG_SHADER;

  if (innerHTML) {
    this.innerHTML = '';
  }

  for (var i = 0; i < this.attributes.length; i++) {
    var attribute = this.attributes[i];
    if (attribute.specified) {
      var value = attribute.value;

      if (value === 'true') {
        value = true;
      } else if (value === 'false') {
        value = false;
      } else if (parseInt(value)) {
        value = parseInt(value);
      }

      options[attribute.name] = value;
    }
  }

  this.glslCanvas = new glslCanvas(canvas, options);
}

document.registerElement('glsl-component', GlslComponent);

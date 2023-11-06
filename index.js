
import { OutLook } from './js/outlook.js';

document.addEventListener("DOMContentLoaded", function () {
       let ol = new OutLook();
	toolbar_build(ol);

});


function toolbar_build(ol) {
   /*
    * https://jsuites.net/v4/
    */

  jSuites.toolbar(document.getElementById('toolbar'), {
    container: true,
    items:[{
        type: 'select',
        width: '50px',
        options: ['fa-align-right', 'fa-align-left', 'fa-align-center', 'fa-align-justify'],
        render: function(e) {
            return '<i class="fa ' + e + '"></i>';
        },
        onchange: function(a,b,c,d) {
            console.log(d);

        }
    },
    {
        type: 'i',
        class: 'fa fa-italic',
        onclick: function() {
            // Do something
            console.log('Italic');
            ol.mode_switch("TEST");
        }
    },
    {
        type: 'i',
        class: 'fa fa-bold',
        onclick: function() {
            // Do something
            console.log('Bold');
        }
    },
    {
        type: 'i',
        class: 'fa fa-paint-brush',
        onclick: function(element, instance, item) {
            if (! item.color) {
                var colorPicker = jSuites.color(item, {
                    onchange:function(o, v) {
                        console.log('color:', v);
                    }
                });
                colorPicker.open();
            }
        }
    }]
  })

}


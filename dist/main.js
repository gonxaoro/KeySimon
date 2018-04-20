'use strict';

var niveles = 15;
var teclas = generarTeclas(niveles);

function siguienteNivel(nivelActual) {
    if (nivelActual == niveles) {
        return swal({
            title: 'Ganaste!',
            type: 'success'
        });
    }

    swal({
        timer: 1000,
        title: 'Nivel ' + (nivelActual + 1),
        buttons: false
    });

    var _loop = function _loop(_i) {
        setTimeout(function () {
            return activate(teclas[_i]);
        }, 1000 * (_i + 1) + 1000);
    };

    for (var _i = 0; _i <= nivelActual; _i++) {
        _loop(_i);
    }

    var i = 0;
    var teclaActual = teclas[i];
    window.addEventListener('keydown', onkeydown);

    function onkeydown(ev) {
        if (ev.keyCode == teclaActual) {
            activate(teclaActual, { success: true });
            i++;
            if (i > nivelActual) {
                window.removeEventListener('keydown', onkeydown);
                setTimeout(function () {
                    return siguienteNivel(i);
                }, 1500);
            }
            teclaActual = teclas[i];
        } else {
            activate(ev.keyCode, { fail: true });
            window.removeEventListener('keydown', onkeydown);
            setTimeout(function () {
                swal({
                    title: 'Perdiste',
                    text: '¿Quieres jugar de nuevo?'
                }).then(function (ok) {
                    if (ok) {
                        teclas = generarTeclas(niveles);
                        siguienteNivel(0);
                    }
                });
            }, 1000);
        }
    }
}

siguienteNivel(0);

function generarTeclas(niveles) {
    return new Array(niveles).fill(0).map(generarTeclaAleatoria);
}

function generarTeclaAleatoria() {
    var min = 65;
    var max = 90;
    return Math.round(Math.random() * (max - min) + min);
}

function getElementByKeyCode(keyCode) {
    return document.querySelector('[data-key="' + keyCode + '"]');
}

function activate(keyCode) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var el = getElementByKeyCode(keyCode);
    el.classList.add('active');
    if (opts.success) {
        el.classList.add('success');
    } else if (opts.fail) {
        el.classList.add('fail');
    }
    setTimeout(function () {
        return deactivate(el);
    }, 500);
}

function deactivate(el) {
    el.className = 'key';
}
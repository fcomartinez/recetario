import { mostrarPlatilloRandom } from "./funciones.js";

jQuery(function() {
    $('#carousel').carousel({ interval: 6000 });
    $('#btn-suscription').on('click', () => $('#form-suscription').slideToggle('fast'));
    $('#btn-newsletter').on('click', event => event.preventDefault());
    mostrarPlatilloRandom();
})
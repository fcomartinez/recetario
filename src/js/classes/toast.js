class Toast {
    constructor() {

    }

    mostrarNotificacion = mensaje => {
        $('.toast-body').empty();
        $('.toast-body').append(
            $('<p>').text(mensaje)
        );
        $('#toast').toast('show');
    }
}

export default Toast;
import LS from "./classes/localStorage.js";
import Toast from "./classes/toast.js";

const ls = new LS();
const toast = new Toast();

export function mostrarPlatilloRandom() {
    $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/random.php"
    }).done( platillo => {
        const { idMeal, strMeal, strMealThumb } = platillo.meals[0];
        const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus cum dolor inventore quo autem amet dolore suscipit doloremque consequatur laborum iusto.';

        $('#platillo-random').append(
            $('<div>').addClass('card').append(
                $('<img>').attr({
                    src: strMealThumb,
                    alt: `Imagen ${strMeal}`
                }),
                $('<div>').addClass('card-body').append(
                    $('<h5>').addClass('card-title').text(strMeal),
                    $('<p>').text(lorem),
                    $('<a>').attr('href','#').addClass(['btn', 'btn-lg', 'btn-dark', 'd-block']).text('Ver receta').on('click', e => {
                        e.preventDefault();
                        mostrarPlatillo(idMeal);
                    })
                )
            )
        )
    });
}

export function mostrarPlatillo(id) {
    $.ajax({
        url: `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    }).done( platillo => {
        const { idMeal, strInstructions, strMeal, strMealThumb } = platillo.meals[0];

        $('.modal-title').empty();
        $('.modal-title').append(strMeal);

        $('.modal-body').empty();
        $('.modal-body').append(
            $('<img>').attr({
                src: strMealThumb,
                alt: `Imagen ${strMeal}`
            }).addClass('img-fluid'),
            $('<h3>').addClass('my-3').text('Instrucciones'),
            $('<p>').text(strInstructions),
            $('<h3>').addClass('my-3').text('Ingredientes y Cantidades'),
            $('<ul>').addClass('list-group')
        )
        for(let i = 1; i <= 20; i++) {
            if(platillo.meals[0][`strIngredient${i}`]) {
                const ingrediente = platillo.meals[0][`strIngredient${i}`];
                const cantidad = platillo.meals[0][`strMeasure${i}`];

                $('.list-group').append(
                    $('<li>').addClass('list-group-item').text(`${ingrediente} - ${cantidad}`)
                )
            }
        }

        $('.modal-footer').empty();

        if(ls.consultarStorage(idMeal)){     
            $('.modal-footer').append(
                $('<button>').addClass(['btn', 'btn-dark', 'col']).text('Eliminar').on('click', () => {
                    ls.eliminarFavorito(idMeal);
                    $('#modal').modal('hide');
                    toast.mostrarNotificacion('Se eliminó platillo de su lista de favoritos.');
                    $('#favoritos').empty();
                    obtenerFavoritos();
                })
            )
        } else {
            $('.modal-footer').append(
                $('<button>').addClass(['btn', 'btn-dark', 'col']).text('Guardar').on('click', () => {
                    ls.guardarFavorito({id: idMeal, titulo: strMeal, img: strMealThumb});
                    $('#modal').modal('hide');
                    toast.mostrarNotificacion('Se guardó platillo en su lista de favoritos.');
                })
            )
        }

        $('.modal-footer').append(
            $('<button>').addClass(['btn', 'btn-secondary', 'col']).text('Cerrar').on('click', () => {
                $('#modal').modal('hide');
            })
        );

        $('#modal').modal('show');
    });
}

export function obtenerFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];

    if(favoritos.length) {
        favoritos.forEach( favorito => {
            $('#favoritos').append(
                $('<div>').addClass(['col-12', 'col-md-6', 'col-lg-4']).append(
                    $('<div>').addClass('card').append(
                        $('<img>').attr({
                            src: favorito.img,
                            alt: `Imagen ${favorito.titulo}`
                        }).addClass('card-img-top'),
                        $('<div>').addClass('card-body').append(
                            $('<h5>').addClass(['card-title', 'text-black']).text(favorito.titulo),
                            $('<a>').attr('href','#').addClass(['btn', 'btn-lg', 'btn-dark', 'd-block']).text('Ver Receta').on('click', e => {
                                e.preventDefault();
                                mostrarPlatillo(favorito.id);
                            })
                        )
                    )
                )
            );
        })
        return;
    }

    $('#favoritos').append(
        $('<h2>').addClass(['text-center', 'text-uppercase', 'py-5']).text('No hay favoritos'),
        $('<p>').addClass(['text-center', 'pb-5']).text('Ir a Inicio o Recetas para empezar tu nueva lista.')
    );
}
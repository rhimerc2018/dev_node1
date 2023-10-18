$('#post-comment').hide();
$( '#btn-toggle-comment').click(e => {
    e.preventDefault();
    $('#post-comment').slideToggle();
});

$( '#btn-likeimg' ).click(function(e) {    
    e.preventDefault();
    let imgId = $(this).data('id');
    console.log("IMGIDDDDDDDDDDDD ", imgId);
    $.post('/image/' + imgId + '/like')
        .done(data => {
            console.log(data);
            $('.likes-count').text(data.likes);
        })
});

$( '#btn-likegal' ).click(function(e) {    
    e.preventDefault();
    let galId = $(this).data('id');
    console.log(galId);
    $.post('/galeria/' + galId + '/like')
        .done(data => {
            console.log(data);
            $('.likes-count').text(data.likes);
        })
});

$( '#btn-likeprd' ).click(function(e) {    
    e.preventDefault();
    let imgId = $(this).data('id');
    $.post('/product/' + imgId + '/like')
        .done(data => {
            console.log(data);
            $('.likes-count').text(data.likes);
        })
});

$( '#btn-delgal' ).click(function(e) {
    e.preventDefault();
    let $this = $(this);
    const response = confirm('Esta seguro(a) que quiere eliminar esta Galeria ?' );
    if ( response ) {
        let galId = $this.data('id');
        $.ajax({
            url: '/galerias/' + galId,
            type: 'DELETE'
        })
        .done(function ( result ) {
            $this.removeClass('btn-danger').addClass('btn-success');
            $this.find('i').removeClass('fa-times').addClass('fa-check');
            $this.append('<span>Galeria Eliminada !!</span>');
        });
    }
});

$( '#btn-delete' ).click(function(e) {
    e.preventDefault();
    let $this = $(this);
    const response = confirm('Esta seguro(a) que quiere eliminar esta imagen ?' );
    if ( response ) {
        let imgId = $this.data('id');
        $.ajax({
            url: '/images/' + imgId,
            type: 'DELETE'
        })
        .done(function ( result ) {
            $this.removeClass('btn-danger').addClass('btn-success');
            $this.find('i').removeClass('fa-times').addClass('fa-check');
            $this.append('<span>Imagen Eliminada !!</span>');
        });
    }
});

$( '#btn-delprod' ).click(function(e) {
    e.preventDefault();
    let $this = $(this);
    const response = confirm('Esta seguro(a) que quiere eliminar este producto ?' );
    if ( response ) {
        let prodId = $this.data('id');
        $.ajax({
            url: '/products/' + prodId,
            type: 'DELETE'
        })
        .done(function ( result ) {
            $this.removeClass('btn-danger').addClass('btn-success');
            $this.find('i').removeClass('fa-times').addClass('fa-check');
            $this.append('<span>Producto Eliminado !!</span>');
        });
    }
});

/* Agrandar imagen con el mouse */
$(document).ready(function(){
    $('.zoom').hover(function() {
        $(this).addClass('transition');
    }, function() {
        $(this).removeClass('transition');
    });
});
function traerInformacion() {

    $.ajax({
        url: "https://g54aebbad8caaba-ejhm8wk1ink77ulw.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/cinema/cinema",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            //Acá se puede validar la respuesta.
            console.log(respuesta);
            $("#resultado").empty();
            $("#id").val("");
            $("#owner").val("");
            $("#capacity").val("");
            $("#category_id").val("");
            $("#name").val(""); 
            pintarRespuesta(respuesta.items);

        }
    });
}

function pintarRespuesta(items) {
    let mytable ='<table class="table table-sm table-re table-success table-hover">' ;
    mytable += '<thead>'+
    '<tr>'+
      '<th scope="col">ID</th>'+
      '<th scope="col">Empresa</th>'+
      '<th scope="col">Capacidad</th>'+
      '<th scope="col">ID Categoria</th>'+
      '<th scope="col">CC</th>'+
      '<th scope="col">Acciones</th>'+
    '</tr>'+
  '</thead>';
    for (i = 0; i < items.length; i++) {
        mytable += "<tr>";
        mytable += "<td>" + items[i].id + "</td>";
        mytable += "<td>" + items[i].owner + "</td>";
        mytable += "<td>" + items[i].capacity + "</td>";
        mytable += "<td>" + items[i].category_id + "</td>";
        mytable += "<td>" + items[i].name + "</td>";
        mytable+="<td> <button onclick='borrarElemento("+items[i].id+")' type='button' class='btn btn-sm btn-danger'>Borrar</button>";
        mytable+=" <button onclick='editarElemento("+items[i].id+")' type='button' class='btn btn-sm btn-warning'>Editar</button>"+"</td>";

        mytable += "</tr>";
    }
    mytable += "</table>";
    $("#resultado").append(mytable);

}
function guardarInformacion() {
    let myData = {
        id: $("#id").val(),
        owner: $("#owner").val(),
        capacity: $("#capacity").val(),
        category_id: $("#category_id").val(),
        name: $("#name").val(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "https://g54aebbad8caaba-ejhm8wk1ink77ulw.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/cinema/cinema",
        type: "POST",
        data: myData,
        datatype: "JSON",
        success: function (respuesta) {
            traerInformacion();
            alert("Se ha guardado")
        }
    });
}

function editarElemento(idElemento) { 
   
    $.ajax({
        url: "https://g54aebbad8caaba-ejhm8wk1ink77ulw.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/cinema/cinema/"+idElemento,
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            let array = respuesta.items
            $("#id").val(array[0].id);
            $("#owner").val(array[0].owner);
            $("#capacity").val(array[0].capacity);
            $("#category_id").val(array[0].category_id);
            $("#name").val(array[0].name); 
            alert("accion realizada")
        }
    });
}


function actualizarInformacion() {
    let myData = {
        id: $("#id").val(),
        owner: $("#owner").val(),
        capacity: $("#capacity").val(),
        category_id: $("#category_id").val(),
        name: $("#name").val(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "https://g54aebbad8caaba-ejhm8wk1ink77ulw.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/cinema/cinema",
        type: "PUT",
        data: dataToSend,
        contentType:"application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            traerInformacion();
            alert("Se ha Actualizado")
        }
    });
}

function borrarElemento(idElemento) {
    let myData = {
        id: idElemento
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "https://g54aebbad8caaba-ejhm8wk1ink77ulw.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/cinema/cinema",
        type: "DELETE",
        data: dataToSend,
        contentType:"application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            traerInformacion();
            alert("Se ha Eliminado")
        }
    });
}

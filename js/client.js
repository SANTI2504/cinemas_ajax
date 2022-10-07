function traerInformacion() {

    $.ajax({
        url: "https://g54aebbad8caaba-ejhm8wk1ink77ulw.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            //Acá se puede validar la respuesta.
            console.log(respuesta);
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#email").val("");
            $("#age").val("");
            pintarRespuesta(respuesta.items);

        }
    });
}

function pintarRespuesta(items) {
    let mytable ='<table class="table table-sm table-re table-success table-hover">' ;
    mytable += '<thead>'+
    '<tr>'+
      '<th scope="col">ID</th>'+
      '<th scope="col">Nomnre</th>'+
      '<th scope="col">Correo</th>'+
      '<th scope="col">Edad</th>'+
      '<th scope="col">Acciones</th>'+
    '</tr>'+
  '</thead>';
    for (i = 0; i < items.length; i++) {
        mytable += "<tr>";
        mytable += "<td>" + items[i].id + "</td>";
        mytable += "<td>" + items[i].name + "</td>";
        mytable += "<td>" + items[i].email + "</td>";
        mytable += "<td>" + items[i].age + "</td>";
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
        name: $("#name").val(),
        email: $("#email").val(),
        age: $("#age").val(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "https://g54aebbad8caaba-ejhm8wk1ink77ulw.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
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
        url: "https://g54aebbad8caaba-ejhm8wk1ink77ulw.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client/"+idElemento,
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            let array = respuesta.items
            $("#id").val(array[0].id);
            $("#name").val(array[0].name);
            $("#email").val(array[0].email);
            $("#age").val(array[0].age);
            alert("accion realizada")
        }
    });
}


function actualizarInformacion() {
    let myData = {
        id: $("#id").val(),
        name: $("#name").val(),
        email: $("#email").val(),
        age: $("#age").val(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "https://g54aebbad8caaba-ejhm8wk1ink77ulw.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
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
        url: "https://g54aebbad8caaba-ejhm8wk1ink77ulw.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
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

//-----URL DEL SERVIDOR----
var urlApi = "https://backend-53435.herokuapp.com/personas";

var personas = [];
var idPersonaActualizar = null;

//Función Expresada
const registrarPersona = () => {   
    //Construir objeto con los datos capturados
    let objPersona = capturarDatosFormulario();
    limpiarCampos();
    console.log(objPersona);
    //Conectar con la API
    fetch(urlApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objPersona)
    }).then(resp=>{
        //console.log(resp.status);
        if(resp.status == 201){
            alert('Persona registrada con éxito');
            obtenerPersonas();
        }else{
            alert("Ups! algo sucedió. Intenta mas tarde");
        }
    }).catch(error=>{
        console.error(error);
        alert('No se pudo establecer conexión con el servidor');
    });
}

const listarPersonas = ()=>{
    let cuerpoTabla = document.getElementById('cuerpoTabla');
    cuerpoTabla.innerHTML = "";
    let contador = 0;
    personas.forEach(objPersona => {
        cuerpoTabla.innerHTML += `
        <tr id="f${contador}">
            <td>${objPersona.nombre}</td>
            <td>${objPersona.apellido}</td>
            <td>${objPersona.telefono}</td>
            <td>${objPersona.email}</td>
            <td>
                <button type="button" class="btn btn-primary" onclick="btnEditar(${objPersona.id}, '${objPersona.nombre}', '${objPersona.apellido}', '${objPersona.telefono}', '${objPersona.email}')">Editar</button>
                <button type="button" class="btn btn-danger" onclick="btnEliminar(${objPersona.id})">Eliminar</button>
            </td>
        </tr>
        `;
        ++contador;
    });
    console.log("Termina listar personas");
}

const obtenerPersonas = ()=>{
    fetch(urlApi).then(async res=>{
        //Capturar los datos en formatos json
        let data = await res.json();
        console.log(data);
        personas = data;
        listarPersonas();
    }).catch(error=>{
        console.error(error);
    });
}

const btnEditar = (id, nombre, apellido, telefono, email)=>{
    idPersonaActualizar = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('telefono').value = telefono;
    document.getElementById('email').value = email;
}

const actualizarPersona = ()=>{
    let objPersona = capturarDatosFormulario();
    //...objPersona -> Desestructuración del objeto
    let obj = {...objPersona, id: idPersonaActualizar}
    limpiarCampos();
    //Enviar solicitud a la API
    fetch(urlApi, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(resp=>{
        if(resp.status == 200){
            alert('Persona actualizada');
            obtenerPersonas();
        }else{
            alert('Por favor intenta mas tarde');
        }
    }).catch(error=>{
        alert('No se estableció conexión con el servidor');
    });
}

const btnEliminar = (id)=>{
    //Enviar petición a la API
    fetch(urlApi, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
    }).then(resp=>{
        if(resp.status == 200){
            obtenerPersonas();
            alert('Persona eliminada con éxito');
        }else{
            alert('Por favor intenta mas tarde');
        }
        
    }).catch(error=>{
        alert('No se estableció conexión con el servidor');
        console.log(error);
    });
}

const capturarDatosFormulario = ()=>{
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let telefono = document.getElementById('telefono').value;
    let email = document.getElementById('email').value;
    //Retornar datos en forma de objeto
    return {
        nombre, apellido, telefono, email
    }
}

const limpiarCampos = ()=>{
    document.getElementById('nombre').value = "";
    document.getElementById('apellido').value = "";
    document.getElementById('telefono').value = "";
    document.getElementById('email').value = "";
}

obtenerPersonas();

//Función declarada
/*
function registrarPersona(){
    
}*/

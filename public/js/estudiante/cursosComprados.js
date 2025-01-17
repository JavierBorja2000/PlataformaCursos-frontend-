var token;

document.addEventListener('DOMContentLoaded', e => {
    ValidarToken("Estudiante");
    ObtenerCursos();

    document.addEventListener('click', e => {
        if(e.target.matches("#curso_titulo")){
            e.preventDefault()

            if(e.target.dataset.estado === "A"){
                localStorage.setItem("idCursoSolicitado", e.target.dataset.id) 
                location.href = "curso_individual.html"
            }
            
        }
    })
})

function ObtenerCursos(){
    fetch(url_curso, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        else {
            console.log(response)
        }
    }).then(function (Data) {
        if(Data.length === 0){
            document.querySelector("#listadoVacio").textContent = "No has comprado cursos todavía"
        }
        else {
            imprimirCursos(Data)
        }
    });
}

function imprimirCursos(data) {
    limpiarListadoCursos()

    const $listadoCursos = document.querySelector("#listado_cursos")
    const $templateCard = document.querySelector("#card_curso-template").content
    const fragment = document.createDocumentFragment()

    data.forEach(curso => {
        const clone = $templateCard.cloneNode(true);

        clone.querySelector("#curso_titulo").dataset.id = curso.idCurso
        clone.querySelector("#curso_titulo").textContent = curso.nombre

        if(curso.estado === "I"){
            clone.querySelector("#curso_estado").textContent = "Inactivo"
            clone.querySelector("#curso_titulo").dataset.estado = "I"
            clone.querySelector("#estrellas").classList.add("hidden")
            clone.querySelector("#curso_titulo").classList.remove("cursor-pointer")
            clone.querySelector("#div-anim").classList.remove("hover:translate-y-[-0.4rem]")
        }
        else{
            clone.querySelector("#curso_titulo").dataset.estado = "A"
        }
        
        clone.querySelector("#curso_instructor").textContent = `${curso.instructor.nombres} ${curso.instructor.apellidos}`
        fragment.appendChild(clone)
    });

    $listadoCursos.appendChild(fragment)
}


//limpia listado de cursos
function limpiarListadoCursos() {
    const $listadoCursos = document.querySelector("#listado_cursos")

    while ($listadoCursos.firstChild) {
        $listadoCursos.removeChild($listadoCursos.firstChild);
    }
}

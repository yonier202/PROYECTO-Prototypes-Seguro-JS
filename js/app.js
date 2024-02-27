// Contructires

function Seguro(marca,year,tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

function UI(){}
//Muestra alertas en pantalla

UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement("div");
    if (tipo === 'error') {
        div.classList.add("error");
    }else{
        div.classList.add("correcto");
    }
    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;
    
    //insertar en el HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
};

UI.prototype.llenarOpciones = ()=>{
    const max= new Date().getFullYear();
    min = max-20;

    const selectYear = document.querySelector('#year');
    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.textContent = i;
        option.value = i;
        selectYear.appendChild(option);
    }
}
//instanciar Ui
const ui=new UI();

//eventliners, documento listo
document.addEventListener('DOMContentLoaded',()=>{
    ui.llenarOpciones();
})

eventListener()
function eventListener(){
    const formulario = document.querySelector('#cotizar-seguro');

    formulario.addEventListener('submit',cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();

    //Leer la marca seleccionada
    const marca = document.querySelector('#marca').value;

    //Leer el año seleccionado
    const year = document.querySelector('#year').value;

    //leer el tipo seleccionado
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === "" || year === "" || tipo === "") {
        ui.mostrarMensaje('Todos los campos son obligatorios','error');
        return;
    }
    ui.mostrarMensaje('Cotizando..','exito');

    


    
    
}
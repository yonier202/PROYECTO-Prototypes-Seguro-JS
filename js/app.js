// Contructires

function Seguro(marca,year,tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function(){ 
    /*
        1 = Americano 1.15
        2 = Asiatico 1.05
        3 = Euroepi 1.35 
    */
    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case "1":
            cantidad = base *1.15;
            break;
        case  "2":
            cantidad = base *1.05;
            break;
        case "3":
            cantidad = base *1.35;
            break;          
    
        default:
            break;
    }
    //Leer el año
    const diferencia  = new Date().getFullYear() - this.year;

    //cada año que la diferencia es mayor, el costo va a reducir en un 3%

    cantidad -= ((diferencia * 3) * cantidad ) / 100;

    console.log(cantidad);

    // si el seguro es basico se multiplica x un 30% mas
    // si el seguro es basico se multiplica x un 50% mas

    if (this.tipo === 'basico') {
        cantidad *=1.30;
    }else{
        cantidad *=1.50;
    }

    return cantidad;
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

UI.prototype.mostrarResultado = (seguro, total)=>{
    const {marca, year, tipo } = seguro;
    let resultadoMarca;
    switch (marca) {
        case "1":
            resultadoMarca='Americano';
            break;
        case "2":
            resultadoMarca='Asiatico';
            break;
        case "3":
            resultadoMarca='Europeo';
            break;    
        default:
            break;
    }
    //Crear el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML = `
        <p class="header">Tu Resumen </p>
        <p class="font-bold">Marca: <span class ="font-normal">  ${resultadoMarca}</span></p>
        <p class="font-bold">Año: <span class ="font-normal"> $ ${year}</span></p>
        <p class="font-bold">Tipo: <span class ="font-normal capitalize"> $ ${tipo}</span></p>

        <p class="font-bold">Total: <span class ="font-normal"> $ ${total}</span></p>

    `;

    const resultadoDiv= document.querySelector('#resultado');
    

    //mostar spinner
    const spinner = document.querySelector('#cargando');
    spinner.classList.remove('hidden');

    setTimeout(() => {
        spinner.classList.add('hidden');
        resultadoDiv.appendChild(div);
    }, 3000);
}

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

    //eliminar las cotizaciones previas

    const resultados = document.querySelector('#resultado div');

    if (resultados!=null) {
        resultados.remove();
    }

    //instanciar el seguro

    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

     //utilizar prototype que va a cotizar

    ui.mostrarResultado(seguro, total); 

    


    
    
}
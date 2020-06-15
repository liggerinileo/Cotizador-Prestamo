import React, {Fragment, useState} from 'react';
import { calcularTotal } from "../helpers";

const Formulario = (props) => {

    // Definir state
    const [error, guardarError] = useState(false);

    // Cuando el usuario hace submit
    const calcularPrestamo = e => {
        e.preventDefault();
        
        // Validar
        if (props.cantidad === 0 || props.plazo === '') {
            guardarError(true);
            // Return para que no se ejecute la sig linea de inmediato
            return;
        }

        // Eliminar el error previo
        guardarError(false);

        //Habilitar el spinner
        props.guardarCargando(true);

        setTimeout(() => {
            // Realizar la cotizacion
            const total = calcularTotal(props.cantidad, props.plazo);

            // Una vez calculado guardar total
            props.guardarTotal(total);

            // Deshabilitar el spinner
            props.guardarCargando(false);
        }, 3000);

    }

    return ( 
        <Fragment>
            <form onSubmit = {calcularPrestamo}>
                <div className="row">
                    <div>
                        <label>Cantidad Prestamo</label>
                        <input 
                        className="u-full-width" 
                        type="number" 
                        placeholder="Ejemplo: 3000" 
                        /* Aca usamos onChange porque es un evento que se va a ejecutar
                        c/vez que el usuario comience a escribir en el input */
                        onChange={e => props.guardarCantidad(parseInt(e.target.value))}
                        />
                    </div>
                    <div>
                        <label>Plazo para Pagar</label>
                        <select className="u-full-width"
                            onChange={e => props.guardarPlazo(parseInt(e.target.value))}
                        >
                        <option value="">Seleccionar</option>
                        <option value="3">3 meses</option>
                        <option value="6">6 meses</option>
                        <option value="12">12 meses</option>
                        <option value="24">24 meses</option>
                        </select>
                    </div>
                    <div>
                        <input 
                        type="submit" 
                        value="Calcular" 
                        className="button-primary u-full-width" 
                        />
                    </div>
                </div>
            </form>

            {(error) ? <p className="error">Todos los campos son obligatorios</p> : null}
            
        </Fragment>
    );
}
 
export default Formulario;
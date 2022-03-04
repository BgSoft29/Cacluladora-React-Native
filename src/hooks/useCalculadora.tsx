import React, { useRef, useState } from 'react';

enum Operadores {
    suma, resta, multiplicacion, division
}

export const useCalculadora = () => {
    const [numeroAnterior, setNumeroAnterior] = useState('0');
    const [numero, setNumero] = useState('0');

    const ultimaOperacion = useRef <Operadores>()

    const limpiar = () => {
        setNumero('0');
        setNumeroAnterior('0');
    }

    const armarNumero = ( numeroTexto: string ) => {
        
        //para no aceptar doble punto decimal
        if( numero.includes('.') && numeroTexto === '.' )
        return;

        //para que el numero empiece sin 0
        if( numero.startsWith('0') || numero.startsWith('-0') ){

            // Si es el primer punto decimal
            if ( numeroTexto === '.'){
                setNumero( numero + numeroTexto);

                // evaluar si hay otro cero 
            } else if ( numeroTexto === '0' && numero.includes('.')){
                setNumero( numero + numeroTexto);
                //evaluar si es diferente de 0 y no tiene punto
            } else if ( numeroTexto !== '0' && !numero.includes('.')){
                setNumero( numeroTexto);
                //evitar 000.00
            } else if ( numeroTexto === '0' && !numero.includes('.')){
                setNumero(numero);
            } else {
                setNumero( numero + numeroTexto);
            }

        } else {
            setNumero (numero + numeroTexto);
        }

    }

    const btnDelete = () => {
        let negativo= '';
        let numeroTemp = numero;
        if ( numero.includes('-')){
            negativo = '-';
            numeroTemp = numero.substr(1);
        }
        if ( numeroTemp.length > 1 ){
            setNumero( negativo + numeroTemp.slice(0,-1));
        } else {
            setNumero('0');
        }
    }

    const positivoNegativo = (  ) => {
        if ( numero.includes('-')){
            setNumero( numero.replace('-', ''));
        } else {
            setNumero( '-' + numero);
        }
    }

    const cambiarNumPorAnterior = () => {
        if( numero.endsWith('.')){
            setNumeroAnterior(numero.slice(0,-1));
        } else {
            setNumeroAnterior(numero);
        }
        setNumero('0');
    }

    const botonDividir = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.division;
    }

    const botonMultiplicar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.multiplicacion;
    }

    const botonRestar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.resta;
    }

    const botonSumar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.suma;
    }

    const calcular = () => {
        const num1 = Number( numero );
        const num2 = Number (numeroAnterior );
        switch ( ultimaOperacion.current ) {
            case Operadores.suma:
                setNumero( `${ num2 + num1 }` );
                break;
            case Operadores.resta:
                setNumero( `${ num2 - num1 }` );
                break;
            case Operadores.multiplicacion:
                setNumero( `${ num2 * num1 }` );
                break;
            case Operadores.division:
                setNumero( `${ num2 / num1 }` );
                break;
        }
        setNumeroAnterior('0');
    }

    return {
        numeroAnterior, numero, limpiar, positivoNegativo, btnDelete, botonDividir, botonMultiplicar, botonRestar, botonSumar, armarNumero, calcular
    }

}

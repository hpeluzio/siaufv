"use strict"

export function checkRangeIntervalHorario (ini1, end1, ini2, end2) {
  var timeini1 = ini1
  var timeend1 = end1
  var timeini2 = ini2
  var timeend2 = end2

  if(timeini2 === timeini1 || 
      timeend2 === timeend1 || 
          timeini2 < timeini1 && timeend2 > timeini1 ||
            timeini2 > timeini1 && timeini2 < timeend1)
              return true //'INTERVALADO'

  if(timeend2 <= timeini1 || timeini2 >= timeend1)
    return false//'Não intervalado' 
}

export function normaliza (s) {
  return s.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "") 
}

export function jsPDFautoTable_rowSpan (array_t, coluna) {
  var index = 0

  array_t[0][eval("'"+coluna+"'")] = {rowSpan: 1, content: array_t[0][eval("'"+coluna+"'")] , styles: {valign: 'middle', halign: 'center'}}
  
  array_t.map( (rowAtual, indice, array) => {
    
    if(array[index][eval("'"+coluna+"'")].content === rowAtual[eval("'"+coluna+"'")] && index !== indice)
      array[index][eval("'"+coluna+"'")].rowSpan++

    if(array[index][eval("'"+coluna+"'")].content !== rowAtual[eval("'"+coluna+"'")] && index !== indice){
      index = array.indexOf(rowAtual)
      rowAtual[eval("'"+coluna+"'")] = {rowSpan: 1, content: rowAtual[eval("'"+coluna+"'")], styles: {valign: 'middle', halign: 'center'}}
    }
  })

  return array_t
}


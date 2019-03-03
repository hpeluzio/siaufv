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


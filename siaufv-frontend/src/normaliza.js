export default function(s) {
  return s.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}


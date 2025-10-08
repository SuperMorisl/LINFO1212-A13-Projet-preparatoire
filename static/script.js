function showDay() {
  let day = new Date();
  let days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  innerHTML = days[day.getDay()];
}


window.onload = showDay;      //dés que la page se charge on a le jour
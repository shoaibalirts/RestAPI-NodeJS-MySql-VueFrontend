export default function getCo2LevelColor(co2Value) {
  if (co2Value < 4.5) {
    // < 15
    return "green";
  } else if (co2Value > 4.4 && co2Value < 8) {
    //15-40
    return "yellow-darken-3";
  } else {
    // >40
    return "red";
  }
}

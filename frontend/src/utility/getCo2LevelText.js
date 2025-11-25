export default function getCo2LevelText(co2Value) {
  if (co2Value < 4.5) {
    // <15
    return "Lav";
  } else if (co2Value > 4.4 && co2Value < 8) {
    // 15-40
    return "Medium";
  } else {
    // >40
    return "Høj";
  }
}

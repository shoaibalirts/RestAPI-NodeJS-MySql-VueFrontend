/*
const indkoebsliste = [
  {
    id: "Y4PmfmkVQpcHnXU0xM6p",
    Products: ["AkiJTSTEXFqlDbOLYKVy", "IDA1sJ3jn8QjnhjjLnGd", "QFluw5Sp5eGgwKPyn9Iz"],
    CategoryName: "Fødseldagsfest",
  },
  {
    id: "oAJ8fLHDaQkygSy02ClC",
    Products: ["1", "2"],
    CategoryName: "Aftensmad",
  },
  {
    id: "x3NJolQsDDIXFuWxcT9k",
    CategoryName: "Rema 1000",
    Products: ["3", "4"],
  },
];

const newIndkoebsliste1 = indkoebsliste
  .map((item1) => {
    return item1.Products;
  })
  .flat();
console.log(newIndkoebsliste1);

*/

// const newIndkoebsliste2 = newIndkoebsliste1.flat();
// console.log(newIndkoebsliste2);

/*
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce(function (result, item) {
  console.log("Result: ", result);
  console.log("item: ", item);

  return result + item;
}, 0);
console.log(sum); // 10
*/

/*
const productsData = [
  {
    prodName: "Tomater",
    co2_per_kg: 1.4,
    prodId: 7,
  },
  {
    prodId: 3,
    prodName: "Hvedebrød",
    co2_per_kg: 1,
  },
  {
    prodId: 9,
    co2_per_kg: 6,
    prodName: "Kyllingebryst",
  },
];
const newProductsData = productsData.map((item) => item.co2_per_kg);
console.log(newProductsData);
const sum = newProductsData.reduce(function (result, item) {
  return result + item;
}, 0);
console.log(sum);
*/

// filteration of array based on dates
const arr = [
  {
    listName: "Fødseldagsfest",
    listCreatedDate: "05/10/2025",
    totalCO2: 7,
  },
  {
    listName: "Aftensmad",
    listCreatedDate: "07/10/2025",
    totalCO2: 4,
  },
  {
    listName: "New test list",
    listCreatedDate: "10/11/2025",
    totalCO2: 8.4,
  },
  {
    listName: "Rema 1000",
    listCreatedDate: "06/11/2025",
    totalCO2: 4.5,
  },
];

const days = 30;
// 1. Calculate the cutoff date (30 days ago)
const cutoffDate = new Date();
// console.log("cutoffDate: ", cutoffDate); // 2025-11-11

// Set the date 30 days in the past
cutoffDate.setDate(cutoffDate.getDate() - days); // 2025-10-11
// console.log("cutoffDate from 30 days: ", cutoffDate);

// Set hours/minutes/seconds to 0 for a clean day-based cutoff
cutoffDate.setHours(0, 0, 0, 0);
// console.log("cutoffDate from 30 days without hours: ", cutoffDate); // 2025-10-11 without time info

// 2. Filter the array using a custom parsing function

const recentItems = arr.filter((item) => {
  const dateString = item.listCreatedDate; // 10/11/2025
  // Custom parsing for DD/MM/YYYY format
  const parts = dateString.split("/");
  // NOTE: Month is 0-indexed (Jan=0, Feb=1, etc.), so we subtract 1 from the month part.
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  // Create a reliable Date object for the item
  const itemDate = new Date(year, month, day);

  // Check if the item's date is more recent than the cutoff date
  return itemDate >= cutoffDate; // latest 30 days. For last moth itemsDate < cutoffDate
});
console.log("Items from the last 30 days:");
console.log(recentItems);

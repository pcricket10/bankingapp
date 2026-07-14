// displays a menu with given title and entries
export function displayMenu(title, entries) {
  console.log("------------------------------")
  console.log(title);
  console.log("------------------------------")

  for (const [i, entry] of entries.entries()) {
    console.log(`${i + 1}: ${entry}`);
  }
  console.log("+----------------------------+");

}

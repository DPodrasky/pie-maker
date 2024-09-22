const readline = require("readline");
const colors = require("colors");

/******************************** CONSTANTS *********************************/
const applePieRecipe = [
  { name: "pie crust", cost: 10.00, quantity: 1 },
  { name: "sugar", cost: 3.00, quantity: 0.5 },
  { name: "butter", cost: 1.00, quantity: 1 },
  { name: "apples", cost: 6.00, quantity: 7 },
  { name: "cinnamon", cost: 5.50, quantity: 1 },
  { name: "eggs", cost: 2.00, quantity: 1 },
];

const pumpkinPieRecipe = [
  { name: "pie crust", cost: 10.00, quantity: 1 },
  { name: "sugar", cost: 3.00, quantity: 0.5 },
  { name: "butter", cost: 1.00, quantity: 1 },
  { name: "pumpkin", cost: 3.75, quantity: 2 },
  { name: "cinnamon", cost: 5.50, quantity: 1 },
  { name: "eggs", cost: 2.00, quantity: 1 },
];

const cherryPieRecipe = [
  { name: "pie crust", cost: 10.00, quantity: 1 },
  { name: "sugar", cost: 3.00, quantity: 0.5 },
  { name: "butter", cost: 1.00, quantity: 1 },
  { name: "cherries", cost: 12.00, quantity: 10 },
  { name: "eggs", cost: 2.00, quantity: 1 },
];

const recipes = {
  applePie: applePieRecipe,
  pumpkinPie: pumpkinPieRecipe,
  cherryPie: cherryPieRecipe
};
/* DO NOT CHANGE THE CODE ABOVE */

/*************************** FUNCTION TO REFACTOR ****************************/
function printIngredients(recipe, pieType) {
  let combiningMsg = `Combining ingredients for ${pieType}: `;
  combiningMsg += recipe.map(ingredient => ingredient.name).join(', ');
  console.log(combiningMsg .yellow);

}

function printNthPieBaked(index) {
  console.log(`Baked pie ${index + 1}!` .green);
}

function bakePies(recipe, pieType, pieQuantity) {
  for (let i = 0; i < pieQuantity; i++) {
    // Print the ingredients for each ingredient in the recipe
    printIngredients(recipe, pieType);

    // Print the nth pie that was baked
    printNthPieBaked(i);
  }
};

function printCostOfPie(recipe, costOfPie) {
  costOfPie = recipe.reduce((prev, current) => {
    return prev + current.cost;
  }, recipe[0].cost);

  console.log(`Cost per pie: ${costOfPie}` .green);
  return costOfPie;
}

function printTotalRevenue(totalCost, profitMargin = 1.2, pieQuantity) {
  const revenue = totalCost * (profitMargin);
  console.log(`Sold ${pieQuantity} pies for $${revenue.toFixed(2)}!` .green);
}

function bakeAndSellPies(pieType, pieQuantity, profitMargin) {
  // Find the recipe for the pieType specified
  const recipe = recipes[pieType];
  let costOfPie;

  // Bake the number of pies specified by the pieQuantity
  bakePies(recipe, pieType, pieQuantity);

  // Print the cost of each pie based on the cost of each ingredient
  costOfPie = printCostOfPie(recipe, costOfPie);

  // Calculate the total cost of all the pies
  const totalCost = costOfPie * pieQuantity;

  // Print the total revenue calculated using the given profitMargin
  printTotalRevenue(totalCost, profitMargin, pieQuantity);

}

/******************************* LOCAL TESTS *******************************/
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let pieType;
let quantity;
let profitMargin;



function launch() {
  console.clear();
  console.log("You will need to enter the pie type exactly to proceed (case sensitive) ");
  rl.question("Which type of pie are we making? applePie, pumpkinPie, or cherryPie? " .blue, handleType);
}

function handleType(answer) {
  if (answer == "applePie" || answer == "pumpkinPie" || answer == "cherryPie" ) {
  pieType = answer;
  console.log(`We're making ${pieType}s!`);
  rl.question("How many pies are we making? " .blue, handleQuantity);
  } else {
    launch();
  }
}

function handleQuantity(answer) {
  quantity = answer;
  console.log(`Production slated for ${quantity} pies!`);
  rl.question("what is the profit margin for this pie? " .blue, handleProfitMargin);
}

function handleProfitMargin(answer) {
  profitMargin = answer;
  console.log(`The profit margin is ${profitMargin}`);
  bakeAndSellPies(pieType, quantity, profitMargin);
  rl.question("Do you want to do another calculation? y/n " .blue, handleGoAgain);
}

function handleGoAgain(answer) {
  if (answer == "y") {
    launch()
  } else {
    console.log("Goodbye!");
    rl.close();
  }
}


launch();

// bakeAndSellPies("pumpkinPie", 2);
// bakeAndSellPies("cherryPie", 7, 1.7);

/**************************************************************************/
/* DO NOT CHANGE THE CODE BELOW */
module.exports = {
  bakeAndSellPies
};

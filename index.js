// ===============================================
// Code to fetch and display the weather for a
// user provided city and state.
//
// Jaxcode Day 11 Homework Assignment
//
// Author: Kelsey McClanahan
// Date:   11/22/2020
// ===============================================

// alert(
//   "Hello World\nThis lets us know the JavaScript\nsource is linked with this page.\n\nThis form is non-functional at the moment."
// );

/**  ************************************************************
 **                                                            **
 **  NONE OF THE CODE BELOW IS RELEVANT TO THIS PROJECT !!!!!  **
 **                                                            **
 **  I will reuse some of it, but for now don't pay attention  **
 **  to it...                                                  **
 **                                                            **
 **  ************************************************************
 */

// // Grab references to the form and it's controls
// const tipForm = document.getElementById("tip-form");
// const billAmountInput = document.getElementById("bill-amount");
// const serviceRatingInput = document.getElementById("service-rating");
// const dinerCountInput = document.getElementById("diner-count");
// const tipAmountLabel = document.getElementById("tip-label");
// const tipAmountOutput = document.getElementById("tip-amount");
// const calcButton = document.getElementById("calc-btn");

// // Define function to Calculate a Tip
// const calculateTip = (bill_amount, service_rating, diner_count) => {
//   let tipPercent = 0.0; // tip percentage
//   let totalTip = 0.0; // calculated total tip
//   let tipPerDiner = 0.0; // tip amount per diner

//   // first, get the tip percentage based on the service rating
//   switch (service_rating) {
//     case "excellent":
//       tipPercent = 0.25;
//       break;
//     case "good":
//       tipPercent = 0.2;
//       break;
//     case "ok":
//       tipPercent = 0.15;
//       break;
//     case "mediocre":
//       tipPercent = 0.1;
//       break;
//     case "terrible":
//       tipPercent = 0.05;
//       break;
//   }

//   // now, calculate the total tip for the bill
//   totalTip = bill_amount * tipPercent;

//   // finally, calculate the total owed by each diner
//   tipPerDiner = totalTip / diner_count;

//   // return calculated result
//   return tipPerDiner;
// };

// // Add an event listener to handle a Calculate request
// tipForm.addEventListener("submit", (event) => {
//   event.preventDefault();

//   // Grab the form input values
//   let billAmount = billAmountInput.value;
//   let serviceRating = serviceRatingInput.value;
//   let dinerCount = dinerCountInput.value;

//   // Calculate a tip based on form inputs
//   let tip = calculateTip(billAmount, serviceRating, dinerCount);

//   // Create the tip amount fixed string to only display two decimal places
//   let tipFixed = tip.toFixed(2);

//   // Finally, display tip amount and darken text color (which was dimmed)
//   tipAmountOutput.textContent = tipFixed;
//   tipAmountLabel.setAttribute("style", "color: #333333");
//   tipAmountOutput.setAttribute("style", "color: #333333");
// });

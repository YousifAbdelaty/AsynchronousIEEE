// Synchronous example
console.log("Start");
function fetchData() {
  // Simulate a long-running operation
  for (let i = 0; i < 1000000000; i++) {}
  return "Data fetched";
}
const data = fetchData();
console.log(data);
console.log("End");

//#############//

//Asynchronous example

// #1
console.log("start");
function fetchData(callback) {
  setTimeout(() => {
    callback("Data fetched");
  }, 2000);
}
fetchData((data) => {
  console.log(data);
});
console.log("End");
//-----------------------------------//
//#2
function greetAsync(name, callback) {
  setTimeout(function () {
    console.log("Hello, " + name + "!");
    callback(); // Call the provided callback function after delay
  }, 2000); // Simulate a 2-second delay
}

greetAsync("Jane", function () {
  console.log("Callback executed after greeting.");
});

console.log("This line executes immediately after greetAsync is called.");

//#################################//

// callback example

//#1
function greetAsync(name, callback) {
  setTimeout(function () {
    if (name) {
      console.log("Hello, " + name + "!");
      callback(null); // Pass null to indicate success
    } else {
      callback(new Error("Name is required")); // Pass error object
    }
  }, 2000);
}

greetAsync("Alice", function (err) {
  if (err) {
    console.error("Error:", err.message); // Handle the error
  } else {
    console.log("Greeting completed successfully.");
  }
});
//------------------------//
//#2 (callback hell)

// Using the functions to demonstrate callback hell
placeOrder("Margherita", (pizzaType) => {
  prepareIngredients(pizzaType, (pizzaType) => {
    makePizza(pizzaType, (pizzaType) => {
      bakePizza(pizzaType, (pizzaType) => {
        completeOrder(pizzaType);
      });
    });
  });
});

function placeOrder(pizzaType, callback) {
  console.log(`Order placed for ${pizzaType} pizza.`);
  setTimeout(() => {
    callback(pizzaType);
  }, 1000);
}

function prepareIngredients(pizzaType, callback) {
  console.log(`Preparing ingredients for ${pizzaType} pizza.`);
  setTimeout(() => {
    callback(pizzaType);
  }, 1000);
}

function makePizza(pizzaType, callback) {
  console.log(`Making ${pizzaType} pizza.`);
  setTimeout(() => {
    callback(pizzaType);
  }, 1000);
}

function bakePizza(pizzaType, callback) {
  console.log(`Baking ${pizzaType} pizza.`);
  setTimeout(() => {
    callback(pizzaType);
  }, 2000);
}

function completeOrder(pizzaType) {
  console.log(`${pizzaType} pizza is done! Ready for delivery.`);
  setTimeout(() => {
    console.log(`${pizzaType} pizza delivered! Enjoy your meal.`);
  }, 1000);
}
//########################//

//promise examples
//#1

function fetchData(url) {
  // Function that returns a promise from a fetch operation
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

// Using the promise to fetch data from an API
fetchData("https://jsonplaceholder.typicode.com/posts/1")
  .then(console.log) // Logs the fetched data if successful
  .catch(console.error) // Logs an error if the fetch operation fails
  .finally(() => console.log("Fetch operation complete.")); // Always executed
//-------------------//
// #2
//(the call back version of the pizza promise)
//const validSizes = ["small", "medium", "large"];

// function orderPizzaCallback(size, callback) {
//     if (validSizes.includes(size)) {
//         console.log(`Placing order for a ${size} pizza...`);
//         setTimeout(() => {
//             const confirmation = `Your ${size} pizza order is confirmed!`;
//             preparePizzaCallback(confirmation, (preparedPizza) => {
//                 deliverPizzaCallback(preparedPizza, (deliveryStatus) => {
//                     callback(deliveryStatus);
//                 }, (deliveryError) => {
//                     console.error("Delivery error:", deliveryError);
//                 });
//             }, (preparationError) => {
//                 console.error("Preparation error:", preparationError);
//             });
//         }, 1000);
//     } else {
//         callback(null, new Error("Invalid pizza size. Please choose small, medium, or large."));
//     }
// }

// function preparePizzaCallback(confirmation, onSuccess, onError) {
//     console.log("Preparing your pizza...");
//     setTimeout(() => {
//         if (Math.random() > 0.1) {
//             const preparedPizza = `${confirmation} - Pizza is ready for delivery!`;
//             onSuccess(preparedPizza);
//         } else {
//             onError(new Error("Uh oh! Your pizza burned. We'll make you a new one."));
//         }
//     }, 2000);
// }

// function deliverPizzaCallback(preparedPizza, onSuccess, onError) {
//     console.log("Delivering your pizza...");
//     setTimeout(() => {
//         if (Math.random() > 0.05) {
//             const deliveryStatus = `${preparedPizza} - Delivered! Enjoy your hot pizza!`;
//             onSuccess(deliveryStatus);
//         } else {
//             onError(new Error("Delivery mishap! We'll try to redeliver your pizza soon."));
//         }
//     }, 3000);
// }

// const desiredSize = "medium";

// orderPizzaCallback(desiredSize, (result, error) => {
//     if (error) {
//         console.error("Error:", error.message);
//     } else {
//         console.log(result);
//     }
// });

//the same pizza example that we just coded in callback hell to demonstrate the  impact of promise in chainning async operations
const validSizes = ["small", "medium", "large"];

const orderPizza = (size) =>
  validSizes.includes(size)
    ? new Promise((resolve) => {
        console.log(`Placing order for a ${size} pizza...`);
        setTimeout(
          () => resolve(`Your ${size} pizza order is confirmed!`),
          1000
        );
      })
    : Promise.reject(
        new Error("Invalid pizza size. Please choose small, medium, or large.")
      );

const preparePizza = (confirmation) =>
  new Promise((resolve, reject) => {
    console.log("Preparing your pizza...");
    setTimeout(() => {
      Math.random() > 0.1
        ? resolve(`${confirmation} - Pizza is ready for delivery!`)
        : reject(
            new Error("Uh oh! Your pizza burned. We'll make you a new one.")
          );
    }, 2000);
  });

const deliverPizza = (preparedPizza) =>
  new Promise((resolve, reject) => {
    console.log("Delivering your pizza...");
    setTimeout(() => {
      Math.random() > 0.05
        ? resolve(`${preparedPizza} - Delivered! Enjoy your hot pizza!`)
        : reject(
            new Error(
              "Delivery mishap! We'll try to redeliver your pizza soon."
            )
          );
    }, 3000);
  });

const desiredSize = "medium";

orderPizza(desiredSize)
  .then(preparePizza)
  .then(deliverPizza)
  .then(console.log)
  .catch((error) => console.error("Error:", error.message))
  .finally(() => console.log("Pizza order process completed."));
//########################3//
// async funcs example
//#1
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error for handling in the calling code
  }
}

fetchData("https://api.example.com/data")
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
//---------------------//
//#2
async function processData(data) {
  try {
    const processedData = await someAsyncProcessingFunction(data); // Simulate async processing
    const result = await anotherAsyncOperation(processedData); // Simulate another async step
    return result;
  } catch (error) {
    console.error("Error processing data:", error);
    // Handle error, e.g., retry, log, or return a default value
    return { error: error.message };
  }
}

processData(someInitialData)
  .then((result) => {
    console.log("Processed data:", result);
  })
  .catch((error) => {
    console.error("Overall error:", error);
  });

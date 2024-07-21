# Welcome to Zensurance Technical Assignment!

### We are so excited that you have decided to move forward with our interview process! Here are the details regarding how to get started with the assignment!

#### Getting Started

- This assignment consists of 4 parts, with each part defined under directories `part-1`, `part-2`, `part-3` and `part-4`.

- There will be additional commented out code explanation of the requirements for each part.

- Please head over to `package.json` to have a look at the scripts for executing the tests or files.

- Please address the areas where the comment filled in with `TODO: Your body goes here`.

#### Submitting your completed code

- As you start saving the changes to your assignment within Stackblitz, it will automatically fork the repository.

- We strongly recommend creating an account with Stackblitz via a Github Account, to help you store the solutions and get back to it
  anytime you would like, otherwise, if you lose the tab, your changes may not be stored, be sure to keep the link!

- How to fork this repository after creating your account?

  - Click the "Fork" Icon at the top left corner of the link provided to you. (You are here!)

- Once you complete your assignment, you need to share with us your completed code, to do this, either:

  - Share Via Stackblitz: Click on "Share" button at the top left, and email us the Editor URL OR:

  - Share Via File Transfer: Download the project using the download icon on the left sidenav, and email us the .zip or a link to an accessible location of it!

## Ready to start? Let's get to it!

## Part 1

Using the data under `<rootDir>/shared` directory, implement the bodies of the four functions so that all the required tests pass.

- Implement the function bodies.

- Bonus points if you use mingo, for Reference:

  - https://www.npmjs.com/package/mingo

  - Mingo is not currently installed, you will need to install this as part of the package.json.

- Using the terminal at the bottom of stackblitz, ensure that implemented solutions make the tests pass!

  - To run the tests, run: `npm run part1test`.

  - BONUS: Add three more test scenarios that will help ensure that the functions are covering as many cases as possible!

- Head over to `part-1` directory to get started!

## Part 2

- Task 1

  - Your task is to update the `Price` class so that the following code produces the correct result as held by the `result` constant.

- Task 2
  - Your task is to implement `NestedClass` so that the following code also produces the correct results without affecting `Price` (i.e.: both classes need to work on their own).

* Again, using the terminal at the bottom of stackblitz, ensure that implemented solutions make the tests pass!

  - To run the tests, run: `npm run part2test`.

  - BONUS: Add more test scenarios that will help ensure that the functions are covering as many cases as possible!

* Head over to `part-2` directory to get started!

## Part 3

- Given a list of prices (priceBank), and a user instance, calculate the getPrice() for the provided user set with given question banks and roles, based on the expected outcomes for each task.

- Again, using the terminal at the bottom of stackblitz, ensure that implemented solutions make the tests pass!

  - To run the tests, run: `npm run part3test`.

  - BONUS: Add more test scenarios that will help ensure that the functions are covering as many cases as possible!

- Head over to `part-3` directory to get started!

## Part 4

- Given a set of Providers, and a PricingEngine, implement the method getLowestPrice inside the PricingEngine class that is responsible for allowing competition between different providers given a timeout.

- The getLowestPrice method of the PricingEngine class will receive an expected timeout, and a list of providers. It is this methods responsbility to call a method getPrice on each provider.

- Once prices are returned from all providers, you should return the lowest price found, as an object that includes both a provider, and a price.

- If the provider does not send a price before the specified timeout, their price should not be taken into account.

- If the provider returns null as a price, their price should be ignored.

- If an error is thrown by the providers getPrice method, their result should be ignored, but the PricingEngine should still return a result from the remaining providers.

- When you are ready to test your solution, using the terminal at the bottom of stackblitz run: `npm run part4`.

- Head over to `part-4` directory to get started!

### Good Luck!

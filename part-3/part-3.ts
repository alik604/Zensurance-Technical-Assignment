/**
 * @typedef Type IPrice
 * A blueprint of what Price Data might look like.
 */

type PriceData = {
    fee: number;
    premium: number;
    // For the simplicity of this task's context, let's assume that the industry was a part of price given.
    industry: 'legal' | 'food';
};

/**
 * @classdesc Price
 */
export class Price {
    fee: number;
    premium: number;
    industry: string;

    constructor(price: PriceData) {
        this.fee = price.fee;
        this.premium = price.premium;
        this.industry = price.industry;
    }
}

type IQuestionBank = {
    industry: 'legal' | 'food';
    industryActivities?: string[];
    worksOutsideOfCanada?: 'yes' | 'no';
    agreesWithTermsAndConds?: 'yes' | 'no';
};

type UserData = {
    firstName: string;
    lastName: string;
    questionBank: IQuestionBank;
    role: 'user' | 'broker';
};

/**
 * @classdesc User
 * is responsible for retreiving potential prices for its intance using PriceEngine Class.
 */
class User {
    user: UserData;

    constructor(user: UserData) {
        this.user = user;
    }

    getPrice() {
        return PriceEngine.getPrice(this.user);
    }
}

const foodPrice1 = new Price({
    premium: 100,
    fee: 10,
    industry: 'food',
});

const foodPrice2 = new Price({
    premium: 120,
    fee: 15,
    industry: 'food',
});

const priceBank = [foodPrice1, foodPrice2];

/**
 * @classdesc PriceEngine
 * Responsible for getting the price based on the userset.
 * Ensure that the getPrice() provides the necessary business logic to retrieve the expected outcomes.
 */
class PriceEngine {
    constructor() {
    }

    /**
     * Given a list of prices (priceBank), and a user instance,
     * calculate the getPrice() for the provided user set with given question banks and roles, based on the expected outcomes for each task.
     * Note that each user instance calls this method and expects the related outcomes, respectively.
     * Please feel free to use other helper methods to help you achieve the expected outcomes.
     */

    static getPrice(user: UserData) {
        if (user.questionBank.agreesWithTermsAndConds === 'no') {
            // A user response should consist of a priceResult property with a description property with the value of 'No price selected'.
            if (user.role === 'user') {
                return {
                    priceResult: {description: 'No price selected'},
                };
            } else if (user.role === 'broker') {
                return {
                    priceResult: {description: 'No price selected'},
                    possiblePrices: priceBank,
                };
            }
        } else {
            const prices = priceBank.map(price => price.premium);
            const lowestPrice = Math.min(...prices);
            const highestPrice = Math.max(...prices);

            if (user.role === 'user') {
                return {
                    priceResult: {lowestPrice, highestPrice},
                };
            } else if (user.role === 'broker') {
                return {
                    priceResult: {lowestPrice, highestPrice},
                    possiblePrices: priceBank,
                };
            }
        }
    }
}


/**
 * NOTE: Below are written functions that are being used in part-2.spec.ts file to test the getPrice() results.
 * No action required. However, please feel free to use them for debugging purposes.
 * Please check part2-spec.ts for the expected outcomes of each task function.
 */

/**
 * TASK 1
 * Ensure that the food user's getPrice() method returns a user response.
 * A user response should consist of a priceResult property with highest and lowest prices.
 *
 * Example Expected Outcome:
 *
 *  {
 priceResult: { lowestPrice: 20, highestPrice: 500 }
 }
 *
 */
export function

task1() {
    const foodUser = new User({
        firstName: 'John',
        lastName: 'Doe',
        role: 'user',
        questionBank: {
            industry: 'food',
            industryActivities: ['Wine'],
        },
    });

    const returnedPrice = foodUser.getPrice();
    return returnedPrice;
}

/**
 * TASK 2
 * Ensure that the food user's getPrice() method returns a broker response.
 * A broker response should consist of a priceResult property that has
 * the lowest and highest price available. Additionally, all the other prices available for the customer. (In this part 2 case, let's assume that there will be prices.)
 *
 * Example Expected Outcome:
 *
 *  {
 *    priceResult: { lowestPrice: 200, highestPrice: 500 },
 *    possiblePrices: [
 *      Price { fee: 10, premium: 500, industry: 'food' },
 *       Price { fee: 15, premium: 200, industry: 'food' }
 *     ]
 *   }
 *
 */
export function

task2() {
    const foodUser = new User({
        firstName: 'Jane',
        lastName: 'Doe',
        role: 'broker',
        questionBank: {
            industry: 'food',
            industryActivities: ['FoodDelivery'],
        },
    });

    const returnedPrice = foodUser.getPrice();
    return returnedPrice;
}

/**
 * Ensure that the food user's disqualification message returns a user response. The reason is that the user has responded to a question that blocked them from getting a price, in this case, that is "agreesWithTermsAndConds" with a value of "no".
 * A user response should consist of a priceResult property with a description property with the value of 'No price selected'.
 *
 * Example Expected Outcome:
 *
 *  {
 priceResult: { description: 'No price selected' },
 }
 *
 */

export function

task3() {
    const foodUser = new User({
        firstName: 'John',
        lastName: 'Smith',
        role: 'user',
        questionBank: {
            industry: 'food',
            industryActivities: ['BarLounge', 'FoodDelivery'],
            agreesWithTermsAndConds: 'no',
        },
    });

    const returnedPrice = foodUser.getPrice();
    return returnedPrice;
}

/**
 * Ensure that the food user's disqualification message returns a broker response. The reason is that the user has responded to a question that blocked them from getting a price, in this case, that is "agreesWithTermsAndConds" with a value of "no".
 * A broker response should consist of a priceResult property along with
 * the lowest and highest price available if any.
 *
 * Example Expected Outcome:
 *
 *  {
 priceResult: { description: 'No price selected' },
 possiblePrices: [
 Price { fee: 10, premium: 500, industry: 'food' },
 Price { fee: 15, premium: 200, industry: 'food' }
 ]
 }
 *
 */

export function

task4() {
    const foodUser = new User({
        firstName: 'John',
        lastName: 'Smith',
        role: 'broker',
        questionBank: {
            industry: 'food',
            industryActivities: ['CoffeeShop'],
            agreesWithTermsAndConds: 'no',
        },
    });

    const returnedPrice = foodUser.getPrice();
    return returnedPrice;
}

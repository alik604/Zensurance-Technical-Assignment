/**
 * Refer to the following data when completing your answers: (The following JSON
 * file contains providers available for an industry)
 */

const PROVIDERS = require('../shared/data.json');

/**
 * Create a query that returns total premiums and fees available for retail industry
 */
function task1() {

    let totalPremium = 0;
    let totalFees = 0;
    for (const provider of PROVIDERS) {
        if (provider.industry === 'retail') {
            for (const price of provider.prices) {
                if (price.premium) {
                    totalPremium += price.premium;
                }
                if (price.fee) {
                    totalFees += price.fee;
                }
            }
        }

    }
    return [{
        totalPremium,
        totalFees
    }];
}

/**
 * Create a query that returns the minimum premium available among the providers for technology industry
 */
function task2() {

    let min = Infinity;
    for (const provider of PROVIDERS) {
        if (provider.industry === 'technology') {
            for (const price of provider.prices) {
                if (price.premium < min) {
                    min = price.premium;
                }
            }
        }
    }

    return [{
        totalPremium: min
    }];
}

/**
 * Create a query that returns all the provider names available for the technology industry
 * that has a premium amount greater than or equal to 1000
 */
function task3() {

    let names = [];
    for (const provider of PROVIDERS) {
        if (provider.industry === 'technology') {

            for (const price of provider.prices) {
                if (price.premium >= 1000) { // IRL dont hard code this
                    names.push(provider.name);
                }
            }
        }
    }

    return names;

}

/**
 * To see the expected results, please refer to ./expected-data.json file in part-1 directory!
 * NOTE: Please ensure that all the tests in part-1.spec.js are passing!
 */

module.exports = {
    task1,
    task2,
    task3,
};

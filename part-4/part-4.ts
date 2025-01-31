import {scenarios} from './part-4.utils';

/**
 * @classdesc PricingEngineRunner
 * Responsibile for running test scenarios for a given PricingEngine.
 * Note: No Action Required. Provided for testing purposes only.
 */
class PricingEngineRunner {
    constructor() {
    }

    async runTests(pricingEngine: any) {
        for (const scenario of scenarios) {
            const result = await pricingEngine.getLowestPrice(
                scenario.timeout,
                scenario.providers
            );

            if (!result && scenario.result != null) {
                console.log(`TEST FAILED [#${scenario.id}]: Got no result`);
            } else if (
                result &&
                (result.provider.id != scenario.result.provider.id ||
                    result.price != scenario.result.price)
            ) {
                const expected = `${scenario.result.provider.name} at \$${scenario.result.price}`;
                const got = `${result.provider.name} at \$${result.price}`;
                console.log(
                    `TEST FAILED [#${scenario.id}]: Expected ${expected}, got ${got}`
                );
            } else if (result === null && scenario.result === null) {
                console.log(`SUCCESS [#${scenario.id}]: Got no result as expected`);
            } else {
                const expected = `${scenario.result.provider.name} at \$${scenario.result.price}`;
                console.log(`SUCCESS [#${scenario.id}]: Got expected ${expected}`);
            }
        }
    }
}

/**
 * Implement the method 'getLowestPrice' in class 'PricingEngine' that is responsible for receiving prices
 * from multiple other provider classes.
 *
 * There will be multiple scenarios that will run, each one with an expected result.
 *
 * The timeout is the main determines for providers to compete and if unable to send price within the
 * given time, the result may change.
 *
 * It can be either an object containing a provider and a price, or null, if no result returned in time.
 *
 */
class PricingEngine {
    /**
     * TODO: Implement this method that has a maximum timeout, and a list of
     * provider instances as parameters, each of which you can call getPrice() on, to return a price. This method
     * is asynchronous and will return in a specific time with either an object, or a null value.
     *
     *  The Initial state of the test result will be:
     *
     *  TEST FAILED [#1]: Got no result
     *  TEST FAILED [#2]: Got no result
     *  TEST FAILED [#3]: Got no result
     *  TEST FAILED [#5]: Got no result
     *  TEST FAILED [#6]: Got no result
     *  (node:9) UnhandledPromiseRejectionWarning: TypeError: Cannot read properties of null (reading 'provider')
     *
     *  After completing the task, the expected output should be:
     *
     *  SUCCESS [#3]: Got expected Provider 3 at $200
     *  SUCCESS [#4]: Got no result as expected
     *  SUCCESS [#5]: Got expected Provider 1 at $250
     *  SUCCESS [#6]: Got expected Provider 3 at $325
     *  SUCCESS [#2]: Got expected Provider 1 at $300
     *  SUCCESS [#1]: Got expected Provider 2 at $250
     *
     */

    // I could not figure out how to handle the timeout properly. seems the late value will be added ad-hoc. I resorted too a flag to avoid the issue
    // As you can tell, I dont use node.js too often (used when needed. Past work is mainly Python and Java). But of course lang doesn't really matter
    async getLowestPrice(timeout: number, providers: any) {
        let result = null;
        let providerResults = [];
        for (const provider of providers) {
            let flag = true;
            // { provider: { id: 2, name: 'Provider 2' }, price: 250 }

            // get price from provider. check the timeout, if there is a error, return null
            const price = await new Promise((resolve, reject) => {
                const timer = setTimeout(function () {
                        resolve(null);
                        flag = false;
                    }, timeout
                );
                provider.getPrice().then((price: unknown) => {
                    clearTimeout(timer);
                    resolve(price);
                }).catch(() => {
                    clearTimeout(timer);
                    resolve(null);
                    flag = false;
                });
            });

            //const price = await provider.getPrice(); // passed 1, 3, 4, 5
            console.log(price);
            providerResults.push({provider, flag});
        }

        providerResults = providerResults.filter(provider => provider.provider.price != null && provider.provider.price >= 0 && provider.flag);
        if (providerResults.length > 0) {
            providerResults.sort((a, b) => a.provider.price - b.provider.price);

            //console.log(providerResults);
            result = providerResults[0].provider;
        }
        return result;

    }
}

const pricingEngineRunner = new PricingEngineRunner();

/**
 * Note: No Action is Required, for testing purposes only.
 */
async function

run() {
    const pricingEngine = new PricingEngine();
    await pricingEngineRunner.runTests(pricingEngine);
}

run();

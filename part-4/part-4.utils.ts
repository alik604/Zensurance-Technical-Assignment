export const provider1 = { id: 1, name: 'Provider 1' };
export const provider2 = { id: 2, name: 'Provider 2' };
export const provider3 = { id: 3, name: 'Provider 3' };

interface IProviderResult {
  getPrice(): Promise<any>;
}

export class ProviderResult implements IProviderResult {
  provider: any;
  timeout: number;
  price: number;
  throwError: boolean;

  constructor(
    provider: any,
    timeout: number,
    price: number,
    throwError: boolean = false
  ) {
    this.provider = provider;
    this.timeout = timeout;
    this.price = price;
    this.throwError = throwError;
  }

  async getPrice() {
    const result = await new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (this.throwError) {
          reject();
        } else {
          resolve(
            this.price !== null
              ? {
                  provider: this.provider,
                  price: this.price,
                }
              : null
          );
        }
      }, this.timeout);
    });

    return result;
  }
}

type Provider = {
  id: number;
  name: string;
};

type IScenarioData = {
  id: number;
  timeout: number;
  providers: ProviderResult[];
  result: {
    provider: Provider | null;
    price: number;
  };
};

export const scenarios: IScenarioData[] = [
  {
    id: 1,
    timeout: 2000,
    providers: [
      new ProviderResult(provider1, 800, 300),
      new ProviderResult(provider2, 1200, 250),
      new ProviderResult(provider3, 900, 500),
    ],
    result: {
      provider: provider2,
      price: 250,
    },
  },
  {
    id: 2,
    timeout: 1000,
    providers: [
      new ProviderResult(provider1, 800, 300),
      new ProviderResult(provider2, 1200, 250),
      new ProviderResult(provider3, 900, 500),
    ],
    result: {
      provider: provider1,
      price: 300,
    },
  },
  {
    id: 3,
    timeout: 1000,
    providers: [
      new ProviderResult(provider1, 800, 300),
      new ProviderResult(provider2, 700, null),
      new ProviderResult(provider3, 900, 200),
    ],
    result: {
      provider: provider3,
      price: 200,
    },
  },
  {
    id: 4,
    timeout: 1000,
    providers: [
      new ProviderResult(provider1, 800, null),
      new ProviderResult(provider2, 700, null),
      new ProviderResult(provider3, 900, null),
    ],
    result: null,
  },
  {
    id: 5,
    timeout: 1000,
    providers: [
      new ProviderResult(provider1, 800, 250),
      new ProviderResult(provider2, 700, -5),
      new ProviderResult(provider3, 900, 300),
    ],
    result: {
      provider: provider1,
      price: 250,
    },
  },
  {
    id: 6,
    timeout: 1000,
    providers: [
      new ProviderResult(provider1, 800, 250, true),
      new ProviderResult(provider2, 700, 500),
      new ProviderResult(provider3, 900, 325),
    ],
    result: {
      provider: provider3,
      price: 325,
    },
  },
];

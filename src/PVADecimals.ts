import { unit } from '@deland-labs/ic-dev-kit';
import BigNumber from 'bignumber.js';
import * as math from 'mathjs';

export const WICP_Decimals = 8;
export const WUSD_Decimals = 8;

const fmt = {
  decimalSeparator: '.',
  groupSeparator: '',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: '',
  fractionGroupSize: 0,
};

// Set the global formatting options
BigNumber.config({ FORMAT: fmt });

export class PVADecimals {
  public static PRICE_DECIMALS = 32;
  public volume_decimals: number;
  public amount_decimals: number;
  public price_decimals: number;

  constructor() {
    this.volume_decimals = WICP_Decimals;
    this.amount_decimals = WUSD_Decimals;
    this.price_decimals = PVADecimals.PRICE_DECIMALS;
  }

  public toPrice(value: string): bigint {
    const n = new BigNumber(math.evaluate(value))
      .shiftedBy(this.price_decimals)
      .dp(0);
    return BigInt(n.toFormat());
  }

  public toVolume(value: string): bigint {
    const n = new BigNumber(math.evaluate(value))
      .shiftedBy(this.volume_decimals)
      .dp(0);
    return BigInt(n.toFormat());
  }

  public toAmount(value: string): bigint {
    const n = new BigNumber(math.evaluate(value))
      .shiftedBy(this.amount_decimals)
      .dp(0);
    return BigInt(n.toFormat());
  }

  public setPriceDecimals(value: number) {
    this.price_decimals = value;
  }

  public setVolumeDecimals(value: number) {
    this.volume_decimals = value;
  }

  public setAmountDecimals(value: number) {
    this.amount_decimals = value;
  }
}

export const defaultPVADecimals = new PVADecimals();

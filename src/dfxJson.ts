import * as fs from 'fs';
import { Principal } from '@dfinity/principal';
import { CanisterDto, CanisterJson } from './pendingOrder.dto';
import * as math from 'mathjs';
import { defaultPVADecimals } from './PVADecimals';

export const get_canister_json = (): CanisterJson => {
  const file_content = fs.readFileSync('./src/assets/canister.json', 'utf8');
  return JSON.parse(file_content);
};

export const get_host = (): string => {
  const canister_json = get_canister_json();
  return canister_json.host;
};

export const get_canister_id = (name: string): Principal => {
  const canister_json = get_canister_json();
  return Principal.fromText(canister_json.canisters[name]);
};

export const get_max_price = (): number => {
  const canister_json = get_canister_json();
  return math.evaluate(canister_json.maxPrice);
};
export const get_min_price = (): number => {
  const canister_json = get_canister_json();
  return math.evaluate(canister_json.minPrice);
};
export const get_max_volume = (): number => {
  const canister_json = get_canister_json();
  return math.evaluate(canister_json.maxVolume);
};
export const get_min_volume = (): number => {
  const canister_json = get_canister_json();
  return math.evaluate(canister_json.minVolume);
};

export const get_random_price = (): bigint => {
  const price =
    Math.floor(Math.random() * (get_max_price() - get_min_price() + 1)) +
    get_min_price();
  return defaultPVADecimals.toPrice((price / math.evaluate('10^4')).toString());
};

export const get_random_volume = (): bigint => {
  const volume =
    Math.floor(Math.random() * (get_max_volume() - get_min_volume() + 1)) +
    get_min_volume();
  return (
    defaultPVADecimals.toVolume((volume / math.evaluate('10^8')).toString()) +
    defaultPVADecimals.toVolume('123')
  );
};

export const get_order_count = (): number => {
  const canister_json = get_canister_json();
  return canister_json.orderCount;
};

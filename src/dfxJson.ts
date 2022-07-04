import * as fs from 'fs';
import { Principal } from '@dfinity/principal';
import { CanisterDto, CanisterJson } from './pendingOrder.dto';
import * as math from 'mathjs';

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

export const get_max = (): number => {
  const canister_json = get_canister_json();
  return math.evaluate(canister_json.max);
};
export const get_min = (): number => {
  const canister_json = get_canister_json();
  return math.evaluate(canister_json.min);
};
export const get_order_count = (): number => {
  const canister_json = get_canister_json();
  return canister_json.orderCount;
};

import * as fs from 'fs';
import { Principal } from '@dfinity/principal';
import { CanisterDto, CanisterJson } from './pendingOrder.dto';

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
  console.log(canister_json.canisters[name]);
  return Principal.fromText(canister_json.canisters[name]);
};

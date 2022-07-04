import * as fs from 'fs';
import { Principal } from '@dfinity/principal';
import { MonitorJson } from './monitor.dto';

export const get_canister_ids_json = (): any => {
  const file_content = fs.readFileSync('./assets/canister_ids.json', 'utf8');
  const canister_ids = JSON.parse(file_content);
  return canister_ids;
};

export const get_monitor_json = (): MonitorJson => {
  const file_content = fs.readFileSync('./assets/monitor.json', 'utf8');
  return JSON.parse(file_content);
};

export const get_host = (): string => {
  const monitor_json = get_monitor_json();
  return monitor_json.host;
};

export const get_monitor_principal = (): Principal => {
  const monitor_json = get_monitor_json();
  return Principal.fromText(monitor_json.monitorPrincipal);
};

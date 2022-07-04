




@Injectable()
export class MonitorService {
    constructor(private logger: Logger) {}

    async getCanisterStatus(
        canisterId: Principal,
    ): Promise<CanisterStatusResponse> {
        const actor = createMonitorActor('icnaming_monitor');
        const response = await actor.get_canister_status(canisterId);
        if ('Ok' in response) {
            this.logger.debug(response.Ok);
            return response.Ok;
        } else {
            this.logger.debug('call actor error');
            return undefined;
        }
    }
}

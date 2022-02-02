import { Service } from './service';

class RewardGatewayService extends Service{
	private defaultEndpoint = 'https://hiring.rewardgateway.net';
	private defaultCredentials = {
		username: 'medium',
		password: 'medium',
	};

	async getEmployeeList() {
		const headers = new Headers();
		headers.append('Authorization', this.basicAuthGenerator(this.defaultCredentials.username, this.defaultCredentials.password));
		headers.append('Content-Type', 'application/json');
		return await this.handleRequest(`${this.defaultEndpoint}/list`, 'GET', headers);
	}
}


export default new RewardGatewayService();
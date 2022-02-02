import { Service } from './service';

export interface EmployeeEntity {
	uuid: string,
	company: string,
	bio: string,
	name: string,
	title: string,
	avatar: string
}
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
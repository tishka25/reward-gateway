export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'UPDATE';


export class Service {
	protected basicAuthGenerator(username: string, password: string) {
		const hash = btoa(`${username}:${password}`);
		return `Basic ${hash}`;
	}

	protected async handleRequest(url: string, method: RequestMethod = 'GET', headers?: HeadersInit, body?: string) {
		try {
			const response  = await fetch(url, {
				method,
				headers,
				body,
			});
			return await response.json();
		} catch (error) {
			console.error(error);
			return false;
		}
	}
}
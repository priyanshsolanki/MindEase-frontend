import axios from 'axios';

const baseURL = 'http://localhost:8080';

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 10000,
	headers: {
		Authorization: localStorage.getItem('token')
			? 'Bearer ' + localStorage.getItem('token')
			: null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	}, 
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
					'Looks like CORS might be the problem. ' +
					'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 401
			 &&window.location.pathname!='/login'
			// originalRequest.url === baseURL + 'auth/api/token/refresh/'
		) {
			window.location.href = '/login/';
			return Promise.reject(error);
		}

		if (
			// error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
				console.log('token not expired');
        localStorage.removeItem("token");
				window.location.href = '/login/';
			
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);

export default axiosInstance;
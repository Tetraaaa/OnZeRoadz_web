
export function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		return response.text()
		.then((text) => {
			let error = new Error(text);
			error.response = response;
			throw error;
		});
	}
}

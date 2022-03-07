const path = require('path');
module.exports = {
	webpack: {
		alias: {
			'@components': path.resolve(__dirname, 'src/components/'),
			'@store': path.resolve(__dirname, 'src/store/'),
			'@helpers': path.resolve(__dirname, 'src/helpers/'),
			'@service': path.resolve(__dirname, 'src/service/'),
			'@shared': path.resolve(__dirname, 'src/components/shared'),
		},
	},
};

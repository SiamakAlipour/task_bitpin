import path from 'path';

module.exports = {
	resolve: {
		alias: {
			components: path.resolve(__dirname, 'src/components'),
			store: path.resolve(__dirname, 'src/store/'),
			helpers: path.resolve(__dirname, 'src/helpers/'),
			service: path.resolve(__dirname, 'src/service/'),
			shared: path.resolve(__dirname, 'src/components/shared'),
			hooks: path.resolve(__dirname, 'src/hooks'),
		},
	},
};

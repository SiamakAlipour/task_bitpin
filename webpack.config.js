import path from 'path';

module.exports = {
	resolve: {
		alias: {
			components: path.resolve(__dirname, 'src/components'),
			store: path.resolve(__dirname, 'src/store/'),
			utils: path.resolve(__dirname, 'src/utils'),
			shared: path.resolve(__dirname, 'src/components/shared'),
			pages: path.resolve(__dirname, 'src/pages'),
			hooks: path.resolve(__dirname, 'src/hooks'),
		},
	},
};

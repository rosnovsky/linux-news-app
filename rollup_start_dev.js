import * as child_process from 'child_process';
import replace from 'rollup-plugin-replace';
import svelte from 'rollup-plugin-svelte';

let running_dev_server = false;

export default {
	writeBundle() {
		if (!running_dev_server) {
			running_dev_server = true;
			child_process.spawn('npm', ['run', 'start:dev'], { stdio: ['ignore', 'inherit', 'inherit'], shell: true });
		}
	},
	plugins: [
		svelte(),
		replace({
		API_KEY: process.env.API_KEY
		})
	]
};

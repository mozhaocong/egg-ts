class AppBootHook {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	private readonly app: any
	constructor(app: any) {
		this.app = app
	}
	configWillLoad() {
		console.log('configWillLoad')
	}
}
export default AppBootHook

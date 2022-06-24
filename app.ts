class AppBootHook {
  private readonly app: any;
  constructor(app:any) {
    this.app = app;
  }
  configWillLoad() {
    console.log('configWillLoad', this.app);
  }
}
export default AppBootHook;

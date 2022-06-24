import { Controller } from 'egg';


const createRule = {
  title: 'string',
  id: 'string',
};

export default class HomeController extends Controller {

  public async index() {
    const { ctx } = this;
    const data = ctx.validate(createRule, ctx.request.query);
    console.log('data', data);
    ctx.body = await ctx.service.test.sayHi('egg');
  }
}

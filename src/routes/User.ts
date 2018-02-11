import { Context } from 'koa';
import * as Router from "koa-router";
import { Connection, EntityManager } from "typeorm";
import { User } from '../entities/User';

export default class UserRouter {
  public router: Router;
  private manager: EntityManager

  constructor(connection: Connection) {
    this.manager = connection.manager;
    this.router = new Router({ prefix: '/users' });
  }

  public routes() {
    this.addRoutes();
    return this.router.routes();
  }

  public allowedMethods() {
    return this.router.allowedMethods();
  }

  private addRoutes(): void {
    this.router.get('/', this.getAll.bind(this));
    this.router.post('/', this.save.bind(this));
    this.router.get('/:id', this.getById.bind(this));
    this.router.patch('/:id', this.updateById.bind(this));
    this.router.delete('/:id', this.deleteById.bind(this));
  }

  private async getById(ctx: Context) {
    try {
      ctx.body = await this.manager.findOneById(User, ctx.params.id);
      if (!ctx.body) {
        ctx.status = 404;
      }
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  }

  private async getAll(ctx: Context) {
    try {
      ctx.body = await this.manager.find(User, {});
      if (ctx.body.length < 1) {
        ctx.status = 404;
      }
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }

  }

  private async save(ctx: Context) {
    try {
      await this.manager.transaction(async manager => {
        const user: User = new User();
        user.name = ctx.request.body.name || null;
        user.password = ctx.request.body.password || null;
        user.email = ctx.request.body.email || null;
        user.admin = ctx.request.body.admin || false;

        ctx.body = await manager.save(User);
      });
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  }

  private async updateById(ctx: Context) {
    try {
      await this.manager.transaction(async manager => {
        let id = ctx.params.id;
        let UserUpdate = ctx.request.body;
        
        ctx.body = await this.manager.updateById(
          User,
          id,
          UserUpdate
        );

      });
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  }

  private async deleteById(ctx: Context) {
    try {
      await this.manager.transaction(async manager => {
        ctx.body = await this.manager.removeById(User, ctx.params.id);
      });
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  }

}

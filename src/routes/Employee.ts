import { Context } from 'koa';
import * as Router from "koa-router";
import { EntityManager, Connection } from "typeorm";
import { Employee } from '../entities/Employee';
import { Asset } from '../entities/Asset';

export default class EmployeeRouter {
  public router: Router;
  private manager: EntityManager;

  constructor(connection: Connection) {
    this.manager = connection.manager;
    this.router = new Router({ prefix: '/employees' });
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
    this.router.get('/:id', this.getById.bind(this));
    this.router.get('/:id/assets', this.getRelatedAssets.bind(this));
    this.router.post('/', this.save.bind(this));
    this.router.patch('/:id', this.updateById.bind(this));
    this.router.delete('/:id', this.deleteById.bind(this));
  }

  private async getById(ctx: Context) {
    try {
      ctx.body = await this.manager.findOneById(Employee, ctx.params.id);
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
      ctx.body = await this.manager.find(Employee, {});
      if (ctx.body.length < 1) {
        ctx.status = 404;
      }
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }

  }

  private async getRelatedAssets(ctx: Context) {
    try {
      ctx.body = await this.manager.createQueryBuilder()
        .relation(Employee, 'assets')
        .of(ctx.params.id)
        .loadMany();
      if (!ctx.body) {
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
        const employee: Employee = new Employee();
        employee.name = ctx.request.body.name;
        ctx.body = await manager.save(Employee, employee);
      });
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  }
  
  private async updateById(ctx: Context) {
    try {
      await this.manager.transaction(async manager => {
        ctx.body = await manager.updateById(
          Employee,
          ctx.params.id,
          ctx.request.body
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
        ctx.body = await manager.removeById(Employee, ctx.params.id);
      });
      } catch (err) {
        ctx.body = { message: err.message };
        ctx.status = err.status || 500;
    }
  }

}

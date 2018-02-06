import { Context } from 'koa';
import * as Router from "koa-router";
import { getManager, Repository, Connection } from "typeorm";
import { Employee } from '../entities/Employee';

export default class EmployeeRouter {
  public router: Router;
  private repository: Repository<Employee>

  constructor(connection: Connection) {
    this.repository = connection.getRepository(Employee);
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
    this.router.get('/', this.getEmployees.bind(this));
    this.router.post('/', this.saveEmployee.bind(this));
    this.router.get('/:id', this.getEmployeeById.bind(this));
    this.router.patch('/:id', this.updateEmployee.bind(this));
    this.router.delete('/:id', this.deleteEmployee.bind(this));
  }

  private async getEmployeeById(ctx: Context) {
    try {
      ctx.body = await this.repository.findOneById(ctx.params.id);
      if (!ctx.body) {
        ctx.status = 404;
      }
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  }

  private async getEmployees(ctx: Context) {
    try {
      ctx.body = await this.repository.find({});
      if (ctx.body.length < 1) {
        ctx.status = 404;
      }
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }

  }

  private async saveEmployee(ctx: Context) {
    try {
      const employee: Employee = new Employee();
      employee.name = ctx.request.body.name;
      ctx.body = await this.repository.save(employee);
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  }

  private async updateEmployee(ctx: Context) {
    try {
      ctx.body = await this.repository.updateById(
        ctx.params.id,
        ctx.request.body
      );
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  }

  private async deleteEmployee(ctx: Context) {
    try {
      ctx.body = await this.repository.removeById(ctx.params.id);
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  }

}

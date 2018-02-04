import {Context} from 'koa';
import * as Router from "koa-router";
import {getManager, Repository, Connection} from "typeorm";
import {Employee} from '../entities/Employee';

export default class EmployeeRouter {
  public router: Router;
  private repository: Repository<Employee>

  constructor(connection: Connection) {
    this.repository = connection.getRepository(Employee);
    this.router = new Router({prefix:'/employees'});
  }
  
  public routes() {
    this.addRoutes();
    return this.router.routes();
  }

  public allowedMethods() {
    return this.router.allowedMethods();
  }

  private addRoutes(): void {
    this.router.get('/', this.getEmployees);
    this.router.post('/', this.saveEmployee);
    this.router.get('/:id', this.getEmployeeById);
    this.router.put('/:id', this.updateEmployee);
    this.router.delete('/:id', this.deleteEmployee);
  }

  private async getEmployeeById(ctx: Context) {
    ctx.body = 'Hola mundo!';
    console.log(this);
  }
  
  private async getEmployees(ctx: Context) {
    console.log(this);
    try {
      ctx.body = await this.repository.find({}); 
    } catch (err) {
      ctx.body = err;
      ctx.status = 500;
    }

  }

  private saveEmployee(ctx: Context) {

  }

  private updateEmployee(ctx: Context) {
  
  }

  private deleteEmployee(ctx: Context) {

  }

}

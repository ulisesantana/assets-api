import { Context } from 'koa';
import * as Router from "koa-router";
import * as jwt from 'koa-jwt';
import * as jsonwebtoken from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import tokenDecoder from '../utils/tokenDecoder';
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
    this.router.post('/login', this.login.bind(this));
  }

  private async login(ctx: Context) {
    try {
      const { email, password } = ctx.request.body;
      const user = await this.manager.findOne(User, { email });
      let passwordMatch = await bcrypt.compare(password, user.password);
      if (!user || !passwordMatch) {
        ctx.status = 401;
      } else {
        delete user.password;
        ctx.body = {
          user: user,
          token: jsonwebtoken.sign({
            data: user,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
          }, process.env.TOKEN_SECRET || 'secret'),
        }
      }
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  }

  private async getById(ctx: Context) {
    try {
      const { id, admin } = tokenDecoder(ctx);
      if (admin || id == ctx.params.id) {
        ctx.body = await this.manager.findOneById(User, ctx.params.id);
        if (!ctx.body) {
          ctx.status = 404;
        }
      } else {
        ctx.status = 401;
      }
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  }

  private async getAll(ctx: Context) {
    try {
      const isAdmin = tokenDecoder(ctx).admin;
      if (isAdmin) {
        ctx.body = await this.manager.find(User, {});
        if (ctx.body.length < 1) {
          ctx.status = 404;
        }
      } else {
        ctx.status = 401;
      }
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }

  }

  private async save(ctx: Context) {
    try {
      const isAdmin = tokenDecoder(ctx).admin;
      if (isAdmin) {
        await this.manager.transaction(async manager => {
          const user: User = new User();
          user.name = ctx.request.body.name || null;
          user.password = await bcrypt.hash(ctx.request.body.password, 5);
          user.email = ctx.request.body.email || null;
          user.admin = ctx.request.body.admin || false;

          ctx.body = await manager.save(User);
        });
      } else {
        ctx.status = 401;
      }
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  }

  private async updateById(ctx: Context) {
    try {
      const { id, admin } = tokenDecoder(ctx);
      if (admin || id == ctx.params.id) {
        await this.manager.transaction(async manager => {
          let id = ctx.params.id;
          let UserUpdate = ctx.request.body;

          if(UserUpdate.password){
            UserUpdate = await bcrypt.hash(UserUpdate.password, 5)
          }

          ctx.body = await manager.updateById(
            User,
            id,
            UserUpdate
          );
  
        });
      } else {
        ctx.status = 401;
      }
      
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  }

  private async deleteById(ctx: Context) {
    try {
      const { id, admin } = tokenDecoder(ctx);
      if (admin || id == ctx.params.id) {
        await this.manager.transaction(async manager => {
          ctx.body = await manager.deleteById(User, ctx.params.id);
        });
      } else {
        ctx.status = 401;
      }
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  }

}

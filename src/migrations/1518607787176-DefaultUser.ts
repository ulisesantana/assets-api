import {MigrationInterface, QueryRunner} from "typeorm";
import * as bcrypt from 'bcrypt';

export class DefaultUser1518607787176 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const password = await bcrypt.hash("admin", 5);
        await queryRunner.query(
            `INSERT INTO user (id,name,email,password,admin) 
             VALUES (1,"Administrator","admin@admin.com","${password}", 1)`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM user WHERE id=1`);
    }

}

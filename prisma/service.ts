import { PrismaClient } from "@prisma/client";
import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common'


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super({
            log: [
                { emit: 'event', level: 'query' },
                { emit: 'stdout', level: 'info' },
                { emit: 'stdout', level: 'warn' },
                { emit: 'stdout', level: 'error' },
            ],
            errorFormat: 'minimal',
            rejectOnNotFound: {
                findUnique: true,
            },
        });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
}
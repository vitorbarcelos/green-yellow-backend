import { Server } from './server';

const server = await Server.create();
await server.listen();

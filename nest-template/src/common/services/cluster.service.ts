import { Injectable } from '@nestjs/common';
const cluster = require('cluster');
import os from 'os';

@Injectable()
export class ClusterService {
    static register(callback: Function) {
        console.warn(cluster);
        if(cluster.isPrimary) {
            console.log(`Master server started on ${process.pid}`);

            // Ensuring that worker processes are killed before master.
            process.on('SIGINT', function() {
                console.log('Cluster shutting down...');
                for(var id in cluster.workers) {
                    cluster.workers[id].kill();
                }
                // Exiting the master process.
                process.exit(0);
            });

            var cpus = os.cpus().length;

            for (let i = 0; i < cpus; i++) {
                cluster.fork();
            }

            cluster.on('online', function (worker) {
                console.log('Worker %s is online', worker.process.pid);
            });

            cluster.on('exit', (worker, code, signal) => {
                console.log(`Worker process ${worker.process.pid} died. Restarting...`);
                cluster.fork();
            });

        } else {
            callback();
        }

    }
}
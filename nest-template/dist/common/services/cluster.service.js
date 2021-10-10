"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClusterService = void 0;
const common_1 = require("@nestjs/common");
const cluster = require('cluster');
const os_1 = require("os");
let ClusterService = class ClusterService {
    static register(callback) {
        console.warn(cluster);
        if (cluster.isPrimary) {
            console.log(`Master server started on ${process.pid}`);
            process.on('SIGINT', function () {
                console.log('Cluster shutting down...');
                for (var id in cluster.workers) {
                    cluster.workers[id].kill();
                }
                process.exit(0);
            });
            var cpus = os_1.default.cpus().length;
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
        }
        else {
            callback();
        }
    }
};
ClusterService = __decorate([
    (0, common_1.Injectable)()
], ClusterService);
exports.ClusterService = ClusterService;
//# sourceMappingURL=cluster.service.js.map
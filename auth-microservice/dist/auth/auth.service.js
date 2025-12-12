"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const jwt_1 = require("@nestjs/jwt");
const microservices_2 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const bcrypt = __importStar(require("bcryptjs"));
let AuthService = class AuthService {
    constructor(jwtService, natsClient) {
        this.jwtService = jwtService;
        this.natsClient = natsClient;
    }
    async login(loginDto) {
        try {
            const user$ = this.natsClient
                .send('readByUsername', loginDto.username)
                .pipe((0, rxjs_1.timeout)(3000));
            const user = await (0, rxjs_1.lastValueFrom)(user$);
            if (!user)
                throw new microservices_1.RpcException({ status: 401, message: 'User not found' });
            const ok = await bcrypt.compare(loginDto.password, user.password);
            if (!ok)
                throw new microservices_1.RpcException({ status: 401, message: 'Invalid credentials' });
            const roles = user.permissions ? user.permissions.map((p) => p.name) : [];
            const payload = {
                sub: user.id,
                username: user.username,
                email: user.email,
                roles: roles,
            };
            const access_token = await this.jwtService.signAsync(payload);
            return {
                access_token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    displayName: user.displayName,
                    roles: roles,
                },
            };
        }
        catch (err) {
            if (err instanceof microservices_1.RpcException)
                throw err;
            if (err?.name === 'TimeoutError') {
                throw new microservices_1.RpcException({ status: 504, message: 'Users service timeout' });
            }
            throw new microservices_1.RpcException({ status: 500, message: err?.message ?? 'Auth login failed' });
        }
    }
    async validateToken(token) {
        try {
            const payload = await this.jwtService.verifyAsync(token);
            return { user: payload };
        }
        catch (error) {
            throw new microservices_1.RpcException({ status: 401, message: 'Invalid or expired token' });
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('NATS_SERVICE')),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        microservices_2.ClientProxy])
], AuthService);
//# sourceMappingURL=auth.service.js.map
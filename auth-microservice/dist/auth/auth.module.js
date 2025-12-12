"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const nats_client_module_1 = require("../nats-client/nats-client.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            nats_client_module_1.NatsClientModule,
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    const secret = config.get('JWT_SECRET') || 'changeme';
                    const raw = config.get('JWT_EXPIRES_IN');
                    const toSeconds = (v) => {
                        const match = v.match(/^\s*(\d+)\s*([smhd])\s*$/i);
                        if (!match)
                            return NaN;
                        const amount = Number(match[1]);
                        const unit = match[2].toLowerCase();
                        switch (unit) {
                            case 's':
                                return amount;
                            case 'm':
                                return amount * 60;
                            case 'h':
                                return amount * 3600;
                            case 'd':
                                return amount * 86400;
                            default:
                                return NaN;
                        }
                    };
                    let expiresIn = 3600;
                    if (raw) {
                        if (/^\d+$/.test(raw)) {
                            expiresIn = Number(raw);
                        }
                        else {
                            const parsed = toSeconds(raw);
                            expiresIn = Number.isFinite(parsed) ? parsed : 3600;
                        }
                    }
                    return {
                        secret,
                        signOptions: { expiresIn },
                    };
                },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map
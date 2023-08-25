import { JwtModuleOptions } from '@nestjs/jwt'

export const jwtConfig: JwtModuleOptions = {
	secret: 'iniRahasiaHehehe',
	signOptions: {
		expiresIn: 60,
	},
}
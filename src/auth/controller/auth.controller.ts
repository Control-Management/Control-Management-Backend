import { Body, Controller, Inject, Post } from "@nestjs/common";
import { IAuthServiceToken} from '../services/auth.service';
import { IAuthService } from "../services/iauth.service";
import { SignInRequestDTO } from "../dto/sign-in.request.dto";
import { UserResponseDTO } from "../dto/user.response.dto";
import { SignUpRequestDTO } from "../dto/sign-up.request.dto";

@Controller("api/v1/auth")
export class AuthController{
    constructor(@Inject(IAuthServiceToken) private authService: IAuthService ){}


    @Post("/sign-in")
    async signIn(@Body() signInRequest: SignInRequestDTO) : Promise<UserResponseDTO>{
        return await this.authService.signIn(signInRequest);
    }

    @Post("/sign-up")
    async signUp(@Body() signUpRequest: SignUpRequestDTO): Promise<boolean>{
        return await this.authService.signUp(signUpRequest);
    }
}
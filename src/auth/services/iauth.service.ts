import { SignInRequestDTO } from "../dto/sign-in.request.dto";
import { SignUpRequestDTO } from "../dto/sign-up.request.dto";
import { UserResponseDTO } from "../dto/user.response.dto";

export interface IAuthService{
    signIn(signInRequest: SignInRequestDTO) : Promise<UserResponseDTO>
    signUp(signUpRequest: SignUpRequestDTO) : Promise<boolean>
}
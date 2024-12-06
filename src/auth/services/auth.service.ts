import { BadRequestException, NotFoundException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { IAuthService } from "./iauth.service";
import { SignInRequestDTO } from "../dto/sign-in.request.dto";
import { SignUpRequestDTO } from "../dto/sign-up.request.dto";
import { UserResponseDTO } from "../dto/user.response.dto";
import { IAuthRepositoryToken } from "../repositories/auth.repository";
import { IAuthRepository } from "../repositories/iauth.repository";
import * as bcrypt from 'bcrypt';
import { User } from "../models/user.model";
import { UserRoles } from "../models/user_roles";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService implements IAuthService{
    constructor(
        @Inject(IAuthRepositoryToken) private readonly authRepository: IAuthRepository,
        private readonly jwtService: JwtService
        ){}
        async signIn(signInRequest: SignInRequestDTO): Promise<UserResponseDTO> {
        
            const userFound = await this.authRepository.findUserByEmail(signInRequest.email);
            
            
            if (!userFound) {
              throw new NotFoundException("This user doesn't exist");
            }
        
            const isPasswordValid = await bcrypt.compare(signInRequest.password, userFound.password);
            if (!isPasswordValid) {
              throw new UnauthorizedException("The provided password is invalid");
            }
        
            const payload = { sub: userFound.id, username: userFound.username };
        
            let token: string;
            try {
              token = await this.jwtService.signAsync(payload);
            } catch (error) {
              console.error("Error generating the JWT token:", error); 
              throw new UnauthorizedException("Error generating the authentication token");
            }
        
        
            const userAuthenticated = new UserResponseDTO(
              userFound.email,
              userFound.thumbnail,
              userFound.username,
              token
            );
        

            return userAuthenticated;
          }
    async signUp(signUpRequest: SignUpRequestDTO): Promise<boolean> {
    
        if (await this.authRepository.isUserExists(signUpRequest.email, signUpRequest.username)) {
            throw new BadRequestException("This user already exists");
        }
    
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(signUpRequest.password, saltOrRounds);
    
        const defaultRole = await this.authRepository.getRoleName(UserRoles.WORKER);
    
        const userToSignUp = new User();
        userToSignUp.email = signUpRequest.email;
        userToSignUp.password = hashedPassword;
        userToSignUp.thumbnail = signUpRequest.thumbnail;
        userToSignUp.username = signUpRequest.username;
        userToSignUp.role = defaultRole;
    

        await this.authRepository.createUser(userToSignUp);
        return true;
    }
    

}

export const IAuthServiceToken = "IAuthServiceToken"
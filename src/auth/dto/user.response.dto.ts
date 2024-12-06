export class UserResponseDTO {
    email: string;
    thumbnail: string;
    username: string;
    token: string;

    constructor(email: string, thumbnail: string, username: string, token: string){
        this.email = email;
        this.thumbnail = thumbnail;
        this.username = username;
        this.token = token;
    }
}
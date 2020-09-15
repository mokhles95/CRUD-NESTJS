import {  Controller, Post,Body,Get,Param,Patch,Delete,Put } from '@nestjs/common';
import { User } from './users.model';
import {UserService} from './users.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
 async addProduct(@Body() user: User) {
    return this.userService.insertUser(
        user.password,
        user.email,
        user.name
    );
  }

  @Get()
   getProduct (){
      return this.userService.getUsers()
     }


    @Get(':id')
   getUserById (@Param('id') userId: string){
      return this.userService.getUserById(userId)
     }

  @Patch(':id')
   updateProduct(
    @Param('id') userId: string,
    @Body('name') userName: string,
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
  )  
  {
    return this.userService.updateUser(userId, userName, userEmail, userPassword)
  }

  @Delete(':id')
   deleteProduct(
    @Param('id') userId: string)  
  {
    return this.userService.deleteUser(userId)
  }
}

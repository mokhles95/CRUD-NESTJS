import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose'
import { from } from 'rxjs';
import {User} from './users.model'
import {Model} from 'mongoose'
@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>){}
    
    
    insertUser(name: string, email: string, password: string){
        const newUser = new this.userModel(
            {
                name: name,
                email: email,
                password : password
            }
        )
        newUser.save().then(result =>{
            console.log(result)
        })
    }


    getUsers(){
       return  this.userModel.find().exec()
    } 

   async getUserById(id:any){
        let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
    
    
    updateUser(id: any, userName: string, userEmail:string, userPassword:string){

      this.userModel.findById(id).exec().then(user=>{
            user.name = userName,
            user.email = userEmail,
            user.password = userPassword
            return user.save()
        }).then( 
            result=>{
            console.log(result)
            }
        ).catch(err=>{
            console.log(err);   
        }
        )
    
    }

    deleteUser(id: any){
        this.userModel.findByIdAndRemove(id).exec().then(
            result=>{
                if (result.n === 0) {
                    throw new NotFoundException('Could not find user.');
                  }
            }
        )
      }
}

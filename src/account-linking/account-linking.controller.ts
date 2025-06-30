import { Controller, Post, Body, UseGuards, Get, Param, Patch, Delete } from '@nestjs/common';
import { AccountService } from './account-linking.service';
import { JwtAuthGuard } from '../auth/jwt-authguard';
import { GetUser } from '../auth/userinfo.decorator';
import { User } from '../user/entity/user.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() dto: CreateAccountDto, @GetUser() user: User) {
    return this.accountService.create(dto, user.id);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.accountService.findAll(user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAccountDto) {
    return this.accountService.update(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.accountService.delete(+id);
  }
}

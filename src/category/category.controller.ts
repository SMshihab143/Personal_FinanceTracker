import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../auth/jwt-authguard';
import { GetUser } from '../auth/userinfo.decorator';
import { User } from '../user/entity/user.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() dto: CreateCategoryDto, @GetUser() user: User) {
    return this.categoryService.create(user, dto);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.categoryService.findAll(user.id);
  }
}

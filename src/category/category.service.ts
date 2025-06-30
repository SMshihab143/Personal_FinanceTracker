import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(user: User, dto: CreateCategoryDto) {
    const category = this.categoryRepo.create({ ...dto, user });
    return this.categoryRepo.save(category);
  }

  async findAll(userId: number) {
    return this.categoryRepo.find({ where: { user: { id: userId } } });
  }
}

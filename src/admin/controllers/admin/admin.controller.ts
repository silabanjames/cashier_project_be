import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductDto } from 'src/admin/dtos/CreateProduct.dto';
import { UpdateProductDto } from 'src/admin/dtos/UpdateProduct.dto';
import { AdminService } from 'src/admin/services/admin/admin.service';
import { UUIDValidationPipe } from 'src/pipes/UuidValidation.pipes';
import { Product } from 'src/typeorm/entities/Product';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService){}
    
    @Post('create-product')
    createProduct(@Body() createProductDto: CreateProductDto): Promise<any>{
        return this.adminService.createProduct(createProductDto);
    }

    @Get(':id')
    getProduct(@Param('id', UUIDValidationPipe) id:string): Promise<Product>{
        return this.adminService.getProduct(id);
    }

    @Put(':id')
    updateProduct(@Param('id', UUIDValidationPipe) id: string, @Body() updateProductDto: UpdateProductDto): Promise<void>{
        return this.adminService.updateProduct(id, updateProductDto);
    }

    @Delete(':id')
    deleteProduct(@Param('id', UUIDValidationPipe) id: string): Promise<any>{
        return this.adminService.deleteProduct(id);
    }

    
}
